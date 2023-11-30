import { Checkbox } from "@chakra-ui/react";
import CheckBoxProps from "./interface";

const defaultProps = {
  size: "md",
  color: "blue",
  spacing: "5",
  inValid: false,
  label: "label",
};
const CheckBox = ({
  size,
  color,
  iconColor,
  spacing,
  label,
  inValid,
  handleChange,
}: CheckBoxProps) => {
  return (
    <Checkbox
      size={size}
      colorScheme={color}
      iconColor={iconColor}
      spacing={spacing}
      isInvalid={inValid}
      onChange={handleChange}
    >
      {label}
    </Checkbox>
  );
};

CheckBox.defaultProps = defaultProps;
export default CheckBox;
