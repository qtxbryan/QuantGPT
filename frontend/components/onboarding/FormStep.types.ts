import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "@/lib/validation";

export interface FormStepProps {
  step: number;
  control: UseFormReturn<OnboardingFormData>["control"]; // react-hook-form control
  errors: UseFormReturn<OnboardingFormData>["formState"]["errors"]; // react-hook-form errors
  setValue: UseFormReturn<OnboardingFormData>["setValue"]; // react-hook-form setValue function
}
