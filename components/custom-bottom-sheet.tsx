"use client";

import { Portal } from "@gorhom/portal";
import { BottomSheet, BottomSheetProps } from "react-spring-bottom-sheet";

interface CustomBottomSheetProps extends BottomSheetProps {}
export const CustomBottomSheet = ({
  children,
  ...rest
}: CustomBottomSheetProps) => {
  return (
    <Portal>
      <BottomSheet {...rest}>
        <div className="bg-black">{children}</div>
      </BottomSheet>
    </Portal>
  );
};
