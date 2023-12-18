import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from "@chakra-ui/react";
import { note } from "@/axios/actions/note";
// import CustomConfirmAlert from "@/components/UI/ConfirmAlert";
import {
  InputField,
  TextareaField,
  EditorField,
} from "@/components/formFields";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  deleteNote,
  pushToNotes,
  setNotes,
  updateNote,
} from "@/redux/slices/note";
import { NoteInterface } from "@/redux/slices/note/interface";
import { RecordsInterface } from "@/redux/slices/salesForce/interface";

import "./notes.css";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";

// const ReactEditorJS = createReactEditorJS();

function AddEditNotes({ isOpen, onClose }: any) {
  //   use hooks
  // const { tabId } = useParams();
  const { selectedNav } = useAppSelector((state: any) => state.navdata);
  const dispatch = useAppDispatch();

  // global states
  const { notes } = useAppSelector((state) => state.note);

  // local states
  const [selectedNote, setSelectedNote] = useState<NoteInterface | null>(null);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [addingNew, setAddingNew] = useState<boolean>(false);

  // hook form
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<any>({
    shouldUnregister: true,
  });

  // onsubmit handler
  const onSubmit = async (formData: RecordsInterface) => {
    try {
      if (selectedNote) {
        await note({
          method: "PATCH",
          url: `sf/object/view/${selectedNote?._id}`,
          data: formData,
        });
        dispatch(updateNote({ ...selectedNote, ...formData }));
      } else if (addingNew) {
        const resp = await note({
          method: "POST",
          url: `sf/object/${selectedNav}/view/notes`,
          data: formData,
        });
        setAddingNew(false);
        dispatch(pushToNotes(resp?.data?.data));
        setSelectedNote(resp?.data?.data);
        setValue("heading", resp?.data?.data?.heading);
        setValue("description", resp?.data?.data?.description);
        setValue("content", resp?.data?.data?.content);
      }
      toast.success(`Note ${selectedNote ? "updated" : "added"} successfully`);
      // props.handleClose();
    } catch (error) {
      console.log(error, "error");
    }
  };

  // handling note delete
  const handleDelete = async () => {
    await note({
      method: "DELETE",
      url: `sf/object/view/${selectedNote?._id}`,
    });
    dispatch(deleteNote(selectedNote?._id));
    toast(`Note deleted successfully`);
  };

  // handling add new note
  const handleAddNewNote = () => {
    setValue("heading", "");
    setValue("description", "");
    setValue("content", "");
    setSelectedNote(null);
    setAddingNew(true);
  };

  // handling discard new note
  const handlingDiscardNewNote = () => {
    if (notes?.length) {
      setAddingNew(false);
      setSelectedNote(notes?.[0]);
      setValue("heading", notes?.[0]?.heading);
      setValue("description", notes?.[0]?.description);
      setValue("content", notes?.[0]?.content);
    }
  };

  // fetching initial notes
  useEffect(() => {
    note({
      method: "GET",
      url: `sf/object/view/public`,
    }).then((resp) => {
      dispatch(setNotes(resp?.data?.data));
      if (resp?.data?.data?.length) {
        setSelectedNote(resp?.data?.data?.[0]);
        setValue("heading", resp?.data?.data?.[0]?.heading);
        setValue("description", resp?.data?.data?.[0]?.description);
        setValue("content", resp?.data?.data?.[0]?.content);
      }
    });
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl" // Example: Adjust size as needed
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)} className="msform">
          <ModalContent minWidth="85vw">
            <ModalBody>
              <Box className="main-wrapper d-flex" style={{ display: "flex" }}>
                {/* Left navigation */}
                <Box
                  className={`left-panel ${collapsed ? "collapsed" : ""}`}
                  style={{ flex: "1" }}
                >
                  <Box className={`left-panel ${collapsed ? "collapsed" : ""}`}>
                    {/* <a
                      href="#"
                      onClick={(e) => {
                        setCollapsed((prev) => !prev);
                        e.preventDefault();
                      }}
                      style={{ zIndex: 2 }}
                      className="icons-collapse"
                    >
                      <ChevronLeftIcon />
                    </a> */}
                    <Box className="left-navigation" style={{ width: "100%" }}>
                      {/* Content for left navigation */}
                      <Box
                        className="nav-heading-top"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingRight: "2rem",
                        }}
                      >
                        <Box className="heading">
                          <span className="icons-notes icon"></span>{" "}
                          <h3>My Notes</h3>
                        </Box>
                        <AddIcon onClick={handleAddNewNote} cursor="pointer" />
                      </Box>
                      <ul className="navlist">
                        {/* List items for notes */}
                        {/* Replace or include your list items here */}
                      </ul>
                      {/* Additional sections if needed */}
                    </Box>
                  </Box>
                </Box>

                {/* Right content section */}
                <Box className="right-panel" style={{ flex: "2" }}>
                  <Box className="right-panel-top">
                    <Box className="right-panel-header d-flex justify-content-between align-items-center">
                      <h3 style={{ textAlign: "center" }}>
                        {addingNew
                          ? watch("heading") !== ""
                            ? watch("heading")
                            : "Untitled"
                          : selectedNote?.heading}
                      </h3>
                      {/* Buttons-wrapper */}
                    </Box>
                    <Box className="content-form">
                      <InputField
                        control={control}
                        name="heading"
                        mainStyle={{ width: "100%" }}
                        inputProps={{
                          placeholder: "Give your draft a title",
                        }}
                        rules={{
                          required: { value: true, message: "" },
                          maxLength: {
                            value: 56,
                            message: "Maximum 56 characters are allowed",
                          },
                        }}
                      />
                      <TextareaField
                        control={control}
                        name="description"
                        inputClass="form-control"
                        mainStyle={{ width: "100%" }}
                        inputProps={{
                          placeholder: "An idea? what about it",
                        }}
                        rules={{
                          required: { value: true, message: "" },
                          maxLength: {
                            value: 256,
                            message: "Maximum 256 characters are allowed",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <EditorField
                      control={control}
                      name="content"
                      defaultValue={addingNew ? "" : selectedNote?.content}
                    />
                    {/* Additional content */}
                  </Box>
                </Box>
                <Box className="linktoshare-panel" style={{ flex: "1" }}>
                  Link To Share
                </Box>
              </Box>
            </ModalBody>
            {/* Footer */}
            <ModalFooter gap="1rem">
              <Button
                variant="outline"
                onClick={onClose}
                fontWeight="100"
                fontSize="13px"
                _hover={{}}
                bg="transparent"
                color="bgClr.PrimaryActions"
                border="1px solid #DCE3EE"
              >
                Cancel
              </Button>

              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Saving..."
                fontWeight="100"
                fontSize="13px"
                bg="bgClr.PrimaryActions"
                color="bgClr.NeutralColorWhite"
                cursor="pointer"
                _hover={{}}
              >
                Save Note
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      ;
    </>
  );
}

export default AddEditNotes;
