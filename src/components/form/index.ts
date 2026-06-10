import CheckboxField from "@/components/form/checkbox-field";
import DatesSelectionField from "@/components/form/dates-selection-field";
import HiddenField from "@/components/form/hidden-field";
import { MultiCheckboxField } from "@/components/form/multi-checkbox-field";
import NumberField from "@/components/form/number-field";
import PasswordField from "@/components/form/password-field";
import { SelectField } from "@/components/form/select-field";
import { SubmitButton } from "@/components/form/submit-button";
import TextField from "@/components/form/text-field";
import TextareaField from "@/components/form/textarea-field";
import UrlField from "@/components/form/url-field";
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
