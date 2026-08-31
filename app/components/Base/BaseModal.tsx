"use client";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal = ({
  open,
  onClose,
  children,
}: BaseModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center"
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-h-[90vh]
          overflow-y-auto
          bg-surface
          text-text
          rounded-t-2xl
          p-5
          shadow-lg
          md:max-w-lg
          md:rounded-2xl
          md:p-6
        "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseModal;