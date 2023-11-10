"use client";

import { Avatar } from "@nextui-org/react";
import { useState } from "react";
import { CustomBottomSheet } from "../custom-bottom-sheet";

export const ChatListItem = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center px-4 py-4">
        <Avatar size="lg" className="flex-none mr-4" />
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">윤민</h3>
            <p className="text-xs text-gray-400">2시간 전</p>
          </div>
          <p className="line-clamp-1 text-sm">
            나중에 일 생기면 바로 알려줘! 아니면 말구! 그런데 이거 맞음? 아니면
            또 어쩔껀데?
          </p>
        </div>
      </div>
      <CustomBottomSheet open={open} onDismiss={() => setOpen(false)}>
        <div className="p-10">asjdklfjaksld</div>
      </CustomBottomSheet>
    </>
  );
};
