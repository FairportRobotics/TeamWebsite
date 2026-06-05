import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { CircleX, SearchIcon } from "lucide-react";
import * as React from "react";

export function InputWithClear({
  className,
  type,
  onChange,
  value: controlledValue,
  ...props
}: React.ComponentProps<"input">) {
  const [internalValue, setInternalValue] = React.useState("");

  // Support both controlled and uncontrolled usage
  const value = controlledValue !== undefined ? String(controlledValue) : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);

    // Propagate event to parent
    onChange?.(e);
  };

  const handleClear = () => {
    setInternalValue("");

    // Create and dispatch a synthetic change event
    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange?.(event);
  };

  return (
    <InputGroup>
      <InputGroupInput placeholder="Search..." value={value} onChange={handleChange} {...props} />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" onClick={handleClear}>
        <CircleX
          className={cn(
            "hover:cursor-pointer hover:text-destructive/25",
            value === "" ? "text-muted" : "text-foreground",
          )}
        />
      </InputGroupAddon>
    </InputGroup>
  );
}
