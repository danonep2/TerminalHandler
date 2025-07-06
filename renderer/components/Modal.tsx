import { useEffect, useState } from "react";
import { delay } from "../utils/delay";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children, setIsOpen }: ModalProps) => {
  if (!isOpen) {
    return null
  }

  const [effect, setEffect] = useState(false);

  useEffect(() => {
    const startEffect = async () => {
      await delay(100);
      setEffect(true);
    }

    startEffect();
  }, [isOpen]);

  const closeModal = () => {
    const removeEffect = async () => {
      setEffect(false);
      await delay(300);
      onClose?.();
      setIsOpen(false);
    }

    removeEffect();
  }

  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50"
    >
      <div
        className={`w-screen h-screen fixed top-0 left-0 bg-gray-950 bg-opacity-50
          ${effect ? 'opacity-100' : 'opacity-0'} transition-all ease-in-out duration-300`}
          onClick={() => closeModal()}
          />
      <div
        className={`${!effect ? 'translate-y-3 opacity-0' : 'translate-y-0 opacity-100'} transition-all ease-in-out duration-300`}
          >
        {children}
      </div>
    </div>
  );
}

export default Modal
