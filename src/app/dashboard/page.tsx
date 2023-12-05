"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUser } from "@/redux/slices/auth";
import { Box } from "@chakra-ui/react";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Box textAlign="center" p={10}>
      This is Default Home Page...
    </Box>
  );
};

export default Dashboard;
