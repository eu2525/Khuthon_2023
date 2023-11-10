import Image from "next/image";

export const LevelBadge = ({ level }: { level: number }) => {
  const levelIcon = `/icons/medal${level}.png`;

  return <Image src={levelIcon} width={48} height={48} alt={`level${level}`} />;
};
