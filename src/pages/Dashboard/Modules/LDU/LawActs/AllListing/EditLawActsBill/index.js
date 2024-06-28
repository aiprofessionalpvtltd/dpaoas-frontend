import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { createLawActsBill, getLawActsBillById, updateLawActsBill } from "../../../../../../../api/APIs/Services/LDU.service";
import { showErrorMessage, showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import { createPrivateBill } from "../../../../../../../api/APIs/Services/Legislation.service";
import { LDUSideBarItems } from "../../../../../../../utils/sideBarItems";
import { Layout } from "../../../../../../../components/Layout";
import Header from "../../../../../../../components/Header";
import { ToastContainer } from "react-toastify";



const validationSchema = Yup.object({
    category: Yup.string().required("category No is required"),
    subject: Yup.string().required("subject No is required"),
    updatedDate: Yup.string().required("updatedDate is required"),
    lawNumber: Yup.string().required("lawNumber From is required"),
    heading: Yup.string().required("heading Subject is required"),
    chapterSections: Yup.string().required("chapterSections is required"),
    volumeNumber: Yup.string().required("volume Number is required"),
    clauses: Yup.string().required('Clauses is required'),
    citationNumbers: Yup.string().required('Citataion Number is required')
});

const EditLawActsBill = () => {
    const location = useLocation();
    const [billById, setBillById] = useState();

    const formik = useFormik({
        initialValues: {
            category: "",
            subject: "",
            updatedDate: "",
            lawNumber: "",
            heading: "",
            chapterSections: "",
            volumeNumber: "",
            clauses: "",
            citationNumbers: ""

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            // Handle form submission here
            if (location?.state?.id) {
                handleEditBill(values);
            } else {
                handleCreateBill(values);
            }
        },
    });

    const handleCreateBill = async (values) => {
        const data = {
            category: values?.category,
            subject: values.subject,
            updatedDate: values.updatedDate,
            lawNumber: values.lawNumber,
            heading: values.heading,
            chapterSections: values.chapterSections,
            volumeNumber: values.volumeNumber || "",
            clauses: values.clauses || "",
            citationNumbers: values.citationNumbers || ""
        };

        try {
            const response = await createLawActsBill(data);
            if (response?.success) {
                showSuccessMessage(response?.message);
                formik.resetForm()
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };

    const handleEditBill = async (values) => {
        const data = {
            category: values?.category,
            subject: values.subject,
            updatedDate: values.updatedDate,
            lawNumber: values.lawNumber,
            heading: values.heading,
            chapterSections: values.chapterSections,
            volumeNumber: values.volumeNumber || "",
            clauses: values.clauses || "",
            citationNumbers: values.citationNumbers || "",
            status: location?.state?.status,
        };

        try {
            const response = await updateLawActsBill(location?.state?.id, data);
            if (response?.success) {
                showSuccessMessage(response?.message);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };

    const getBillByIdApi = async () => {
        try {
            const response = await getLawActsBillById(location.state?.id);
            if (response?.success) {
                setBillById(response?.data[0]);
            }
        } catch (error) {
            // showErrorMessage(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        if (location.state?.id) {
            getBillByIdApi();
        }
    }, []);

    useEffect(() => {
        // Update form values when termsById changes
        if (billById) {
            formik.setValues({
                category: billById?.category || "",
                subject: billById.subject || "",
                updatedDate: new Date(billById.updatedDate) || "",
                lawNumber: billById.lawNumber || "",
                heading: billById.heading || "",
                chapterSections: billById.chapterSections || "",
                volumeNumber: billById.volumeNumber || "",
                clauses: billById.clauses || "",
                citationNumbers: billById.citationNumbers || ""
            });
        }
    }, [billById, formik.setValues]);

    return (
        <Layout
            module={true}
            sidebarItems={LDUSideBarItems}
            centerlogohide={true}
        >
            <Header
                dashboardLink={"/ldu/dashboard"}
                addLink1={"/ldu/lawActs/all-lisitng/edit-law-acts-Bill"}
                title1={"LawActs Bills"}
                addLink2={"/ldu/lawActs/all-lisitng/edit-law-acts-Bill"}
                title2={location && location?.state ? "Edit Bill" : "Add Bill"}
            />
            <ToastContainer />

            <div class="container-fluid">
                <div class="card">
                    <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
                        {location && location.state ? (
                            <h1>Edit Bill</h1>
                        ) : (
                            <h1>Add Bill</h1>
                        )}
                    </div>
                    <div class="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Category</label>
                                            <select
                                                type="text"
                                                // placeholder={"Category"}
                                                value={formik.values.category}
                                                className={`form-select ${formik.touched.category && formik.errors.category
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="category"
                                                name="category"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="" disabled>Select Category</option>
                                                <option value="court laws">Court Laws</option>
                                                <option value="criminal laws">Criminal Laws</option>
                                                <option value="civil laws">Civil Laws</option>
                                                <option value="Constitutional Law">Constitutional Laws</option>
                                                <option value="administrative laws">Administrative Laws</option>
                                            </select>
                                            {formik.touched.category && formik.errors.category && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.category}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Subject</label>
                                            <input
                                                type="text"
                                                // placeholder={"Subject"}
                                                value={formik.values.subject}
                                                className={`form-control ${formik.touched.subject && formik.errors.subject
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="subject"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.subject && formik.errors.subject && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.subject}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div className="col">
                                        <div className="mb-3" style={{ position: "relative" }}>
                                            <label className="form-label">Date</label>
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    right: "15px",
                                                    top: "36px",
                                                    zIndex: 1,
                                                    fontSize: "20px",
                                                    zIndex: "1",
                                                    color: "#666",
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                            </span>
                                            <DatePicker
                                                selected={formik.values.updatedDate}
                                                onChange={(date) => formik.setFieldValue("updatedDate", date)}
                                                onBlur={formik.handleBlur}
                                                className={`form-control ${formik.touched.updatedDate && formik.errors.updatedDate
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                dateFormat={"dd-MM-yyyy"}
                                            />
                                            {formik.touched.updatedDate && formik.errors.updatedDate && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.updatedDate}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label class="form-label">Law Number</label>
                                            <input
                                                type="text"
                                                // placeholder={"Law Number"}
                                                value={formik.values.lawNumber}
                                                className={`form-control ${formik.touched.lawNumber &&
                                                    formik.errors.lawNumber
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="lawNumber"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.lawNumber &&
                                                formik.errors.lawNumber && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.lawNumber}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Heading</label>
                                            <input
                                                type="text"
                                                // placeholder={"Heading"}
                                                value={formik.values.heading}
                                                className={`form-control ${formik.touched.heading &&
                                                    formik.errors.heading
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="heading"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.heading &&
                                                formik.errors.heading && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.heading}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Chapter Section</label>
                                            <input
                                                type="text"
                                                // placeholder={"Remarks"}
                                                value={formik.values.chapterSections}
                                                className={`form-control ${formik.touched.chapterSections && formik.errors.chapterSections
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="chapterSections"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.chapterSections && formik.errors.chapterSections && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.chapterSections}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Volune Nummber</label>
                                            <input
                                                type="text"
                                                // placeholder={"Heading"}
                                                value={formik.values.volumeNumber}
                                                className={`form-control ${formik.touched.volumeNumber &&
                                                    formik.errors.volumeNumber
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="volumeNumber"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.volumeNumber &&
                                                formik.errors.volumeNumber && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.volumeNumber}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label class="form-label">Clauses</label>
                                            <input
                                                type="text"
                                                // placeholder={"Remarks"}
                                                value={formik.values.clauses}
                                                className={`form-control ${formik.touched.clauses && formik.errors.clauses
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="clauses"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.clauses && formik.errors.clauses && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.clauses}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label class="form-label">Citation Nummbers</label>
                                            <input
                                                type="text"
                                                // placeholder={"Heading"}
                                                value={formik.values.citationNumbers}
                                                className={`form-control ${formik.touched.citationNumbers &&
                                                    formik.errors.citationNumbers
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="citationNumbers"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.citationNumbers &&
                                                formik.errors.citationNumbers && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.citationNumbers}
                                                    </div>
                                                )}
                                        </div>
                                    </div>

                                </div>


                                <div class="row">
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

export default EditLawActsBill
