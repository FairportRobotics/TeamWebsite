import { useFieldContext } from "@/components/form";
import AppFieldLabel from "@/components/form/app-field-label";
import { FieldErrors } from "@/components/form/field-errors";
import { PasswordInput } from "@/components/ui/password-input";

interface PasswordFieldProps {
  label: string;
  required?: boolean;
}

export default function PasswordField({ label, required }: PasswordFieldProps) {
  const field = useFieldContext();

  return (
    <div className="">
      <AppFieldLabel fieldName={field.name} label={label} required={required} />
      <PasswordInput
        id={field.name}
        value={field.state.value as string}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />

      <FieldErrors meta={field.state.meta} />
    </div>
  );
}
