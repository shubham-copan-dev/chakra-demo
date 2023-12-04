"use client";
import React, { useEffect, useState } from "react";
import { fetchSalesforceData } from "@/redux/slices/salesForce";
import { useDispatch, useSelector } from "react-redux";
import { useToast, Spinner, Box, Flex } from "@chakra-ui/react";

const DashboardPage = ({ params }: any) => {
  const dashboard = params.pages[0];
  console.log(params.pages[0]);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.salesforce);
  const toast = useToast();

  useEffect(() => {
    if (dashboard === "lead") dispatch(fetchSalesforceData());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching data",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <div>
      <Box textAlign="center">{params.pages[0]} Page...</Box>
      {loading && (
        <Flex h="80vh" w="100%" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </div>
  );
};

export default DashboardPage;
