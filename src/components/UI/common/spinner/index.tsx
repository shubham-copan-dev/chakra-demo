import { flexCenter } from "@/utilities/styles";
import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex sx={flexCenter}>
      <Spinner />
    </Flex>
  );
};

export default Loader;
