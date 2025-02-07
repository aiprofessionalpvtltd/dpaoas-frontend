import React from 'react'
import { Layout } from '../../../../../../components/Layout'
import { TMSsidebarItems, TMSsidebarItemsDirector } from '../../../../../../utils/sideBarItems'
import { getUserData } from '../../../../../../api/Auth';

const TMSAssignedResolution = () => {
    const userData = getUserData();
  return (
    <Layout sidebarItems={
            userData?.designation?.designationName === "Assistant Director"
              ? TMSsidebarItemsDirector
              : TMSsidebarItems
          } module={true}>

    </Layout>
  )
}

export default TMSAssignedResolution