import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../../components/Layout";
import { LegislationSideBarItems } from "../../../../utils/sideBarItems";
import Header from "../../../../components/Header";
import NoticeStatsCard from "../../../../components/CustomComponents/NoticeStatsCard";
import {
  faClipboardQuestion,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAllGovernmentSenateBills,
  getAllPrivateMemberSenateBills,
} from "../../../../api/APIs/Services/LegislationModule.service";

function LegislationManagementSystemDashboard() {
  const [totalCount, setTotalCount] = useState(0);
  const [totalFromSenateCount, setTotalFromSenateCount] = useState(0);
  const [totalFromNACount, setTotalFromNACount] = useState(0);
  const [totalPrivateCount, setTotalPrivateCount] = useState(0);
  const [totalPrivateFromSenateCount, setTotalPrivateFromSenateCount] =
    useState(0);
  const [totalPrivateFromNACount, setTotalPrivateFromNACount] = useState(0);

  const getGovBillsSenateNACount = useCallback(async () => {
    const searchParams = {
      billCategory: "Government Bill",
    };

    const response = await getAllGovernmentSenateBills(0, 5000, searchParams);
    if (response?.success) {
      const governmentNABillData = response?.data?.senateBills || [];

      // Set the total count of bills
      setTotalCount(response?.data?.count || 0);

      // Filter data based on 'billFrom'
      const filteredSenateData = governmentNABillData.filter(
        (bill) => bill?.billFrom === "From Senate"
      );

      setTotalFromSenateCount(filteredSenateData?.length);

      const filteredNAData = governmentNABillData.filter(
        (bill) => bill?.billFrom === "From NA"
      );

      setTotalFromNACount(filteredNAData?.length);
    }
  }, []);
  const getPrivateMemberBillsSenateNACount = useCallback(async () => {
    const searchParams = {
      billCategory: "Private Member Bill",
    };

    const response = await getAllPrivateMemberSenateBills(
      0,
      5000,
      searchParams
    );
    if (response?.success) {
      const privateMemeberBillData = response?.data?.senateBills || [];

      // Set the total count of bills
      setTotalPrivateCount(response?.data?.count || 0);

      // Filter data based on 'billFrom'
      const filteredSenateData = privateMemeberBillData.filter(
        (bill) => bill?.billFrom === "From Senate"
      );

      setTotalPrivateFromSenateCount(filteredSenateData?.length);

      const filteredNAData = privateMemeberBillData.filter(
        (bill) => bill?.billFrom === "From NA"
      );

      setTotalPrivateFromNACount(filteredNAData?.length);
    }
  }, [
    totalCount,
    totalFromNACount,
    totalFromSenateCount,
    totalPrivateCount,
    totalPrivateFromNACount,
    totalPrivateFromSenateCount,
  ]);

  useEffect(() => {
    getGovBillsSenateNACount();
    getPrivateMemberBillsSenateNACount();
  }, [getGovBillsSenateNACount, getPrivateMemberBillsSenateNACount]);
  return (
    <Layout
      module={true}
      sidebarItems={LegislationSideBarItems}
      centerlogohide={true}
    >
      <Header dashboardLink={"/"} title1={"Legislation Stats"} />
      <div style={{ marginLeft: 15 }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fb6340",
          }}
        >
          Government Bills
        </h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Total Government Bills"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={totalCount}
                />
                <NoticeStatsCard
                  title={"Introduced In Senate"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={totalFromSenateCount}
                />
                <NoticeStatsCard
                  title={"Recieved From NA"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={totalFromNACount}
                />
              </div>
            </div>
          </div>
        </div>

        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#f5365c",
          }}
        >
          All Private Member Bills
        </h2>
        <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  title={"Private Member Bills"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={totalPrivateCount}
                />
                <NoticeStatsCard
                  title={"Introduced In Senate"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={totalPrivateFromSenateCount}
                />
                <NoticeStatsCard
                  title={"Recieved From NA"}
                  icon={faClipboardQuestion}
                  overall={true}
                  iconBgColor={"#FFA500"}
                  total={totalPrivateFromNACount}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#0177b4",
          }}
        >
          Upcoming Session Stats
        </h2> */}
        {/* <div class="row">
          <div class="col-md-12">
            <div class="mt-2 mb-4">
              <div class="row">
                <NoticeStatsCard
                  upcoming={true}
                  title={"NA Bills"}
                  icon={faClipboardQuestion}
                  iconBgColor={"#FFA500"}
                  total={`4`}
                />
                <NoticeStatsCard
                  upcoming={true}
                  title={"Senate Bills"}
                  icon={faFileImport}
                  iconBgColor={"#007bff"}
                  total={`4`}
                />
                <NoticeStatsCard
                  upcoming={true}
                  title={"Ordinance"}
                  icon={faFileImport}
                  iconBgColor={"#007bff"}
                  total={`4`}
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
}

export default LegislationManagementSystemDashboard;
