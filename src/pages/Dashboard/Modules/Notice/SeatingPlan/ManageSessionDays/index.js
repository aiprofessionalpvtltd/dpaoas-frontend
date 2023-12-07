import React from 'react'
import { NoticeSidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout';
import Header from '../../../../../../components/Header';
import { useNavigate } from 'react-router';


function ManageSessionDays() {
    const navigate = useNavigate()
    

    return (
        <Layout module={true} sidebarItems={NoticeSidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/"} addLink1={"/notice/dashboard"} addLink2={"/notice/seatingplan/manage-session-days"} title1={"Notice"} title2={"Manage Session Days"} />
            <div class='dashboard-content'>
                <div class='container-fluid'>
                    <div class='card mt-5'>
                        <div class='card-header red-bg' style={{background: "#14ae5c !important"}}>
                            <h1>Manage Session Day</h1>
                        </div>
                        <div class='card-body'>
                            <div class="container-fluid">

                                <div class="dash-detail-container" style={{marginTop: "20px"}}>
                                    <table class="table red-bg-head th">
                                        <thead>
                                            <tr>
                                                <th class="text-center" scope="col">Sr#</th>
                                                <th class="text-center" scope="col">Assembly Sessions</th>
                                                <th class="text-center" scope="col">Sitting Date</th>
                                                <th class="text-center" scope="col">Start Time</th>
                                                <th class="text-center" scope="col">End Time</th>
                                                <th class="text-center" scope="col">Prorogued</th>
                                                <th class="text-center" scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-center">1</td>
                                                <td class="text-center">317</td>
                                                <td class="text-center">04/01/2022</td>
                                                <td class="text-center">14:00</td>
                                                <td class="text-center">19:00</td>
                                                <td class="text-center">Yes</td>
                                                <td class="text-center">
                                                    <a href="#"><i class="fas fa-edit"></i></a>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
        </Layout>
    )
}

export default ManageSessionDays
