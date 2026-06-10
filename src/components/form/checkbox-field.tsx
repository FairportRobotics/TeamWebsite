import { useFieldContext } from "@/components/form";
import { FieldErrors } from "@/components/form/field-errors";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxFieldProps {
  label: string;
  description?: string;
}

export default function CheckboxField({
  label,
  description,
}: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();

  return (
    <div className="flex items-center">
      <Checkbox
        id={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked == true)}
        onBlur={field.handleBlur}
        className="data-[state=checked]:bg-primary cursor-pointer w-6 h-6"
      />
      <Label htmlFor={field.name} className="ml-2 cursor-pointer">
        {label}
      </Label>
      {description ?? (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <FieldErrors meta={field.state.meta} />
    </div>
  );
}
