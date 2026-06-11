import { useFieldContext } from "@/components/form";
import AppFieldLabel from "@/components/form/AppFieldLabel";
import { FieldErrors } from "@/components/form/FieldErrors";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type VisibleToOption = {
  value: string;
  label: string;
};

type VisibleToFieldProps = {
  label: string;
  required?: boolean;
  options: VisibleToOption[];
};

export const VisibleToField = ({ label, required, options }: VisibleToFieldProps) => {
  const field = useFieldContext<string[]>();

  function handleChange(newValue: string[]) {
    if (newValue.includes("everyone")) {
      field.handleChange(["everyone"]);
    } else {
      field.handleChange(newValue);
    }
  }

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
              disabled={field.state.value.includes("everone") && option.value !== "everyone"}
              onCheckedChange={(checked) => {
                const newValue = checked
                  ? [...field.state.value, option.value]
                  : field.state.value.filter((v) => v !== option.value);
                handleChange(newValue);
              }}
              className="data-[state=checked]:bg-primary cursor-pointer w-6 h-6"
            />
            <Label
              htmlFor={`${field.name}.${option.value}`}
              className={cn(
                "ml-2 cursor-pointer",
                field.state.value.includes("everyone") && option.value !== "everyone" ? "text-muted" : "",
              )}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
