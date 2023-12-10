/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
// import { createReactEditorJS } from 'react-editor-js';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

// import Header from '@editorjs/header';
// import { CheckList } from '@editorjs';
// import Code from '@editorjs/code';
// import Delimiter from '@editorjs/delimiter';
// import Embed from '@editorjs/embed';
// import Header from '@editorjs/header';
// import Image from '@editorjs/image';
// import InlineCode from '@editorjs/inline-code';
// import LinkTool from '@editorjs/link';
// import List from '@editorjs/list';
// import Marker from '@editorjs/marker';
// import Quote from '@editorjs/quote';
// import Raw from '@editorjs/raw';
// import SimpleImage from '@editorjs/simple-image';
// import Table from '@editorjs/table';
// import Warning from '@editorjs/warning';
import { note } from '@/axios/actions/note';
import CustomConfirmAlert from '@/components/UI/ConfirmAlert';
import { EditorField, InputField, TextareaField } from '@/components/formFields';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { deleteNote, pushToNotes, setNotes, updateNote } from '@/redux/slices/note';
import { NoteInterface } from '@/redux/slices/note/interface';
import { RecordsInterface } from '@/redux/slices/salesForce/interface';

import './notes.css';

// const ReactEditorJS = createReactEditorJS();

function AddEditNotes(props: { show: boolean; handleClose: () => void }) {
  //   use hooks
  const { tabId } = useParams();
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
          method: 'PATCH',
          url: `sf/object/view/${selectedNote?._id}`,
          data: formData,
        });
        dispatch(updateNote({ ...selectedNote, ...formData }));
      } else if (addingNew) {
        const resp = await note({
          method: 'POST',
          url: `sf/object/${tabId}/view/notes`,
          data: formData,
        });
        setAddingNew(false);
        dispatch(pushToNotes(resp?.data?.data));
        setSelectedNote(resp?.data?.data);
        setValue('heading', resp?.data?.data?.heading);
        setValue('description', resp?.data?.data?.description);
        setValue('content', resp?.data?.data?.content);
      }
      toast.success(`Note ${selectedNote ? 'updated' : 'added'} successfully`);
      // props.handleClose();
    } catch (error) {
      console.log(error, 'error');
    }
  };

  // handling note delete
  const handleDelete = async () => {
    await note({
      method: 'DELETE',
      url: `sf/object/view/${selectedNote?._id}`,
    });
    dispatch(deleteNote(selectedNote?._id));
    toast(`Note deleted successfully`);
  };

  // handling add new note
  const handleAddNewNote = () => {
    setValue('heading', '');
    setValue('description', '');
    setValue('content', '');
    setSelectedNote(null);
    setAddingNew(true);
  };

  // handling discard new note
  const handlingDiscardNewNote = () => {
    if (notes?.length) {
      setAddingNew(false);
      setSelectedNote(notes?.[0]);
      setValue('heading', notes?.[0]?.heading);
      setValue('description', notes?.[0]?.description);
      setValue('content', notes?.[0]?.content);
    }
  };

  // fetching initial notes
  useEffect(() => {
    note({
      method: 'GET',
      url: `sf/object/view/public`,
    }).then((resp) => {
      dispatch(setNotes(resp?.data?.data));
      if (resp?.data?.data?.length) {
        setSelectedNote(resp?.data?.data?.[0]);
        setValue('heading', resp?.data?.data?.[0]?.heading);
        setValue('description', resp?.data?.data?.[0]?.description);
        setValue('content', resp?.data?.data?.[0]?.content);
      }
    });
  }, []);

  return (
    <>
      <Modal
        dialogClassName="custom-modal notes-modal dialog-md"
        show={props.show}
        onHide={props.handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="msform">
          <Modal.Body>
            <div className="main-wrapper d-flex">
              {/* - - Left navigation - - - */}
              <div className={`left-panel ${collapsed ? 'collapsed' : ''}`}>
                <a
                  href="#"
                  onClick={(e) => {
                    setCollapsed((prev) => !prev);
                    e.preventDefault();
                  }}
                  style={{ zIndex: 2 }}
                  className="icons-collapse"
                >
                  <span className="icons-drop-down"></span>
                </a>
                <div className="left-navigation">
                  <div className="nav-heading-top">
                    <div className="heading">
                      <span className="icons-notes icon"></span> <h3>My Notes</h3>
                    </div>
                    <span
                      className="icons-add icon m-0"
                      style={{ cursor: 'pointer' }}
                      onClick={handleAddNewNote}
                    ></span>
                  </div>
                  <ul className="navlist">
                    {addingNew && (
                      <li className="active">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {watch('heading') !== '' ? watch('heading') : 'Untitled'}
                        </a>
                        <span
                          className="icons-delete icon"
                          onClick={() => {
                            handlingDiscardNewNote();
                          }}
                        ></span>
                      </li>
                    )}
                    {notes?.map((item) => {
                      return (
                        <li
                          key={item?._id}
                          className={selectedNote?._id === item?._id ? 'active' : ''}
                        >
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setAddingNew(false);
                              setSelectedNote(item);
                              setValue('heading', item?.heading);
                              setValue('description', item?.description);
                              setValue('content', item?.content);
                            }}
                          >
                            {item?.heading}
                          </a>
                          <span
                            className="icons-delete icon"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              // props.handleClose();
                              CustomConfirmAlert({
                                yes: () => handleDelete(),
                                heading: 'Are you sure?',
                                message: `Do you really want to delete this Note? This process cannot be undone.`,
                                noLabel: 'Cancel',
                                yesLabel: 'Delete',
                                loadingMessage: 'Deleting',
                                successMessage: 'Note Deleted Successfully',
                                errorMessage: 'Error while Deleting Note',
                              });
                            }}
                          />
                        </li>
                      );
                    })}
                    {!notes && (
                      <li>
                        <Spinner style={{ margin: '10%' }} animation="border" variant="dark" />
                      </li>
                    )}
                    {notes?.length === 0 && (
                      <li>
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          No Records
                        </a>
                      </li>
                    )}
                  </ul>
                  {/* <div className="nav-heading-top">
                    <div className="heading">
                      <span className="icons-Template-icon icon"></span> <h3>Templates</h3>
                    </div>
                  </div>
                  <ul className="navlist">
                    <li>
                      <a href="#">Discovery Call</a>
                      <span className="icons-notes icon"></span>
                    </li>
                    <li>
                      <a href="#">Deal Plan</a>
                      <span className="icons-notes icon"></span>
                    </li>
                    <li>
                      <a href="#">Opportunity Summary</a>
                      <span className="icons-notes icon"></span>
                    </li>
                  </ul> */}
                  {/* <div className="nav-heading-top">
                    <div className="heading">
                      <span className="icons-delete icon"></span> <h3>Trash</h3>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* - - right content section - - - */}
              <div className="right-panel">
                <div className="right-panel-top">
                  <div className="right-panel-header d-flex justify-content-between align-items-center">
                    <h3>
                      {addingNew
                        ? watch('heading') !== ''
                          ? watch('heading')
                          : 'Untitled'
                        : selectedNote?.heading}
                    </h3>
                    {/* <div className="buttons-wrapper">
                      <a href="#" className="btn-border-sm btn-bordered">
                        <span className="icons-link-icon icon"></span> Link this note to Salesforce
                      </a>
                      <a href="#" className="btn-border-sm btn-bordered">
                        <span className="icons-share-icons icon"></span> Share
                      </a>
                    </div> */}
                  </div>
                  <div className="content-form">
                    <InputField
                      control={control}
                      name="heading"
                      mainStyle={{ width: '100%' }}
                      inputProps={{
                        placeholder: 'Give your draft a title',
                      }}
                      rules={{
                        required: { value: true, message: '' },
                        maxLength: {
                          value: 56,
                          message: 'Maximum 56 characters are allowed',
                        },
                      }}
                    />
                    <TextareaField
                      control={control}
                      name="description"
                      inputClass="form-control"
                      mainStyle={{ width: '100%' }}
                      inputProps={{
                        placeholder: 'An idea? what about it',
                      }}
                      rules={{
                        required: { value: true, message: '' },
                        maxLength: {
                          value: 256,
                          message: 'Maximum 256 characters are allowed',
                        },
                      }}
                    />
                  </div>
                </div>
                <div>
                  <EditorField
                    control={control}
                    name="content"
                    defaultValue={addingNew ? '' : selectedNote?.content}
                  />
                  {/* <ReactEditorJS
                  // tools={{ header: Header }}
                  /> */}
                </div>
              </div>
              <div className="linktoshare-panel">Link To Share</div>
            </div>
          </Modal.Body>
          {/* - - Footer - - - */}
          <Modal.Footer>
            <Button
              variant="secondary"
              type="button"
              onClick={props.handleClose}
              className="btn-bordered"
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="btn-salesboost"
            >
              Save Note
              {isSubmitting && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginLeft: '10px' }}
                />
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddEditNotes;
