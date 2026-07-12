type FormFieldProps = {
  label: string
  type: 'email' | 'password' | 'text'
  value: string
  onChange: (value: string) => void
}

export function FormField({ label, type, value, onChange }: FormFieldProps) {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      />
    </label>
  )
}
