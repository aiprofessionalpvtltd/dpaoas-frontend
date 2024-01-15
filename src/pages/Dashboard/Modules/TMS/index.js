import React from "react";
import { Layout } from "../../../../components/Layout";
import LeaveCard from "../../../../components/CustomComponents/LeaveCard";
import { TMSsidebarItems } from "../../../../utils/sideBarItems";

function TMSDashboard() {
  return (
    <Layout module={true} sidebarItems={TMSsidebarItems} centerlogohide={true}>
      <div class="row">
        <div class="col-md-12">
          <div class="mt-5 mb-4">
            <div class="row">
              <LeaveCard
                available={"06"}
                used={"05"}
                title={"Approved Leaves"}
                percentage={"60"}
                value={"10"}
              />
              <LeaveCard
                available={"05"}
                used={"04"}
                title={"Submitted Leaves"}
                percentage={"80"}
                value={"09"}
              />
              <LeaveCard
                available={"05"}
                used={"04"}
                title={"Remaining Leaves"}
                percentage={"100"}
                value={"07"}
              />
            </div>
          </div>

          <div class="mt-5 mb-4">
            <div class="row">
              <LeaveCard
                available={"06"}
                used={"05"}
                title={"Approved Leaves"}
                percentage={"60"}
                value={"10"}
              />
              <LeaveCard
                available={"05"}
                used={"04"}
                title={"Submitted Leaves"}
                percentage={"80"}
                value={"09"}
              />
              <LeaveCard
                available={"05"}
                used={"04"}
                title={"Remaining Leaves"}
                percentage={"100"}
                value={"07"}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TMSDashboard;
