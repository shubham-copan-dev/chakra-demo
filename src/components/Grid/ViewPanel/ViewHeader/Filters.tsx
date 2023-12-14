import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
// import { useSearchParams } from 'react-router-do m';

import { useAppSelector } from "@/hooks/redux";
import { removeEmptyFields } from "@/utilities/constants";

import { fieldSwitch } from "../EditForm";
import "../viewPanel.css";

function Filters({ isOpen, onClose }: any) {
  // use hooks
  // const [searchParams, setSearchParams] = useSearchParams();

  // global states
  const { selectedViewBy }: any = useAppSelector((state) => state.fieldupdate);
  const { viewByMeta }: any = useAppSelector((state) => state.Viewmetadata);
  const { metadata }: any = useAppSelector((state) => state.metadata);

  //   constants
  const viewBySelected = viewByMeta?.find(
    (fil: any) => fil?.label === selectedViewBy
  );
  const viewByNames = viewBySelected?.query?.fields?.map(
    (item: any) => item?.name
  );

  // use hook form
  const { handleSubmit, control, reset } = useForm({
    // defaultValues: Object.fromEntries(searchParams),
    shouldUnregister: true,
    resetOptions: {
      keepDirtyValues: false,
      keepErrors: false,
      keepDefaultValues: false,
    },
  });

  // handling submit
  const onSubmit = (data: any) => {
    const values = removeEmptyFields(data);
    // const queryParams = new URLSearchParams(values);
    // setSearchParams(queryParams);
    onClose();
  };

  // handling query params and fields reset
  const resetFilter = () => {
    // setSearchParams();
    const resetFields: { [key: string]: string } = {};
    metadata
      ?.filter?.((fil: any) => {
        return selectedViewBy === "all"
          ? fil?.uiMetadata?.isVisible
          : viewByNames?.includes(fil?.name);
      })
      ?.map((item: any) => (resetFields[item?.name] = ""));
    reset(resetFields);
  };

  // handling form field rendering
  const renderFields = () => {
    return metadata
      ?.filter?.((fil: any) => {
        return selectedViewBy === "all"
          ? fil?.uiMetadata?.isVisible
          : viewByNames?.includes(fil?.name);
      })
      ?.map((item: any) => fieldSwitch(item?.type, item, control, true));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)} className="msform">
        <ModalContent minWidth="35vw">
          <ModalHeader>
            <Box fontWeight="100">Filters</Box>
            <Box fontSize="13px" fontWeight="100">
              Deep dive into data by setting up your perefrences.
            </Box>
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <div className="modal-body">
              <div className="row">{renderFields()}</div>
            </div>
          </ModalBody>
          <Divider my={4} />
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={resetFilter}
              fontWeight="100"
              fontSize="13px"
              _hover={{}}
              bg="transparent"
              color="bgClr.PrimaryActions"
              border="1px solid #DCE3EE"
            >
              Reset
            </Button>
            <Button
              variant="ghost"
              type="submit"
              fontWeight="100"
              fontSize="13px"
              bg="bgClr.PrimaryActions"
              color="bgClr.NeutralColorWhite"
              _hover={{}}
            >
              Apply Filter
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

export default Filters;
