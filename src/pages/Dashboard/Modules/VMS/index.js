import React from 'react'
import { Layout } from '../../../../components/Layout'
import { VMSsidebarItems } from '../../../../utils/sideBarItems'
import CustomTable from '../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header'


function VMSDashboard() {
    const navigate = useNavigate();

    const data = [
        { SrNo: 1, PassId: '545646', PassDate: '11/02/2023', PassType: 'Naeem Malik IT(Director)', RequestedType: 'Entry May be allowed with comment base', RequestedBy: 'Official', VisitPurpose: '11/02/2023', FromDate: '25/02/2023', ToDate: '26/02/2023', IsActive: 'Yes' },
        { SrNo: 1, PassId: '545646', PassDate: '11/02/2023', PassType: 'Naeem Malik IT(Director)', RequestedType: 'Entry May be allowed with comment base', RequestedBy: 'Official', VisitPurpose: '11/02/2023', FromDate: '25/02/2023', ToDate: '26/02/2023', IsActive: 'Yes' },
    ];

    return (
        <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/vms/dashboard"} addLink1={"/vms/dashboard"} title1={"Passes"} />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        data={data}
                        tableTitle="Passes"
                        addBtnText="Add Pass"
                        handleAdd={() => navigate('/vms/addeditpass')}
                        handleEdit={(item) => navigate('/vms/addeditpass', { state: item })}
                        hideUserIcon={true}
                        handleUser={() => navigate("/vms/visitor")}
                        handleDuplicate={() => navigate("/vms/duplicatepass")}
                        seachBarShow={true}
                    // handlePrint={}
                    // handleUser={}
                    // handleDelete={(item) => handleDelete(item.id)}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default VMSDashboard
