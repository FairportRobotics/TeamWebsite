import { useFieldContext } from "@/components/form";

export default function HiddenField() {
  const field = useFieldContext<string>();

  return <input type="hidden" name={field.name} value={field.state.value ?? ""} />;
}
