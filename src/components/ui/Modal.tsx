import { ReactNode, FC } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
