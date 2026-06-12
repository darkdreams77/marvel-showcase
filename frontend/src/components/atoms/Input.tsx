import type { ChangeEvent } from "react";
import { cn } from "../../helpers/cn";

type InputProps = {
  type: React.HTMLInputTypeAttribute;
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  className?: string;
};

export const Input = ({
  type,
  label,
  id,
  value,
  onChange,
  autoComplete = "off",
  className,
}: InputProps) => {
  return (
    <label htmlFor={id} className="flex flex-col marvel-title">
      {label}
      <input
        type={type}
        id={id}
        name={id}
        className={cn(
          "p-2 mt-1 not-italic font-normal rounded-sm bg-void-500 font-body",
          className ? className : "",
        )}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </label>
  );
};
