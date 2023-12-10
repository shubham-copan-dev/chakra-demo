import { Flex, Button, Text, Box, Image } from "@chakra-ui/react";
import { ArrowUpDownIcon, RepeatIcon, SettingsIcon } from "@chakra-ui/icons"; // Assuming SettingsIcon is from Chakra UI icons
import { ChevronDownIcon, RowIcon } from "@/chakraConfig/icons";
import { ViewBarBtnStyl } from "@/utilities/constants";
import { salesforce } from "@/axios/actions/salesforce";
import { toast } from "react-hot-toast";
import { useAppSelector } from "@/hooks/redux";

const DynamicButtons = ({ buttonData }: { buttonData: { text: string }[] }) => {
  const { viewGridData, gridViewId } = useAppSelector(
    (state: any) => state.salesforce
  );
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
    };

    const tab = viewGridData?.find((fi: any) => fi?._id === gridViewId);

    toast.promise(
      salesforce({
        method: "POST",
        url: `sf/object/metadata/CSV`,
        params: {
          id: gridViewId,
        },
      }).then((resp) => {
        downloadFile({
          data: resp?.data,
          fileName: `${tab?.label}.csv`,
          fileType: "text/csv",
        });
      }),
      {
        loading: "Downloading",
        success: "Download successful",
        error: "Error while downloading",
      }
    );
  };

  return (
    <Flex justifyContent="space-between" px={5}>
      <Flex>
        {buttonData.map((item, index) => (
          <Button key={index} sx={ViewBarBtnStyl}>
            <Flex alignItems="center" gap="5px">
              <SettingsIcon />
              <Text>{item.text}</Text>
            </Flex>
          </Button>
        ))}
      </Flex>
      <Flex>
        <Button sx={ViewBarBtnStyl}>
          <Flex alignItems="center" gap="5px">
            <RowIcon />
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
          <Flex alignItems="center" gap="5px">
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
    </Flex>
  );
};

export default DynamicButtons;
