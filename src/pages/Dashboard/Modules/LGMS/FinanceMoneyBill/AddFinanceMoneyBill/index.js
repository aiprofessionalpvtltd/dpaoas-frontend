import { ToastContainer } from "react-toastify";

import { useContext, useEffect, useState } from "react";

import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
// import { getSingleMinisteryByMinisterID } from "../../../../../../../api/APIs/Services/Motion.service";
import * as Yup from "yup";

import {
  getAllTenures,
  getMemberByParliamentaryYearID,
  getParliamentaryYearsByTenureID,
  getParliamentaryYearsByTermID,
  getTermByTenureID,
} from "../../../../../../api/APIs/Services/ManageQMS.service";
import { getSingleMinisteryByMinisterID } from "../../../../../../api/APIs/Services/Motion.service";
import { getUserData } from "../../../../../../api/Auth";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { LegislationSideBarItems } from "../../../../../../utils/sideBarItems";
import { AuthContext } from "../../../../../../api/AuthContext";
import {
  getAllMNALists,
  getMinisterByParliamentaryYearID,
  createNewLegislationBill,
} from "../../../../../../api/APIs/Services/LegislationModule.service";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../../../../utils/ToastAlert";
const validationSchema = Yup.object({
  parliamentaryYear: Yup.string().required("Parliamentary Year is required"),
  session: Yup.string().required("Session is required"),
  noticeDate: Yup.string().required("Notice Date is required"),
  fileNumber: Yup.string().required("File Number is required"),
  billType: Yup.string().required("Bill Type is required"),
  dateOnWhichLaidNA: Yup.string().required("Passing By NA Date is required"),
  DateOfReceiptOfMessageFromNA: Yup.string().required(
    "Date of Receipt is required"
  ),
  billTitle: Yup.string().required("Bill Title is required"),
  // selectedSenator: Yup.array().required("Senator is required"),
  selectedMNA: Yup.object().required("Minister is required"),
  selectedMinistry: Yup.object().required("Ministery is required"),
});

function AddFinanceMoneyBill() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessions, members, ministryData, parliamentaryYear } =
    useContext(AuthContext);
  const userData = getUserData();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDateofReciptCalendarOpen, setIsDateofReciptCalendarOpen] =
    useState(false);
  const [isFormShow, setIsFormShow] = useState(true);
  const isGovernmentBill =
    location?.state?.category &&
    location?.state?.category === "Government Bill";
  const [MNAData, setMNAData] = useState([]);
  const [ministerID, setMinisterID] = useState(null);
  const [ministryDataOnMinister, setMinistryDataOnMinister] = useState([]);
  const [tenures, setTenures] = useState([]);
  const [showMinster, setShowMinister] = useState("Ministers");
  const [tenuresTerms, setTenuresTerms] = useState([]);
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [membersOnParliamentaryYear, setMembersOnParliamentaryYear] = useState(
    []
  );
  const [ministersOnParliamentaryYear, setMinisterOnParliamentaryYear] =
    useState([]);
  // Getting Tenures

  //Get All Tenures
  const handleTenures = async (selectionType) => {
    try {
      const response = await getAllTenures(0, 1000, selectionType);
      if (response?.success) {
        setTenures(response?.data?.tenures);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  // GetTerms on the Base of Tenure
  const handleTenuresTerms = async (id) => {
    try {
      const response = await getTermByTenureID(id);
      if (response?.success) {
        setTenuresTerms(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  //Get Parliamentary Year On The Base Of Tenure
  const getParliamentaryYearsonTheBaseOfTenure = async (id) => {
    try {
      const response = await getParliamentaryYearsByTenureID(id);
      if (response?.success) {
        setParliamentaryYearData(response?.data);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getMNAOnParliamentaryYear = async (id) => {
    try {
      const response = await getMinisterByParliamentaryYearID(id);
      if (response?.success) {
        setMinisterOnParliamentaryYear(response?.data);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
  //Get Members On The Base Of Parliamentary Year
  const getMembersOnParliamentaryYear = async (id) => {
    try {
      const response = await getMemberByParliamentaryYearID(id);
      if (response?.success) {
        console.log("Memberon Response", response);
        setMembersOnParliamentaryYear(response?.data);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };
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
  //Get Parliamentary Year
  const getParliamentaryYearsonTheBaseOfTerm = async (id) => {
    try {
      const response = await getParliamentaryYearsByTermID(id);
      if (response?.success) {
        setParliamentaryYearData(response?.data);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      console.log(error);
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

    handleTenures(showMinster);

    if (ministerID) {
      getMinisteryByMinisterIdApi();
    }
  }, [ministerID]);
  const formik = useFormik({
    initialValues: {
      selectiontype: "",
      memberTenure: "",
      fkTermId: "",
      parliamentaryYear: "",
      session: "",
      fileNumber: "",
      dateOnWhichLaidNA: "",
      DateOfReceiptOfMessageFromNA: "",
      billCategory: "",
      billType: "",
      billTitle: "",
      selectedSenator: null,
      selectedMNA: null,
      selectedMinistry: null,
      billFrom: "From NA",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      CreateNABill(values);
    },
  });
  // Handle Claneder Toggel
  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    formik.setFieldValue("dateOnWhichLaidNA", date);
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
    formData.append("billFor", showMinster);
    formData.append("fkTenureId", values?.memberTenure?.value);
    if (values?.fkTermId?.value) {
      formData.append("fkTermId", values?.fkTermId?.value);
    }
    formData.append("fkParliamentaryYearId", values?.parliamentaryYear);
    const currentYear = new Date().getFullYear();
    if (location?.state && location.state.category === "Private Member Bill") {
      formData.append(
        "fileNumber",
        `24/(${values?.fileNumber})/${currentYear}`
      );
    } else {
      formData.append(
        "fileNumber",
        `09/(${values?.fileNumber})/${currentYear}`
      );
    }
    // formData.append("dateOnWhichLaidNA", values?.passedByNADate);
    if (values?.dateOnWhichLaidNA) {
      const formattedDate = moment(values?.dateOnWhichLaidNA).format(
        "YYYY-MM-DD"
      );
      formData.append("dateOnWhichLaidNA", formattedDate);
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
    console.log("Government Bill NA formData", formDataObject);
    try {
      const response = await createNewLegislationBill(formData);
      if (response.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        if (isGovernmentBill) {
          setTimeout(() => {
            navigate(
              "/lgms/dashboard/bills/legislation-bills/finance-money-bill"
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
          isGovernmentBill &&
          "/lgms/dashboard/bills/legislation-bills/finance-money-bill"
        }
        title1={"Bills List"}
        addLink2={"/lgms/dashboard/bills/legislation-bills"}
        title2={"National Assembly Bill"}
      />

      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div class="card-header red-bg">
              <h1>Create Bill (Government Bill (Finance/Money Bill))</h1>
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="container-fluid">
                  <div class="row">
                    <div className="col">
                      <label className="form-label">Minister Tenure</label>

                      {/* <Select 
                          options={
                            tenures &&
                            tenures?.length > 0 &&
                            tenures.map((item) => ({
                              value: item.id,
                              label: item.tenureName,
                            }))
                          }
                          name="membertenure"
                          id="membertenure"
                          onChange={(selectedOption) => {
                            // Set the selected value in Formik
                            formik.setFieldValue(
                              "membertenure",
                              selectedOption
                            );
                            // Clear the Parliamentary Year select field
                            formik.setFieldValue("parliamentaryYear", []);
                            formik.setFieldValue("selectedSenator", []);
                            // setMembersOnParliamentaryYear([]);
                            // Get the selected ID and call the API
                            const selectedId = selectedOption?.value;
                            // if (selectedId) {
                            //   getParliamentaryYearsonTheBaseOfTenure(
                            //     selectedId
                            //   );
                            //   console.log("Selected ID:", selectedId);
                            // }
                          }}
                          className={` ${
                            formik.touched.membertenure &&
                            formik.errors.membertenure
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.membertenure}
                        /> */}
                      <Select
                        options={
                          Array.isArray(tenures) && tenures?.length > 0
                            ? tenures.map((item) => ({
                                value: item?.id,
                                label: `${item?.tenureName} (${item?.tenureType})`,
                                tenureType: item?.tenureType,
                              }))
                            : []
                        }
                        onChange={(selectedOption) => {
                          formik.setFieldValue("memberTenure", selectedOption);
                          if (showMinster === "Ministers") {
                            getParliamentaryYearsonTheBaseOfTenure(
                              selectedOption?.value
                            );
                          } else {
                            handleTenuresTerms(selectedOption?.value);
                          }
                          formik.setFieldValue("fkTermId", "");
                          formik.setFieldValue("parliamentaryYear", "");
                          formik.setFieldValue("selectedSenator", "");
                          formik.setFieldValue("selectedMNA", null);
                          formik.setFieldValue("selectedMinistry", null);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.memberTenure}
                        id="memberTenure"
                        name="memberTenure"
                        isClearable={true}
                      />
                      {formik.touched.memberTenure &&
                        formik.errors.memberTenure && (
                          <div className="invalid-feedback">
                            {formik.errors.memberTenure}
                          </div>
                        )}
                    </div>
                    {/* <div class="col">
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
                      </div> */}
                    {/* Members Terms  */}

                    <div class="col">
                      <div class="mb-3">
                        <label className="form-label">Parliamentary Year</label>
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
                          // onChange={formik.handleChange}
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            formik.handleChange(e);
                            setMembersOnParliamentaryYear([]);
                            getMNAOnParliamentaryYear(e.target.value);
                            formik.setFieldValue("selectedSenator", "");
                          }}
                          value={formik.values.parliamentaryYear}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {parliamentaryYearData &&
                            parliamentaryYearData?.length > 0 &&
                            parliamentaryYearData.map((item) => (
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

                    <>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label">Introduced By</label>
                          <Select
                            options={
                              Array.isArray(ministersOnParliamentaryYear) &&
                              ministersOnParliamentaryYear.length > 0
                                ? ministersOnParliamentaryYear.map((item) => ({
                                    value: item?.id,
                                    label: item?.mnaName,
                                  }))
                                : []
                            }
                            onChange={(selectedOption) => {
                              formik.setFieldValue(
                                "selectedMNA",
                                selectedOption
                              );
                              formik.setFieldValue("selectedMinistry", null);
                              setMinisterID(selectedOption?.value);
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.selectedMNA}
                            name="selectedMNA"
                            className={`${
                              formik.touched.selectedMNA &&
                              formik.errors.selectedMNA
                                ? "is-invalid"
                                : ""
                            }`}
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
                        <label className="form-label">
                          Concerned Ministry / Division
                        </label>
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
                    </>
                  </div>

                  <div class="row">
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
                          onBlur={formik.handleBlur}
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

                          <option value="">Finance/Money Bill</option>
                        </select>
                        {formik.touched.billType && formik.errors.billType && (
                          <div class="invalid-feedback">
                            {formik.errors.billType}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col">
                      <div className="mb-3" style={{ position: "relative" }}>
                        <label className="form-label">
                          Date On Which Laid in NA
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
                          onClick={handleCalendarToggle}
                        >
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </span>

                        <DatePicker
                          selected={formik.values.dateOnWhichLaidNA}
                          onChange={handleDateSelect}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.dateOnWhichLaidNA &&
                            formik.errors.dateOnWhichLaidNA
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

                        {formik.touched.dateOnWhichLaidNA &&
                          formik.errors.dateOnWhichLaidNA && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {formik.errors.dateOnWhichLaidNA}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col">
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

export default AddFinanceMoneyBill;
