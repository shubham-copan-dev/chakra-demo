// import { SecureIcon } from "@/chakraConfig/icons";
import ReuseButton from "@/components/UI/common/ReuseButton";
// Ensure the correct import path for ReactSelectField
import ReactSelectField from "@/components/formFields/ReactSelectField";
import { Box, Flex, Image, Text, Divider } from "@chakra-ui/react";

const Login = () => {
  const options = [
    { label: "Label 1", value: "value1", id: 1 },
    { label: "Label 2", value: "value2", id: 2 },
  ];

  return (
    <Flex>
      <Flex width="50vw" justifyContent="center" pt={170}>
        <Flex flexDirection="column" gap="50px" align="center">
          <Box textAlign="center">
            <Image src="/assets/images/logo.png" alt="Logo" />
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
          <ReuseButton variantType="primary" text="Sign In" mx="auto" mt={5} />
          {/* Uncomment and adjust properties for ReactSelectField if needed */}
          {/* <ReactSelectField
            name="yourFieldName"
            label="Your Label"
            control={null} // Replace with actual control
            options={options}
          /> */}
          <Divider my={5} />
          <Box textAlign="center">
            {/* <SecureIcon /> */}
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
