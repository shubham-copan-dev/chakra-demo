import React, { useState } from "react";
// import { Dropdown, ListGroup } from "react-bootstrap";
import {
  Box,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { salesforce } from "@/axios/actions/salesforce";
// import CustomConfirmAlert from '@/components/UI/ConfirmAlert';
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { deleteViewByMeta, setReFetchViewBy, setSelectedViewBy } from '@/redux/slices/salesForce';
import { setSelectedViewBy } from "@/redux/slices/fieldUpdate";
import { deleteViewByMeta } from "@/redux/slices/viewmetadata";
import { ViewBarBtnStyl } from "@/utilities/constants";
import AddEditViewBy from "./AddEditViewBy";
import {
  AddIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";

function ViewBy() {
  // use hooks
  const dispatch = useAppDispatch();

  // local states
  const [addEditModal, setAddEditModal] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<any | null>(null);

  // global states
  const { viewByMeta }: any = useAppSelector((state) => state.Viewmetadata);
  const { selectedViewBy } = useAppSelector((state: any) => state.fieldupdate);

  // handling view edit
  const handleEdit = (obj: any) => {
    setDefaultValues(obj);
    setAddEditModal(true);
  };

  // handling delete
  const handleDelete = async (id: string) => {
    await salesforce({
      method: "DELETE",
      url: `metadata/${id}`,
    });
    dispatch(deleteViewByMeta(id));
    // dispatch(setReFetchViewBy());
    const deletedView = viewByMeta?.find((item: any) => item?._id === id);
    if (deletedView && deletedView?.label === selectedViewBy) {
      dispatch(setSelectedViewBy("all"));
    }
  };

  return (
    <>
      <List>
        <ListItem>
          <Menu>
            <MenuButton
              as="button"
              className="view-by-dropdown"
              sx={ViewBarBtnStyl}
              fontSize="13px"
            >
              View by : {selectedViewBy?.toUpperCase()} <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <List>
                <ListItem fontSize="13px">
                  <MenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(setSelectedViewBy("all"));
                    }}
                    className="d-flex justify-content-between"
                    color={selectedViewBy === "all" ? "#3478f6" : ""}
                  >
                    ALL
                  </MenuItem>
                </ListItem>
                {viewByMeta?.map((item: any) => (
                  <ListItem key={item?._id} fontSize="13px" display="flex">
                    <MenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setSelectedViewBy(item?.label));
                      }}
                      className="d-flex justify-content-between"
                      color={selectedViewBy === item.label ? "#3478f6" : ""}
                      flex="1"
                    >
                      {item?.label}
                    </MenuItem>
                    <Box className="icons-wrapper" display="flex">
                      <MenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          // CustomConfirmAlert({
                          //   yes: () => handleDelete(item?._id),
                          //   heading: 'Are you sure?',
                          //   message: `Do you really want to delete this View? This process cannot be undone.`,
                          //   noLabel: 'Cancel',
                          //   yesLabel: 'Delete',
                          //   loadingMessage: 'Deleting',
                          //   successMessage: 'View Deleted Successfully',
                          //   errorMessage: 'Error while Deleting View',
                          // });
                        }}
                        flex="1"
                      >
                        <DeleteIcon />
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit(item);
                        }}
                        flex="1"
                      >
                        <EditIcon />
                      </MenuItem>
                    </Box>
                  </ListItem>
                ))}
                <ListItem>
                  <MenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      setAddEditModal(true);
                    }}
                    fontSize="13px"
                    gap="1rem"
                  >
                    <AddIcon />
                    New Contract
                  </MenuItem>
                </ListItem>
              </List>
            </MenuList>
          </Menu>
        </ListItem>
      </List>
      {addEditModal && (
        <AddEditViewBy
          show={addEditModal}
          handleClose={() => {
            setAddEditModal(false);
            setDefaultValues(null);
          }}
          defaultValues={defaultValues}
        />
      )}
    </>
  );
}

export default ViewBy;
