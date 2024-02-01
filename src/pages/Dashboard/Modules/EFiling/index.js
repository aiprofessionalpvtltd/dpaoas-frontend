import React, { useState } from "react";
import { Layout } from "../../../../components/Layout";
import Header from "../../../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import thumbnail from "./../../../../assets/profile-img.jpg";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from "mdb-react-ui-kit";
import { TinyEditor } from "../../../../components/CustomComponents/Editor/TinyEditor";

  const EFilingModal = ({ isOpen, toggleModal, title, children }) => {
    return (
      <MDBModal open={isOpen} setopen={toggleModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="justify-content-center align-items-center">{children}</MDBModalBody>
  
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleModal}>
                Close
              </MDBBtn>
              <MDBBtn>Submit</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  };

function EFilingDashboard() {
    const [editorContent, setEditorContent] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const toggleModal = () => setIsModalOpen(!isModalOpen);

  // use it (editorContent) when submitting whole file content
  console.log("Editor content", editorContent);
  return (
    <Layout centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/efiling/dashboard"}
        title1={"E-Filing"}
      />

        <div class="container-fluid dash-detail-container card" style={{ margin: "0 10px" }}>
          <div class="row">
            <div class="col-12">
              <CustomTable
                data={data}
                tableTitle="Files List"
                addBtnText="Create Case"
                addBtnText2="Create File"
                handleAdd={() => navigate("/efiling/dashboard/addeditcase")}
                handleAdd2={() => navigate("/efiling/dashboard/addedit")}
                handleEdit={(item) => navigate("/efiling/dashboard/fileDetail", { state: item })}
                handleView={(item) => navigate("/efiling/dashboard/fileDetail", { state: { view: true } })}
                showView={true}
                headertitlebgColor={"#666"}
                headertitletextColor={"#FFF"}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={count}
              />
            </div>
          </div>
        </div>

    </Layout>
  );
}

export default EFilingDashboard;