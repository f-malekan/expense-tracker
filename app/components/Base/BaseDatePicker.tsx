import React from "react";
import DatePicker from "react-multi-date-picker";
import BaseMessage from "./BaseMessage";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface Props {
  label?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  error?: string;
}

const BaseDatePicker = ({
  label = "تاریخ",
  value,
  onChange,
  error,
}: Props) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-text">
        {label}
      </label>

      <DatePicker
        value={value}
        onChange={(date) => onChange(date?.toDate())}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        inputClass="
          h-8 w-full rounded-lg border border-border bg-surface
          px-3 text-xs text-text outline-none transition-colors
          focus:border-primary focus:ring-2 focus:ring-primary/10
        "
      />

      {error && (
        <BaseMessage
          message={error}
          variant="destructive"
        />
      )}
    </div>
  );
};

export default BaseDatePicker;