import React, { useContext, useEffect, useState, useRef } from "react";
import { NoticeSidebarItems } from "../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../components/Layout";
import Header from "../../../../../../components/Header";
import { useNavigate } from "react-router";
import TimePicker from "react-time-picker";
import {
  createQuestion,
  getQuestionNoticeDiaryNumber,
} from "../../../../../../api/APIs/Services/Question.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CustomAlert } from "../../../../../../components/CustomComponents/CustomAlert";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Editor } from "../../../../../../components/CustomComponents/Editor";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../../../api/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { getUserData } from "../../../../../../api/Auth";
import moment from "moment";
import html2canvas from "html2canvas";

const validationSchema = Yup.object({
  fkSessionId: Yup.number().optional(),
  questionCategory: Yup.string().required("Category is required"),
  noticeOfficeDiaryNo: Yup.number().optional(),
  fkMemberId: Yup.object().required("Member Name is required"),
  noticeOfficeDiaryDate: Yup.string().required(
    "Notice Office Diary Date is required"
  ),
  // noticeOfficeDiaryTime: Yup.string().required(
  //   "Notice Office Diary Time is required"
  // ),
  // englishText: Yup.string().required('English Text is required'),
  // urduText: Yup.string().required('Urdu Text is required'),
});

function NewQuestion() {
  const navigate = useNavigate();
  const { members, sessions, allBranchesData, divisions } =
    useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState([]);
  const [filesData, setFilesData] = useState();
  const sessionId = sessions && sessions.map((item) => item?.id);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [imageLinks, setImageLinks] = useState([]);
  const [englishtTextImage, setEnglishTextImage] = useState(null);
  const UserData = getUserData();
  const LoggedInUserID = UserData && UserData?.fkUserId;
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  console.log("english imagesssssss===", englishtTextImage);
  const handleOkClick = () => {
    CreateQuestionApi(formValues);
    handleClose();
  };
  const formik = useFormik({
    initialValues: {
      fkSessionId: "",
      questionCategory: "",
      noticeOfficeDiaryNo: null,
      fkMemberId: null,
      noticeOfficeDiaryDate: moment(new Date()).format("YYYY-MM-DD"),
      noticeOfficeDiaryTime: moment().format("HH:mm A"),
      englishText: "",
      urduText: "",
      questionImage: [],
      initiatedByBranch: "",
      sentToBranch: "",
      fkDivisionId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // handleShow();
      // setFormValues(values);
      CreateQuestionApi(values);
    },
    // enableReinitialize: true,
  });

  const canvasRef = useRef(null);

  const textToImage = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Enhanced configuration
    const config = {
      width: 800, // Increased width for better readability
      lineHeight: 35, // Increased line height
      sidePadding: 40, // Increased side padding
      topBottomPadding: 30, // Increased top/bottom padding
      fontSize: "16px", // Adjusted font size
      fontFamily: "Arial, sans-serif",
      textColor: "#333333", // Softer black for better readability
      backgroundColor: "#ffffff",
      maxWordsPerLine: 12, // Adjusted for better line breaks
      lineSpacing: 1.5, // Added line spacing multiplier
    };

    // Clean and prepare the text
    const cleanText = text.replace(/(<([^>]+)>)/gi, "").trim();

    // Split into words and create lines with better word count
    const words = cleanText.split(" ");
    const lines = [];
    let currentLine = [];
    let currentWidth = 0;

    // Set up font before measuring text
    ctx.font = `${config.fontSize} ${config.fontFamily}`;

    words.forEach((word) => {
      const wordWidth = ctx.measureText(word + " ").width;
      if (currentWidth + wordWidth <= config.width - config.sidePadding * 2) {
        currentLine.push(word);
        currentWidth += wordWidth;
      } else {
        lines.push(currentLine.join(" "));
        currentLine = [word];
        currentWidth = wordWidth;
      }
    });
    if (currentLine.length > 0) {
      lines.push(currentLine.join(" "));
    }

    // Calculate canvas dimensions
    const effectiveLineHeight = config.lineHeight * config.lineSpacing;
    const contentHeight = lines.length * effectiveLineHeight;
    const height = contentHeight + config.topBottomPadding * 2;

    // Set canvas size
    canvas.width = config.width;
    canvas.height = height;

    // Set styles
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, config.width, height);
    ctx.fillStyle = config.textColor;
    ctx.font = `${config.fontSize} ${config.fontFamily}`;

    // Add subtle shadow for depth
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    // Function to draw justified text with improved spacing
    const drawJustifiedText = (line, y) => {
      const words = line.split(" ");
      const totalWidth = ctx.measureText(line).width;
      const totalSpaces = words.length - 1;
      const spaceWidth =
        (config.width - config.sidePadding * 2 - totalWidth) / totalSpaces;

      let x = config.sidePadding;
      words.forEach((word, index) => {
        ctx.fillText(word, x, y);
        x += ctx.measureText(word).width + spaceWidth;
      });
    };

    // Draw text with improved positioning and justification
    lines.forEach((line, index) => {
      const y = config.topBottomPadding + effectiveLineHeight * (index + 0.8);

      if (index === lines.length - 1) {
        // Left align last line
        ctx.fillText(line, config.sidePadding, y);
      } else {
        // Justify other lines
        drawJustifiedText(line, y);
      }
    });

    // Add a subtle border
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, config.width, height);

    return canvas.toDataURL("image/png", 1.0); // Added quality parameter
  };

  // Helper function to convert data URL to File
  const dataURLToFile = (dataURL, fileName) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);

    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  // Main conversion function
  const convertTextToImages = (content) => {
    const englishTextImage = textToImage(content);
    const englishFile = dataURLToFile(
      englishTextImage,
      "Question_Text_Image.png"
    );
    console.log("English Text File:", englishFile);
    setEnglishTextImage(englishFile);
  };

  // const canvasRef = useRef(null);

  // Function to convert text to an image using canvas
  // const textToImage = (text) => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");

  //   // Set canvas width and initial line height
  //   const width = 700;
  //   const lineHeight = 30; // Height of each line
  //   const padding = 20; // Padding for the left and right
  //   const topBottomPadding = 20; // Optional padding for the top and bottom
  //   canvas.width = width;

  //   // Split the text into chunks of 9 words
  //   const words = text.split(" ");
  //   const lines = [];
  //   for (let i = 0; i < words.length; i += 9) {
  //     lines.push(words.slice(i, i + 10).join(" "));
  //   }

  //   // Calculate the required canvas height based on the number of lines
  //   const contentHeight = lines.length * lineHeight;
  //   const height = contentHeight + topBottomPadding * 2; // Add padding to the height
  //   canvas.height = height;

  //   // Set background and text styles
  //   ctx.fillStyle = "#ffffff"; // Background color
  //   ctx.fillRect(0, 0, width, height);
  //   ctx.fillStyle = "#000000"; // Text color
  //   ctx.font = "20px Arial";

  //   // Function to draw justified text
  //   const drawJustifiedText = (line, yPosition) => {
  //     const wordsInLine = line.split(" ");
  //     const totalWords = wordsInLine.length;
  //     const lineTextWidth = ctx.measureText(line).width;
  //     const spaceWidth =
  //       (width - lineTextWidth - padding * 2) / (totalWords - 1);

  //     let xPosition = padding;
  //     for (let i = 0; i < wordsInLine.length; i++) {
  //       ctx.fillText(wordsInLine[i], xPosition, yPosition);
  //       // Move to the next word position
  //       xPosition += ctx.measureText(wordsInLine[i]).width + spaceWidth;
  //     }
  //   };

  //   // Draw each line of text on the canvas
  //   lines.forEach((line, index) => {
  //     const yPosition = topBottomPadding + lineHeight * (index + 1);
  //     if (index === lines.length - 1) {
  //       // Left-align the last line
  //       const xPosition = padding;
  //       ctx.fillText(line, xPosition, yPosition);
  //     } else {
  //       // Justify all other lines
  //       drawJustifiedText(line, yPosition);
  //     }
  //   });

  //   // Convert canvas content to a data URL (image)
  //   return canvas.toDataURL("image/png");
  // };

  // Function to convert a data URL to a File object
  // const dataURLToFile = (dataURL, fileName) => {
  //   const arr = dataURL.split(",");
  //   const mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   return new File([u8arr], fileName, { type: mime });
  // };

  // Function to convert English and Urdu text to images and create File objects
  // const convertTextToImages = (content) => {
  //   const englishTextImage = textToImage(content.replace(/(<([^>]+)>)/gi, ""));
  //   let englishFile = dataURLToFile(
  //     englishTextImage,
  //     "Question_Text_Image.png"
  //   );
  //   console.log("English Text File:", englishFile);
  //   setEnglishTextImage(englishFile);
  // };

  // Getting Notice Office Diary Number
  const getQuestionNoticeOfficeDiaryNumberApi = async () => {
    try {
      const response = await getQuestionNoticeDiaryNumber();

      if (response?.success) {
        // setQuestionNoticeOfficeDiaryNumber(response?.data);
        formik.setFieldValue(
          "noticeOfficeDiaryNo",
          response?.data?.noticeOfficeDiaryNo
            ? response?.data?.noticeOfficeDiaryNo
            : ""
        );
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    getQuestionNoticeOfficeDiaryNumberApi();
    if (sessions && sessions.length > 0) {
      const currentSessionId = sessions[0]?.id; // Assuming the first session is the current one
      formik.setFieldValue("fkSessionId", currentSessionId);
    }
  }, [sessions]);

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  // Handale DateCHange
  const handleDateSelect = (date) => {
    // formik.setFieldValue("noticeOfficeDiaryDate", date);
    formik.setFieldValue(
      "noticeOfficeDiaryDate",
      moment(date).format("YYYY-MM-DD")
    );
    setIsCalendarOpen(false);
  };

  console.log("testenglish", formik.englishImageFile);

  const CreateQuestionApi = async (values) => {
    const formData = new FormData();
    formData.append("fkSessionId", values?.fkSessionId);
    formData.append("noticeOfficeDiaryNo", Number(values?.noticeOfficeDiaryNo));
    // formData.append("noticeOfficeDiaryDate", values.noticeOfficeDiaryDate);

    formData.append(
      "noticeOfficeDiaryDate",
      values?.noticeOfficeDiaryDate &&
        moment(values?.noticeOfficeDiaryDate).format("YYYY-MM-DD")
    );
    formData.append(
      "noticeOfficeDiaryTime",
      values?.noticeOfficeDiaryTime &&
        moment(values?.noticeOfficeDiaryTime, "hh:mm A").format("hh:mm A")
    );
    formData.append("questionCategory", values.questionCategory);
    formData.append("fkQuestionStatus", 12);
    formData.append("fkMemberId", values.fkMemberId?.value);
    // formData.append("initiatedByBranch", values.initiatedByBranch);
    formData.append("initiatedByBranch", 1);
    // formData.append("sentToBranch", values.sentToBranch);
    formData.append("sentToBranch", 1);
    // formData.append("createdByUser", UserData && UserData?.id);
    formData.append("submittedBy", LoggedInUserID);
    formData.append("englishText", values.englishText);
    formData.append("urduText", values.urduText);
    formData.append("questionSentStatus", "inNotice");
    formData.append("fkDivisionId", values.fkDivisionId);
    // Array.from(values.questionImage).forEach((file, index) => {
    //   formData.append(`questionImage[${index}]`, file);
    // });
    // Array.from(values.questionImage).map((file, index) => {
    //   formData.append(`questionImage`, file);
    // });
    if (values?.questionImage.length > 0) {
      Array.from(values?.questionImage).map((file, index) => {
        formData.append(`questionImage`, file);
      });
    } else {
      formData.append("questionImage", englishtTextImage);
    }

    let formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    console.log("Government Bill NA formData", formDataObject);

    try {
      const response = await createQuestion(formData);
      if (response?.success) {
        showSuccessMessage(response?.message);
        formik.resetForm();
        setTimeout(() => {
          navigate("/notice/question/sent");
        }, 2500);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  };

  const handleProcedureContentChange = (content) => {
    console.log(content);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.currentTarget.files);
    const links = selectedFiles.map((file) => URL.createObjectURL(file));
    setImageLinks(links);
    formik.setFieldValue("questionImage", event.currentTarget.files);
  };

  return (
    <Layout
      module={true}
      sidebarItems={NoticeSidebarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/notice/dashboard"}
        title1={"Questions List"}
        addLink1={"/notice/question/sent"}
        title2={"New Question"}
        addLink2={"/notice/question/new"}
      />

      <CustomAlert
        showModal={showModal}
        handleClose={handleClose}
        handleOkClick={handleOkClick}
      />

      <div>
        <div class="container-fluid">
          <div class="card mt-1">
            <div
              class="card-header red-bg"
              style={{ background: "#14ae5c !important" }}
            >
              <h1>NEW QUESTION</h1>
            </div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Session No</label>
                        <select
                          className={`form-select ${
                            formik.touched.fkSessionId &&
                            formik.errors.fkSessionId
                              ? "is-invalid"
                              : ""
                          }`}
                          // placeholder="Session No"
                          value={formik.values.fkSessionId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="fkSessionId"
                        >
                          {/* <option value="" selected disabled hidden>
                            Select
                          </option> */}
                          {sessions &&
                            sessions.length > 0 &&
                            sessions.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.sessionName}
                              </option>
                            ))}
                        </select>
                        {formik.touched.fkSessionId &&
                          formik.errors.fkSessionId && (
                            <div className="invalid-feedback">
                              {formik.errors.fkSessionId}
                            </div>
                          )}
                      </div>
                    </div>

                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Category</label>
                        <select
                          class={`form-select ${
                            formik.touched.questionCategory &&
                            formik.errors.questionCategory
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.questionCategory || ""}
                          name="questionCategory"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          <option value="Starred">Starred</option>
                          <option value="Un-Starred">Un-Starred</option>
                          <option value="Short Notice">Short Notice</option>
                        </select>
                        {formik.touched.questionCategory &&
                          formik.errors.questionCategory && (
                            <div class="invalid-feedback">
                              {formik.errors.questionCategory}
                            </div>
                          )}
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Notice Office Diary No</label>
                        <input
                          className={`form-control ${
                            formik.touched.noticeOfficeDiaryNo &&
                            formik.errors.noticeOfficeDiaryNo
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          id="noticeOfficeDiaryNo"
                          value={formik.values.noticeOfficeDiaryNo}
                          name="noticeOfficeDiaryNo"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          readOnly
                        />
                        {formik.touched.noticeOfficeDiaryNo &&
                          formik.errors.noticeOfficeDiaryNo && (
                            <div class="invalid-feedback">
                              {formik.errors.noticeOfficeDiaryNo}
                            </div>
                          )}
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label class="form-label">Mover(s)</label>
                        <Select
                          options={members.map((item) => ({
                            value: item.id,
                            label: item.memberName,
                          }))}
                          onChange={(selectedOption) =>
                            formik.setFieldValue("fkMemberId", selectedOption)
                          }
                          onBlur={formik.handleBlur}
                          value={formik.values.fkMemberId}
                          name="fkMemberId"
                          className={` ${
                            formik.touched.fkMemberId &&
                            formik.errors.fkMemberId
                              ? "is-invalid"
                              : ""
                          }`}
                        />

                        {formik.touched.fkMemberId &&
                          formik.errors.fkMemberId && (
                            <div class="invalid-feedback">
                              {formik.errors.fkMemberId}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-3">
                      <div className="mb-3" style={{ position: "relative" }}>
                        <label className="form-label">
                          Notice Office Diary Date{" "}
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
                          // selected={
                          //   formik.values.noticeOfficeDiaryDate &&
                          //   formik.values.noticeOfficeDiaryDate
                          // }
                          selected={moment(
                            formik.values.noticeOfficeDiaryDate,
                            "YYYY-MM-DD"
                          ).toDate()}
                          onChange={handleDateSelect}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.noticeOfficeDiaryDate &&
                            formik.errors.noticeOfficeDiaryDate
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

                        {formik.touched.noticeOfficeDiaryDate &&
                          formik.errors.noticeOfficeDiaryDate && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {formik.errors.noticeOfficeDiaryDate}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-3">
                      <div className="mb-3">
                        <label className="form-label">
                          Notice Office Diary Time
                        </label>

                        <TimePicker
                          value={formik.values.noticeOfficeDiaryTime}
                          clockIcon={null}
                          openClockOnFocus={false}
                          format="hh:mm a"
                          onChange={(time) =>
                            formik.setFieldValue("noticeOfficeDiaryTime", time)
                          }
                          className={`form-control ${
                            formik.touched.noticeOfficeDiaryTime &&
                            formik.errors.noticeOfficeDiaryTime
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.noticeOfficeDiaryTime &&
                          formik.errors.noticeOfficeDiaryTime && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {formik.errors.noticeOfficeDiaryTime}
                            </div>
                          )}
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="mb-3">
                        <label class="form-label">Division</label>
                        <select
                          class={`form-select`}
                          placeholder="Division"
                          value={formik.values.fkDivisionId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="fkDivisionId"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          {divisions &&
                            divisions.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item?.divisionName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    {/* From Notice */}
                    {/* <div class="col-3">
                      <div class="mb-3">
                        <label class="form-label">From Branch</label>
                        <select
                          class={`form-select ${
                            formik.touched.initiatedByBranch &&
                            formik.errors.initiatedByBranch
                              ? "is-invalid"
                              : ""
                          }`}
                          // placeholder="Session No"
                          value={formik.values.initiatedByBranch}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="initiatedByBranch"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          {allBranchesData &&
                            allBranchesData.length > 0 &&
                            allBranchesData.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.branchName}
                              </option>
                            ))}
                        </select>
                        {formik.touched.initiatedByBranch &&
                          formik.errors.initiatedByBranch && (
                            <div className="invalid-feedback">
                              {formik.errors.initiatedByBranch}
                            </div>
                          )}
                      </div>
                    </div> */}
                    {/* TO notice */}
                    {/* <div class="col-3">
                      <div class="mb-3">
                        <label class="form-label">To Branch</label>
                        <select
                          class={`form-select ${
                            formik.touched.sentToBranch &&
                            formik.errors.sentToBranch
                              ? "is-invalid"
                              : ""
                          }`}
                          // placeholder="Session No"
                          value={formik.values.sentToBranch}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="sentToBranch"
                        >
                          <option value="" selected disabled hidden>
                            Select
                          </option>
                          {allBranchesData &&
                            allBranchesData.length > 0 &&
                            allBranchesData.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.branchName}
                              </option>
                            ))}
                        </select>
                        {formik.touched.sentToBranch &&
                          formik.errors.sentToBranch && (
                            <div className="invalid-feedback">
                              {formik.errors.sentToBranch}
                            </div>
                          )}
                      </div>
                    </div> */}
                  </div>

                  <div class="row">
                    <div className="col-3">
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Select Image Files
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          accept=".pdf, .jpg, .jpeg, .png"
                          id="formFile"
                          name="questionImage"
                          multiple
                          // onChange={(event) => {
                          //   formik.setFieldValue(
                          //     "questionImage",
                          //     event.currentTarget.files
                          //   );
                          // }}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div>
                      {imageLinks.length > 0 && (
                        <div>
                          {imageLinks.map((link, index) => (
                            <div className="col-1" key={index}>
                              <a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Attachement {index + 1}
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-12">
                      <div style={{ marginTop: 10 }}>
                        <Editor
                          title={"English Text"}
                          onChange={(content) =>
                            formik.setFieldValue("englishText", content)
                          }
                          value={formik.values.englishText}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        convertToImage("englishEditor", "English_Text")
                      }
                    >
                      Download English Text as Image
                    </button>
                    <div className="col-12">
                      <div style={{ marginTop: 70, marginBottom: 40 }}>
                        <Editor
                          title={"Urdu Text"}
                          onChange={(content) =>
                            formik.setFieldValue("urduText", content)
                          }
                          value={formik.values.urduText}
                        />
                      </div>
                      <button
                        onClick={() =>
                          convertToImage("urduEditor", "Urdu_Text")
                        }
                      >
                        Download Urdu Text as Image
                      </button>
                    </div>
                  </div> */}
                  <div>
                    <div id="englishEditor" style={{ marginTop: 10 }}>
                      <Editor
                        title={"English Text"}
                        onChange={(content) => {
                          formik.setFieldValue("englishText", content);
                          convertTextToImages(content);
                        }}
                        value={formik.values.englishText}
                      />
                    </div>
                    <div
                      id="urduEditor"
                      style={{ marginTop: 70, marginBottom: 40 }}
                    >
                      <Editor
                        title={"Urdu Text"}
                        onChange={(content) =>
                          formik.setFieldValue("urduText", content)
                        }
                        value={formik.values.urduText}
                      />
                    </div>
                    {/* <button onClick={convertTextToImages}>
                      Convert Text to Image
                    </button> */}
                    <canvas
                      ref={canvasRef}
                      style={{ display: "none" }}
                    ></canvas>
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

export default NewQuestion;
