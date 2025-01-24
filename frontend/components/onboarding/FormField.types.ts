export interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}
