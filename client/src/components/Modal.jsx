import { X } from "lucide-react";

const Modal = ({ open, onClose, title, children, width = "max-w-lg" }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-xl w-full ${width} max-h-[88vh] flex flex-col`}>
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-ink-900/[0.07] shrink-0">
          <h3 className="font-display font-bold text-[16px] text-ink-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-ink-500 hover:text-ink-900 hover:bg-ink-900/[0.05] rounded-lg p-1.5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
