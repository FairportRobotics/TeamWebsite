import CheckboxField from "@/components/form/CheckboxField";
import DatesSelectionField from "@/components/form/DatesSelectionField";
import HiddenField from "@/components/form/HiddenField";
import { MultiCheckboxField } from "@/components/form/MultiCheckboxField";
import NumberField from "@/components/form/NumberField";
import PasswordField from "@/components/form/PasswordField";
import { SelectField } from "@/components/form/SelectField";
import { SubmitButton } from "@/components/form/SubmitButton";
import TextField from "@/components/form/TextField";
import TextareaField from "@/components/form/TextareaField";
import UrlField from "@/components/form/UrlField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();

// Define this once to have a generator of consistent form instances throughout your app.
export const { useAppForm } = createFormHook({
  fieldComponents: {
    CheckboxField,
    DatesSelectionField,
    HiddenField,
    MultiCheckboxField,
    NumberField,
    PasswordField,
    SelectField,
    TextareaField,
    TextField,
    UrlField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
