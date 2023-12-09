"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUser } from "@/redux/slices/auth";
import { useRouter } from "next/navigation";
import useAuthorized from "@/hooks/auth";
import { Box, Container, Flex, Text, Button, Input } from "@chakra-ui/react";
import moment from "moment";
import "./dashboard.css";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAuthorized();
  const currentTime = moment().format("hh:mm A");

  useEffect(() => {
    if (!auth) router.push("/login");
  }, [auth, router]);

  return (
    <Box
      className="welcome-wrapper min-vh-100"
      bg="url('/assets/images/home-banner.png')"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      padding={{ base: "30px 20px", md: "65px 60px", lg: "65px 60px" }}
      h="91vh"
    >
      <Container maxW="container.lg">
        <Flex alignItems="center" flexDirection={{ base: "column", md: "row" }}>
          <Box flex="1">
            <Box
              className="time-wishing"
              textAlign={{ base: "center", md: "left" }}
            >
              <Text
                fontSize={{ base: "32px", md: "48px" }}
                fontWeight="400"
                lineHeight="1"
                color="white"
              >
                {currentTime} {/* Display current time using moment.js */}
              </Text>
              <Text
                fontSize={{ base: "16px", md: "20px" }}
                fontWeight="400"
                lineHeight="1"
                color="white"
                marginTop="2px"
              >
                Good morning, James
              </Text>
            </Box>
          </Box>
          <Box flex="1">
            <Box
              className="quote-top"
              textAlign={{ base: "center", md: "right" }}
              marginTop={{ base: "30px", md: "0" }}
            >
              <Text
                fontSize="16px"
                fontWeight="400"
                color="#c4ccd8"
                marginBottom="5px"
              >
                Quote of the Day
              </Text>
              <Text fontSize="16px" fontWeight="400" color="white">
                “We grow fearless when we do the things we fear.”
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>

      <Box className="recent-search" paddingTop="30px">
        <Container maxW="container.lg">
          <Box>
            <Text
              fontSize="lg"
              marginBottom="4px"
              color="white"
              display="flex"
              alignItems="center"
            >
              <span className="icons-clock"></span> RECENT SEARCHES
            </Text>
          </Box>
          <Input
            type="text"
            placeholder="Search"
            width="60vw"
            padding="2rem"
            borderRadius="md"
            border="1px solid #ccc"
            _focus={{
              borderColor: "white.500",
              boxShadow: "0 0 0 1px #3182ce",
            }}
            color="white" // Set text color to white
            marginTop="5rem"
            marginBottom="5rem"
            _placeholder={{ color: "white" }} // Set placeholder color to white
          />
          <Flex flexWrap="wrap">
            {/* Sample recent searches */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Box
                key={item}
                width={{ base: "100%", md: "50%", lg: "33.33%" }}
                padding="8px"
              >
                <Button width="100%" variant="outline" color="white">
                  Walmart TAAS
                </Button>
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
