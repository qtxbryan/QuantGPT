interface Choice {
  value: string;
  label: string;
}

export interface ChoiceFieldProps {
  label: string;
  choices: Choice[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2 | 3 | 4;
  error?: string;
}
