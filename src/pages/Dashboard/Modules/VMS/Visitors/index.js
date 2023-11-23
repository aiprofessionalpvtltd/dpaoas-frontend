import React from 'react'
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../../../../components/CustomComponents/CustomTable';
import { Layout } from '../../../../../components/Layout';
import { VMSsidebarItems } from '../../../../../utils/sideBarItems';
import Header from '../../../../../components/Header';

function VMSVisitors() {
    const navigate = useNavigate();

    const data = [
        { VisitorName: "Saqib", CNIC: '61101-1254556-3	', Detail: 'jdsljadslg dalkfjldkfjdsaf kldjaflkajflsdjf jlksddjflkajsdflk' },
        { VisitorName: "Saqib", CNIC: '61101-1254556-3	', Detail: 'jdsljadslg dalkfjldkfjdsaf kldjaflkajflsdjf jlksddjflkajsdflk' },
        { VisitorName: "Saqib", CNIC: '61101-1254556-3	', Detail: 'jdsljadslg dalkfjldkfjdsaf kldjaflkajflsdjf jlksddjflkajsdflk' },
    ];

    return (
        <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
            <Header dashboardLink={"/vms/dashboard"} addLink1={"/vms/visitor"} title1={"Visitors"} />
            <div class="row">
                <div class="col-12">
                    <CustomTable
                        data={data}
                        tableTitle="Visitors Detail"
                        addBtnText="Add Visitor"
                        handleAdd={() => navigate('/vms/addeditvisitor')}
                        handleEdit={(item) => navigate('/vms/addeditvisitor', { state: item })}
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

export default VMSVisitors
