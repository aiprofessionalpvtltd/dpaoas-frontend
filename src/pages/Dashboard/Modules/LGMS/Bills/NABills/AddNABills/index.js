import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../../../../utils/sideBarItems";
import Header from "../../../../../../../components/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../../api/AuthContext";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { getUserData } from "../../../../../../../api/Auth";
import {
  createNewLegislationBill,
  getAllMNALists,
} from "../../../../../../../api/APIs/Services/LegislationModule.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getSingleMinisteryByMinisterID } from "../../../../../../../api/APIs/Services/Motion.service";
import * as Yup from "yup";
const validationSchema = Yup.object({
  parliamentaryYear: Yup.string().required("Parliamentary Year is required"),
  session: Yup.string().required("Session is required"),
  noticeDate: Yup.string().required("Notice Date is required"),
  fileNumber: Yup.string().required("File Number is required"),
  billType: Yup.string().required("Bill Type is required"),
  PassedByNADate: Yup.string().required("Passing By NA Date is required"),
  DateOfReceiptOfMessageFromNA: Yup.string().required(
    "Date of Receipt is required"
  ),
  billTitle: Yup.string().required("Bill Title is required"),
  selectedSenator: Yup.array().required("Senator is required"),
  selectedMNA: Yup.object().required("Minister is required"),
  selectedMinistry: Yup.object().required("Ministery is required"),
});

function NewLegislationNABill() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessions, members, ministryData, parliamentaryYear } =
    useContext(AuthContext);
  const userData = getUserData();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDateofReciptCalendarOpen, setIsDateofReciptCalendarOpen] =
    useState(false);

  const isGovernmentBill =
    location?.state?.category &&
    location?.state?.category === "Government Bill";
  const isPrivateMemberBill =
    location?.state?.category &&
    location?.state?.category === "Private Member Bill";
  const isFromSenate =
    location?.state?.billFrom && location?.state?.billFrom === "From Senate";
  const isFromNA =
    location?.state?.billFrom && location?.state?.billFrom === "From NA";
  const [MNAData, setMNAData] = useState([]);
  const [ministerID, setMinisterID] = useState(null);
  const [ministryDataOnMinister, setMinistryDataOnMinister] = useState([]);

  // Getting Ministry
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
      PassedByNADate: "",
      DateOfReceiptOfMessageFromNA: "",
      billCategory: "",
      billType: "",
      billTitle: "",
      selectedSenator: null,
      selectedMNA: null,
      selectedMinistry: null,
      billFrom: "From NA",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Create Question Data", values);
      CreateNABill(values);
    },
  });
  // Handle Claneder Toggel
  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("PassedByNADate", date);
    setIsCalendarOpen(false);
  };
  // Handle Claneder Toggel
  const handleReciptCalendarToggle = () => {
    setIsDateofReciptCalendarOpen(!isDateofReciptCalendarOpen);
  };
  // Handale DateCHange
  const handleReciptDateSelect = (date) => {
    formik.setFieldValue("DateOfReceiptOfMessageFromNA", date);
    setIsDateofReciptCalendarOpen(false);
  };

  const CreateNABill = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.session);
    formData.append("fkParliamentaryYearId", values?.parliamentaryYear);
    if (location?.state && location.state.category === "Private Member Bill") {
      formData.append("fileNumber", `24/(${values?.fileNumber})/2024`);
    } else {
      formData.append("fileNumber", `09/(${values?.fileNumber})/2024`);
    }
    // formData.append("PassedByNADate", values?.passedByNADate);
    if (values?.PassedByNADate) {
      const formattedDate = moment(values?.PassedByNADate).format("YYYY-MM-DD");
      formData.append("PassedByNADate", formattedDate);
    }
    // formData.append(
    //   "DateOfReceiptOfMessageFromNA",
    //   values?.receiptMessageDateFromNA
    // );
    if (values?.DateOfReceiptOfMessageFromNA) {
      const formattedDate = moment(values?.DateOfReceiptOfMessageFromNA).format(
        "YYYY-MM-DD"
      );
      formData.append("DateOfReceiptOfMessageFromNA", formattedDate);
    }
    formData.append(
      "billCategory",
      location &&
        location?.state &&
        location?.state?.category &&
        location?.state?.category
    );
    // formData.append("billCategory", values?.billCategory);
    formData.append("billType", values?.billType);
    formData.append("billTitle", values?.billTitle);
    formData.append("billFrom", "From NA");
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
    if (values?.selectedMinistry) {
      formData.append(
        `senateBillMinistryMovers[${0}][fkMinistryId]`,
        values?.selectedMinistry?.value
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
        if (isGovernmentBill && isFromNA) {
          setTimeout(() => {
            navigate(
              "/lgms/dashboard/bills/legislation-bills/government-bills/recieved-from-na"
            );
          }, [3000]);
        } else if (isPrivateMemberBill && isFromNA) {
          setTimeout(() => {
            navigate(
              "/lgms/dashboard/bills/legislation-bills/private-member-bills/recieved-from-na"
            );
          }, [3000]);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
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
          isGovernmentBill && isFromNA
            ? "/lgms/dashboard/bills/legislation-bills/government-bills/recieved-from-na"
            : "/lgms/dashboard/bills/legislation-bills/private-member-bills/recieved-from-na"
        }
        title1={"Bills List"}
        addLink2={"/lgms/dashboard/bills/legislation-bills"}
        title2={"National Assembly Bill"}
      />

      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div class="card-header red-bg">
              <h1> Create National Assembly Bill</h1>
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

                    <div class="col">
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
                    <div className="col-3">
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
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                  </div>
                  <div class="row">
                    <div className="col-3">
                      {/* <div className="mb-3" style={{ position: "relative" }}>
                        <label className="form-label">Passed By NA Date</label>
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
                          selected={formik.values.passedByNADate}
                          onChange={handleDateSelect}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.passedByNADate && formik.errors.passedByNADate ? "is-invalid" : ""
                          }`}
                          open={isCalendarOpen}
                          onClickOutside={() => setIsCalendarOpen(false)}
                          onInputClick={handleCalendarToggle}
                          // onClick={handleCalendarToggle}
                          maxDate={new Date()}
                          dateFormat="dd-MM-yyyy"
                        />

                        {formik.touched.passedByNADate && formik.errors.passedByNADate && (
                          <div className="invalid-feedback" style={{ display: "block" }}>
                            {formik.errors.passedByNADate}
                          </div>
                        )}
                      </div> */}
                      <div className="mb-3" style={{ position: "relative" }}>
                        <label className="form-label">Passed By NA Date</label>
                        <span
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "36px",
                            zIndex: 1,
                            fontSize: "20px",
                            color: "#666",
                            cursor: "pointer",
                          }}
                          onClick={handleCalendarToggle}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>

                        <DatePicker
                          selected={formik.values.PassedByNADate}
                          onChange={handleDateSelect}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.PassedByNADate &&
                            formik.errors.PassedByNADate
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

                        {formik.touched.PassedByNADate &&
                          formik.errors.PassedByNADate && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {formik.errors.PassedByNADate}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="mb-3" style={{ position: "relative" }}>
                        <label className="form-label">
                          Date of Recipt of Message From NA
                        </label>
                        <span
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "36px",
                            zIndex: 1,
                            fontSize: "20px",
                            color: "#666",
                            cursor: "pointer",
                          }}
                          onClick={handleReciptCalendarToggle}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>

                        <DatePicker
                          selected={formik.values.DateOfReceiptOfMessageFromNA}
                          onChange={handleReciptDateSelect}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.DateOfReceiptOfMessageFromNA &&
                            formik.errors.DateOfReceiptOfMessageFromNA
                              ? "is-invalid"
                              : ""
                          }`}
                          name="DateOfReceiptOfMessageFromNA"
                          open={isDateofReciptCalendarOpen}
                          onClickOutside={() =>
                            setIsDateofReciptCalendarOpen(false)
                          }
                          onInputClick={handleReciptCalendarToggle}
                          // onClick={handleCalendarToggle}
                          maxDate={new Date()}
                          dateFormat="dd-MM-yyyy"
                        />

                        {formik.touched.DateOfReceiptOfMessageFromNA &&
                          formik.errors.DateOfReceiptOfMessageFromNA && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {formik.errors.DateOfReceiptOfMessageFromNA}
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

                    {/* <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Select MNA</label>
                        <Select
                          options={MNAData.map((item) => ({
                            value: item.id,
                            label: item.mnaName,
                          }))}
                          onChange={(selectedOption) =>
                            formik.setFieldValue("selectedMNA", selectedOption)
                          }
                          onBlur={formik.handleBlur}
                          value={formik.values.selectedMNA}
                          name="selectedMNA"
                          className={` ${
                            formik.touched.selectedMNA &&
                            formik.errors.selectedMNA
                              ? "is-invalid"
                              : ""
                          }`}
                          isMulti
                        />

                        {formik.touched.selectedMNA &&
                          formik.errors.selectedMNA && (
                            <div class="invalid-feedback">
                              {formik.errors.selectedMNA}
                            </div>
                          )}
                      </div>
                    </div> */}
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

                    {/* <div className="col">
                      <label className="form-label">Select Ministry</label>
                      <Select
                        options={
                          ministryData &&
                          ministryData?.map((item) => ({
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
                        value={formik.values.selectedMinistry}
                        isMulti={true}
                      />
                    </div> */}
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

export default NewLegislationNABill;
