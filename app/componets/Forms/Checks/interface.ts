interface CheckBoxProps {
  size:string;
  color: string;
  iconColor?: string;
  spacing?: number;
  label: string;
  inValid?: boolean;
  handleChange?: () => void;
}

export default CheckBoxProps;
