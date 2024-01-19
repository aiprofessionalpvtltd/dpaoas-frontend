import React from "react";
import { Layout } from "../../../../components/Layout";
import LeaveCard from "../../../../components/CustomComponents/LeaveCard";
import { TMSsidebarItems } from "../../../../utils/sideBarItems";
import StatsCard from "../../../../components/CustomComponents/StatsCard";
import { useNavigate } from "react-router-dom";

function TMSDashboard() {
  const navigate = useNavigate();
  const categories = [
    {
      Question: ["Order Of the Day"],
      Motion: [],
      Resolution: [],
      Legislation: [
        "Legislative",
        "DO Letter",
        "Ballot",
        "Notices",
        "Drill",
        "Order of The Day",
        "Summon",
        "Chairman Order",
        "House of Business",
        "Rules of Procedures",
        "Amendment",
      ],
      RB: ["Chairman", "Deputy Chairman", "Leader of the House", "leader of the Opposition"],
      Members: [],
    },
  ];
  return (
    <Layout module={true} sidebarItems={TMSsidebarItems} centerlogohide={true}>
      <div class="row">
        <div class="col-md-12">
          <div class="mt-5 mb-4">
            <div class="row">
              <StatsCard
                name={"Question"}
                freshVal={10}
                InprogressVal={35}
                completedVal={25}
                handleClick={() => navigate("/tms/dashboard/detail", { state: categories[0].Question })}
              />
              <StatsCard name={"Motion"} freshVal={20} InprogressVal={15} completedVal={13} />
              <StatsCard name={"Resolution"} freshVal={30} InprogressVal={25} completedVal={18} />
            </div>
            <div className="mt-4">
              <div className="row">
                <StatsCard
                  name={"Legislation"}
                  freshVal={40}
                  InprogressVal={13}
                  completedVal={10}
                  subCat={true}
                  handleClick={() => navigate("/tms/dashboard/detail", { state: categories[0].Legislation })}
                />
                <StatsCard
                  name={"Research Branch"}
                  freshVal={50}
                  InprogressVal={45}
                  completedVal={50}
                  subCat={true}
                  handleClick={() => navigate("/tms/dashboard/detail", { state: categories[0].RB })}
                />
                {/* <StatsCard name={"Members"} freshVal={60} InprogressVal={17} completedVal={34} subCat={true}  /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TMSDashboard;
