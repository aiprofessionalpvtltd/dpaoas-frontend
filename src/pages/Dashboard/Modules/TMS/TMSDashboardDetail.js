import React from "react";
import { Layout } from "../../../../components/Layout";
import LeaveCard from "../../../../components/CustomComponents/LeaveCard";
import { TMSsidebarItems } from "../../../../utils/sideBarItems";
import StatsCard from "../../../../components/CustomComponents/StatsCard";
import { useLocation } from "react-router-dom";

function TMSDashboardDetail() {
  const location = useLocation();
  const categories = location?.state;
  return (
    <Layout module={true} sidebarItems={TMSsidebarItems} centerlogohide={true}>
      <div class="row">
        <div class="col-md-12">
            <div class="mt-5 mb-4">
              <div class="row">
                {categories && categories?.length > 0 ? categories.map((category, index) => (
                  <React.Fragment key={index}>
                    <StatsCard name={category} freshVal={10} InprogressVal={35} completedVal={25} />
                    {(index + 1) % 3 === 0 && <div className="w-100 mt-4" />} {/* Add mt-4 after every 3 cards */}
                  </React.Fragment>
                )) : (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "30px",
                      fontSize: "20px",
                    }}
                  >
                    No data found :(
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>
    </Layout>
  );
}

export default TMSDashboardDetail;
