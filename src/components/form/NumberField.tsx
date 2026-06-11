import { useFieldContext } from "@/components/form";
import AppFieldLabel from "@/components/form/AppFieldLabel";
import { FieldErrors } from "@/components/form/FieldErrors";
import { Input } from "@/components/ui/input";

interface NumberFieldProps {
  label: string;
  required?: boolean;
}

export default function NumberField({ label, required }: NumberFieldProps) {
  const field = useFieldContext<number>();

  return (
    <div className="">
      <AppFieldLabel fieldName={field.name} label={label} required={required} />
      <Input
        id={field.name}
        autoComplete="off"
        autoCapitalize="off"
        type="number"
        value={field.state.value}
        onChange={(e) => field.handleChange(parseInt(e.target.value))}
        onBlur={field.handleBlur}
      />

      <FieldErrors meta={field.state.meta} />
    </div>
  );
}
