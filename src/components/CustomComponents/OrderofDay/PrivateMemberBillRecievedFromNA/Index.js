import React, { useState, useContext, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../api/AuthContext";
import {
  getAllBillStatus,
  mainSearchApi,
} from "../../../../api/APIs/Services/LegislationModule.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../utils/ToastAlert";
import IntroducedInSenate from "../../../LegislationBills/IntroducedInSenate";
import RecievedFromNA from "../../../LegislationBills/RecievedFromNA";

const PrivateMemberBillRecievedFromNA = ({
  privateRecievedFromNA,
  setPrivateRecievedFromNA,
  Edit,
}) => {
  const navigate = useNavigate();
  const { sessions } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);
  const [billFrom, setBillFrom] = useState();
  const [remarksAttachmentVal, setRemarksAttachmentVal] = useState();
  const [searchdata, setSearchData] = useState([]);
  const [billdata, setBilldata] = useState([]);
  const pageSize = 10;
  const [isChecked, setIsChecked] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shortTitle =
    "The Legal Practitioners and Bar Councils (Amendment) Bill, 2021";
  // Custom state for form fields
  const [formState, setFormState] = useState({
    billCategory: "",
    statusId: "",
    billType: "",
    billFrom: "From NA",
    keywords: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Transform Government Bill Data
  const transformPrivateNABillData = (apiData) => {
    const docs = apiData?.map((item) => item?.billDocuments);
    if (docs?.length > 0) {
      setRemarksAttachmentVal(true);
    } else {
      setRemarksAttachmentVal(false);
    }
    return apiData?.map((item, index) => ({
      SNo: index + 1,
      id: item.id,
      internalId: item?.id,
      fileNumber: item?.fileNumber,
      titleOfTheBill: item?.billTitle,
      nameOfMoversInNA: item?.senateBillMnaMovers
        ? item?.senateBillMnaMovers
            .map((mover) => mover?.mna?.mnaName)
            .join(", ")
        : "---",
      nameOfMinistersOrMovers: item?.senateBillSenatorMovers
        ? item?.senateBillSenatorMovers
            .map((mover) => mover?.member?.memberName)
            .join(", ")
        : "---",
      billCategory: item?.billCategory,
      billFrom: item?.billFrom,
      billStatus: item?.billStatuses?.billStatusName,
      //   remarks: item?.billRemarks,
      //   billDocuments: item?.billDocuments,
    }));
  };

  const getBillstatus = async () => {
    try {
      const response = await getAllBillStatus(0, 5000);
      if (response?.success) {
        setBilldata(response?.data?.billStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBillstatus();
  }, []);

  const handleSearch = async (event, asyncData) => {
    if (event) {
      event.preventDefault();
    }
    const data = {
      introducedBillSentStatus: "inLegislation",
      billCategory: "Private Member Bill",
      billFrom: "From NA",
      fkBillStatus: formState.statusId,
      billType: formState.billType,
    };

    localStorage.setItem("PrivateBillFromNA", JSON.stringify(data));

    try {
      const response = await mainSearchApi(
        currentPage,
        pageSize,
        asyncData ? asyncData : data
      );
      if (response?.success) {
        let transformedData;
        if (data?.billFrom === "From NA") {
          transformedData = transformPrivateNABillData(
            response?.data?.senateBills
          );
        }
        if (privateRecievedFromNA && privateRecievedFromNA?.length > 0) {
          const updatedData = transformedData.map((item) => {
            const found = privateRecievedFromNA.find(
              (element) => element.id === item.id
            );

            if (found) {
              setIsChecked((prevChecked) => [...prevChecked, item.id]); // Push ID if found
            }
            return item;
          });

          setSearchData(updatedData);
        } else {
          setSearchData(transformedData);
        }
        setBillFrom(data?.billFrom);
        setCount(response?.data?.count);
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      showErrorMessage(error?.response?.message);
    }
  };

  const handleResetForm = () => {
    setFormState({
      billCategory: "",
      statusId: "",
      billType: "",
      billFrom: "From NA",
      keywords: "",
    });
    setSearchData([]);
    localStorage.removeItem("PrivateBillFromNA");
    setPrivateRecievedFromNA([]);
    setIsChecked([]);
    setRemarksAttachmentVal(false);
  };

  useEffect(() => {
    if (isChecked.length > 0) {
      const checkedData = searchdata.filter((item) =>
        isChecked.includes(item?.id)
      );

      const updatedData = checkedData.flatMap((item) => [
        {
          ...item,
          billTitle: `to move that the Bill to ${item.titleOfTheBill} [${shortTitle}], be taken into consideration`,
        },
        {
          ...item,
          billTitle: `to move that the Bill to ${item.titleOfTheBill} [${shortTitle}], be passed`,
        },
      ]);
      setPrivateRecievedFromNA(updatedData);
    }
  }, [isChecked, searchdata]);

  useEffect(() => {
    if (Edit === true) {
      if (privateRecievedFromNA?.length > 0) {
        const EditData = {
          introducedBillSentStatus: "inLegislation",
          billCategory: "Private Member Bill",
          billFrom: "From NA",
          billType: formState.billType,
          fkBillStatus: 3,
        };
        handleSearch(null, EditData);
      }
    } else {
      const data = JSON.parse(localStorage.getItem("PrivateBillFromNA"));
      if (data) {
        handleSearch(null, data);
      }
    }
  }, [Edit]);

  return (
    <>
      <ToastContainer />

      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <form>
              <div className="row">
                <div className="form-group col-3">
                  <label htmlFor="billFrom" className="form-label">
                    Select Bill From
                  </label>
                  <select
                    id="billFrom"
                    name="billFrom"
                    className="form-select"
                    onChange={handleChange}
                    value={formState.billFrom}
                  >
                    <option value="From NA">Recieved From NA</option>
                  </select>
                </div>

                <div className="form-group col-3">
                  <label htmlFor="billType" className="form-label">
                    Bill Type
                  </label>
                  <select
                    id="billType"
                    name="billType"
                    className="form-select"
                    onChange={handleChange}
                    value={formState.billType}
                  >
                    <option value="" disabled hidden>
                      Select Bill Type
                    </option>
                    <option value="Amendment Bill">Amendment Bill</option>
                    <option value="Constitutional Amendment Bill">
                      Constitutional Amendment Bill
                    </option>
                    <option value="New Bill">New Bill</option>
                  </select>
                </div>

                <div className="form-group col-3">
                  <label htmlFor="statusId" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="statusId"
                    name="statusId"
                    onChange={handleChange}
                    value={formState.statusId}
                  >
                    <option value="" disabled>
                      Select Option
                    </option>
                    {billdata.map((item) => (
                      <option key={item?.id} value={item?.id}>
                        {item?.billStatusName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row col mt-3">
                <div className="col d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary me-2"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={handleResetForm}
                  >
                    Reset
                  </button>
                  {/* {isChecked.length > 0 && (
                    <button type="button" className="btn btn-primary">
                      Add To Order of Day
                    </button>
                  )} */}
                </div>
              </div>
            </form>

            <div className="container-fluid">
              <div className="mt-4">
                <RecievedFromNA
                  block={false}
                  addBtnText={"Private Member Bill (Introduced In Senate)"}
                  handleAdd={""}
                  tableTitle={"Private Member Bill Data (Introduced In Senate)"}
                  data={searchdata}
                  hideEditIcon={false}
                  // remarksAttachmentVal={remarksAttachmentVal}
                  handlePageChange={setCurrentPage}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalCount={count}
                  hideTableTopButton={true}
                  // iscolumnCheckbox={isColumnChecked}
                  // isColumncheck={true}
                  // setIsColumnCheckBox={setIsColumnChecked}
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                  isCheckbox={true}
                  ActionHide={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateMemberBillRecievedFromNA;
