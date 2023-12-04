import React, { useState } from 'react';
import Header from '../../../../../components/Header';
import { MMSSideBarItems } from '../../../../../utils/sideBarItems';
import { Layout } from '../../../../../components/Layout';


function MMSMotionDashboard() {
    return (
        <Layout module={true} sidebarItems={MMSSideBarItems} centerlogohide={true}>
             <Header dashboardLink={"/"} addLink1={"/mms/dashboard"} title1={"Motion"} />
    
        </Layout>
    )
}

export default MMSMotionDashboard
