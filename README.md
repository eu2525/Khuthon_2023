# UT (공감형 대화를 위한 공감 대화 교육 서비스)
2023 KHUThon에서 '교육'이라는 주제와 연계하여 자유롭게 작품을 만들어야 했습니다. <br>
저희 팀은 "공감은 타고나는 것이 아니라 사회화 과정 속에서 습득하는 기술" 이라고 정의하고 공감 대화 교육 서비스를 만들었습니다.

# 서비스 구조
![image](https://github.com/eu2525/Algorithm_Study/assets/49024115/302a7ab8-f4a5-4a98-836d-cb7c034e288e)

# 📃핵심 기능 소개
![image](https://github.com/eu2525/Algorithm_Study/assets/49024115/b62e7370-d508-42c7-b0ee-3322a3c851e5)

## 카카오톡 대화를 통한 공감 평가<br>
원본 카톡 대화를 대화 시간, 맥락, 화자를 기준으로 분리 -> 각 대화에서 공감수치 파악

### 구현 원리
AI hub의  주제별 일상 대화 데이터를 Kobert모델에 전이학습시켜 대화 주제별 Label을 생성한 후 맥락, 시간, 감성단어를 통한 공감성 대화 추출
![image](https://github.com/eu2525/Khuthon_2023/assets/49024115/bacfadb2-fc3c-4293-9b57-59f92ef68a53)
![image](https://github.com/eu2525/Algorithm_Study/assets/49024115/be95c983-5d6c-479e-85b7-f36316666a78)

## 실제 상황을 바탕으로 만든 연습문제를 통한 공감 능력 학습 <br>
실제 상황을 바탕으로한 다양한 교육자료를 통해 사용자의 답변을 ChatGPT API를 이용해 피드백
![image](https://github.com/eu2525/Khuthon_2023/assets/49024115/ddc02f9d-382a-426d-9aa7-82b84ac69c7f)

### 실제 서비스 예시
![image](https://github.com/eu2525/Khuthon_2023/assets/49024115/d0e4aeff-9499-464b-b318-9a0af4ecfc35)
