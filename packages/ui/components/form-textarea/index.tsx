"use client";

import type { TextareaHTMLAttributes } from "react";
import { useId } from "react";
import type { FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";
import { useFormContext } from "react-hook-form";

type FormTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name"
> & {
  name: string;
  label: string;
  hideLabel?: boolean;
  hint?: string;
  rules?: RegisterOptions<FieldValues, string>;
};

const getFieldError = (errors: FieldErrors, name: string): unknown => {
  return name
    .replace(/\[(\w+)\]/g, ".$1")
    .split(".")
    .filter(Boolean)
    .reduce<unknown>((result, key) => {
      if (result && typeof result === "object" && key in result) {
        return (result as Record<string, unknown>)[key];
      }

      return undefined;
    }, errors);
};

const getErrorMessage = (error: unknown) => {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return undefined;
};

export const FormTextarea = ({
  name,
  label,
  hideLabel = false,
  hint,
  rules,
  id,
  className,
  ...props
}: FormTextareaProps) => {
  const generatedId = useId();
  const fieldId = id ?? `${generatedId}-${name}`;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = `${fieldId}-error`;
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const errorMessage = getErrorMessage(getFieldError(errors, name));

  return (
    <div className="form-field">
      <label
        className={["form-label", hideLabel ? "sr-only" : undefined]
          .filter(Boolean)
          .join(" ")}
        htmlFor={fieldId}
      >
        {label}
      </label>
      <textarea
        id={fieldId}
        className={["form-control", className].filter(Boolean).join(" ")}
        aria-describedby={[hintId, errorMessage ? errorId : undefined]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={errorMessage ? "true" : "false"}
        {...register(name, rules)}
        {...props}
      />
      {hint ? (
        <p className="form-hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {errorMessage ? (
        <p className="form-error" id={errorId}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
