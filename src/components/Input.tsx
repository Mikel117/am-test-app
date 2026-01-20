interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Input = ({ value, onChange, placeholder = "Buscar personaje..." }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="your-input-styles"
    />
  );
};