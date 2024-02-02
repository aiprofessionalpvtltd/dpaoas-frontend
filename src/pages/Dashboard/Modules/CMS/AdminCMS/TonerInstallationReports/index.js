import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../../../components/Layout";
import { CMSsidebarItems } from "../../../../../../utils/sideBarItems";
import CustomTable from "../../../../../../components/CustomComponents/CustomTable";
import Header from "../../../../../../components/Header";
import moment from "moment";
import { getallComplaint } from "../../../../../../api/APIs";

function CMSTonerInstallationReports() {
  const [complaintData, setComplaintData] = useState([]);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; // Set your desired page size

  const handlePageChange = (page) => {
    // Update currentPage when a page link is clicked
    setCurrentPage(page);
  };

  const transformDepartmentData = (apiData) => {
    return apiData.map((item) => ({
      SR: item?.id,
      complaineeUser: `${item?.complaineeUser?.employee?.firstName}${item?.complaineeUser?.employee?.lastName}`,
      BranchOffice: item?.complaintType?.complaintTypeName,
      NatureofComplaint: item?.complaintCategory?.complaintCategoryName,
      AssigneTo:
        item?.resolverUser &&
        `${item?.resolverUser?.employee?.firstName}${item?.resolverUser?.employee?.lastName}`,
      complaintDate: moment(item?.complaintIssuedDate).format("DD/MM/YYYY"),
      ResolvedDate:
        item?.complaintResolvedDate &&
        moment(item?.complaintResolvedDate).format("DD/MM/YYY"),
      complaintStatus: item?.complaintStatus,
      status: item?.status,
    }));
  };
  const getComplaint = useCallback(async () => {
    try {
      const response = await getallComplaint(0, 100);
      if (response?.success) {
        const filterData = response?.data?.complaints.filter(
          (item) =>
            item.complaintCategory?.complaintCategoryName ===
            "Toner Installation"
        );
        console.log("filterData", filterData);
        const transformedData = transformDepartmentData(filterData);
        setCount(response?.data?.count);
        setComplaintData(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, pageSize, setCount, setComplaintData]);

  useEffect(() => {
    getComplaint();
  }, [getComplaint]);

  return (
    <Layout module={true} sidebarItems={CMSsidebarItems} centerlogohide={true}>
      <Header dashboardLink={"/cms/admin/dashboard"} />
      <div class="row">
        <div class="col-12">
          <CustomTable
            block={false}
            data={complaintData}
            tableTitle="Toner Installation Reports"
            hideBtn={true}
            handlePageChange={handlePageChange}
            singleDataCard={true}
            hideEditIcon={true}
            currentPage={currentPage}
            pageSize={pageSize}
            headertitlebgColor={"#666"}
            headertitletextColor={"#FFF"}
            totalCount={count}
            hideDeleteIcon={true}
            showPrint={false}
            ActionHide={true}
          />
          <div class="d-grid gap-2 d-md-flex justify-content-md-start col mt-5">
            <button class="btn btn-primary" type="button">
              Print Report
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CMSTonerInstallationReports;
