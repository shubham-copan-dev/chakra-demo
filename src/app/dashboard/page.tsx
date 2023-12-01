"use client";
import ReuseButton from "@/components/UI/common/ReuseButton";
import CustomButton from "@/components/UI/common/customButton";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h2>This is dashboard...</h2>
      <ReuseButton variantType="primary" text="button" />
      <CustomButton
        variant="solid"
        text="custom button"
        onClick={() => console.log("Clicked")}
      />
    </div>
  );
};

export default Dashboard;
