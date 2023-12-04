#### requirements
#!pip install 'git+https://github.com/SKTBrain/KoBERT.git#egg=kobert_tokenizer&subdirectory=kobert_hf'
#!pip install mxnet
#!pip install gluonnlp pandas tqdm
#!pip install sentencepiece
#!pip install transformers
#!pip install torch
#!pip install kss

def start(_text: str, name: str):
    import pandas as pd
    import torch
    from torch import nn
    import torch.nn.functional as F
    import torch.optim as optim
    from torch.utils.data import Dataset, DataLoader
    import gluonnlp as nlp
    import numpy as np
    from tqdm import tqdm
    from datetime import datetime, timedelta
    #transformers
    from transformers import AdamW
    from transformers.optimization import get_cosine_schedule_with_warmup

    from transformers import BertModel
    from kobert_tokenizer import KoBERTTokenizer

    #전처리 함수
    # def readText(fname):
    #     text = []
    #     with open(fname, 'r', encoding='UTF-8') as f:
    #         while True:
    #             lines = f.readline()
    #             if not lines:
    #                 break
    #             # Remove leading/trailing whitespaces and line breaks
    #             cleaned_line = lines.strip()
    #             if cleaned_line:
    #                 text.append(cleaned_line)
    #     return text

    text = []
    for line in _text.split("\n"):
        if line.strip() != "":
            text.append(line.strip())

    def text_proc(texts):
        date = datetime.now()
        output = pd.DataFrame(columns=['name', 'time', 'text'])
        index = 0
        before = ['', None]
        for text in tqdm(texts):
            if '----------' in text: # 날짜를 표현한 text인 경우
                tmp = text.split(' ')[1:-2]
                date = datetime.strptime(f'{tmp[0]} {tmp[1]} {tmp[2]}', "%Y년 %m월 %d일")
            elif text[0] == '[': # 실제 대화 내용
                tmp = text.split(']')
                name = tmp[0][1:]
                ttime = tmp[1][2:]
                text = tmp[2][1:].replace('\n', '').replace('\t', '')

                time = datetime.strptime(ttime.split(' ')[1], "%H:%M")
                # 오후, 오전 처리
                if ttime.split(' ')[0] == '오후' and time.hour < 12: time += timedelta(hours=12)
                elif ttime.split(' ')[0] == '오전' and time.hour==12: time -= timedelta(hours=12)
                
                # date(연도, 월, 일) 적용
                time = time.replace(year=date.year, month=date.month, day=date.day)
                
                # 이어지는 대화 합치기
                if before[1] != None and before[0]==name and time - before[1] < timedelta(minutes=2):
                    output.loc[index-1,'text'] += f'|{text}'
                else:
                    output.loc[index] = [name, time, text]
                    index += 1
                before = [name, time]
            else: continue # 기타 내용
        return output

    def CuttingByLabel(df):
        output = []
        
        df = df[df['label']!=0]
        
        if len(df) <= 1: return []
        
        label = df['label'].value_counts().index[0]
        cnt = df['label'].value_counts().iloc[0]
        if cnt<=1: return []
        
        min_index = df.loc[df['label']==label, 'time'].index[0]
        max_index = df.loc[df['label']==label, 'time'].index[-1]
        
        output.append(list(range(min_index, max_index+1)))
        output.extend(CuttingByLabel(df.loc[:min_index-1]))
        output.extend(CuttingByLabel(df.loc[max_index+1:]))
        
        return output

    # Model 함수
    device = torch.device('cpu')

    class BERTDataset(Dataset):
        def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, vocab, max_len,
                    pad, pair):
            transform = nlp.data.BERTSentenceTransform(
                bert_tokenizer, max_seq_length=max_len, vocab=vocab, pad=pad, pair=pair)

            self.sentences = [transform([i[sent_idx]]) for i in dataset]
            self.labels = [np.int32(i[label_idx]) for i in dataset]

        def __getitem__(self, i):
            return (self.sentences[i] + (self.labels[i], ))

        def __len__(self):
            return (len(self.labels))

    class BERTClassifier(nn.Module):
        def __init__(self,
                    bert,
                    hidden_size = 768,
                    num_classes=20,   ##모델의 마지막층의 class를 지정해줘야 한다. (카테고리개수)##
                    dr_rate=None,
                    params=None):
            super(BERTClassifier, self).__init__()
            self.bert = bert
            self.dr_rate = dr_rate

            self.classifier = nn.Linear(hidden_size , num_classes)
            if dr_rate:
                self.dropout = nn.Dropout(p=dr_rate)

        def gen_attention_mask(self, token_ids, valid_length):
            attention_mask = torch.zeros_like(token_ids)
            for i, v in enumerate(valid_length):
                attention_mask[i][:v] = 1
            return attention_mask.float()

        def forward(self, token_ids, valid_length, segment_ids):
            attention_mask = self.gen_attention_mask(token_ids, valid_length)

            _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device))
            if self.dr_rate:
                out = self.dropout(pooler)
            return self.classifier(out)
        
    #전처리 함수
    # text = readText(input("카카오톡 파일 내보내기 후 파일 경로를 입력해주세요"))
    # name = input('카카오톡 이름을 입력해주세요')
    print(f"카카오톡 내용은 총 {len(text)} 줄 입니다!")
    test_df = text_proc(text)
    test_df.loc[test_df['name']==name, 'name'] = '나'
    #print(test_df)

    # 맥락을 넣기 위한 Label을 넣는 코드

    tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
    bertmodel = BertModel.from_pretrained('skt/kobert-base-v1', return_dict=False)
    vocab = nlp.vocab.BERTVocab.from_sentencepiece(tokenizer.vocab_file, padding_token='[PAD]')

    tok = tokenizer.tokenize

    # hyperparameter
    max_len = 64
    batch_size = 64
    warmup_ratio = 0.1
    max_grad_norm = 1
    log_interval = 200
    learning_rate =  5e-5

    model = BERTClassifier(bertmodel, dr_rate=0.5).to(device)
    model.load_state_dict(torch.load("./Kobert.pt", map_location=device))

    def predict(predict_sentence):
        data = [predict_sentence, 0]
        dataset_another = [data]
        another_test = BERTDataset(dataset_another, 0, 1, tok, vocab,max_len, True, False)
        test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=0)
        model.eval()
        for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
            token_ids = token_ids.long().to(device)  # Move to the CPU device
            segment_ids = segment_ids.long().to(device)

            valid_length = valid_length
            label = label.long().to(device)

            out = model(token_ids, valid_length, segment_ids)
            test_eval = []
            for i in out:
                logits = i
                logits = logits.detach().cpu().numpy()
                test_eval.append(np.argmax(logits))

            return test_eval[0]

    for idx in range(len(test_df)):
        text_data = test_df.loc[idx, 'text']
        label = predict(text_data)
        test_df.loc[idx, 'label'] = label

    test_df = test_df.astype({'label' : int})

    #Label, 시간정보, KNU 감성사전을 이용해 감성 대화를 추출하는 코드
    import kss
    import json
    import pandas as pd 
    import os
    import glob

    class KnuSL():
        def data_list(wordname):   
            with open('./KnuSentiLex-master/data/SentiWord_info.json', encoding='utf-8-sig', mode='r') as f:
                data = json.load(f)
            result = ['None','None']   
            for i in range(0, len(data)):
                if data[i]['word'] == wordname:
                    result.pop()
                    result.pop()
                    result.append(data[i]['word_root'])
                    result.append(data[i]['polarity'])   
            r_word = result[0] # print('어근 : ' + r_word)
            s_word = result[1] # print('극성 : ' + s_word)            
            return r_word, s_word

    ksl = KnuSL
    from datetime import datetime, timedelta

    test_csv = test_df
    test_csv['time'] = pd.to_datetime(test_csv['time'])
    test_csv['delta'] = test_csv.time.diff()
    test_csv.loc[0, 'delta'] = timedelta(seconds=0)
    cutting = [0]
    cutting.extend(test_csv[test_csv['delta'] > timedelta(hours=8)].index)
    cutting.append(len(test_csv))

    cutting_ = []
    for i, j in zip(cutting[:-1], cutting[1:]):
        cutting_.append(list(range(i, j)))

    cutting_list = []
    for i in cutting_:
        cutting_list.extend(CuttingByLabel(test_csv.loc[i]))

    emotion_list = []
        
    for lst in cutting_list:
        i, j = lst[0], lst[-1]+1
        cutting_csv = test_csv.iloc[i:j]
        cnt = (cutting_csv['text'].count()) # csv파일의 문장 개수 
        check = False # emotion이 있는지 확인하는 변수
        for k in range(i, j): # 문장 개수만큼 반복 
            wordname = cutting_csv['text'][k] # 문장 
            #print(type(wordname))
            sentence = kss.split_morphemes(wordname) # 해당 문장을 (형태소, 형태소의 종류)로 분리하여 list
        
            for l in range(len(sentence)): # 형태소 개수만큼 반복
                wordname = sentence[l][0] # 형태소
                emo = ksl.data_list(wordname)[1]
                if emo != "None": # 해당 형태소가 감정사전에 있다면 
                    check = True
                    break
        if(check):
            emotion_list.append([i, j])

    category_list = { '타 국가 이슈': 0, '주거와 생활': 1, '교통': 2, '회사/아르바이트': 3, '군대': 4, '교육': 5, '가족': 6, '연애/결혼': 7, '반려동물': 8, '스포츠/레저': 9,
    '게임': 10, '여행': 11, '계절/날씨': 12, '사회이슈': 13, '식음료': 14, '미용': 15, '건강': 16, '상거래 전반': 17, '방송/연예': 18, '영화/만화': 19 }
    
    result_str = ""
    for i, j in emotion_list:
            for k in range(i, j):
                name, text_inte = test_csv.loc[k, ['name', 'text']]
                text_split = text_inte.split('|')
                for text in text_split:
                    result_str += (f'{name} : {text}\n')
            result_str += ('|\n')
    
    return result_str
    
    # with open('final.txt', 'w') as f:   
    #     for i, j in emotion_list:
    #         for k in range(i, j):
    #             name, text_inte = test_csv.loc[k, ['name', 'text']]
    #             text_split = text_inte.split('|')
    #             for text in text_split:
    #                 f.write(f'{name} : {text}\n')
    #         f.write('|\n')
