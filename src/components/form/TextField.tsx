import { useFieldContext } from "@/components/form";
import AppFieldLabel from "@/components/form/AppFieldLabel";
import { FieldErrors } from "@/components/form/FieldErrors";
import { Input } from "@/components/ui/input";

interface TextFieldProps {
  label: string;
  required?: boolean;
}

export default function TextField({ label, required }: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <div className="">
      <AppFieldLabel fieldName={field.name} label={label} required={required} />
      <Input
        id={field.name}
        autoComplete="off"
        autoCapitalize="off"
        type="text"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />

      <FieldErrors meta={field.state.meta} />
    </div>
  );
}
