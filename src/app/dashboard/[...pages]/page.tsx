"use client";
import React, { useEffect, useState, useCallback } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useToast, Spinner, Box, Flex } from "@chakra-ui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const DashboardPage = ({ params }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams()!;

  return (
    <div>
      <Box textAlign="center">{params.pages[0]} Page...</Box>

      <Flex h="80vh" w="100%" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    </div>
  );
};

export default DashboardPage;
