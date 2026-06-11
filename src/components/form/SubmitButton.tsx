import { useFormContext } from ".";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
};

export const SubmitButton = ({ children }: SubmitButtonProps) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit, state.isDirty]}>
      {([isSubmitting, canSubmit, isDirty]) => (
        <Button type="submit" disabled={isSubmitting || !canSubmit || !isDirty}>
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
};
