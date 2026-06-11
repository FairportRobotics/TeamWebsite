import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ZodError } from "zod";

type FieldErrorProps = {
  meta: AnyFieldMeta;
};

export const FieldErrors = ({ meta }: FieldErrorProps) => {
  if (!meta.isTouched) return null;

  return (
    <ul className="text-destructive list-disc list-inside mt-1">
      {meta.errors.map(({ message }: ZodError, index) => (
        <li key={index} className="text-xs text-destructive">
          {message}
        </li>
      ))}
    </ul>
  );
};
