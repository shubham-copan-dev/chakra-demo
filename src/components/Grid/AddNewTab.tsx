import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
// import { useParams } from 'react-router-dom';
import Select from "react-select";

import { salesforce } from "@/axios/actions/salesforce";
import {
  InputField,
  MultipleRadioButtonField,
  ReactSelectField,
  TextareaField,
} from "@/components/formFields";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { setReFetchTabs } from "@/redux/slices/salesForce";
import { AddNewTabInterface } from "@/redux/slices/salesForce/interface";
import { operators, updateUrl } from "@/utilities/constants";
import { fetchRecords, setRecordData } from "@/redux/slices/gridrecords";
import { fetchMetaData, setMetaData } from "@/redux/slices/gridmetadata";
import { fetchSalesforceData, setGridData } from "@/redux/slices/salesForce";

function AddNewTab({
  show,
  onHide,
  refetch,
  defaultValues,
}: {
  show: boolean;
  onHide: () => void;
  refetch?: () => void;
  defaultValues?: AddNewTabInterface;
}) {
  // use hooks
  // const { tabId, viewId } = useParams();
  const { selectedNav } = useAppSelector((state: any) => state.navdata);
  const { metadata } = useAppSelector((state: any) => state.metadata);
  const { defaultGridViewId, defaultGrid, selectedGridTab } = useAppSelector(
    (state: any) => state.salesforce
  );
  const dispatch = useAppDispatch();

  // global states
  // const { allFields } = useAppSelector((state) => state.sales);

  const fieldTypes: { [key: string]: string } = {};
  metadata?.map((item: any) => (fieldTypes[item.name] = item.type));

  // hook form
  const {
    control,
    handleSubmit,
    watch,
    // setError,
    formState: { isSubmitting },
  } = useForm<AddNewTabInterface>({
    defaultValues: defaultValues ?? {
      view: "grid",
      label: "",
      description: "",
      query: {
        type: "SELECT",
        object: selectedNav,
        filter: {
          type: "AND",
          expression: [],
        },
        limit: 20,
      },
    },
  });

  // handling hook form array fields
  const { fields, replace } = useFieldArray({ control, name: "query.fields" });
  const {
    fields: expressionFields,
    append: expressionAppend,
    remove: expressionRemove,
  } = useFieldArray({
    control,
    name: "query.filter.expression",
  });

  // local states
  const [selectedFields, setSelectedFields] = useState<
    { label: string; value: string }[] | null
  >(null);

  //   onSubmit handler
  const onSubmit = async (formData: AddNewTabInterface) => {
    if (formData?.query?.filter?.expression?.length) {
      formData?.query?.filter?.expression?.map((item) => {
        if (fieldTypes?.[item.field] !== "boolean") {
          item.value = `'${item?.value}'`;
        }
      });
    }
    try {
      if (defaultValues) {
        await salesforce({
          method: "PATCH",
          url: `metaData/${selectedGridTab}`,
          data: formData,
        });
        // dispatch(setReFetchTabs());
      } else await salesforce({ method: "POST", url: "views", data: formData });
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
      // updateUrl(defaultGrid._id, { page: 1, limit: defaultGrid.query.limit });
      console.log("sucess");

      if (refetch) refetch();
      onHide();
    } catch (error) {
      console.log(error);
    }
  };

  // handling onSelectChange
  const onSelectChange = (values: any) => {
    setSelectedFields(values);
    const newArray = values?.map(
      (item: { label: string; value: string }, i: number) => {
        return {
          name: item?.value,
          columnOrder: i + 1,
          isVisible: true,
          width: 300,
        };
      }
    );
    replace(newArray);
  };

  // handling pick list options
  const pickListOptions = (name: string) => {
    const list = metadata?.find((item: any) => item?.name === name);
    return (
      list?.picklistValues?.map((item: any, i: number) => {
        return {
          id: i.toString(),
          label: item?.label,
          value: item?.value,
        };
      }) || []
    );
  };

  // handling fields according to type
  const renderField = (
    type: string | undefined,
    field: {
      id: string;
      field: string;
      operator: string;
      value: string;
    },
    index: number,
    options: { id: string; label: string; value: string }[]
  ) => {
    console.log(type, "type, fields");
    switch (type) {
      case "picklist":
        return (
          <ReactSelectField
            key={field.id}
            control={control}
            label={"Operator"}
            name={`query.filter.expression.${index}.value`}
            mainClass="col-md-4"
            options={options}
            rules={{
              required: { value: false, message: "" },
            }}
          />
        );
      case "boolean":
        return (
          <ReactSelectField
            key={field.id}
            control={control}
            label={"Operator"}
            name={`query.filter.expression.${index}.value`}
            mainClass="col-md-4"
            options={[
              { id: 1, label: "True", value: "true" },
              { id: 1, label: "False", value: "false" },
            ]}
            rules={{
              required: { value: false, message: "" },
            }}
          />
        );
      case "currency":
      case "int":
      case "double":
        return (
          <InputField
            key={field.id}
            control={control}
            type="number"
            label={"Value"}
            name={`query.filter.expression.${index}.value`}
            mainClass="col-md-4"
            inputProps={{
              placeholder: `Enter value`,
            }}
            rules={{
              required: { value: true, message: "" },
              maxLength: {
                value: 30,
                message: "Maximum 30 length is allowed",
              },
            }}
          />
        );
      case "date":
      case "datetime":
        return (
          <InputField
            key={field.id}
            control={control}
            type={type}
            label={"Value"}
            name={`query.filter.expression.${index}.value`}
            mainClass="col-md-4"
            inputProps={{
              placeholder: `Enter value`,
            }}
            rules={{
              required: { value: true, message: "" },
            }}
          />
        );
      default:
        return (
          <InputField
            key={field.id}
            control={control}
            label={"Value"}
            name={`query.filter.expression.${index}.value`}
            mainClass="col-md-4"
            inputProps={{
              placeholder: `Enter value`,
            }}
            rules={{
              required: { value: true, message: "" },
              maxLength: {
                value: 56,
                message: "Maximum 56 characters are allowed",
              },
            }}
          />
        );
    }
  };

  // handling default value in edit
  useEffect(() => {
    if (defaultValues) {
      const values = defaultValues?.query?.fields?.map((item) => {
        return {
          label: item?.name,
          value: item?.name,
        };
      });
      setSelectedFields(values);
    }
  }, [defaultValues]);

  return (
    <Modal show={show} onHide={onHide} dialogClassName="custom-modal dialog-md">
      <Modal.Header closeButton>
        <Modal.Title>
          {defaultValues ? "Edit View of" : "Add New View to"} {selectedNav}
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)} className="msform">
        <Modal.Body>
          <div className="form-step-content">
            <div className="form-wrapper">
              <div className="row g-3">
                <InputField
                  control={control}
                  label={"View Name"}
                  name={"label"}
                  mainClass="col-sm-12"
                  inputProps={{
                    placeholder: `Enter View Name`,
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
                  label={"Description"}
                  name={"description"}
                  mainClass="col-sm-12"
                  inputProps={{
                    placeholder: "Enter Description",
                  }}
                  rules={{
                    required: { value: true, message: "" },
                    maxLength: {
                      value: 256,
                      message: "Maximum 256 characters are allowed",
                    },
                  }}
                />

                <MultipleRadioButtonField
                  control={control}
                  label={"Filter"}
                  name={"query.filter.type"}
                  mainClass="radiobutton-switch"
                  options={[
                    {
                      label: "AND",
                      value: "AND",
                    },
                    {
                      label: "OR",
                      value: "OR",
                    },
                  ]}
                  rules={{
                    required: { value: true, message: "" },
                  }}
                />
                {/* <div className="col-auto">
                  <label className="form-label">
                    Filter <span className="forms-req-symbol">*</span>
                  </label>
                  <div className="switch-field">
                    <input type="radio" id="switch_1_and" name="switch_1" value="and" checked />
                    <label htmlFor="switch_1_and">And</label>
                    <input type="radio" id="switch_1_or" name="switch_1" value="or" />
                    <label htmlFor="switch_1_or">Or</label>
                  </div>
                </div> */}
                <Select
                  value={selectedFields}
                  onChange={onSelectChange}
                  options={metadata?.map((item: any) => {
                    return {
                      label: item?.label,
                      value: item?.name,
                    };
                  })}
                  isMulti={true}
                  className={`simpledropdown  col-sm-12`}
                  classNamePrefix="custom-react-select"
                />
                {/* <ul className="select-value-container">
                  <li>
                    <div className="select_-multi-value-label"> Opportunity ID </div>
                    <Button type="button" className="btn-value-remove">
                      x
                    </Button>
                  </li>
                  <li>
                    <div className="select_-multi-value-label"> Opportunity ID </div>
                    <Button type="button" className="btn-value-remove">
                      x
                    </Button>
                  </li>
                </ul> */}
                {expressionFields.map((field, index) => (
                  <>
                    <div className="addexpression-content">
                      <div className="addexpression-wrapper">
                        <ReactSelectField
                          key={field.id}
                          control={control}
                          label={"Field"}
                          name={`query.filter.expression.${index}.field`}
                          mainClass="col-md-4"
                          options={
                            metadata
                              ?.filter((fil: any) =>
                                fields.some((sm) => sm?.name === fil.name)
                              )
                              ?.map((item: any) => {
                                return {
                                  id: item?.name,
                                  label: item?.label,
                                  value: item?.name,
                                };
                              }) || []
                          }
                          rules={{
                            required: { value: false, message: "" },
                          }}
                        />
                        <ReactSelectField
                          key={field.id}
                          control={control}
                          label={"Operator"}
                          name={`query.filter.expression.${index}.operator`}
                          mainClass="col-md-4"
                          options={operators}
                          rules={{
                            required: { value: false, message: "" },
                          }}
                        />
                        {renderField(
                          fieldTypes?.[
                            watch(`query.filter.expression.${index}.field`)
                          ],
                          field,
                          index,
                          pickListOptions(
                            watch(`query.filter.expression.${index}.field`)
                          )
                        )}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            expressionRemove(index);
                          }}
                          className="expression-dlt"
                        >
                          <span className="icons-delete"></span>
                        </a>
                      </div>
                    </div>
                  </>
                ))}
                <div className="col-sm-12">
                  <button
                    className="btn-salesboost"
                    type="button"
                    onClick={() =>
                      expressionAppend({
                        field: "",
                        operator: "",
                        value: "",
                      })
                    }
                    disabled={fields?.length <= 0}
                  >
                    + Add Expression
                  </button>
                </div>
                <InputField
                  control={control}
                  label={"Limit"}
                  type="number"
                  name={"query.limit"}
                  normalize={(value: string) => parseInt(value)}
                  mainClass="col-sm-12"
                  inputProps={{
                    placeholder: `Enter Limit`,
                  }}
                  rules={{
                    required: { value: true, message: "" },
                    maxLength: {
                      value: 56,
                      message: "Maximum 56 characters are allowed",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            type="button"
            onClick={onHide}
            className="btn-bordered btn btn-secondary"
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="btn-salesboost btn btn-primary"
            disabled={isSubmitting}
          >
            Save Changes
            {isSubmitting && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginLeft: "10px" }}
              />
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default AddNewTab;
