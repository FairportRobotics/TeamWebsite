import { useFieldContext } from "@/components/form";
import AppFieldLabel from "@/components/form/AppFieldLabel";
import { FieldErrors } from "@/components/form/FieldErrors";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type MultiCheckboxOption = {
  value: string;
  label: string;
};

type MultiCheckboxFieldProps = {
  label: string;
  required?: boolean;
  options: MultiCheckboxOption[];
};

export const MultiCheckboxField = ({ label, required, options }: MultiCheckboxFieldProps) => {
  const field = useFieldContext<string[]>();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <AppFieldLabel fieldName={field.name} label={label} required={required} />
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <Checkbox
              id={`${field.name}.${option.value}`}
              name={field.name}
              key={option.value}
              value={option.value}
              checked={field.state.value.includes(option.value)}
              onCheckedChange={(checked) => {
                const newValue = checked
                  ? [...field.state.value, option.value]
                  : field.state.value.filter((v) => v !== option.value);
                field.handleChange(newValue);
              }}
              className="data-[state=checked]:bg-primary cursor-pointer w-6 h-6"
            />
            <Label htmlFor={`${field.name}.${option.value}`} className="ml-2 cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
