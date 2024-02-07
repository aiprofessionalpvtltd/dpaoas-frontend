import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Header from '../../../../../../components/Header'
import { Layout } from '../../../../../../components/Layout'
import { CMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { SearchInventoryBySerailNo, getallcomplaintTypes, updateInventoryreturnDate } from '../../../../../../api/APIs/Services/Complaint.service'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import { AuthContext } from '../../../../../../api/AuthContext'
import Select from "react-select";
import moment from 'moment'


function InventoryReturnDate() {
    const [complaintType, setComplaintType] = useState([]);


    const [serailNo, setSerailNo] = useState(null)
    const [issuedDate, setIssuedDate] = useState(null)
    const [branch, setBranch] = useState(null)
    const [employee, setEmployee] = useState(null)
    const [returnDate, setReturnDate] = useState(null)
    const [searchData, setSearchData] = useState([])





    const SearchInventoryAPi = async () => {
        try {
            const response = await SearchInventoryBySerailNo(serailNo); // Add await here
            if (response?.success) {
                showSuccessMessage(response?.message)
                // const transformedData = transformInventoryBillData(response?.data);
                // setInventoryData(transformedData);
                // setSearchData(response?.data)
                // showSuccessMessage(response?.data)

                const filterData = response?.data?.filter((item) => item?.issuedDate !== null && item?.returnDate === null
                )
                console.log("second filere", filterData)
                setSearchData(filterData)

            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message)
        }
    };

    const AllComplaintTypeApi = async () => {
        try {
            const response = await getallcomplaintTypes();
            if (response?.success) {
                // showSuccessMessage(response?.message);
                setComplaintType(response?.data);
            }
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.error);
        }
    };
    console.log("searchData?.assignedInventory?.id", searchData[0]?.assignedInventory?.id)

    const hendleAddInventory = async () => {
        const Data = {
            returnDate: returnDate,
        }
        try {
            const response = await updateInventoryreturnDate(searchData[0]?.assignedInventory?.id, Data);
            if (response.success) {
                showSuccessMessage(response.message);
            }
        } catch (error) {
            showErrorMessage(error?.response?.data?.message);
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
            <ToastContainer />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header red-bg" style={{ background: "#666" }}>
                        <h1>Return Date</h1>
                    </div>
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">
                                            Serial Number
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            id="serialNo"
                                            placeholder={serailNo}
                                            onChange={(e) => setSerailNo(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-6 d-flex justify-content-center align-items-center">
                                    <button className="btn btn-primary" type="button" onClick={() => SearchInventoryAPi()}>
                                        Search
                                    </button>
                                </div>
                            </div>


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
                                                    Categories
                                                </th>
                                                {searchData[0]?.assignedToUser && (
                                                    <th class="text-center" scope="col">
                                                        Assigin To User
                                                    </th>
                                                )}
                                                {
                                                    searchData[0]?.assignedToBranch && (
                                                        <th class="text-center" scope="col">
                                                            Assigin To Branch
                                                        </th>
                                                    )
                                                }

                                                <th class="text-center" scope="col">
                                                    Issued Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-center">{searchData[0]?.assignedInventory?.productName}</td>
                                                <td class="text-center">{searchData[0]?.assignedInventory?.productCategories}</td>
                                                {searchData[0]?.assignedToUser && (
                                                    <td class="text-center">{`${searchData[0]?.assignedToUser?.employee?.firstName} ${searchData[0]?.assignedToUser?.employee?.lastName}`}</td>
                                                )}
                                                {searchData[0]?.assignedToBranch && (
                                                    <td class="text-center">{searchData[0]?.assignedToBranch?.complaintTypeName}</td>
                                                )}
                                                <td class="text-center">{moment(searchData[0]?.issuedDate).format("MM/DD/YYYY")}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            )}

                            <div className='row mt-4'>
                                <div className="col-6">
                                    <div className="mb-3" style={{ position: "relative" }}>
                                        <label htmlFor="formFile" className="form-label">
                                            Return Date
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
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                        </span>
                                        <DatePicker
                                            minDate={new Date()}
                                            selected={returnDate}
                                            onChange={(date) => setReturnDate(date)}
                                            className={"form-control"}
                                        />
                                    </div>
                                </div>
                                <div className="col-6 d-flex justify-content-center align-items-center">
                                    <button className="btn btn-primary" type="button" onClick={() => hendleAddInventory()}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default InventoryReturnDate