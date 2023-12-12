import {
  Flex,
  Button,
  Text,
  Box,
  Image,
  useToast,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverBody,
  ButtonGroup,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter,
  PopoverHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowUpDownIcon, RepeatIcon, SettingsIcon } from "@chakra-ui/icons"; // Assuming SettingsIcon is from Chakra UI icons
import { ChevronDownIcon, RowIcon } from "@/chakraConfig/icons";
import { ViewBarBtnStyl } from "@/utilities/constants";
import { salesforce } from "@/axios/actions/salesforce";
import { useAppSelector } from "@/hooks/redux";
import { fetchRecords, setRecordData } from "@/redux/slices/gridrecords";
import { useDispatch } from "react-redux";
import { setFullScreen } from "@/redux/slices/common";
import AddNewTab from "@/components/Grid/AddNewTab";
import { useState } from "react";
import { customVariant } from "@/utilities/constants";

const DynamicButtons = ({ buttonData }: { buttonData: { text: string }[] }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { viewGridData, gridViewId, selectedGridTab } = useAppSelector(
    (state: any) => state.salesforce
  );
  const { isFullScreen } = useAppSelector((state: any) => state.common);
  const [editTabModal, setEditTabModal] = useState<any>(false);
  const [tabData, setTabData] = useState<any | null>(null);
  const { isOpen, onToggle, onClose } = useDisclosure();
  // handling Download CSV
  const downloadCsv = async () => {
    const downloadFile = ({ data, fileName, fileType }: any) => {
      const blob = new Blob([data], { type: fileType });

      const a = document.createElement("a");
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      const clickEvt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      a.dispatchEvent(clickEvt);
      a.remove();

      toast({
        title: "Download successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    };

    const tab = viewGridData?.find((fi: any) => fi?._id === gridViewId);

    try {
      const resp = await salesforce({
        method: "POST",
        url: `sf/object/metadata/CSV`,
        params: {
          id: gridViewId,
        },
      });

      downloadFile({
        data: resp?.data,
        fileName: `${tab?.label}.csv`,
        fileType: "text/csv",
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Error while downloading",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClick = () => {
    dispatch(setRecordData(null));

    dispatch(
      fetchRecords({
        method: "POST",
        url: `sf/object/records`,
        params: {
          id: selectedGridTab,
          page: 1,
          perPage: 20,
        },
      })
    );
  };

  // handling tab edit
  const handleTabEdit = () => {
    const tab = viewGridData?.find((fi: any) => fi?._id === selectedGridTab);
    if (tab) {
      const defaultValues: any = {
        view: tab?.view,
        label: tab?.label,
        description: tab?.description,
        query: {
          type: tab?.query?.type,
          fields: tab?.query?.fields,
          object: tab?.query?.object,
          filter: {
            type: tab?.query?.filter?.type,
            expression: tab?.query?.filter?.expression?.map((item: any) => {
              return { ...item, value: item?.value?.replaceAll("'", "") };
            }),
          },
          limit: tab?.query?.limit,
        },
      };
      setTabData(defaultValues);
      setEditTabModal(true);
    }
  };

  const handleTabDelete = async () => {
    await salesforce({
      method: "DELETE",
      url: `metadata/${selectedGridTab}`,
    });
  };

  return (
    <Flex justifyContent="space-between" px={5}>
      <Flex>
        <Button sx={ViewBarBtnStyl}>
          <Flex alignItems="center" gap="5px">
            <Image src="/assets/images/icon-filter.png" alt="download"></Image>
            <Text>Filters</Text>
          </Flex>
        </Button>
        <Button sx={ViewBarBtnStyl}>
          <Flex alignItems="center" gap="5px">
            <SettingsIcon />
            <Text>Manage Columns</Text>
          </Flex>
        </Button>
        <Button sx={ViewBarBtnStyl}>
          <Flex alignItems="center" gap="5px">
            <Image
              src="/assets/images/icon-metrices.png"
              alt="download"
            ></Image>
            <Text>Show metrices</Text>
          </Flex>
        </Button>
        <Button sx={ViewBarBtnStyl}>
          <Flex alignItems="center" gap="5px">
            <Image src="/assets/images/icon-more.png" alt="download"></Image>
            <Popover>
              <PopoverTrigger>
                <Button sx={ViewBarBtnStyl}>More</Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent width="auto">
                  <PopoverBody display="flex" flexDir="column" p={0}>
                    <Button
                      colorScheme="blue"
                      onClick={handleTabEdit}
                      sx={{
                        ...ViewBarBtnStyl,
                        padding: 25,
                        _hover: {
                          backgroundColor: "#EBF1FA",
                          "&:active": {
                            backgroundColor: "transparent",
                          },
                        },
                      }}
                    >
                      View
                    </Button>
                    {/* <Button colorScheme="blue" onClick={handleTabDelete}> */}
                    <Button
                      onClick={onToggle}
                      sx={{
                        ...ViewBarBtnStyl,
                        padding: 25,
                        color: "red",
                        _hover: {
                          backgroundColor: "#EBF1FA",
                          "&:active": {
                            backgroundColor: "transparent",
                          },
                        },
                      }}
                    >
                      Delete
                    </Button>
                    <Popover
                      returnFocusOnClose={false}
                      isOpen={isOpen}
                      onClose={onClose}
                      placement="right"
                      closeOnBlur={false}
                    >
                      <PopoverTrigger>
                        {/* <Button colorScheme="pink">Popover Target</Button> */}
                        <Text as="span"></Text>
                      </PopoverTrigger>
                      <PopoverContent minWidth="24vw">
                        <PopoverHeader fontWeight="semibold">
                          Are you sure ?
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody fontSize="12px">
                          Do you really want to delete this view?This Process
                          cannot be undone.
                        </PopoverBody>
                        <PopoverFooter
                          display="flex"
                          justifyContent="flex-start"
                        >
                          <ButtonGroup size="sm">
                            <Button
                              variant="outline"
                              onClick={onToggle}
                              fontWeight="400"
                            >
                              Cancel
                            </Button>
                            <Button
                              backgroundColor="#BB3E23"
                              onClick={handleTabDelete}
                              color="white"
                              fontWeight="400"
                              sx={customVariant}
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                    {/* </Button> */}
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </Flex>
        </Button>
      </Flex>
      <Flex>
        <Button
          sx={ViewBarBtnStyl}
          onClick={() => dispatch(setFullScreen(!isFullScreen))}
        >
          <Flex alignItems="center" gap="5px">
            <Image
              src="/assets/images/icon-fullscreen.png"
              alt="download"
            ></Image>
          </Flex>
        </Button>
        <Button
          sx={ViewBarBtnStyl}
          onClick={(e) => {
            e.preventDefault();
            downloadCsv();
          }}
        >
          <Flex alignItems="center" gap="5px">
            <Image
              src="/assets/images/download-icon.png"
              alt="download"
            ></Image>
          </Flex>
        </Button>
        <Button sx={ViewBarBtnStyl}>
          <Flex alignItems="center" gap="5px" onClick={handleClick}>
            <RepeatIcon />
          </Flex>
        </Button>
        <Button sx={ViewBarBtnStyl}>
          <Flex alignItems="center" gap="5px">
            <ChevronDownIcon />
            <Text>View: all</Text>
          </Flex>
        </Button>
        <Button sx={ViewBarBtnStyl}>
          <Flex alignItems="center" gap="5px">
            <Text>Bulk Update</Text>
          </Flex>
        </Button>
      </Flex>
      {editTabModal && tabData && (
        <AddNewTab
          show={editTabModal}
          onHide={() => setEditTabModal(false)}
          defaultValues={tabData}
          refetch={() => console.log("hello world")}
        />
      )}
    </Flex>
  );
};

export default DynamicButtons;
