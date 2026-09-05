import BaseModal from "./BaseModal";
import BaseButton from "./BaseButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ConfirmationModal = ({ isOpen, onClose, onDelete }: Props) => {
  return (
    <BaseModal open={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-text">حذف سطر</h2>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            آیا از حذف این سطر مطمئن هستید؟ این عملیات قابل بازگشت نیست.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <BaseButton variant="outline" fullWidth onClick={onClose}>
            انصراف
          </BaseButton>

          <BaseButton variant="destructive" fullWidth onClick={onDelete}>
            تأیید و حذف
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmationModal;
