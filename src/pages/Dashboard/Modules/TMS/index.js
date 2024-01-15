import React from "react";
import { Layout } from "../../../../components/Layout";
import LeaveCard from "../../../../components/CustomComponents/LeaveCard";
import { TMSsidebarItems } from "../../../../utils/sideBarItems";
import StatsCard from "../../../../components/CustomComponents/StatsCard";

function TMSDashboard() {
  return (
    <Layout module={true} sidebarItems={TMSsidebarItems} centerlogohide={true}>
      <div class="row">
        <div class="col-md-12">
          <div class="mt-5 mb-4">
            <div class="row">
              <StatsCard name={"Question"} InprogressVal={35} completedVal={25} link={"/tms/dashboard"} />
              <StatsCard name={"Motion"} InprogressVal={15} completedVal={13} link={"/tms/dashboard"} />
              <StatsCard name={"Resolution"} InprogressVal={25} completedVal={18} link={"/tms/dashboard"} />
            </div>
            <div className="mt-4">
              <div className="row">
                <StatsCard name={"Legislation"} InprogressVal={13} completedVal={10} link={"/tms/dashboard"} />
                <StatsCard name={"House Business"} InprogressVal={45} completedVal={50} link={"/tms/dashboard"} />
                <StatsCard name={"Members"} InprogressVal={17} completedVal={34} link={"/tms/dashboard"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TMSDashboard;
