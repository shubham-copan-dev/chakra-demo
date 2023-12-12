"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUser } from "@/redux/slices/auth";
import { useRouter } from "next/navigation";
import useAuthorized from "@/hooks/auth";
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  Input,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import moment from "moment";
import "./dashboard.css";
import { SearchIcon, TimeIcon } from "@chakra-ui/icons";
import useIsHome from "@/hooks/isHome";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAuthorized();
  const isHome = useIsHome();
  const currentTime = moment().format("hh:mm A");

  useEffect(() => {
    if (!auth) router.push("/login");
  }, [auth, router]);

  return (
    <>
      {isHome && (
        <Box
          bg="url('/assets/images/home-banner.png')"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundAttachment="fixed"
          color="white !important"
          minHeight="100vh"
        >
          <Flex
            maxWidth="80vw"
            margin="0 auto"
            // height="100vh"
            direction="column"
            gap="7rem"
            py="5rem"
          >
            <Flex justifyContent="space-between">
              <Flex direction="column">
                <Text fontSize="3rem">{currentTime}</Text>
                <Text>Good Morning, James</Text>
              </Flex>
              <Flex direction="column">
                <Text textAlign="end">Quote of the Day</Text>
                <Text>“We grow fearless when we do the things we fear.”</Text>
              </Flex>
            </Flex>
            <Flex justifyContent="center">
              <Box position="relative">
                <Text
                  position="absolute"
                  top="50%"
                  zIndex="999"
                  transform="translateY(-50%)"
                  left="8px"
                >
                  <SearchIcon />
                </Text>

                <Input
                  type="text"
                  placeholder="Search"
                  bg="#80766F"
                  width="50vw"
                  padding="2rem"
                  border="none"
                  borderRadius="8px"
                  color="white" // Set text color to white
                  marginTop="5rem"
                  marginBottom="5rem"
                  _placeholder={{ color: "white" }} // Set placeholder color to white
                />
              </Box>
            </Flex>
            <Flex
              direction="column"
              maxWidth="70%"
              width="70%"
              margin="0 auto"
              gap="1rem"
            >
              <Flex gap="5px" alignItems="center" fontSize="12px">
                <TimeIcon />
                RECENT SEARCHES
              </Flex>
              <Box
                display="grid"
                gridTemplateColumns="repeat(3,1fr)"
                gap="1rem"
              >
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Button
                    width="100%"
                    variant="outline"
                    color="white"
                    key={item}
                    padding="2rem"
                    bg="#6F522C"
                    border="none"
                    _hover={{ bg: "#7F633D" }}
                    fontWeight="100"
                  >
                    Walmart TAAS
                  </Button>
                ))}
              </Box>
            </Flex>
          </Flex>
        </Box>
      )}
      {!isHome && (
        <Flex height="100vh" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </>
  );
};

export default Dashboard;
