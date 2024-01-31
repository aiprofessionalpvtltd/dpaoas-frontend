import React, { useState } from "react";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const validationSchema = Yup.object({
  employeename: Yup.string().required("Employee name is required"),
  filenumber: Yup.string().required("File Number is required"),
  fatherhusbandname: Yup.string().required("Father/Husband Name is required"),
  cnicnumber: Yup.string().required("CNIC Number is required"),
  permanentaddress: Yup.string().required("Permanent Address is required"),
});

const columnStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  margin: '10vh auto',
  width: '80%',
  height: '80vh',
  gap: '8px',
};

const col6Style = {
  flex: '0 0 50%',
  maxWidth: '50%',
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

  const initialColumns = {
    ministries: {
      id: 'ministries',
      list: ['Ministry 1', 'Ministry 2', 'Ministry 3'],
    },
    group1: {
      id: 'group1',
      list: [],
    },
    group2: {
      id: 'group2',
      list: [],
    },
    group3: {
      id: 'group3',
      list: [],
    },
    group4: {
      id: 'group4',
      list: [],
    },
    group5: {
      id: 'group5',
      list: [],
    },
  };

  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return null;

    if (source.droppableId === destination.droppableId && destination.index === source.index) {
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

  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/qms/manage"}
        addLink1={"/qms/manage/groups"}
        title1={"Ministries"}
      />
      {/* <ToastContainer /> */}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sessionNo}
                      >
                        <option value={""} selected disabled hidden>
                          Select
                        </option>
                        <option>Pending</option>
                        <option>Approved</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Draggable and Droppable for the first column */}
                  <DragDropContext onDragEnd={onDragEnd}>
                    <div class="col-6">
                      <label class="form-label">Ministries</label>
                      <Droppable droppableId="ministries">
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="col-12"
                            style={{
                              border: '1px solid #dee2e6',
                              padding: 10,
                              height: '720px',
                              borderRadius: '10px',
                              overflow: 'auto',
                            }}
                          >
                            {columns.ministries.list.map((item, index) => (
                              <Draggable key={item} draggableId={item} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div 
                                    style={{
                                      backgroundColor: '#f0f0f0',
                                      width: '100%',
                                      padding: '4px',
                                      marginBottom: '5px',
                                      borderRadius: '5px',
                                    }}>
                                    <span>{item}</span>
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
                      <div>
                        <label class="form-label">Group 1</label>
                        <Droppable droppableId="group1">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="col-12"
                              style={{
                                border: '1px solid #dee2e6',
                                padding: 10,
                                height: '110px',
                                borderRadius: '10px',
                                overflow: 'auto',
                              }}
                            >
                              {columns.group1.list.map((item, index) => (
                                <Draggable key={item} draggableId={item} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                    <div 
                                      style={{
                                      backgroundColor: '#f0f0f0',
                                      width: '100%',
                                      padding: '4px',
                                      marginBottom: '5px',
                                      borderRadius: '5px',
                                    }}>
                                      <span>{item}</span>
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

                        {/* Draggable and Droppable for the group2 column */}
                        <div>
                          <label class="form-label mt-2">Group 2</label>
                          <Droppable droppableId="group2">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="col-12"
                                style={{
                                  border: '1px solid #dee2e6',
                                  padding: 10,
                                  height: '110px',
                                  borderRadius: '10px',
                                  overflow: 'auto',
                                }}
                              >
                                {columns.group2.list.map((item, index) => (
                                  <Draggable key={item} draggableId={item} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                      <div 
                                        style={{
                                        backgroundColor: '#f0f0f0',
                                        width: '100%',
                                        padding: '4px',
                                        marginBottom: '5px',
                                        borderRadius: '5px',
                                      }}>
                                        <span>{item}</span>
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

                        {/* Draggable and Droppable for the group3 column */}
                        <div>
                          <label class="form-label mt-2">Group 3</label>
                          <Droppable droppableId="group3">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="col-12"
                                style={{
                                  border: '1px solid #dee2e6',
                                  padding: 10,
                                  height: '110px',
                                  borderRadius: '10px',
                                  overflow: 'auto',
                                }}
                              >
                                {columns.group3.list.map((item, index) => (
                                  <Draggable key={item} draggableId={item} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                      <div 
                                        style={{
                                        backgroundColor: '#f0f0f0',
                                        width: '100%',
                                        padding: '4px',
                                        marginBottom: '5px',
                                        borderRadius: '5px',
                                      }}>
                                        <span>{item}</span>
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

                          {/* Draggable and Droppable for the group4 column */}
                          <div>
                          <label class="form-label mt-2">Group 4</label>
                          <Droppable droppableId="group4">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="col-12"
                                style={{
                                  border: '1px solid #dee2e6',
                                  padding: 10,
                                  height: '110px',
                                  borderRadius: '10px',
                                  overflow: 'auto',
                                }}
                              >
                                {columns.group4.list.map((item, index) => (
                                  <Draggable key={item} draggableId={item} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                      <div 
                                        style={{
                                        backgroundColor: '#f0f0f0',
                                        width: '100%',
                                        padding: '4px',
                                        marginBottom: '5px',
                                        borderRadius: '5px',
                                      }}>
                                        <span>{item}</span>
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

                        {/* Draggable and Droppable for the group5 column */}
                        <div>
                          <label class="form-label mt-2">Group 5</label>
                          <Droppable droppableId="group5">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="col-12"
                                style={{
                                  border: '1px solid #dee2e6',
                                  padding: 10,
                                  height: '110px',
                                  borderRadius: '10px',
                                  overflow: 'auto',
                                }}
                              >
                                {columns.group5.list.map((item, index) => (
                                  <Draggable key={item} draggableId={item} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                      <div 
                                        style={{
                                        backgroundColor: '#f0f0f0',
                                        width: '100%',
                                        padding: '4px',
                                        marginBottom: '5px',
                                        borderRadius: '5px',
                                      }}>
                                        <span>{item}</span>
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

                      </div>
                    
                  </DragDropContext>
                </div>

                <div class="row mt-4">
                  <div class="col">
                    <button class="btn btn-primary float-end" type="submit">
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
