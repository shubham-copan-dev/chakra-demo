import { memo } from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import Select from "react-select";

import { errorType } from "@/utilities/constants";

/**
 * @property types
 */
interface Options {
  label: string;
  value: string;
  id: number | string;
}

interface Field {
  name: string;
  label: string;
  control: Control | any;
  options: Options[];
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  defaultValue?: string | number;
  mainClass?: string;
  labelClass?: string;
  selectClass?: string;
  errorClass?: string;
  onSelect?: () => void;
  isMulti?: boolean;
  selectProps?: unknown;
  placeholder?: any;
  handleChnage?: any;
  hasFn?: boolean;
}

/**
 * @property defaults
 */
const defaultProps = {
  defaultValue: "",
  rules: {},
  mainClass: "col-sm-4",
  labelClass: "form-label",
  selectClass: "simpledropdown form-select",
  errorClass: "error-msg",
  onSelect: (value: { value: string } | { value: string }[]) => value,
  selectProps: {},
  isMulti: false,
};

/**
 * React Select Field
 * @property pass {type} param to use different types, default will be text
 * @property {*} props
 * @returns entered input
 */

function ReactSelectField({
  name,
  label,
  control,
  options,
  rules,
  defaultValue,
  mainClass,
  labelClass,
  selectClass,
  errorClass,
  onSelect,
  selectProps,
  isMulti,
  placeholder,
  handleChnage,
  hasFn,
}: Field & typeof defaultProps) {
  // use hooks
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  // handling select change
  const onSelectChange = (val: any) => {
    onSelect(val);
    // send value to provided func
    if (hasFn) handleChnage(val);
    if (isMulti)
      return onChange(val?.map((c: { value: string | number }) => c?.value));
    return onChange(val?.value);
  };

  // handling value
  const handleValue = (val: string | string[]) => {
    if (val === "") {
      return "";
    }
    if (isMulti) return options?.filter?.((c) => val?.includes?.(c?.value));
    return options?.find?.((c) => c.value === val);
  };

  return (
    <div className={mainClass}>
      <div className="select-dropdown">
        <label htmlFor={name} className={labelClass}>
          {label}
          {rules?.required ? (
            <span className="forms-req-symbol">*</span>
          ) : (
            " (Optional)"
          )}
        </label>
        <Select
          value={handleValue(value)}
          onChange={onSelectChange}
          options={options}
          isMulti={isMulti}
          className={`${selectClass} ${error && "required-field-error"}`}
          classNamePrefix="custom-react-select"
          placeholder={placeholder}
          {...selectProps}
        />
        {errorType?.map(
          (type) =>
            error?.type === type &&
            error?.message !== "" && (
              <p key={type} className={errorClass}>
                {error?.message}
              </p>
            )
        )}
      </div>
    </div>
  );
}

/**
 * @property defaults
 */
ReactSelectField.defaultProps = defaultProps;

export default memo(ReactSelectField);
