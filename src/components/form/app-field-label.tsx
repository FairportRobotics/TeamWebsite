import { Label } from "@/components/ui/label";

interface AppFieldLabelProps {
  fieldName: string;
  label: string;
  required?: boolean;
}

export default function AppFieldLabel({ fieldName, label, required }: AppFieldLabelProps) {
  return (
    <Label htmlFor={fieldName} className="block mb-2">
      {label}
      {required ? <span className="ml-1">(required):</span> : <span className="ml-1">(optional):</span>}
    </Label>
  );
}
