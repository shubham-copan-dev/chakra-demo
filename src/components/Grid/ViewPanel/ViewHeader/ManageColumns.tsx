import { ChangeEvent, useRef, useState } from "react";
import { Dropdown, Form, ListGroup } from "react-bootstrap";
// import { useParams } from "react-router-dom";

import { salesforce } from "@/axios/actions/salesforce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateGridTabs } from "@/redux/slices/salesForce";
import { setMetaData, updateColumnMeta } from "@/redux/slices/gridmetadata";
import "./managecolumn.css";
import { Spinner } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
// setColumnMeta,updateColumnMeta,
function ManageColumns({ onHide }: { onHide: () => void }) {
  // use hooks
  const { selectedGridTab }: any = useAppSelector((state) => state.salesforce);
  const dispatch = useAppDispatch();

  // use refs
  const dragItemNode = useRef<any>();
  const dragItem = useRef<any>();

  // global states
  const { metadata } = useAppSelector((state) => state.metadata);
  const { selectedViewBy } = useAppSelector((state) => state.fieldupdate);
  const { viewByMeta } = useAppSelector((state) => state.Viewmetadata);
  const { viewGridData } = useAppSelector((state) => state.salesforce);

  // constants
  const currentTab = Array.isArray(viewGridData)
    ? viewGridData.find((fi: any) => fi?._id === selectedGridTab)
    : null;
  let labels: { [key: string]: string } = {};
  metadata?.map((item: any) => {
    labels = { ...labels, [item.name]: item?.label };
  });

  const viewBySelected = viewByMeta?.find(
    (fil: any) => fil?.label === selectedViewBy
  );
  const viewByNames = viewBySelected?.query?.fields?.map(
    (item: any) => item?.name
  );

  // local states
  const [onGoingRequests, setOnGoingRequests] = useState<string[]>([]);
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragEnteredPosition, setDragEnteredPosition] = useState<number | null>(
    null
  );

  // handling column
  const handleColumn = async (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    const copyObj = metadata?.find((fi: any) => fi?.name === name);
    if (copyObj) {
      if (currentTab && !onGoingRequests?.includes(name)) {
        const newFields = currentTab?.query?.fields?.map((item) => {
          if (copyObj?.name === item?.name) {
            return {
              ...item,
              isVisible: checked,
            };
          }
          return item;
        });
        // dispatch(
        //   updateGridTabs({
        //     ...currentTab,
        //     query: { ...currentTab.query, fields: newFields },
        //   })
        // );
        setOnGoingRequests((prev) => [...prev, name]);
        await salesforce({
          method: "PATCH",
          url: `metadata/field/${selectedGridTab}`,
          data: {
            query: {
              fields: newFields,
            },
          },
        });
        setOnGoingRequests((prev) => {
          const copy = [...prev];
          const index = copy?.findIndex((fi) => fi === name);
          copy?.splice(index, 1);
          return copy;
        });
      }
      dispatch(
        updateColumnMeta({
          ...copyObj,
          uiMetadata: { ...copyObj.uiMetadata, isVisible: checked },
        })
      );
    }
  };

  // handling checked
  const handleChecked = (name: string) => {
    const copyObj = metadata?.find((fi) => fi?.name === name);
    return copyObj?.uiMetadata?.isVisible;
  };

  // handling drag end
  const handleDragEnd = () => {
    setDragging(false);
    setDragEnteredPosition(null);
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
  };

  // handling dragging
  const handleDragStart = (e: any, item: { itemI: number }) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  // handling drag enter
  const handleDragEnter = (e: any, targetItem: { itemI: number }) => {
    if (dragItemNode.current !== e.target) {
      setDragEnteredPosition(targetItem?.itemI);
    }
  };

  // handling on drop
  const onDrop = async (e: any, targetItem: { itemI: number }) => {
    setDragging(false);
    if (dragItemNode.current !== e.target) {
      if (currentTab) {
        const name = currentTab.query.fields?.[dragItem?.current?.itemI]?.name;
        const copyFields = [...currentTab.query.fields];
        const moveElements = (index1: number, index2: number) => {
          // [copyFields[index1], copyFields[index2]] = [copyFields[index2], copyFields[index1]]; // this to switch
          copyFields.splice(index2, 0, copyFields.splice(index1, 1)[0]); // this is to move
        };
        moveElements(dragItem?.current?.itemI, targetItem?.itemI);
        const newFields = copyFields?.map((item, i: number) => {
          return {
            ...item,
            columnOrder: i + 1,
          };
        });

        dispatch(
          updateGridTabs({
            ...currentTab,
            query: { ...currentTab.query, fields: newFields },
          })
        );
        setOnGoingRequests((prev) => [...prev, name]);
        await salesforce({
          method: "PATCH",
          url: `metadata/field/${selectedGridTab}`,
          data: {
            query: {
              fields: newFields,
            },
          },
        });
        setOnGoingRequests((prev) => {
          const copy = [...prev];
          const index = copy?.findIndex((fi) => fi === name);
          copy?.splice(index, 1);
          return copy;
        });

        let newOrder: { [key: string]: number } = {};
        newFields?.map((item) => {
          newOrder = { ...newOrder, [item.name]: item.columnOrder };
        });

        const newColumnMeta = metadata?.map((item: any) => {
          if (newOrder?.[item.name] >= 0) {
            return {
              ...item,
              uiMetadata: {
                ...item?.uiMetadata,
                columnOrder: newOrder?.[item.name],
              },
            };
          }
          return item;
        });

        dispatch(setMetaData(newColumnMeta));

        dragItem.current = null;
        dragItemNode.current = null;
        setDragEnteredPosition(null);
      }
    }
  };

  // handling render list
  const renderList = () => {
    return currentTab?.query?.fields
      ?.filter?.((fil: any) =>
        selectedViewBy === "all" ? fil : viewByNames?.includes(fil?.name)
      )
      ?.sort((a: any, b: any) => {
        return (a?.columnOrder ?? 0) - (b?.columnOrder ?? 0);
      })
      .map((item: any, itemI: number) => {
        return (
          <ListGroup.Item
            key={item?.name}
            draggable={selectedViewBy === "all"}
            onDragStart={(e) => handleDragStart(e, { itemI })}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragEnter={
              dragging
                ? (e) => {
                    handleDragEnter(e, {
                      itemI,
                    });
                  }
                : undefined
            }
            onDrop={(e) => {
              onDrop(e, {
                itemI,
              });
            }}
            style={{}}
          >
            <span className="icons-dots"></span>
            <Form.Check
              className="form-group-checkbox"
              type="checkbox"
              id={item?.name}
              name={item?.name}
              style={{ marginRight: "10px" }}
              checked={handleChecked(item?.name)}
              onChange={handleColumn}
              label={labels?.[item.name]}
            />
            {dragEnteredPosition === itemI && <p className="dragging-line"></p>}
            {onGoingRequests?.includes(item.name) && <Spinner />}
          </ListGroup.Item>
        );
      });
  };

  return (
    <>
      <Dropdown.Menu className="custom-dropdown-menu" show>
        <div className="modal-content">
          <div
            className="modal-header"
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "1.2rem",
            }}
          >
            <div className="modal-heading-content">
              <h3 className="modal-title">Manage Columns</h3>
              {/* <p>Deep dive into data by setting up your perefrences.</p> */}
            </div>
            <button type="button" className="close" onClick={onHide}>
              <CloseIcon fontSize={9} />
            </button>
          </div>
        </div>
        <ListGroup>{renderList()}</ListGroup>
      </Dropdown.Menu>
    </>
  );
}

export default ManageColumns;
