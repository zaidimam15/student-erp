import Modal from "./Modal";
import { AlertTriangle } from "lucide-react";

const ConfirmDialog = ({ open, onClose, onConfirm, title = "Delete record?", message, loading }) => {
  return (
    <Modal open={open} onClose={onClose} title={title} width="max-w-sm">
      <div className="flex gap-3.5">
        <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
          <AlertTriangle size={18} />
        </div>
        <p className="text-[13.5px] text-ink-600 leading-relaxed pt-1.5">
          {message || "This action cannot be undone. Are you sure you want to proceed?"}
        </p>
      </div>
      <div className="flex justify-end gap-2.5 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2.5 rounded-lg text-[13px] font-semibold text-ink-700 hover:bg-ink-900/[0.05] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2.5 rounded-lg text-[13px] font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {loading ? "Deleting…" : "Delete"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
