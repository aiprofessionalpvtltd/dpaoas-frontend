import React from 'react'
import { Layout } from '../../../../components/Layout'
import { VMSsidebarItems } from '../../../../utils/sideBarItems'
import CustomTable from '../../../../components/CustomComponents/CustomTable'
import { useNavigate } from 'react-router-dom'


function VMSDashboard() {
    const navigate = useNavigate();

    const data = [
        { SrNo: 1, PassId: '545646', PassDate: '11/02/2023', PassType: 'Naeem Malik IT(Director)', RequestedType: 'Entry May be allowed with comment base', RequestedBy: 'Official', VisitPurpose: '11/02/2023', FromDate: '25/02/2023', ToDate: '26/02/2023', IsActive: 'Yes' },
        { SrNo: 1, PassId: '545646', PassDate: '11/02/2023', PassType: 'Naeem Malik IT(Director)', RequestedType: 'Entry May be allowed with comment base', RequestedBy: 'Official', VisitPurpose: '11/02/2023', FromDate: '25/02/2023', ToDate: '26/02/2023', IsActive: 'Yes' },
    ];

    return (
        <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        data={data}
                        tableTitle="Passes"
                        addBtnText="Add Pass"
                        handleAdd={() => navigate('/lms/addedit')}
                        handleEdit={(item) => navigate('/lms/addedit', { state: item })}
                        hideUserIcon={true}
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
