import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps,
} from "@nextui-org/react";

interface CorrectionModalProps extends ModalProps {
  score: number;
  evaluation: string;
  suggestion: string;
}
export const CorrectionModal = ({
  isOpen,
  onOpenChange,
  score,
  evaluation,
  suggestion,
}: CorrectionModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">체점 완료</ModalHeader>
            <ModalBody>
              <h5 className="font-bold">점수</h5>
              <p>{score}</p>
              <h5 className="font-bold">답변에 대한 평가</h5>
              <p>{evaluation}</p>
              <h5 className="font-bold">이렇게 말했으면 좋았어요.</h5>
              <p>{suggestion}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                확인했어요!
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
