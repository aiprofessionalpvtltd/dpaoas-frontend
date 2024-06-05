import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { getAllParliamentaryYears } from "../../../../../../api/APIs/Services/ManageQMS.service";
import {
  createNewOrdinance,
  getSingleOrdinanceByID,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import { getUserData } from "../../../../../../api/Auth";
import { showSuccessMessage } from "../../../../../../utils/ToastAlert";
import moment from "moment";
function AddOrdinance() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessions } = useContext(AuthContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isNACalendarOpen, setIsNACalendarOpen] = useState(false);
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [singleOrdinanceData, setSingleOrdinanceData] = useState([]);
  const userData = getUserData();
  // Handle Claneder Toggel
  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("dateOfLayingSenate", date);
    setIsCalendarOpen(false);
  };
  // Handle Claneder Toggel
  const handleNACalendarToggle = () => {
    setIsNACalendarOpen(!isNACalendarOpen);
  };
  // Handale DateCHange
  const handleNADateSelect = (date) => {
    formik.setFieldValue("dateOfLayingNA", date);
    setIsNACalendarOpen(false);
  };

  const GetParlimentaryYearsApi = async () => {
    try {
      const response = await getAllParliamentaryYears(0, 300);
      if (response.success) {
        setParliamentaryYearData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetParlimentaryYearsApi();
  }, []);

  const formik = useFormik({
    initialValues: {
      parliamentaryYear: "",
      session: "",
      dateOfLayingSenate: "",
      dateOfLayingNA: "",
      // fkUserId : fkUserId,
      title: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
      if (location?.state?.id) {
        //   handleEditBill(values);
        console.log(values);
      } else {
        CreateOrdinance(values);
      }
    },
  });

  const CreateOrdinance = async (values) => {
    const data = {
      fkParliamentaryYearId: values?.parliamentaryYear,
      fkSessionId: values?.session,
      fkUserId: userData && userData?.id,
      ordinanceTitle: values?.title,
      dateOfLayingInTheSenate: values?.dateOfLayingSenate && moment(values?.dateOfLayingSenate).format("YYYY-MM-DD"),
      dateOfLayingInTheNA: values?.dateOfLayingNA && moment(values?.dateOfLayingNA).format("YYYY-MM-DD"),
      fkOrdinanceStatus:1
    };

    try {
      const response = await createNewOrdinance(data);
      if (response?.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/lgms/dashboard/ordinances/ordinance-list");
        }, [3000]);
      }
      console.log(response?.data);
    } catch (error) {}
  };

  const getOrdinanceByIdApi = async () => {
    try {
      const response = await getSingleOrdinanceByID(
        location.state && location.state?.id
      );
      if (response?.success) {
        setSingleOrdinanceData(response?.data);
      }
    } catch (error) {
      // showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      getOrdinanceByIdApi();
    }
  }, []);
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={"/lgms/dashboard"}
        title1={location?.state ? "Edit Ordinance" : "Add Ordinance"}
      />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg">
            <h1>New Ordinance</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Parliamentary Year</label>
                    <select
                      id="parliamentaryYear"
                      name="parliamentaryYear"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.parliamentaryYear}
                    >
                      <option value="" disabled hidden>
                        Select Parliamentary Year
                      </option>
                      {parliamentaryYearData &&
                        parliamentaryYearData.map((item) => (
                          <option value={item.id}>
                            {item.parliamentaryTenure}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Session</label>
                    <select
                      id="session"
                      name="session"
                      className="form-select"
                      onChange={formik.handleChange}
                      value={formik.values.session}
                    >
                      <option value="" disabled hidden>
                        Select Session
                      </option>
                      {sessions &&
                        sessions.map((item) => (
                          <option value={item.id}>{item.sessionName}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className=" col">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <textarea
                      name="title"
                      id="title"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3" style={{ position: "relative" }}>
                    <label className="form-label">
                      Date of Laying in the Senate
                    </label>
                    <span
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "36px",
                        zIndex: 1,
                        fontSize: "20px",
                        zIndex: "1",
                        color: "#666",
                        cursor: "pointer",
                      }}
                      onClick={handleCalendarToggle}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>

                    <DatePicker
                      selected={formik.values.dateOfLayingSenate}
                      onChange={handleDateSelect}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.dateOfLayingSenate &&
                        formik.errors.dateOfLayingSenate
                          ? "is-invalid"
                          : ""
                      }`}
                      open={isCalendarOpen}
                      onClickOutside={() => setIsCalendarOpen(false)}
                      onInputClick={handleCalendarToggle}
                      // onClick={handleCalendarToggle}
                      maxDate={new Date()}
                      dateFormat="dd-MM-yyyy"
                    />
                    {formik.touched.dateOfLayingSenate &&
                      formik.errors.dateOfLayingSenate && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {formik.errors.dateOfLayingSenate}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3" style={{ position: "relative" }}>
                    <label className="form-label">
                      Date of Laying in the National Assembly
                    </label>
                    <span
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "36px",
                        zIndex: 1,
                        fontSize: "20px",
                        zIndex: "1",
                        color: "#666",
                        cursor: "pointer",
                      }}
                      onClick={handleNACalendarToggle}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>

                    <DatePicker
                      selected={formik.values.dateOfLayingNA}
                      onChange={handleNADateSelect}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.dateOfLayingNA &&
                        formik.errors.dateOfLayingNA
                          ? "is-invalid"
                          : ""
                      }`}
                      open={isNACalendarOpen}
                      onClickOutside={() => setIsNACalendarOpen(false)}
                      onInputClick={handleNACalendarToggle}
                      // onClick={handleCalendarToggle}
                      maxDate={new Date()}
                      dateFormat="dd-MM-yyyy"
                    />
                    {formik.touched.dateOfLayingNA &&
                      formik.errors.dateOfLayingNA && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {formik.errors.dateOfLayingNA}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default AddOrdinance;
