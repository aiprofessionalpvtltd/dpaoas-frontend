import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { CMSsidebarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import {
    UpdateInventoryById,
    createInventory,
    getAllInvoiceBill,
    getInventoryBillsById,
} from "../../../../../../api/APIs/Services/Complaint.service";
import { useLocation } from "react-router";
import * as Yup from "yup";

const validationSchema = Yup.object({
    serialNo: Yup.string().required("serialNo is required"),
    productName: Yup.string().required("ProductName is required"),
    manufacturer: Yup.string().required("Manufacturer is required"),
    barcodeLabel: Yup.string().required("Barcode Label is required"),
    categories: Yup.string().required("Categories is required"),
});

function CMSAddInventory() {
    const location = useLocation();
    const [inventoryBill, setInventoryBill] = useState([]);
    const [inventoryBillData, setInventoryBillData] = useState(null);
    const [inventoryBillid, setInventoryBillid] = useState(null);

    const formik = useFormik({
        initialValues: {
            serialNo: location?.state ? location?.state.serialNo : "",
            productName: location?.state ? location?.state.productName : "",
            manufacturer: location?.state ? location?.state.manufacturer : "",
            barcodeLabel: location?.state ? location?.state.barCodeLable : "",
            categories: location?.state ? location?.state.productCategories : "",
            status: location?.state ? location?.state.status : "",
            purchasedDate: location?.state
                ? new Date(location?.state?.purchasedDate)
                : "",
            warrantyExpireDate: location?.state
                ? new Date(location?.state?.warrantyExpiredDate)
                : "",
        },

        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (location?.state?.id) {
                hendleUpdateInventory(values);
            } else {
                hendleAddInventory(values);
            }
        },
    });

    const hendleAddInventory = async (values) => {
        const Data = {
            productName: values.productName,
            fkInventoryBillId: inventoryBillid,
            manufacturer: values.manufacturer,
            quantity: 0,
            productCategories: values.categories,
            serialNo: values.serialNo,
            barCodeLable: values.barcodeLabel,
            description: values.description,
            purchasedDate: values.purchasedDate,
            warrantyExpiredDate: values.warrantyExpireDate,
            status: "in-stock/store",
        };
        try {
            const response = await createInventory(Data);
            if (response.success) {
                showSuccessMessage(response?.message);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };

    const hendleUpdateInventory = async (values) => {
        const Data = {
            productName: values.productName,
            fkInventoryBillId: location.state.id
                ? location.state.fkInventoryBillId
                : inventoryBillid,
            manufacturer: values.manufacturer,
            quantity: 0,
            productCategories: values.categories,
            serialNo: values.serialNo,
            barCodeLable: values.barcodeLabel,
            description: values.description,
            purchasedDate: values.purchasedDate,
            warrantyExpiredDate: values.warrantyExpireDate,
            status: values.status,
        };

        try {
            const response = await UpdateInventoryById(location.state.id, Data);
            if (response.success) {
                showSuccessMessage(response?.message);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
        }
    };

    const getAllInvoiceBillApi = async () => {
        try {
            const response = await getAllInvoiceBill(0, 100);
            if (response?.success) {
                setInventoryBill(response?.data?.inventoryBills);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getSingleRecordById = async (event) => {
        setInventoryBillid(event.target.value);

        try {
            const response = await getInventoryBillsById(event.target.value);
            if (response?.success) {
                setInventoryBillData(response?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllInvoiceBillApi();
    }, []);

    return (
        <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/cms/admin/inventory/dashboard"}
                addLink1={"/cms/admin/inventory/dashboard/add"}
                title1={"Add Inventory"}
            />
            <ToastContainer />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#666" }}>
                        <h1>Add Inventory</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="container-fluid">
                                <div
                                    style={{
                                        background: "#f2f2f2",
                                        padding: "15px",
                                        marginBottom: "15px",
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Invioce Number</label>
                                                {location?.state?.id ? (
                                                    <input
                                                        type="text"
                                                        className={`form-control`}
                                                        id="productName"
                                                        placeholder={
                                                            location?.state?.invoiceNumber?.invoiceNumber
                                                        }
                                                        readOnly
                                                    />
                                                ) : (
                                                    <select
                                                        class="form-select"
                                                        id="status"
                                                        name="serialNo"
                                                        onChange={getSingleRecordById}
                                                    >
                                                        <option value={""} selected disabled hidden>
                                                            Select
                                                        </option>
                                                        {inventoryBill?.map((item) => (
                                                            <option value={item.id}>
                                                                {item.invoiceNumber}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {inventoryBillData && (
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label htmlFor="formFile" className="form-label">
                                                        Vendor
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control`}
                                                        id="productName"
                                                        placeholder={inventoryBillData?.vendor?.vendorName}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label htmlFor="formFile" className="form-label">
                                                        Quantity
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control`}
                                                        id="productName"
                                                        placeholder={inventoryBillData?.quantity}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">
                                                Serial No
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.serialNo &&
                                                    formik.errors.serialNo
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="serialNo"
                                                placeholder={formik.values.serialNo}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.serialNo &&
                                                formik.errors.serialNo && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.serialNo}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.productName &&
                                                    formik.errors.productName
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="productName"
                                                placeholder={formik.values.productName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.productName &&
                                                formik.errors.productName && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.productName}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Manufacturer/OEM</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.manufacturer &&
                                                    formik.errors.manufacturer
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="manufacturer"
                                                placeholder={formik.values.manufacturer}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.manufacturer &&
                                                formik.errors.manufacturer && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.manufacturer}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Barcode Label</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.barcodeLabel &&
                                                    formik.errors.barcodeLabel
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="barcodeLabel"
                                                placeholder={formik.values.barcodeLabel}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.barcodeLabel &&
                                                formik.errors.barcodeLabel && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.barcodeLabel}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">
                                                Categories
                                            </label>
                                            <select
                                                class={`form-select ${formik.touched.categories &&
                                                    formik.errors.categories
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="categories"
                                                name="categories"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.categories}
                                            >
                                                <option value={""} selected disabled hidden>
                                                    Select
                                                </option>
                                                <option value="Laptop">Laptop</option>
                                                <option value="Printer">Printer</option>
                                                <option value="Mouse">Mouse</option>
                                                <option value="Keyboard">Keyboard</option>
                                            </select>
                                            {formik.touched.categories &&
                                                formik.errors.categories && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.categories}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    {location?.state?.id && (
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label htmlFor="formFile" className="form-label">
                                                    Status
                                                </label>
                                                <select
                                                    class="form-select"
                                                    id="status"
                                                    name="status"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.status}
                                                >
                                                    <option value={""} selected disabled hidden>
                                                        Select
                                                    </option>
                                                    <option value="in-stock/store">In-Stock/Store</option>
                                                    <option value="issued">Issued</option>
                                                    <option value="disposed of">Disposed Of</option>
                                                    <option value="repairing">Repairing</option>
                                                    <option value="out of order">Out OF Order</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3" style={{ position: "relative" }}>
                                            <label class="form-label">Purchased Date</label>
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    right: "15px",
                                                    top: "36px",
                                                    zIndex: 1,
                                                    fontSize: "20px",

                                                    color: "#666",
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                            </span>
                                            <DatePicker
                                                minDate={new Date()}
                                                selected={formik.values.purchasedDate}
                                                onChange={(date) =>
                                                    formik.setFieldValue("purchasedDate", date)
                                                }
                                                className={"form-control"}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="mb-3" style={{ position: "relative" }}>
                                            <label class="form-label">Warranty Expire Date</label>
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    right: "15px",
                                                    top: "36px",
                                                    zIndex: 1,
                                                    fontSize: "20px",

                                                    color: "#666",
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                            </span>
                                            <DatePicker
                                                minDate={new Date()}
                                                selected={formik.values.warrantyExpireDate}
                                                onChange={(date) =>
                                                    formik.setFieldValue("warrantyExpireDate", date)
                                                }
                                                className={"form-control"}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row"></div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-primary" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CMSAddInventory;
