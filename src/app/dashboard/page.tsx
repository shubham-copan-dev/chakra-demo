"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUser } from "@/redux/slices/auth";
import { Box, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useAuthorized from "@/hooks/auth";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAuthorized();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (!auth) router.push("/login");
  }, [auth, router]);

  return <Box textAlign="center">Default dashboard</Box>;
};

export default Dashboard;
