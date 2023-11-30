"use client";

import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import RadioBoxProps from "./interface";

const defaultProps = {
  color: "blue",
  size: "lg",
};

const RadioButtons = ({ items, color, size }: RadioBoxProps) => {
  const [value, setValue] = React.useState("1");

  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row">
        {items.map((value: string, index: number) => (
          <Radio
            key={index}
            value={`${index + 1}`}
            colorScheme={color}
            size={size}
          >
            {value}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};

RadioButtons.defaultProps = defaultProps;
export default RadioButtons;
