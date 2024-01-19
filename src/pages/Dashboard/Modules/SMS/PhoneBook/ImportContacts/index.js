import React from 'react'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import { Layout } from '../../../../../../components/Layout'
import Header from '../../../../../../components/Header'

function SMSImportContact() {
    return (
        <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/sms/dashboard"}
                title1={"Import Contact"}
                addLink1={"/sms/phone-book/import"}
            />
            <div class="row">
                <div class="col-12">

                </div>
            </div>
        </Layout>
    )
}

export default SMSImportContact
