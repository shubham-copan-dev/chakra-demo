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
  Divider,
  Spinner,
} from "@chakra-ui/react";
import {
  ArrowUpDownIcon,
  DragHandleIcon,
  RepeatIcon,
  SettingsIcon,
} from "@chakra-ui/icons"; // Assuming SettingsIcon is from Chakra UI icons
import { ChevronDownIcon, RowIcon } from "@/chakraConfig/icons";
import { ViewBarBtnStyl } from "@/utilities/constants";
import { salesforce } from "@/axios/actions/salesforce";
import { useAppSelector } from "@/hooks/redux";
import { fetchRecords, setRecordData } from "@/redux/slices/gridrecords";
import { useDispatch } from "react-redux";
import { setFullScreen, setNavTabClicked } from "@/redux/slices/common";
import AddNewTab from "@/components/Grid/AddNewTab";
import { useEffect, useState } from "react";
import { customVariant } from "@/utilities/constants";
import { fetchMetaData, setMetaData } from "@/redux/slices/gridmetadata";
import { fetchSalesforceData, setGridData } from "@/redux/slices/salesForce";
import {
  setEditedFields,
  setFieldUpdateMode,
} from "@/redux/slices/fieldUpdate";
import { setReset } from "@/redux/slices/common";
import EditForm from "@/components/Grid/ViewPanel/EditForm";
import Filters from "@/components/Grid/ViewPanel/ViewHeader/Filters";
import ManageColumns from "@/components/Grid/ViewPanel/ViewHeader/ManageColumns";
import ViewBy from "@/components/Grid/ViewPanel/ViewHeader/ViewBy";

const DynamicButtons = ({ buttonData }: { buttonData: { text: string }[] }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const {
    viewGridData,
    gridViewId,
    selectedGridTab,
    defaultGridViewId,
    defaultGrid,
  } = useAppSelector((state: any) => state.salesforce);
  const { isFullScreen } = useAppSelector((state: any) => state.common);
  const { selectedRows } = useAppSelector((state) => state.fieldupdate);
  const { fieldUpdateMode, editedFields } = useAppSelector(
    (state: any) => state.fieldupdate
  );
  const [editTabModal, setEditTabModal] = useState<any>(false);
  const [tabData, setTabData] = useState<any | null>(null);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { selectedNav } = useAppSelector((state: any) => state.navdata);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showFilters, setShowFilter] = useState(false);
  const [manageColumnPopup, setManageColumnPopup] = useState<boolean>(false);

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

    const tab = viewGridData?.find((fi: any) => fi?._id === selectedGridTab);
    try {
      const resp = await salesforce({
        method: "POST",
        url: `sf/object/metadata/CSV`,
        params: {
          id: selectedGridTab,
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
    // Displaying a loading toast before initiating the async operation
    onToggle();
    const loadingToast = toast({
      title: "Deleting...",
      status: "info",
      duration: null, // To keep the toast until explicitly closed or updated
      isClosable: false,
    });

    try {
      await salesforce({
        method: "DELETE",
        url: `metadata/${selectedGridTab}`,
      });

      // If the deletion was successful, update the loading toast to a success toast
      toast.update(loadingToast, {
        title: "Deletion Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      dispatch(setRecordData(null));
      dispatch(setMetaData(null));
      dispatch(setGridData(null));
      dispatch(
        fetchSalesforceData({
          method: "GET",
          url: `object/${selectedNav}/views`,
          params: { view: "grid" },
        })
      );
      setTimeout(() => {
        dispatch(
          fetchMetaData({
            method: "GET",
            url: `sf/object/metadata`,
            params: { id: defaultGridViewId, filter: true },
          })
        );
        dispatch(
          fetchRecords({
            method: "POST",
            url: `sf/object/records`,
            params: {
              id: defaultGridViewId,
              page: 1,
              perPage: defaultGrid?.query?.limit,
            },
          })
        );
      }, 100);
      // You can also perform additional actions after successful deletion if needed
    } catch (error) {
      // If there's an error during deletion, update the loading toast to an error toast
      toast.update(loadingToast, {
        title: "Error",
        description: "Failed to delete the item.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      // You might also handle the error or perform additional actions based on the error
      console.error("Deletion error:", error);
    }
  };
  const onclose = () => {
    setShowEditForm(false);
  };
  // handling save
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await salesforce({
        method: "PATCH",
        url: `bulkUpdate/records`,
        data: {
          allOrNone: true,
          records: editedFields,
        },
      });
      setIsSaving(false);
      dispatch(setEditedFields(null));
    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  // handling field updating mode buttons
  const handlingFieldUpdateModeButton = (mode: string) => {
    switch (mode) {
      case "instant":
        return (
          <button
            className="btn list-btn"
            type="button"
            onClick={() => dispatch(setFieldUpdateMode("submit"))}
          >
            <DragHandleIcon />
          </button>
        );
      case "submit":
        return (
          <>
            <Button
              sx={ViewBarBtnStyl}
              onClick={() => {
                dispatch(setFieldUpdateMode("instant"));
                dispatch(setEditedFields(null));
                // reSetValues();
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                ...ViewBarBtnStyl,
                bg: !editedFields?.length
                  ? "bgClr.Grey300"
                  : "bgClr.PrimaryActions",
                color: !editedFields?.length
                  ? "typoClr.NeutralColorBlack"
                  : "typoClr.NeutralColorWhite",
                height: "2rem",
                padding: "0px 14px",
              }}
              display="flex"
              alignItems="center"
              onClick={handleSave}
              isDisabled={!editedFields?.length}
            >
              <Text>Save</Text>
              {isSaving && <Spinner />}
            </Button>
            {editedFields?.length && (
              <Button
                sx={ViewBarBtnStyl}
                onClick={() => {
                  dispatch(setEditedFields(null));
                  dispatch(setReset(1));
                }}
              >
                Discard
              </Button>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Flex justifyContent="space-between" px={5} marginBottom="-4.5rem">
      <Flex>
        <Button sx={ViewBarBtnStyl} onClick={() => setShowFilter(true)}>
          <Flex alignItems="center" gap="5px" position="relative">
            <Image src="/assets/images/icon-filter.png" alt="download"></Image>
            <Text>Filters</Text>
            <Filters
              isOpen={showFilters}
              onClose={() => setShowFilter(false)}
            />
          </Flex>
        </Button>
        <Button
          sx={ViewBarBtnStyl}
          position="relative"
          onClick={() => setManageColumnPopup(!manageColumnPopup)}
        >
          <Flex alignItems="center" gap="5px">
            <SettingsIcon />
            <Text>Manage Columns</Text>
          </Flex>
          {manageColumnPopup && (
            <ManageColumns onHide={() => setManageColumnPopup(true)} />
          )}
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
                <PopoverContent width="auto" border="none">
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
      <Flex alignItems="center">
        <Button sx={ViewBarBtnStyl}>
          <Flex alignItems="center" gap="5px">
            {handlingFieldUpdateModeButton(fieldUpdateMode)}
          </Flex>
        </Button>
        <Button
          sx={ViewBarBtnStyl}
          onClick={() => {
            dispatch(setNavTabClicked(false));
            dispatch(setFullScreen(!isFullScreen));
          }}
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
        <Divider
          orientation="vertical"
          h="1rem"
          mx="1rem"
          sx={{
            borderColor: "gray", // Line color for vertical orientation
          }}
        />
        {/* <Button sx={ViewBarBtnStyl}>
          <Flex alignItems="center" gap="5px">
            <ChevronDownIcon />
            <Text>View: all</Text>
          </Flex>
        </Button> */}
        <ViewBy />
        <Divider
          orientation="vertical"
          h="1rem"
          mx="1rem"
          sx={{
            borderColor: "gray", // Line color for vertical orientation
          }}
        />
        <Button
          isDisabled={!((selectedRows?.length as any) > 1)}
          sx={{
            ...ViewBarBtnStyl,
            bg:
              (selectedRows?.length as any) > 1
                ? "bgClr.PrimaryActions"
                : "bgClr.Grey300",
            color:
              (selectedRows?.length as any) > 1
                ? "bgClr.NeutralColorWhite"
                : "",
          }}
          onClick={() => setShowEditForm(true)}
          border="1px solid #DCE3EE"
          height="2rem"
        >
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
      {<EditForm isOpen={showEditForm} onClose={onclose} />}
    </Flex>
  );
};

export default DynamicButtons;
