import { Button } from "@chakra-ui/react";
import ButtonProps from "./interface";

const defaultProps = {
  color: "blue",
  size: "sm",
  variant: "solid",
  value: "Button",
};

const ButtonComponent = ({
  color,
  variant,
  value,
  size,
  handleClick,
}: ButtonProps) => {
  return (
    <Button
      colorScheme={color}
      variant={variant}
      size={size}
      onClick={handleClick}
      borderRadius="0px"
    >
      {value}
    </Button>
  );
};

ButtonComponent.defaultProps = defaultProps;
export default ButtonComponent;
