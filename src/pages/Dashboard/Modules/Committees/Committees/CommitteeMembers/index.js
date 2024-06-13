import React, { useCallback, useEffect, useState } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../../../../../components/Layout";
import {
  CommitteesSideBarItems,
  LegislationSideBarItems,
} from "../../../../../../utils/sideBarItems";
import {
  DeleteLegislativeBill,
  getAllLegislativeBill,
} from "../../../../../../api/APIs/Services/Notice.service";
import Header from "../../../../../../components/Header";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";

const committeeMembers = [
  {
    id: 1,
    committeeMemberName: "Senator Farooq Hamid Naek",
    committeeMemberTenure: "March 2021 to March 2027",
    committeeMemberParty: "Pakistan Peoples Party Parliamentarians (PPPP)",
  },
  {
    id: 2,
    committeeMemberName: "Senator Syed Ali Zafar",
    committeeMemberTenure: "March 2021 to March 2027",
    committeeMemberParty: "Pakistan Tehreek-e-Insaf (PTI)",
  },
  {
    id: 3,
    committeeMemberName: "Senator Azam Nazeer Tarar",
    committeeMemberTenure: "March 2021 to March 2027",
    committeeMemberParty: "Pakistan Muslim League Nawaz (PMLN)",
  },
  {
    id: 4,
    committeeMemberName: "Senator Ahmed Khan",
    committeeMemberTenure: "March 2024 to March 2030",
    committeeMemberParty: "Jamiat Ulema-e-Islam Pakistan (JUIP)",
  },
  {
    id: 5,
    committeeMemberName: "Senator Sherry Rehman",
    committeeMemberTenure: "March 2021 to March 2027",
    committeeMemberParty: "Pakistan Peoples Party Parliamentarians (PPPP)",
  },
  {
    id: 6,
    committeeMemberName: "Senator Mohsin Aziz",
    committeeMemberTenure: "March 2021 to March 2027",
    committeeMemberParty: "Pakistan Tehreek-e-Insaf (PTI)",
  },
  {
    id: 7,
    committeeMemberName: "Senator M Fesal Vawda",
    committeeMemberTenure: "March 2024 to March 2030",
    committeeMemberParty: "Independent (IND)",
  },
];

function CommitteesManagementSystemCommitteeMembers() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [billData, setBillData] = useState([]);
  const [committeeData, setCommitteeData] = useState([]);
  const pageSize = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const transformLegislativeData = (apiData) => {
    return apiData.map((item, index) => ({
      SR: item?.id,
      committeeName: item?.title ? item?.title : "",
      committeeType: item?.session?.sessionName
        ? item?.session?.sessionName
        : "",
      chairpersonConvener: item?.date
        ? moment(item?.date).format("DD-MM-YYYY")
        : "",
      committeeSecretary: item?.description ? item?.description : "",
      members: item?.device ? item?.device : "",
      status: item?.isActive ? item?.isActive : "",
    }));
  };

  const getAllLegislativeBillApi = useCallback(async () => {
    try {
      const response = await getAllLegislativeBill(currentPage, pageSize);
      if (response?.success) {
        setCount(response?.data?.count);
        const trensferData = transformLegislativeData(
          response?.data?.legislativeBills
        );
        setBillData(trensferData);
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }, [currentPage, pageSize, setCount, setBillData]);

  const handleDelete = async (id) => {
    try {
      const response = await DeleteLegislativeBill(id);
      if (response?.success) {
        showSuccessMessage(response.message);
        getAllLegislativeBillApi();
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllLegislativeBillApi();
    // setCommitteeData(committeesData);
  }, [currentPage]);
  return (
    <Layout
      module={true}
      sidebarItems={CommitteesSideBarItems}
      centerlogohide={true}
    >
      <ToastContainer />
      <Header
        dashboardLink={"/committees/dashboard"}
        addLink1={"/"}
        title1={"Committee Members"}
      />
      <div class="row mt-5">
        <div class="col-12">
          {/* <CustomTable
            singleDataCard={true}
            block={false}
            data={committeeMembers}
            hidebtn1={true}
            // addBtnText={"Create Committee"}
            tableTitle="Committees Members Lists"
            handlePageChange={handlePageChange}           
            hideDeleteIcon={true}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
           
          /> */}
          <div className="card">
            <div
              className="dash-card-header "
              style={{
                background: "rgb(20, 174, 92)",
                padding: "10px",
              }}
            >
              <h4 style={{ fontSize: "18px", marginTop: "4px" }}>
                Committee Members
              </h4>
            </div>

            <div className="card-body">
              <table className="table red-bg-head th">
                <thead>
                  <tr>
                    <th className="text-center" scope="col">
                      ID
                    </th>
                    <th className="text-center" scope="col">
                      Name
                    </th>
                    <th className="text-center" scope="col">
                      Tenure
                    </th>
                    <th className="text-center" scope="col">
                      Party
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center" scope="col">
                      1
                    </td>
                    <td
                      className="text-center"
                      scope="col"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <span>Senator Farooq Hamid Naek</span>
                      <span style={{ fontSize: "12px", color: "#14AE5C" }}>
                        Chairperson/Convener
                      </span>
                    </td>
                    <td className="text-center" scope="col">
                      March 2021 to March 2027
                    </td>
                    <td className="text-center" scope="col">
                      Pakistan Peoples Party Parliamentarians (PPPP)
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center" scope="col">
                      2
                    </td>
                    <td className="text-center" scope="col">
                      <span>Senator Syed Ali Zafar</span>
                    </td>
                    <td className="text-center" scope="col">
                      March 2021 to March 2027
                    </td>
                    <td className="text-center" scope="col">
                      Pakistan Tehreek-e-Insaf (PTI)
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center" scope="col">
                      3
                    </td>
                    <td className="text-center" scope="col">
                      <span>Senator Azam Nazeer Tarar</span>
                    </td>
                    <td className="text-center" scope="col">
                      March 2021 to March 2027
                    </td>
                    <td className="text-center" scope="col">
                      Pakistan Muslim League Nawaz (PMLN)
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center" scope="col">
                      4
                    </td>
                    <td className="text-center" scope="col">
                      <span>Senator Ahmed Khan</span>
                    </td>
                    <td className="text-center" scope="col">
                      March 2024 to March 2030
                    </td>
                    <td className="text-center" scope="col">
                      Jamiat Ulema-e-Islam Pakistan (JUIP)
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center" scope="col">
                      5
                    </td>
                    <td className="text-center" scope="col">
                      <span>Senator Sherry Rehman</span>
                    </td>
                    <td className="text-center" scope="col">
                      March 2021 to March 2027
                    </td>
                    <td className="text-center" scope="col">
                      Pakistan Peoples Party Parliamentarians (PPPP)
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center" scope="col">
                      6
                    </td>
                    <td className="text-center" scope="col">
                      <span>Senator Mohsin Aziz</span>
                    </td>
                    <td className="text-center" scope="col">
                      March 2021 to March 2027
                    </td>
                    <td className="text-center" scope="col">
                      Pakistan Tehreek-e-Insaf (PTI)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default CommitteesManagementSystemCommitteeMembers;
