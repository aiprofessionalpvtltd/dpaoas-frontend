import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../components/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../../api/AuthContext";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Select from "react-select";
import TimePicker from "react-time-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  createNewLegislationBill,
  getAllMNALists,
} from "../../../../../../../api/APIs/Services/LegislationModule.service";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../../../../../../../api/Auth";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import * as Yup from "yup";
import moment from "moment";
import { getSingleMinisteryByMinisterID } from "../../../../../../../api/APIs/Services/Motion.service";

// Validation Schema

const validationSchema = Yup.object({
  parliamentaryYear: Yup.string().required("Parliamentary Year is required"),
  session: Yup.string().required("Session is required"),
  noticeDate: Yup.string().required("Notice Date is required"),
  fileNumber: Yup.string().required("File Number is required"),
  billType: Yup.string().required("Bill Type is required"),
  billTitle: Yup.string().required("Bill Title is required"),
  selectedSenator: Yup.array().required("Senator is required"),
  selectedMNA: Yup.object().required("Minister is required"),
  selectedMinistry: Yup.object().required("Ministery is required"),
});

function NewLegislationSenateBill() {
  const location = useLocation();
  const userData = getUserData();
  const navigate = useNavigate();
  const { sessions, members, ministryData, parliamentaryYear } =
    useContext(AuthContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [MNAData, setMNAData] = useState([]);
  const [ministerID, setMinisterID] = useState(null);
  const [ministryDataOnMinister, setMinistryDataOnMinister] = useState([]);

  const isGovernmentBill =
    location?.state?.category &&
    location?.state?.category === "Government Bill";
  const isFromSenate =
    location?.state?.billFrom && location?.state?.billFrom === "From Senate";
  // Getting All MNA
  // Getting All MNA
  const getAllMNA = async () => {
    try {
      const response = await getAllMNALists(0, 500);

      if (response?.success) {
        setMNAData(response?.data?.mnas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMinisteryByMinisterIdApi = async () => {
    try {
      const response = await getSingleMinisteryByMinisterID(
        ministerID && ministerID
      );
      if (response?.success) {
        setMinistryDataOnMinister(response?.data?.ministries?.ministries);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllMNA();
    if (ministerID) {
      getMinisteryByMinisterIdApi();
    }
  }, [ministerID]);

  const formik = useFormik({
    initialValues: {
      parliamentaryYear: "",
      session: "",
      fileNumber: "",
      noticeDate: "",
      billCategory: "",
      billType: "",
      billTitle: "",
      selectedSenator: null,
      selectedMNA: null,
      selectedMinistry: null,
      billFrom: "From Senate",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      CreateSenateBill(values);
    },
  });
  // Handle Claneder Toggel
  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("noticeDate", date);
    setIsCalendarOpen(false);
  };

  const CreateSenateBill = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.session);
    formData.append("fkParliamentaryYearId", values?.parliamentaryYear);
    if (
      location?.state &&
      location?.state?.category === "Private Member Bill"
    ) {
      formData.append("fileNumber", `24/(${values?.fileNumber})/2024`);
    } else {
      formData.append("fileNumber", `09/(${values?.fileNumber})/2024`);
    }
    if (values?.noticeDate) {
      const formattedDate = moment(values?.noticeDate).format("YYYY-MM-DD");
      formData.append("noticeDate", formattedDate);
    }
    formData.append(
      "billCategory",
      location?.state?.category && location?.state?.category
    );
    formData.append("billType", values?.billType);
    formData.append("billTitle", values?.billTitle);
    formData.append("billFrom", "From Senate");
    formData.append("fkUserId", userData && userData?.id);
    formData.append("fkBillStatus", 1);

    if (values?.selectedSenator) {
      values?.selectedSenator?.forEach((senator, index) => {
        formData.append(
          `senateBillSenatorMovers[${index}][fkSenatorId]`,
          senator?.value
        );
      });
    }
    if (values?.selectedMNA) {
      formData.append(
        `senateBillMnaMovers[${0}][fkMnaId]`,
        values?.selectedMNA?.value
      );
    }
    // if (values?.selectedMNA) {
    //   values?.selectedMNA?.forEach((MNA, index) => {
    //     formData.append(`senateBillMnaMovers[${index}][fkMnaId]`, MNA?.value);
    //   });
    // }
    // if (values?.selectedMinistry) {
    //   values?.selectedMinistry?.forEach((ministry, index) => {
    //     formData.append(
    //       `senateBillMinistryMovers[${index}][fkMinistryId]`,
    //       ministry?.value
    //     );
    //   });
    // }

    if (values?.selectedMinistry) {
      formData.append(
        `senateBillMinistryMovers[${0}][fkMinistryId]`,
        values?.selectedMinistry?.value
      );
    }
    let formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    console.log("formData", formDataObject);

    try {
      const response = await createNewLegislationBill(formData);
      if (response.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        if (isGovernmentBill && isFromSenate) {
          setTimeout(() => {
            navigate(
              "/lgms/dashboard/bills/legislation-bills/government-bills/introduced-in-senate"
            );
          }, [3000]);
        } else {
          setTimeout(() => {
            navigate(
              "/lgms/dashboard/bills/legislation-bills/private-member-bills"
            );
          }, [3000]);
        }
        // setTimeout(() => {
        //   navigate("/lgms/dashboard/bills/legislation-bills/government-bills");
        // }, [3000]);
      }
    } catch (error) {}
  };

  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/lgms/dashboard"}
        addLink1={
          "/lgms/dashboard/bills/legislation-bills/government-bills/introduced-in-senate"
        }
        title1={"List of Senate Bills"}
        addLink2={"/lgms/dashboard/bills/senate-bills"}
        title2={"Introduced In Senate"}
      />

      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div class="card-header red-bg">
              <h1>Create Senate Bill</h1>
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Parliamentary Year</label>
                        <select
                          id="parliamentaryYear"
                          name="parliamentaryYear"
                          className={`form-select  ${
                            formik.touched.parliamentaryYear &&
                            formik.errors.parliamentaryYear
                              ? "is-invalid"
                              : ""
                          }`}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.parliamentaryYear}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {parliamentaryYear &&
                            parliamentaryYear.map((item) => (
                              <option value={item.id}>
                                {item.parliamentaryTenure}
                              </option>
                            ))}
                        </select>
                        {formik.touched.parliamentaryYear &&
                          formik.errors.parliamentaryYear && (
                            <div className="invalid-feedback">
                              {formik.errors.parliamentaryYear}
                            </div>
                          )}
                      </div>
                    </div>

                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Session</label>
                        <select
                          id="session"
                          name="session"
                          className={`form-control  ${
                            formik.touched.session && formik.errors.session
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          value={formik.values.session}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {sessions &&
                            sessions.map((item) => (
                              <option value={item.id}>
                                {item.sessionName}
                              </option>
                            ))}
                        </select>
                        {formik.touched.session && formik.errors.session && (
                          <div class="invalid-feedback">
                            {formik.errors.session}
                          </div>
                        )}
                      </div>
                    </div>

                    <div class="col">
                      <div className="mb-3" style={{ position: "relative" }}>
                        <label className="form-label">Notice Date</label>
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
                          selected={formik.values.noticeDate}
                          onChange={handleDateSelect}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.noticeDate &&
                            formik.errors.noticeDate
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

                        {formik.touched.noticeDate &&
                          formik.errors.noticeDate && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {formik.errors.noticeDate}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-4">
                      <div className="mb-3">
                        <label className="form-label">File Number</label>

                        <input
                          type="text"
                          id="fileNumber"
                          name="fileNumber"
                          className={`form-control ${
                            formik.touched.fileNumber &&
                            formik.errors.fileNumber
                              ? "is-invalid"
                              : ""
                          }`}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.fileNumber}
                        />
                        {formik.touched.fileNumber &&
                          formik.errors.fileNumber && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {formik.errors.fileNumber}
                            </div>
                          )}
                      </div>
                    </div>
                    {/* <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Bill Category </label>
                        <select
                          id="billCategory"
                          name="billCategory"
                          className={`form-select ${
                            formik.touched.billCategory && formik.errors.billCategory ? "is-invalid" : ""
                          }`}
                          onChange={formik.handleChange}
                          value={formik.values.billCategory}
                        >
                          <option value="" disabled hidden>
                            Select Bill Category
                          </option>
                          <option value="Government Bill">Government Bill</option>
                          <option value="Private Member Bill">Private Member Bill</option>
                        </select>
                        {formik.touched.billCategory && formik.errors.billCategory && (
                          <div class="invalid-feedback">{formik.errors.billCategory}</div>
                        )}
                      </div>
                    </div> */}
                    <div className="col-4">
                      <div class="mb-3">
                        <label class="form-label">Bill Type </label>
                        <select
                          id="billType"
                          name="billType"
                          className={`form-select ${
                            formik.touched.billType && formik.errors.billType
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.billType}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          <option value="Amendment Bill">Amendment Bill</option>
                          <option value="Constitutional Amendment Bill">
                            Constitutional Amendment Bill
                          </option>
                          <option value="Finance Bill">Finance Bill</option>
                          <option value="Money Bill">Money Bill</option>
                          <option value="New Bill">New Bill</option>
                        </select>
                        {formik.touched.billType && formik.errors.billType && (
                          <div class="invalid-feedback">
                            {formik.errors.billType}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <label className="form-label">Bill Title</label>
                        <textarea
                          className={`form-control  ${
                            formik.touched.billTitle && formik.errors.billTitle
                              ? "is-invalid"
                              : ""
                          }`}
                          id="billTitle"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.billTitle}
                        ></textarea>
                        {formik.touched.billTitle &&
                          formik.errors.billTitle && (
                            <div className="invalid-feedback">
                              {formik.errors.billTitle}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col">
                      <div className="mb-3">
                        <label class="form-label">Select Senator</label>
                        <Select
                          options={
                            members &&
                            members?.map((item) => ({
                              value: item.id,
                              label: item?.memberName,
                            }))
                          }
                          id="selectedSenator"
                          name="selectedSenator"
                          onChange={(selectedOptions) =>
                            formik.setFieldValue(
                              "selectedSenator",
                              selectedOptions
                            )
                          }
                          value={formik.values.selectedSenator}
                          isMulti={true}
                          className={` ${
                            formik.touched.selectedSenator &&
                            formik.errors.selectedSenator
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.selectedSenator &&
                          formik.errors.selectedSenator && (
                            <div class="invalid-feedback">
                              {formik.errors.selectedSenator}
                            </div>
                          )}
                      </div>
                    </div>

                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Select Minister</label>
                        <Select
                          options={MNAData.map((item) => ({
                            value: item.id,
                            label: item.mnaName,
                          }))}
                          onChange={(selectedOption) => {
                            formik.setFieldValue("selectedMNA", selectedOption);
                            formik.setFieldValue("selectedMinistry", null);
                            setMinisterID(selectedOption?.value);
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.selectedMNA}
                          name="selectedMNA"
                          className={` ${
                            formik.touched.selectedMNA &&
                            formik.errors.selectedMNA
                              ? "is-invalid"
                              : ""
                          }`}
                          // isMulti
                        />

                        {formik.touched.selectedMNA &&
                          formik.errors.selectedMNA && (
                            <div class="invalid-feedback">
                              {formik.errors.selectedMNA}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col">
                      <label className="form-label">Select Ministry</label>
                      <Select
                        options={
                          ministryDataOnMinister &&
                          ministryDataOnMinister?.map((item) => ({
                            value: item.id,
                            label: item?.ministryName,
                          }))
                        }
                        name="selectedMinistry"
                        id="selectedMinistry"
                        onChange={(selectedOptions) =>
                          formik.setFieldValue(
                            "selectedMinistry",
                            selectedOptions
                          )
                        }
                        className={` ${
                          formik.touched.selectedMinistry &&
                          formik.errors.selectedMinistry
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formik.values.selectedMinistry}
                        // isMulti={true}
                      />
                      {formik.touched.selectedMinistry &&
                        formik.errors.selectedMinistry && (
                          <div class="invalid-feedback">
                            {formik.errors.selectedMinistry}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button class="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewLegislationSenateBill;
