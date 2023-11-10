import { Database } from "@/utils/supabase/database.types";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

interface PracticeSetItemProps {
  set: Database["public"]["Tables"]["practice_sets"]["Row"];
}

export const PracticeSetItem = ({ set }: PracticeSetItemProps) => {
  const { id, title, description, thumbnail_image } = set;

  return (
    <Card isFooterBlurred radius="lg" className="border-none flex-none">
      {thumbnail_image ? (
        <Image
          alt="Woman listing to music"
          className="object-cover w-[200px] h-[400px] brightness-75"
          height={400}
          src={thumbnail_image}
          width={200}
        />
      ) : null}
      <CardBody className="absolute left-0 bottom-12 z-10">
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-xs text-white">{description}</p>
      </CardBody>
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Available soon.</p>
        <Link href={`/practice/sets/${id}`}>
          <Button
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            시작하기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
