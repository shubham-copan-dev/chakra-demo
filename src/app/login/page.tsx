"use client";
import { useState, useEffect } from "react";
import ReuseButton from "@/components/UI/common/ReuseButton";
import { SecureIcon } from "@/chakraConfig/icons";
import ReactSelectField from "@/components/formFields/ReactSelectField";
import { Box, Flex, Image, Text, Divider } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import "./login.css";
import { tenant } from "@/axios/actions/tenants";

const Login = () => {
  const [tenants, setTenants] = useState([]);
  const { control } = useForm();
  const options = [
    { label: "Label 1", value: "value1", id: 1 },
    { label: "Label 2", value: "value2", id: 2 },
  ];
  const placeholder = (
    <Flex p={2} gap="1rem">
      <Image src="/assets/images/salesforce-group.png" alt="salesforce-logo" />
      <Box>
        <Text
          fontSize="16px"
          fontWeight="500"
          lineHeight="120%"
          color="bgClr.Grey700"
        >
          Salesforce
        </Text>
        <Text fontSize="12px" fontWeight="500" color="bgClr.Grey600">
          Stay connected and make life easier with Salesforce.
        </Text>
      </Box>
    </Flex>
  );
  const getTenants = async () => {
    const response = await tenant({ method: "GET" });
    console.log("login page:", response);
    setTenants(response.data);
  };

  useEffect(() => {
    getTenants();
  }, []);

  const handleSignIn = () => {
    console.log("hello world!");
  };

  return (
    <Flex>
      <Flex width="50vw" justifyContent="center" pt={170}>
        <Flex flexDirection="column" gap="30px" align="center">
          <Box textAlign="center">
            <Flex justifyContent="center">
              <Image src="/assets/images/logo.png" alt="Logo" />
            </Flex>
            <Text
              fontSize="sm"
              fontWeight="regular"
              lineHeight="base"
              mt={3} // Add margin top
            >
              Welcome to SalesBoost
            </Text>
          </Box>
          <Text
            fontFamily="body"
            fontSize="xxl"
            fontWeight="regular"
            lineHeight="120%"
            textAlign="center"
          >
            Update your pipeline in seconds
          </Text>
          <ReactSelectField
            name="yourFieldName"
            control={control}
            options={options}
            placeholder={placeholder}
          />
          <ReuseButton
            variantType="primary"
            text="Sign In"
            mx="auto"
            mt={5}
            handleClick={handleSignIn}
          />

          <Divider />
          <Box textAlign="center">
            <SecureIcon />
            <Text
              fontSize="xs"
              fontWeight="medium"
              lineHeight="base"
              mt={2} // Add margin top
            >
              Don’t worry! Your data is secure.
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex
        backgroundImage="url('/assets/images/login-banner.png')"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        width="50vw"
        height="100vh"
      ></Flex>
    </Flex>
  );
};

export default Login;
