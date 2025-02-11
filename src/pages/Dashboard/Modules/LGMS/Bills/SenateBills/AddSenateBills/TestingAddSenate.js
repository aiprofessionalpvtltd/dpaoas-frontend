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
import {
  createNewLegislationBill,
  getAllMinisterTenures,
  getMinisterByParliamentaryYearID,
  getMinisterParliamentaryYearsByTenure,
  getMinsistriesByTenure,
} from "../../../../../../../api/APIs/Services/LegislationModule.service";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../../../../../../../api/Auth";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../../utils/ToastAlert";
import * as Yup from "yup";
import moment from "moment";
import {
  getAllTenures,
  getMemberByParliamentaryYearID,
  getParliamentaryYearsByTenureID,
  getParliamentaryYearsByTermID,
  getTermByTenureID,
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

function TestingAddSenate() {
  const location = useLocation();
  const userData = getUserData();
  const navigate = useNavigate();
  const { sessions } = useContext(AuthContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [ministerID, setMinisterID] = useState(null);
  const [tenures, setTenures] = useState([]);
  const [ministryDataOnTenure, setMinistryDataOnTenure] = useState([]);
  const [ministerParliamentaryYearData, setMinisterParliamentaryYearData] =
    useState([]);

  const [membersOnParliamentaryYear, setMembersOnParliamentaryYear] = useState(
    []
  );
  const [ministersOnParliamentaryYear, setMinisterOnParliamentaryYear] =
    useState([]);
  const [tenuresTerms, setTenuresTerms] = useState([]);
  const [isFormShow, setIsFormShow] = useState(true);
  const [showMinster, setShowMinister] = useState(
    location?.state && location?.state?.forPerson
  );

  const isGovernmentBill =
    location?.state?.category &&
    location?.state?.category === "Government Bill";
  const isFromSenate =
    location?.state?.billFrom && location?.state?.billFrom === "From Senate";

  const formik = useFormik({
    initialValues: {
      selectiontype: "",
      memberTenure: "",
      fkTermId: "",
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

  // Fetch Tenures Based on Condition
  const fetchTenures = async () => {
    try {
      let tenureData = [];
      if (location?.state?.forPerson === "Senators") {
        // Call `handleTenures` for Senators
        const response = await getAllTenures(0, 5000, "Senators");
        if (response?.success) {
          tenureData = response?.data?.tenures;
        }
      } else if (location?.state?.forPerson === "Ministers") {
        // Call `getAllMinisterTenure` for Ministers
        const response = await getAllMinisterTenures(0, 5000, "Ministers");
        if (response?.success) {
          tenureData = response?.data?.tenures;
        }
      }

      // Update the state to store combined tenures
      setTenures(tenureData);
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
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

  // Fetch Parliamentary Years Based on Condition
  const fetchParliamentaryYears = async (id) => {
    try {
      let response;
      if (location?.state?.forPerson === "Ministers") {
        // Call API for Ministers
        response = await getMinisterParliamentaryYearsByTenure(id);
        if (response?.success) {
          setMinisterParliamentaryYearData(response?.data); // Update state for Ministers
        }
      } else if (location?.state?.forPerson === "Senators") {
        // Call API for Senators
        response = await getParliamentaryYearsByTermID(id);
        if (response?.success) {
          setMinisterParliamentaryYearData(response?.data); // Update state for Senators
        }
      } else {
        console.warn("Invalid 'forPerson' value in location.state");
      }
    } catch (error) {
      console.error(
        "Error fetching parliamentary years:",
        error?.response?.data?.message || error.message
      );
    }
  };

  // //Get Parliamentary Year On The Base Of Tenure
  // const getParliamentaryYearsonTheBaseOfTenure = async (id) => {
  //   try {
  //     const response = await getParliamentaryYearsByTenureID(id);
  //     if (response?.success) {
  //       console.log(response?.data?.data);
  //       setParliamentaryYearData(response?.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //Get Parliamentary Year On The Base Of Tenure
  // const getMininsterParliamentaryYearsonTheBaseOfTenure = async (id) => {
  //   try {
  //     const response = await getMinisterParliamentaryYearsByTenure(id);
  //     if (response?.success) {
  //       console.log(response?.data?.data);
  //       setMinisterParliamentaryYearData(response?.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // GetTerms on the Base of Tenure
  const getMinistriesOnTenure = async (id) => {
    try {
      const response = await getMinsistriesByTenure(id);
      if (response?.success) {
        setMinistryDataOnTenure(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  //Get Members On The Base Of Parliamentary Year
  const getMembersOnParliamentaryYear = async (id) => {
    try {
      const response = await getMemberByParliamentaryYearID(id);
      if (response?.success) {
        setMembersOnParliamentaryYear(response?.data);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
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

  useEffect(() => {
    fetchTenures();
    fetchParliamentaryYears();
  }, [location?.state?.forPerson]);

  const CreateSenateBill = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.session);
    formData.append("billFor", showMinster);
    if (location?.state?.forPerson === "Ministers") {
      formData.append("fkMinisterTenureId", values?.memberTenure?.value);
    } else {
      formData.append("fkTenureId", values?.memberTenure?.value);
    }
    if (values?.fkTermId?.value) {
      formData.append("fkTermId", values?.fkTermId?.value);
    }
    if (location?.state?.forPerson === "Senators") {
      formData.append("fkParliamentaryYearId", values?.parliamentaryYear);
    } else if (location?.state?.forPerson === "Ministers") {
      formData.append("fkMnaParliamentaryYearId", values?.parliamentaryYear);
    }
    const currentYear = new Date().getFullYear();
    if (
      location?.state &&
      location?.state?.category === "Private Member Bill"
    ) {
      formData.append(
        "fileNumber",
        `24/(${values?.fileNumber})/${currentYear}-Legis`
      );
    } else {
      formData.append(
        "fileNumber",
        `09/(${values?.fileNumber})/${currentYear}-Legis`
      );
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
              "/lgms/dashboard/bills/legislation-bills/private-member-bills/introduced-in-senate"
            );
          }, [3000]);
        }
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
              <h1>
                {location?.state?.forPerson &&
                location?.state?.forPerson === "Ministers"
                  ? "Create Bill (Government Bill/Introduced in Senate)"
                  : "Create Bill (Private Bill/Introduced in Senate)"}
              </h1>
            </div>
            <div class="card-body">
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
                            formik.setFieldValue(
                              "memberTenure",
                              selectedOption
                            );
                            if (showMinster === "Ministers") {
                              fetchParliamentaryYears(selectedOption?.value);
                              getMinistriesOnTenure(selectedOption?.value);
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
                      {showMinster !== "Ministers" && (
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label">Member Term</label>
                            <Select
                              options={
                                Array.isArray(tenuresTerms) &&
                                tenuresTerms?.length > 0
                                  ? tenuresTerms.map((item) => ({
                                      value: item?.id,
                                      label: `${item?.termName}`,
                                    }))
                                  : []
                              }
                              onChange={(selectedOption) => {
                                formik.setFieldValue(
                                  "fkTermId",
                                  selectedOption
                                );
                                formik.setFieldValue("parliamentaryYear", "");
                                formik.setFieldValue("selectedSenator", "");
                                if (selectedOption?.value) {
                                  fetchParliamentaryYears(
                                    selectedOption?.value
                                  );
                                }
                              }}
                              onBlur={formik.handleBlur}
                              value={formik.values.fkTermId}
                              id="fkTermId"
                              name="fkTermId"
                              isClearable={true}
                            />
                          </div>
                        </div>
                      )}
                      <div class="col">
                        <div class="mb-3">
                          {showMinster === "Ministers" ? (
                            <label className="form-label">
                              Parliamentary Year
                            </label>
                          ) : (
                            <label className="form-label">
                              Parliamentary Year
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
                              if (showMinster === "Ministers") {
                                getMNAOnParliamentaryYear(e.target.value);
                              } else {
                                getMembersOnParliamentaryYear(e.target.value);
                              }

                              formik.setFieldValue("selectedSenator", "");
                            }}
                            value={formik.values.parliamentaryYear}
                          >
                            <option value="" disabled hidden>
                              Select
                            </option>
                            {ministerParliamentaryYearData &&
                              ministerParliamentaryYearData?.length > 0 &&
                              ministerParliamentaryYearData.map((item) => (
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
                              <label class="form-label">Introduced By</label>
                              <Select
                                options={
                                  Array.isArray(ministersOnParliamentaryYear) &&
                                  ministersOnParliamentaryYear.length > 0
                                    ? ministersOnParliamentaryYear.map(
                                        (item) => ({
                                          value: item?.id,
                                          label: item?.mnaName,
                                        })
                                      )
                                    : []
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
                              Concerned Ministry
                            </label>
                            <Select
                              options={
                                ministryDataOnTenure &&
                                ministryDataOnTenure?.map((item) => ({
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
                            <label class="form-label">Member</label>
                            <Select
                              options={
                                Array.isArray(membersOnParliamentaryYear) &&
                                membersOnParliamentaryYear.length > 0
                                  ? membersOnParliamentaryYear
                                      .sort((a, b) =>
                                        a.memberName.localeCompare(b.memberName)
                                      ) // Sort by memberName alphabetically
                                      .map((item) => ({
                                        value: item.id,
                                        label: item.memberName,
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
                          <label className="form-label">
                            {!isGovernmentBill
                              ? "Date of Notice Under Rule 94"
                              : "Date of Notice Under Rule 96"}
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
                            {/* <option value="Finance Bill">Finance Bill</option> */}
                            {/* <option value="Money Bill">Money Bill</option> */}
                            <option value="New Bill">New Law</option>
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
                    {/* <div class="row">
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
                    </div> */}

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

export default TestingAddSenate;
