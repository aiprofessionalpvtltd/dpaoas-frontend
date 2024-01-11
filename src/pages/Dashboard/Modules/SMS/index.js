import React from "react";
import { Layout } from "../../../../components/Layout";
import { SMSsidebarItems } from "../../../../utils/sideBarItems";
import Header from "../../../../components/Header";

function SMSDashboard() {

  return (
    <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/sms/dashboard"}
        addLink1={"/sms/dashboard"}
        title1={"Home"}
      />
    </Layout>
  );
}

export default SMSDashboard;
