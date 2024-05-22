import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Header from '../../../../../../components/Header'
import { Layout } from '../../../../../../components/Layout'
import { CMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { SearchInventoryBySerailNo, createIssueProduct, getallcomplaintTypes } from '../../../../../../api/APIs/Services/Complaint.service'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import { AuthContext } from '../../../../../../api/AuthContext'
import Select from "react-select";
import moment from 'moment'
import { CustomAlert } from '../../../../../../components/CustomComponents/CustomAlert'
import { useNavigate } from 'react-router'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { getBranches } from '../../../../../../api/APIs/Services/Branches.services'

const validationSchema = Yup.object({
    serialNo: Yup.string().required("Serial No is required"),
});

function InventoryIssueDate() {
    const Navigate = useNavigate()
    const { employeeData } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false)
    const [complaintType, setComplaintType] = useState([]);
    const [issuedDate, setIssuedDate] = useState(null)
    const [branch, setBranch] = useState(null)
    const [employee, setEmployee] = useState(null)
    const [searchData, setSearchData] = useState([])
    const [allIssuedData, setAllIssuedData] = useState([])
    const [count, setCount] = useState(null);
    const [assignuser, setAssignUser] = useState(null)
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4;

    const formik = useFormik({
        initialValues: {
            serialNo: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            SearchInventoryAPi(values)
        },
    });

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };




    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleOkClick = () => {
        Navigate("/cms/admin/inventory/return-date")
        handleClose();
    };

    const tranformissuedData = (apiData) => {
        return apiData.map((item) => ({
            assignedToUser: item?.assignedToUser ? `${item?.assignedToUser?.employee.firstName} ${item?.assignedToUser?.employee?.lastName}` : item.userAssignedName,
            assignedToBranch: item?.assignedToBranch && item?.assignedToBranch?.branchName,
            issuedDate: item.issuedDate && moment(item.issuedDate).format("MM/DD/YYYY"),
            returnDate: item.returnDate && moment(item.returnDate).format("MM/DD/YYYY"),

        }));
    };

    const SearchInventoryAPi = async (values) => {
        try {
            const response = await SearchInventoryBySerailNo(values.serialNo); // Add await here
            if (response?.success) {
                showSuccessMessage(response?.message)
                formik.resetForm()
                const filterData = response?.data?.filter((item) => item?.assignedInventory?.status === "issued" || item?.issuedDate === null || item?.assignedInventory?.status === "in-stock/store")
                // const historyData = response?.data?.filter((item)=> item?.assignedInventory?.status === "issued" || item?.assignedInventory?.status === "in-stock/store")
                // setSearchData(filterData)
                console.log("uuuuu", filterData)
                const updatedFilterData = filterData?.filter((item) => item?.issuedDate === null && item?.returnDate === null && item?.assignedInventory?.status === "in-stock/store");
                console.log("check8778768", updatedFilterData)
                if (updatedFilterData.length !== 0) {
                    console.log("897878989")
                    setSearchData(updatedFilterData)
                }
                else {
                    if (filterData) {
                        console.log("check--->>", filterData)
                        const secondFilter = filterData?.filter((item) => item?.issuedDate !== null && item?.returnDate === null
                        )
                        console.log("second filere", secondFilter)
                        setSearchData(secondFilter)
                        if (secondFilter.length === 0) {
                            console.log("agyee")
                            const secondFilterr = filterData?.filter((item) => item?.issuedDate !== null && item?.returnDate !== null)
                            console.log("secondddd", secondFilterr)
                            setSearchData([secondFilterr[secondFilterr.length - 1]])

                        }

                    }
                }

                // console.log("filterData", filterData);
                const historyDataTransfer = tranformissuedData(response?.data)
                setAllIssuedData(historyDataTransfer)


            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message)
        }
    };


    const AllComplaintTypeApi = async () => {
        try {
            const response = await getBranches(0,200);
            if (response?.success) {
                // showSuccessMessage(response?.message);
                setComplaintType(response?.data?.rows);
            }
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.error);
        }
    };
    console.log(searchData);
    const hendleIssueDate = async (values) => {
        const Data = {
            fkAssignedToUserId: employee ? employee?.value : null,
            fkAssignedToBranchId: JSON.parse(branch),
            issuedDate: issuedDate,
            userAssignedName:assignuser


        }
        try {
            const response = await createIssueProduct(searchData[0]?.assignedInventory?.id, Data);
            if (response.success) {
                showSuccessMessage(response.message);
                setEmployee(null)
                setBranch(null)
                setIssuedDate(null)
            }
        } catch (error) {
            showErrorMessage(error.response.data.message);
        }
    };




    useEffect(() => {
        AllComplaintTypeApi()
    }, [])
    return (
        <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/cms/admin/inventory/inventory-bill"}
                addLink1={"/cms/admin/inventory/inventory-bill/add"}
                title1={
                    "Issue Date"
                }
            />
            <CustomAlert showModal={showModal} handleClose={handleClose} handleOkClick={handleOkClick} title={"This product has been already issued. Are You Sure You Want To Return This Equipment ?"} />

            <ToastContainer />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#666" }}>
                        <h1>Issue Date</h1>
                    </div>
                    <div className="card-body">
                        <div className="container-fluid">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">
                                                Serial Number
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.serialNo &&
                                                    formik.errors.serialNo
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                id="serialNo"
                                                // placeholder={serailNo}
                                                value={formik.values.serialNo}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.serialNo &&
                                                formik.errors.serialNo && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.serialNo}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="col-6 d-flex justify-content-center align-items-center">
                                        <button className="btn btn-primary" type="submit">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {searchData && searchData.length > 0 && (
                                <div class="dash-detail-container"
                                    style={{ marginTop: "20px" }}
                                >
                                    <table class="table red-bg-head th">
                                        <thead>
                                            <tr>
                                                <th class="text-center" scope="col">
                                                    Name
                                                </th>
                                                <th class="text-center" scope="col">
                                                    Manufacturer
                                                </th>
                                                <th class="text-center" scope="col">
                                                    Categories
                                                </th>
                                                <th class="text-center" scope="col">
                                                    BarCode Lable
                                                </th>
                                                <th class="text-center" scope="col">
                                                    Purchased Date
                                                </th>
                                                {searchData[0]?.assignedToUser && (
                                                    <th class="text-center" scope="col">
                                                        Assigin To User
                                                    </th>
                                                )}
                                                {searchData[0]?.assignedToBranch && (
                                                    <th class="text-center" scope="col">
                                                        Assigin To Branch
                                                    </th>
                                                )}
                                                {searchData[0]?.issuedDate && (
                                                    <th class="text-center" scope="col">
                                                        Issued Date
                                                    </th>
                                                )}
                                                {searchData[0]?.returnDate && (
                                                    <th class="text-center" scope="col">
                                                        Return Date
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-center">{searchData[0]?.assignedInventory?.productName}</td>
                                                <td class="text-center">{searchData[0]?.assignedInventory?.manufacturer}</td>
                                                <td class="text-center">{searchData[0]?.assignedInventory?.productCategories}</td>

                                                <td class="text-center">{searchData[0]?.assignedInventory?.barCodeLable}</td>
                                                <td class="text-center">{moment(searchData[0]?.purchasedDate).format("MM/DD/YYYY")}</td>

                                                {searchData[0]?.assignedToUser && (
                                                    <td class="text-center">{`${searchData[0]?.assignedToUser?.employee?.firstName} ${searchData[0]?.assignedToUser?.employee?.lastName}`}</td>

                                                )}
                                                {searchData[0]?.assignedToBranch && (
                                                    <td class="text-center">{searchData[0]?.assignedToBranch?.branchName}</td>
                                                )}
                                                {searchData[0]?.issuedDate && (
                                                    <td class="text-center">{moment(searchData[0]?.issuedDate).format("MM/DD/YYYY")}</td>
                                                )}
                                                {searchData[0]?.returnDate && (
                                                    <td class="text-center">{moment(searchData[0]?.returnDate).format("MM/DD/YYYY")}</td>
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            )}


                            <div className='row mt-4'>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Branch/Office</label>
                                        <select
                                            class="form-select"
                                            placeholder={branch}
                                            onChange={(e) => setBranch(e.target.value)}
                                            id="branch"
                                        >
                                            <option selected disabled hidden>
                                                Select
                                            </option>
                                            {complaintType &&
                                                complaintType.map((item) => <option value={item.id}>{item.branchName}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">User</label>

                                        <Select
                                            options={
                                                employeeData &&
                                                employeeData?.map((item) => ({
                                                    value: item.fkUserId,
                                                    label: `${item.firstName} ${item.lastName}`,
                                                }))
                                            }
                                            onChange={(selectedOptions) => setEmployee(selectedOptions)}
                                            value={employee}
                                            name="employee"
                                            isClearable={true}
                                        />
                                    </div>
                                </div>
                                <div className='col'>
                  <div className="mb-3">
                      <label className="form-label">User</label>
                      <input
                        type="text"
                        className={`form-control`}
                        // id="assignuser"
                        name='assignuser'
                        placeholder='Enter User Name'
                        value={assignuser}
                        onChange={(text) => setAssignUser(text.target.value)}
                       
                      /> 
                      </div>
                      </div>

                                <div class="col">
                                    <div class="mb-3" style={{ position: "relative" }}>
                                        <label class="form-label"> Issued Date</label>
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
                                            selected={issuedDate}
                                            onChange={(date) => setIssuedDate(date)}
                                            className={"form-control"}
                                        />
                                    </div>
                                </div>
                                <div className="col d-flex justify-content-center align-items-center">
                                    <button className="btn btn-primary" type="button" onClick={() => {
                                        if (searchData[0]?.issuedDate && !searchData[0]?.returnDate) {
                                            handleShow()
                                        } else {
                                            hendleIssueDate()
                                        }
                                    }}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-12">
                        <CustomTable
                            data={allIssuedData}
                            tableTitle={"Issuance Details"}
                            hideBtn={true}
                            hidebtn1={true}
                            singleDataCard={true}
                            ActionHide={true}
                            hideDeleteIcon={true}
                            hideEditIcon={true}
                            headertitlebgColor={"#666"}
                            headertitletextColor={"#FFF"}
                            handlePageChange={handlePageChange}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            totalCount={count}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default InventoryIssueDate