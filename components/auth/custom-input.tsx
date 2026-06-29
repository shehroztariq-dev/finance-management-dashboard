import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

type CustomInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
};

export default function CustomInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-0.5">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

          <Input
            {...field}
            id={field.name}
            type={name === "password" ? "password" : "text"}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
