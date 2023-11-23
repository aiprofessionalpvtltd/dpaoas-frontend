import React from 'react'
import { Layout } from '../../components/Layout'
import { Tiles } from '../../components/CustomComponents/Tiles'
import { faAddressCard, faUserCog, faMailBulk } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
    return (
        <Layout>
            <div class='dashboard-content' style={{ marginTop: "100px" }}>
                <div class="clearfix"></div>
                <div class="row main-dashboard-tiles">
                    <div class="col">
                        <Tiles title={"Leave Management System"} link={"/lms/dashboard"} type={""} cardbg={"bluebg"} icon={faMailBulk} />
                    </div>
                    <div class="col">
                        <Tiles title={"Organizational Dashboard"} link={"/hrm/dashboard"} type={""} cardbg={"greenbg"} icon={faUserCog} />
                    </div>
                    <div class="col">
                        <Tiles title={"Visitors Management System"} link={"/vms/dashboard"} type={""} cardbg={"greybg"} icon={faAddressCard} />
                    </div>
                    {/* <div class="col-sm-3">
                        <Tiles title={"HR"} link={"/"} type={""} cardbg={"purplebg"} icon={faFileAlt}/>
                    </div> */}
                </div>
            </div>

        </Layout>
    )
}

export default Dashboard
