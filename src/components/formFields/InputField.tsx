import { errorType } from "@/utilities/constants";
import React, { memo } from "react";
import { RegisterOptions, useController } from "react-hook-form";

/**
 * @property types
 */
interface Field {
  name: string;
  label?: string;
  control: any;
  type?: string;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  defaultValue?: string | number;
  normalize?: any;
  mainClass?: string;
  mainStyle?: object;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  onChange?: any;
  inputProps?: object;
  placeHolder?: string;
  bg?: string;
  imageUrl?: any;
  placeholderStyle?: any;
}

/**
 * @property defaults
 */
const defaultProps = {
  defaultValue: "",
  label: "",
  rules: {},
  type: "text",
  mainClass: "col-sm-4",
  mainStyle: {},
  labelClass: "form-label",
  inputClass: "form-control",
  errorClass: "required-error",
  normalize: (value: any) => value,
  onChange: (value: any) => value,
  inputProps: {},
  placeHolder: "",
  bg: "",
  imageUrl: "",
  placeholderStyle: "",
};

/**
 * Input field
 * @property pass {type} param to use different types, default will be text
 * @function {normalize} can modify input value, default return normal value
 * @property {*} props
 * @returns entered input
 */

function InputField({
  name,
  label,
  control,
  type,
  rules,
  defaultValue,
  normalize,
  mainClass,
  mainStyle,
  labelClass,
  inputClass,
  placeHolder,
  errorClass,
  onChange,
  inputProps, // imageUrl,
}: Field & typeof defaultProps) {
  // use hooks
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  // handling input change
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { valid } = e.target.validity;

    if (valid || type === "email") {
      onChange(normalize(value)); // send value to provided func
      field.onChange(normalize(value)); // send value to hook form
    }
  };

  // trimming value on blur
  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    onChange(normalize(value)); // send value to provided func
    field.onChange(normalize(value)); // send value to hook form
  };

  return (
    <div className={mainClass} style={mainStyle}>
      {label !== "" && (
        <label htmlFor={name} className={labelClass}>
          {label}
          {rules?.required ? (
            <span className="forms-req-symbol">*</span>
          ) : (
            " (Optional)"
          )}
        </label>
      )}
      <input
        {...field}
        id={name}
        type={type}
        className={`${inputClass} ${error && "required-field-error"}`}
        onChange={onInputChange}
        {...inputProps}
        onBlur={onInputBlur}
        placeholder={placeHolder}
        style={{
          width: "325px",
          padding: "8px 10px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
          borderRadius: "8px",
          background: "var(--grey-200, #EBF1FA)",
          outline: "none",
          fontFamily: "Poppins",
          fontSize: "13px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "120%",
        }}
      />
      {errorType?.map(
        (err) =>
          error?.type === err &&
          error?.message !== "" && (
            <div key={err} className={errorClass}>
              {error?.message}
            </div>
          )
      )}
    </div>
  );
}

/**
 * @property defaults
 */
InputField.defaultProps = defaultProps;

export default memo(InputField);
