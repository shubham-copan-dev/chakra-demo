"use client";
import React from "react";
import ButtonComponent from "../componets/common/Button";
import { ButtonGroup } from "@chakra-ui/react";
import InputComponent from "../componets/Forms/Input";
import CheckBox from "../componets/Forms/Checks";
import RadioButtons from "../componets/Forms/Radio";

const Dashboard = () => {
  const arrayOfObjects = [
    { id: 1, name: "Object 1", label: "Label 1" },
    { id: 2, name: "Object 2", label: "Label 2" },
    { id: 3, name: "Object 3", label: "Label 3" },
  ];
  const stringArray = ["Apple", "Banana", "Orange", "Grapes", "Pineapple"];

  const click = (item: any) => {
    console.log(item);
  };

  return (
    <div>
      <h1>This is default dahboard...</h1>
      <ButtonGroup gap="4">
        {arrayOfObjects.map((item) => (
          <ButtonComponent
            key={item.id}
            color="teal"
            size="md"
            variant="solid"
            value={item.label}
            handleClick={() => click(item)}
          />
        ))}
      </ButtonGroup>
      <br />
      <br />
      <InputComponent htmlSize={40} />
      <br />
      <CheckBox label="Checkbox" size="lg" color="green" />
      <br />
      <RadioButtons items={stringArray} />
    </div>
  );
};

export default Dashboard;
