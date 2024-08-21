import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { showErrorMessage, showSuccessMessage } from "../../../../../../../utils/ToastAlert";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { createPurchase, updatePurchase  , getPurchaseById} from "../../../../../../../api/APIs/Services/Transport.service";


// Validation Schema
const validationSchema = Yup.object({
    date: Yup.date().required("Date is required"),
    amount: Yup.number().required("Amount is required").positive(),
    description: Yup.string().required("Description is required"),
});

function AddEditPurchase() {
    const { id } = useParams(); // Fetch id from URL
    const navigate = useNavigate();
    
    const [purchase, setPurchase] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleCalendarToggle = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleDateSelect = (date) => {
        formik.setFieldValue("date", date);
        setIsCalendarOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            date: "",
            amount: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                if (id) {
                    await updatePurchase(id, values);
                    showSuccessMessage("Purchase updated successfully!");
                } else {
                    await createPurchase(values);
                    showSuccessMessage("Purchase created successfully!");
                }
                navigate("/purchases"); // Redirect to the purchases list
            } catch (error) {
                showErrorMessage("Failed to save the purchase.");
            }
        },
    });

    useEffect(() => {
        if (id) {
            const fetchPurchase = async () => {
                try {
                    const data = await getPurchaseById(id);
                    setPurchase(data);
                    formik.setValues({
                        date: new Date(data.date),
                        amount: data.amount,
                        description: data.description,
                    });
                } catch (error) {
                    showErrorMessage("Failed to fetch purchase details.");
                }
            };
            fetchPurchase();
        }
    }, [id]);

    return (
        <div>
            <ToastContainer />
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        {id ? <h1>Update Purchase</h1> : <h1>Create Purchase</h1>}
                    </div>
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Date <span className="text-danger">*</span></label>
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
                                    selected={formik.values.date}
                                    onChange={handleDateSelect}
                                    className={`form-control ${formik.touched.date && formik.errors.date ? "is-invalid" : ""}`}
                                    open={isCalendarOpen}
                                    onClickOutside={() => setIsCalendarOpen(false)}
                                    dateFormat="dd-MM-yyyy"
                                />
                                {formik.touched.date && formik.errors.date && (
                                    <div className="invalid-feedback" style={{ display: "block" }}>
                                        {formik.errors.date}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Amount <span className="text-danger">*</span></label>
                                <input
                                    type="number"
                                    className={`form-control ${formik.touched.amount && formik.errors.amount ? "is-invalid" : ""}`}
                                    id="amount"
                                    value={formik.values.amount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.amount && formik.errors.amount && (
                                    <div className="invalid-feedback">
                                        {formik.errors.amount}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description <span className="text-danger">*</span></label>
                                <textarea
                                    className={`form-control ${formik.touched.description && formik.errors.description ? "is-invalid" : ""}`}
                                    id="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <div className="invalid-feedback">
                                        {formik.errors.description}
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary">
                                {id ? "Update" : "Create"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEditPurchase;
