import React from 'react'
import { Layout } from '../../components/Layout'
import { Tiles } from '../../components/CustomComponents/Tiles'
import { faCheck, faFileExcel } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
    return (
        <Layout>
            <div class='dashboard-content'>
                <div class="clearfix"></div>
                <div class="row main-dashboard-tiles">
                    <div class="col">
                        <Tiles title={"LMS"} link={"/lms/dashboard"} type={""} cardbg={"bluebg"} icon={faFileExcel} />
                    </div>
                    <div class="col">
                        <Tiles title={"HRM"} link={"/hrm/dashboard"} type={""} cardbg={"greenbg"} icon={faCheck} />
                    </div>
                    <div class="col">
                        <Tiles title={"VMS"} link={"/vms/dashboard"} type={""} cardbg={"greybg"} icon={faFileExcel} />
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
