import type { ChangeEvent } from "react";

type InputProps = {
  type: React.HTMLInputTypeAttribute;
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
};

export const Input = ({
  type,
  label,
  id,
  value,
  onChange,
  autoComplete = "off",
}: InputProps) => {
  return (
    <label htmlFor={id} className="flex flex-col marvel-title">
      {label}
      <input
        type={type}
        id={id}
        name={id}
        className="p-2 mt-1 not-italic font-normal rounded-sm bg-void-500 font-body"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </label>
  );
};
