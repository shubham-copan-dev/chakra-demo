import { Input } from "@chakra-ui/react";
import InputProps from "./interface";

const defaultProps = {
  type: "text",
  placeholder: "Enter text",
  size: "md",
  htmlSize: 4,
};

const InputComponent = ({
  type,
  placeholder,
  size,
  htmlSize,
  handleOnchange,
  ...rest
}: InputProps) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      htmlSize={htmlSize}
      size={size}
      width={htmlSize ? "auto" : ""}
      {...rest}
      onChange={handleOnchange}
    />
  );
};

InputComponent.defaultProps = defaultProps;
export default InputComponent;
