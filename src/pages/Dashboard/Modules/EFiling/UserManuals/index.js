import { useFormik } from "formik";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

// import { Layout } from "../../../../../../components/Layout";

import "react-image-gallery/styles/css/image-gallery.css";

// import {
//   EfilingSideBarBranchItem,
//   EfilingSideBarItem,
// } from "../../../../../../utils/sideBarItems";
import { Spinner } from "react-bootstrap";
import {
  EfilingSideBarBranchItem,
  EfilingSideBarItem,
} from "../../../../../utils/sideBarItems";
import { Layout } from "../../../../../components/Layout";
import { getUserData } from "../../../../../api/Auth";

function UserManulas() {
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);
  const UserData = getUserData();
  const [filesData, setFilesData] = useState(null);

  // Component to render PDF preview
  const PdfPreview = ({ pdfUrl }) => {
    return (
      <div style={{ position: "relative", marginBottom: "20px" }}>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <Spinner />
          </div>
        )}
        <iframe
          src={pdfUrl}
          width="100%"
          height="800px"
          style={{ border: "none", display: loading ? "none" : "block" }}
          title="PDF Preview"
          onLoad={() => setLoading(false)} // Event listener for when the PDF is fully loaded
        />
      </div>
    );
  };

  return (
    <Layout
      centerlogohide={true}
      module={false}
      sidebarItems={
        UserData && UserData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }
    >
      <ToastContainer />
      {/* <Header
        dashboardLink={"/efiling/dashboard"}
        addLink1={"/efiling/dashboard/fresh-receipt"}
        title1={"Fresh Receipts"}
        addLink2={"/efiling/dashboard/addedit"}
        title2={"FR Detail"}
        width={"500px"}
      /> */}

      <div className="custom-editor">
        <div className="row">
          <div className="col">
            <section>
              {/* <PdfPreview pdfUrl={`../../../../../assets/userGuidence.pdf`} /> */}
              <PdfPreview pdfUrl="/userGuidence.pdf" />
              {/* <PdfPreview pdfUrl={`${userGuidence}`} /> */}
            </section>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Layout>
  );
}

export default UserManulas;
