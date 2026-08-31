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
      className="fixed inset-0 z-50 bg-black/50"
      onClick={onClose}
    >
      {/* Desktop */}
      <div className="hidden min-h-screen items-center justify-center md:flex">
        <div
          className="w-full max-w-lg rounded-xl bg-white p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex min-h-screen items-end md:hidden">
        <div
          className="w-full rounded-t-2xl bg-white p-5"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;