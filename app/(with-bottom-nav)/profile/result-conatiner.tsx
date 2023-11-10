import { Database } from "@/utils/supabase/database.types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
} from "@nextui-org/react";

type _Result = Database["public"]["Tables"]["practice_results"]["Row"];
interface Result extends _Result {
  practice_sets: Database["public"]["Tables"]["practice_sets"]["Row"] | null;
}
export const ResultContainer = ({ results }: { results: Result[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {results.map((result) => (
        <ResultItem key={result.id} result={result} />
      ))}
    </div>
  );
};

const ResultItem = ({ result }: { result: Result }) => {
  const { id, score, created_at, updated_at, practice_sets } = result;
  const { title, description, thumbnail_image, level } = practice_sets!;
  const isDone = !!score;

  return (
    <Card className="relative">
      {thumbnail_image ? (
        <Image
          alt={title}
          className="aspect-square object-cover w-full h-full brightness-75"
          height={250}
          src={thumbnail_image}
          width={250}
        />
      ) : null}
      <CardBody className="text-white before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="font-bold">{title}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            {isDone ? <p>{score}점</p> : <p>미완료</p>}
          </div>
          {isDone ? (
            <Button
              className="text-tiny text-white bg-black/60"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
              isDisabled
            >
              결과보기
            </Button>
          ) : (
            <Link href={`/practice/${id}`}>
              <Button
                className="text-tiny text-white bg-black/60"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                학습하기
              </Button>
            </Link>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
