import { useFieldContext } from "@/components/form";
import AppFieldLabel from "@/components/form/AppFieldLabel";
import { FieldErrors } from "@/components/form/FieldErrors";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFieldProps {
  label: string;
  required?: boolean;
  rows?: number;
  cols?: number;
}

export default function TextareaField({ label, required, rows, cols }: TextareaFieldProps) {
  const field = useFieldContext<string>();

  return (
    <div className="">
      <AppFieldLabel fieldName={field.name} label={label} required={required} />
      <Textarea
        id={field.name}
        autoComplete="off"
        autoCapitalize="off"
        rows={rows ?? 3}
        cols={cols ?? 50}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />

      <FieldErrors meta={field.state.meta} />
    </div>
  );
}
