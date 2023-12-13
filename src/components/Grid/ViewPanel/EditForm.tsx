import { salesforce } from "@/axios/actions/salesforce";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Button,
  ModalBody,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  InputField,
  ReactSelectField,
  TextareaField,
} from "@/components/formFields";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fieldTypes, getDirtyFields } from "@/utilities/constants";
import CustomAlertPopuop from "@/components/UI/common/alertPopup";
import { inherits } from "util";

// handling filed switch
export const fieldSwitch = (
  type: string,
  item: any,
  control: any,
  filter?: boolean
) => {
  const required = filter ? false : item?.updateable;
  const disabled = filter ? false : !item?.updateable;
  switch (type) {
    case fieldTypes?.PICKLIST:
      return (
        <ReactSelectField
          key={item?.name}
          control={control}
          label={item?.label}
          name={item?.name}
          mainClass="col-md-12 form-group"
          options={item?.picklistValues?.map((pick: any) => {
            return { label: pick?.label, value: pick?.label, id: item?.name };
          })}
          selectProps={{
            isDisabled: disabled,
          }}
          rules={{
            required: { value: required, message: "" },
          }}
        />
      );
    case fieldTypes?.BOOLEAN:
      return (
        <ReactSelectField
          key={item?.name}
          control={control}
          label={item?.label}
          name={item?.name}
          mainClass="col-md-12"
          options={[
            { id: 1, label: "True", value: "true" },
            { id: 1, label: "False", value: "false" },
          ]}
          selectProps={{
            isDisabled: disabled,
          }}
          rules={{
            required: { value: required, message: "" },
          }}
        />
      );
    case fieldTypes?.TEXTAREA:
      return (
        <TextareaField
          key={item?.name}
          control={control}
          label={item?.label}
          name={item?.name}
          mainClass="col-sm-12 form-group"
          inputProps={{
            placeholder: item?.label,
            disabled: disabled,
          }}
          rules={{
            required: { value: required, message: "" },
            maxLength: {
              value: 256,
              message: "Maximum 256 characters are allowed",
            },
          }}
        />
      );
    case fieldTypes?.CURRENCY:
    case fieldTypes?.DOUBLE:
    case fieldTypes?.INT:
      return (
        <InputField
          key={item?.name}
          control={control}
          label={item?.label}
          name={item?.name}
          type="number"
          mainClass="col-sm-6 form-group"
          inputProps={{
            placeholder: item?.label,
            disabled: disabled,
          }}
          rules={{
            required: { value: required, message: "" },
            maxLength: {
              value: 16,
              message: "Maximum 16 characters are allowed",
            },
          }}
        />
      );
    case fieldTypes?.DATE:
    case fieldTypes?.DATETIME:
      return (
        <InputField
          key={item?.name}
          control={control}
          label={item?.label}
          name={item?.name}
          type={type}
          inputProps={{
            placeholder: item?.label,
            disabled: disabled,
          }}
          mainClass="col-sm-6 form-group"
          rules={{
            required: { value: required, message: "" },
          }}
        />
      );
    default:
      return (
        <InputField
          key={item?.name}
          control={control}
          label={item?.label}
          name={item?.name}
          mainClass="col-sm-6 form-group"
          inputProps={{
            placeholder: item?.label,
            disabled: disabled,
          }}
          rules={{
            required: { value: required, message: "" },
            maxLength: {
              value: 56,
              message: "Maximum 56 characters are allowed",
            },
          }}
        />
      );
  }
};

const EditForm = ({ isOpen, onClose }: any, props: any) => {
  const { selectedRows } = useAppSelector((state) => state.fieldupdate);
  const { metadata } = useAppSelector((state: any) => state.metadata);
  const [showAlert, setShowAlert] = useState(true);

  // hook form
  const {
    control,
    handleSubmit,
    // setError,
    formState: { isSubmitting, dirtyFields },
  } = useForm<any>({
    shouldUnregister: true,
    defaultValues: props?.data,
  });

  const onSubmit = async (formData: any) => {
    const fields = getDirtyFields(formData, dirtyFields);
    if (Object.keys(fields)?.length) {
      try {
        await salesforce({
          method: "PATCH",
          url: `bulkUpdate/records`,
          data: {
            allOrNone: true,
            records: selectedRows?.map((item: any) => {
              return {
                attributes: {
                  type: item?.attributes?.type,
                },
                id: item?.Id,
                ...fields,
              };
            }),
          },
        });
        onClose();

        //   dispatch(updateMultipleRecords({ ids: selectedRows?.map((item) => item?.Id), fields }));
        //   toast(
        //     `${Object?.keys(fields)
        //       ?.map((ke) => ke)
        //       ?.toString()} fields have been updates successfully`
        //   );
        // props.handleClose();
      } catch (error) {
        console.log(error, "error");
      }
    }
  };

  // handling form field rendering
  const renderFields = () => {
    return metadata
      ?.filter?.((fil: any) => {
        return fil?.uiMetadata?.isBulkEditable;
      })
      ?.map((item: any) => fieldSwitch(item?.type, item, control, false));
  };

  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }, [isOpen]);

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="50vw">
          <ModalHeader>Bulk Update</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)} className="msform">
            <ModalBody>
              <Box>This will update the field for all the selected records</Box>
              {showAlert && <CustomAlertPopuop />}
              <Box className="row">{renderFields()}</Box>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onClose}
                fontWeight="100"
                fontSize="13px"
                _hover={{}}
                bg="transparent"
                color="bgClr.PrimaryActions"
                border="1px solid #DCE3EE"
              >
                Close
              </Button>
              <Button
                colorScheme="blue"
                variant="ghost"
                type="submit"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                gap="5px"
                fontWeight="100"
                fontSize="13px"
                bg={
                  selectedRows?.length
                    ? "bgClr.PrimaryActions"
                    : "bgClr.Grey300"
                }
                color="bgClr.NeutralColorWhite"
                cursor={selectedRows?.length ? "pointer" : "not-allowed"}
                _hover={{}}
              >
                Update
                {isSubmitting && <Spinner height="1rem" width="1rem" />}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditForm;
