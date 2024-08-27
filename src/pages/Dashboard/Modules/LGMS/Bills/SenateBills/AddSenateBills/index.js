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
  getMinisterByParliamentaryYearID,
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
import {
  getAllTenures,
  getMemberByParliamentaryYearID,
  getParliamentaryYearsByTenureID,
} from "../../../../../../../api/APIs/Services/ManageQMS.service";

// Validation Schema

const validationSchema = Yup.object({
  parliamentaryYear: Yup.string().required("Parliamentary Year is required"),
  session: Yup.string().required("Session is required"),
  noticeDate: Yup.string().required("Notice Date is required"),
  fileNumber: Yup.string().required("File Number is required"),
  billType: Yup.string().required("Bill Type is required"),
  billTitle: Yup.string().required("Bill Title is required"),
  // selectedSenator: Yup.array().required("Senator is required"),
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
  const [isOldMinisterSelected, setIsOldMinisterSelected] = useState(false);
  const [MNAData, setMNAData] = useState([]);
  const [ministerID, setMinisterID] = useState(null);
  const [mnaID, setMNAID] = useState(null);
  const [ministryDataOnMinister, setMinistryDataOnMinister] = useState([]);
  const [tenures, setTenures] = useState([]);
  const [parliamentaryYearData, setParliamentaryYearData] = useState([]);
  const [membersOnParliamentaryYear, setMembersOnParliamentaryYear] = useState(
    []
  );
  const [ministersOnParliamentaryYear, setMinisterOnParliamentaryYear] =
    useState([]);
  const [isFormShow, setIsFormShow] = useState(false);
  const [showMinster, setShowMinister] = useState(false);
  const isGovernmentBill =
    location?.state?.category &&
    location?.state?.category === "Government Bill";
  const isFromSenate =
    location?.state?.billFrom && location?.state?.billFrom === "From Senate";

  const formik = useFormik({
    initialValues: {
      selectiontype: "",
      membertenure: "",
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
    // validationSchema: validationSchema,
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

  // // Getting All MNA
  // const getAllMNA = async () => {
  //   try {
  //     const response = await getAllMNALists(0, 500);

  //     if (response?.success) {
  //       setMNAData(response?.data?.mnas);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  // Get All Miisters
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

  //Get Parliamentary Year On The Base Of Tenure
  const getParliamentaryYearsonTheBaseOfTenure = async (id) => {
    try {
      const response = await getParliamentaryYearsByTenureID(id);
      if (response?.success) {
        console.log(response?.data?.data);
        setParliamentaryYearData(response?.data);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      console.log(error);
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
  const getMNAOnParliamentaryYear = async (id) => {
    try {
      const response = await getMinisterByParliamentaryYearID(id);
      if (response?.success) {
        console.log("Memberon Response", response);
        setMinisterOnParliamentaryYear(response?.data);
        // setTonerModels(transformedData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    // getAllMNA();
    // handleTenures();
    if (ministerID) {
      getMinisteryByMinisterIdApi();
    }
  }, [ministerID]);

  const CreateSenateBill = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.session);
    formData.append("fkTenureId", values?.membertenure?.value);
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
              "http://localhost:3000/lgms/dashboard/bills/legislation-bills/private-member-bills/introduced-in-senate"
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
          isGovernmentBill && isFromSenate
            ? "/lgms/dashboard/bills/legislation-bills/government-bills/introduced-in-senate"
            : "/lgms/dashboard/bills/legislation-bills/private-member-bills/introduced-in-senate"
        }
        title1={"List of Bills"}
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
              <div class="col-3">
                <div className="mb-3">
                  <label className="form-label">Bill For</label>
                  <select
                    id="selectiontype"
                    name="selectiontype"
                    className={`form-select  ${
                      formik.touched.selectiontype &&
                      formik.errors.selectiontype
                        ? "is-invalid"
                        : ""
                    }`}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      // Update the formik state
                      formik.handleChange(e);
                      // Call the API with the selected value
                      handleTenures(selectedValue);
                      formik.setFieldValue("membertenure", "");
                      formik.setFieldValue("parliamentaryYear", "");
                      formik.setFieldValue("selectedSenator", null);
                      formik.setFieldValue("selectedMNA", null);
                      formik.setFieldValue("selectedMinistry", null);
                      // SetFormSHow
                      setIsFormShow(true);
                      setShowMinister(selectedValue);
                      setMembersOnParliamentaryYear([]);
                    }}
                    value={formik.values.selectiontype}
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    <option value="Senators">Senators</option>
                    <option value="Ministers">Ministers</option>
                  </select>
                  {formik.touched.selectiontype &&
                    formik.errors.selectiontype && (
                      <div className="invalid-feedback">
                        {formik.errors.selectiontype}
                      </div>
                    )}
                </div>
              </div>
              {isFormShow && (
                <form onSubmit={formik.handleSubmit}>
                  <div class="container-fluid">
                    <div class="row">
                      {/* <div className="col">
                          <label className="form-label">Member Tenure</label>
                          <Select
                            options={
                              tenures &&
                              tenures?.map((item) => ({
                                value: item.id,
                                label: item?.ministryName,
                              }))
                            }
                            name="membertenure"
                            id="membertenure"
                            onChange={(selectedOptions) =>
                              formik.setFieldValue(
                                "membertenure",
                                selectedOptions
                              )
                             
                               
                              
                            }
                            className={` ${
                              formik.touched.membertenure &&
                              formik.errors.membertenure
                                ? "is-invalid"
                                : ""
                            }`}
                            value={formik.values.membertenure}
                            // isMulti={true}
                          />
                          {formik.touched.membertenure &&
                            formik.errors.membertenure && (
                              <div class="invalid-feedback">
                                {formik.errors.membertenure}
                              </div>
                            )}
                        </div> */}

                      <div className="col">
                        {showMinster === "Ministers" ? (
                          <label className="form-label">Minister Tenure</label>
                        ) : (
                          <label className="form-label">Member Tenure</label>
                        )}

                        <Select
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
                            if (selectedId) {
                              getParliamentaryYearsonTheBaseOfTenure(
                                selectedId
                              );
                              console.log("Selected ID:", selectedId);
                            }
                          }}
                          className={` ${
                            formik.touched.membertenure &&
                            formik.errors.membertenure
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.membertenure}
                        />
                        {formik.touched.membertenure &&
                          formik.errors.membertenure && (
                            <div className="invalid-feedback">
                              {formik.errors.membertenure}
                            </div>
                          )}
                      </div>

                      <div class="col">
                        <div class="mb-3">
                          {showMinster === "Ministers" ? (
                            <label className="form-label">
                              Minister Parliamentary Year
                            </label>
                          ) : (
                            <label className="form-label">
                              Member Parliamentary Year
                            </label>
                          )}

                          <label class="form-label"></label>
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
                              getMembersOnParliamentaryYear(e.target.value);
                              getMNAOnParliamentaryYear(e.target.value);
                              // console.log("id", selectedId);
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

                      {showMinster === "Ministers" ? (
                        <>
                          <div class="col">
                            <div class="mb-3">
                              <label class="form-label">Select Minister</label>
                              <Select
                                options={
                                  ministersOnParliamentaryYear &&
                                  ministersOnParliamentaryYear?.length > 0 &&
                                  ministersOnParliamentaryYear?.map((item) => ({
                                    value: item.id,
                                    label: item.mnaName,
                                  }))
                                }
                                onChange={(selectedOption) => {
                                  formik.setFieldValue(
                                    "selectedMNA",
                                    selectedOption
                                  );
                                  formik.setFieldValue(
                                    "selectedMinistry",
                                    null
                                  );
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
                              Select Ministry
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
                      ) : (
                        <div className="col">
                          <div className="mb-3">
                            <label class="form-label">Select Senator</label>
                            <Select
                              // options={
                              //   membersOnParliamentaryYear &&
                              //   membersOnParliamentaryYear?.length > 0 &&
                              //   membersOnParliamentaryYear?.map((item) => ({
                              //     value: item.id,
                              //     label: item?.memberName,
                              //   }))
                              // }
                              options={
                                Array.isArray(membersOnParliamentaryYear) &&
                                membersOnParliamentaryYear.length > 0
                                  ? membersOnParliamentaryYear.map((item) => ({
                                      value: item.id,
                                      label: item?.memberName,
                                    }))
                                  : []
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
                      )}
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
                      <div className="col">
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
                      <div className="col">
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
                            <option value="Amendment Bill">
                              Amendment Bill
                            </option>
                            <option value="Constitutional Amendment Bill">
                              Constitutional Amendment Bill
                            </option>
                            <option value="Finance Bill">Finance Bill</option>
                            <option value="Money Bill">Money Bill</option>
                            <option value="New Bill">New Bill</option>
                          </select>
                          {formik.touched.billType &&
                            formik.errors.billType && (
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
                              formik.touched.billTitle &&
                              formik.errors.billTitle
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
                      <div class="col-3">
                        <div style={{ marginTop: "35px" }}>
                          <div class="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="oldMinisterCheckbox"
                              checked={isOldMinisterSelected}
                              onChange={(e) =>
                                setIsOldMinisterSelected(e.target.checked)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="oldMinisterCheckbox"
                            >
                              Select Old Minister
                            </label>
                          </div>
                        </div>
                      </div>
                      {isOldMinisterSelected ? (
                        <>
                          <div class="col">
                            <div class="mb-3">
                              <label class="form-label">
                                Select Old Minister
                              </label>
                              <Select
                                options={MNAData.map((item) => ({
                                  value: item.id,
                                  label: item.mnaName,
                                }))}
                                onChange={(selectedOption) => {
                                  formik.setFieldValue(
                                    "selectedMNA",
                                    selectedOption
                                  );
                                  formik.setFieldValue(
                                    "selectedMinistry",
                                    null
                                  );
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
                              Select Old Ministry
                            </label>
                            <Select
                              options={
                                ministryDataOnMinister &&
                                ministryDataOnMinister.map((item) => ({
                                  value: item.id,
                                  label: item.ministryName,
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
                              className={`${
                                formik.touched.selectedMinistry &&
                                formik.errors.selectedMinistry
                                  ? "is-invalid"
                                  : ""
                              }`}
                              value={formik.values.selectedMinistry}
                            />
                            {formik.touched.selectedMinistry &&
                              formik.errors.selectedMinistry && (
                                <div class="invalid-feedback">
                                  {formik.errors.selectedMinistry}
                                </div>
                              )}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewLegislationSenateBill;
