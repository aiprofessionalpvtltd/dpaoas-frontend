import React, { useState } from "react";
import { QMSSideBarItems } from "../../../../utils/sideBarItems";
import { Layout } from "../../../../components/Layout";
import Header from "../../../../components/Header";

function QMSQuestionDashboard() {
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/dashboard"}
        title1={"Question"}
      />
    </Layout>
  );
}

export default QMSQuestionDashboard;
