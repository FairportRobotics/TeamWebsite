import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
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
    <div className="relative w-full max-w-sm">
      <Input
        type={type}
        value={value}
        onChange={handleChange}
        className={`pr-10 ${className ?? ""}`}
        {...props}
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full mpx-3 py-2 hover:bg-transparent"
          onClick={handleClear}
          aria-label="Clear input"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
