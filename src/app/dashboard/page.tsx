"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUser } from "@/redux/slices/auth";
import { Box } from "@chakra-ui/react";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  // const { records } = useAppSelector((state: any) => state.records);
  // const { metadata } = useAppSelector((state: any) => state.metadata);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(metadata, "metadata", records);
  // }, [records, metadata]);

  return (
    <Box textAlign="center" p={10}>
      This is Default Home Page...
    </Box>
  );
};

export default Dashboard;
