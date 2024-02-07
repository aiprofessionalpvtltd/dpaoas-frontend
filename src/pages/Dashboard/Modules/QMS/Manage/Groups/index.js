import React, { useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getDivisionsBySessionId, updateDivisionsAndGroups } from "../../../../../../api/APIs/Services/ManageQMS.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  employeename: Yup.string().required("Employee name is required"),
  filenumber: Yup.string().required("File Number is required"),
  fatherhusbandname: Yup.string().required("Father/Husband Name is required"),
  cnicnumber: Yup.string().required("CNIC Number is required"),
  permanentaddress: Yup.string().required("Permanent Address is required"),
});

const columnStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  margin: "10vh auto",
  width: "80%",
  height: "80vh",
  gap: "8px",
};

const col6Style = {
  flex: "0 0 50%",
  maxWidth: "50%",
};

function QMSGroups() {
  const formik = useFormik({
    initialValues: {
      sessionNo: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  // const initialColumns = {
  //   ministries: {
  //     id: "ministries",
  //     list: [
  //       { id: 0, divisionName: "Ministry 1" },
  //       { id: 1, divisionName: "Ministry 2" },
  //       { id: 2, divisionName: "Ministry 3" },
  //     ],
  //   },
  //   group1: {
  //     id: "0",
  //     groupId: "group1",
  //     list: [],
  //   },
  //   group2: {
  //     id: "1",
  //     groupId: "group2",
  //     list: [],
  //   },
  //   group3: {
  //     id: "2",
  //     groupId: "group3",
  //     list: [],
  //   },
  //   group4: {
  //     id: "3",
  //     groupId: "group4",
  //     list: [],
  //   },
  //   group5: {
  //     id: "4",
  //     groupId: "group5",
  //     list: [],
  //   },
  // };

  const [columns, setColumns] = useState({});
  const [sessionId, setSessionId] = useState();
  const [draggedItemDivision, setDraggedItemDivision] = useState();

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return null;

    // // Check if destination is availableDivisions & Item is dragged to this then set it to some hook
    // if (destination.droppableId === "availableDivisions") {
    //   // Get the dragged item
    //   const draggedItem = columns[source.droppableId].list[source.index];
      
    //   // Set the dragged item into the state
    //   console.log("Dragged item", draggedItem);
    //   // setDraggedItemDivision(draggedItem);
    // } else {
    //   // Reset the dragged item state if not dropped into "availableDivisions"
    //   // setDraggedItemDivision(null);
    // }

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return null;
    }

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newList = Array.from(start.list);
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);

      const newCol = {
        id: start.id,
        list: newList,
      };

      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
    } else {
      const newStartList = Array.from(start.list);
      newStartList.splice(source.index, 1);

      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      const newEndList = Array.from(end.list);
      newEndList.splice(destination.index, 0, start.list[source.index]);

      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
    }

    return null;
  };

  const handleSessionChange = async (e) => {
    setSessionId(e.target.value);
    try {
      const response = await getDivisionsBySessionId(e.target.value);
      if (response?.success) {
        console.log("data", response?.data);
        const initialColumns = {
            availableDivisions: {
              id: "availableDivisions",
              list: response?.data?.availableDivisions ? response?.data?.availableDivisions?.list : [],
            },
            group1: {
              id: "group1",  // Add the id property
              list: response?.data?.group1 ? response?.data?.group1?.list : [],
            },
            group2: {
              id: "group2",  // Add the id property
              list: response?.data?.group2 ? response?.data?.group2?.list : [],
            },
            group3: {
              id: "group3",  // Add the id property
              list: response?.data?.group3 ? response?.data?.group3?.list : [],
            },
            group4: {
              id: "group4",  // Add the id property
              list: response?.data?.group4 ? response?.data?.group4?.list : [],
            },
            group5: {
              id: "group5",  // Add the id property
              list: response?.data?.group5 ? response?.data?.group5?.list : [],
            }          
        };
        console.log("initialColumns", initialColumns);
        setColumns(initialColumns);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const handleUpdate = async () => {
    const updatedDivisions = columns?.availableDivisions?.list?.map(item => ({ id: item.id }));
    const updatedGroup1 = columns?.group1?.list?.map(item => ({ id: item.id }));
    const updatedGroup2 = columns?.group2?.list?.map(item => ({ id: item.id }));
    const updatedGroup3 = columns?.group3?.list?.map(item => ({ id: item.id }));
    const updatedGroup4 = columns?.group4?.list?.map(item => ({ id: item.id }));
    const updatedGroup5 = columns?.group5?.list?.map(item => ({ id: item.id }));

    const updatedColumns = {
      availableDivisions: updatedDivisions,
      group1: {
        id: 1, 
        list: updatedGroup1,
      },
      group2: {
        id: 2, 
        list: updatedGroup2,
      },
      group3: {
        id: 3, 
        list: updatedGroup3,
      },
      group4: {
        id: 4, 
        list: updatedGroup4,
      },
      group5: {
        id: 5, 
        list: updatedGroup5
      }          
    };

    try {
      const response = await updateDivisionsAndGroups(sessionId, updatedColumns);
      if (response?.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/qms/manage"}
        addLink1={"/qms/manage/groups"}
        title1={"Ministries"}
      />
      <ToastContainer />

      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {<h1>Add Groups</h1>}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Session No</label>
                      <select
                        class="form-select"
                        id="sessionNo"
                        name="sessionNo"
                        onChange={handleSessionChange}
                        value={sessionId}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option value={"1"}>2022</option>
                        <option value={"2"}>2023</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Draggable and Droppable for the first column */}
                  <DragDropContext onDragEnd={onDragEnd}>
                    <div class="col-6">
                      <label class="form-label">Ministries</label>
                      <Droppable droppableId="availableDivisions">
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="col-12"
                            style={{
                              border: "1px solid #dee2e6",
                              padding: 10,
                              height: "720px",
                              borderRadius: "10px",
                              overflow: "auto",
                            }}
                          >
                            {columns?.availableDivisions?.list?.map((item, index) => (
                              <Draggable
                                key={item?.id?.toString()}  // Use index as a fallback if id is undefined
                                draggableId={item?.id?.toString()} 
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div
                                      style={{
                                        backgroundColor: "#f0f0f0",
                                        width: "100%",
                                        padding: "4px",
                                        marginBottom: "5px",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      <span>{item?.divisionName}</span>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                    <div class="col-6">
                      {/* Draggable and Droppable for the second column */}
                      {Object.keys(columns)
                        ?.filter((colId) => colId !== "availableDivisions") // Exclude 'ministries' column
                        ?.map((groupColId, groupIndex) => (
                          <div style={{ marginTop: groupIndex === 0 ? '0px' : '10px' }}>
                            <label class="form-label">
                              Group {groupIndex + 1}
                            </label>
                            <Droppable droppableId={groupColId}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="col-12"
                                  style={{
                                    border: "1px solid #dee2e6",
                                    padding: 10,
                                    height: "110px",
                                    borderRadius: "10px",
                                    overflow: "auto",
                                  }}
                                >
                                  {columns[groupColId]?.list?.map(
                                    (item, index) => (
                                      <Draggable
                                        key={item?.id?.toString()}  // Use index as a fallback if id is undefined
                                        draggableId={item?.id?.toString()} 
                                        index={index}
                                      >
                                        {(provided, snapshot) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <div
                                              style={{
                                                backgroundColor: "#f0f0f0",
                                                width: "100%",
                                                padding: "4px",
                                                marginBottom: "5px",
                                                borderRadius: "5px",
                                              }}
                                            >
                                              <span>{item?.divisionName}</span>
                                            </div>
                                          </div>
                                        )}
                                      </Draggable>
                                    )
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </div>
                        ))}
                    </div>
                  </DragDropContext>
                </div>

                <div class="row mt-4">
                  <div class="col">
                    <button class="btn btn-primary float-end" type="submit" onClick={handleUpdate}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSGroups;
