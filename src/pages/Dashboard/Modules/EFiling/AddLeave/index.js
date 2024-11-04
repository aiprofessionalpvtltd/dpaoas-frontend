import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../components/Layout'
import { EfilingSideBarBranchItem, EfilingSideBarItem } from '../../../../../utils/sideBarItems'
import { getUserData } from '../../../../../api/Auth'
import { AttendanceCard } from '../../../../../components/CustomComponents/AttendanceCard'
import { getHLEmployee } from '../../../../../api/APIs/Services/organizational.service'
import { Form, Formik } from 'formik'

function EfilingLeaveManagement() {
    const userData = getUserData()
    const [employeeData, setEmployeeData] = useState([])
    const getEmployeeData = async () => {
        try {
          const response = await getHLEmployee(userData?.fkUserId);
          if (response?.success) {
            const filteredData = response?.data?.filter(
              (item) => item?.userName !== userData?.userName
            );
            setEmployeeData(filteredData);
          }
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getEmployeeData()
      },[])
      const onSubmit = async (values) => {
        const changedValues = values.sessionMembers.filter(
          (member, index) =>
            member.attendanceStatus !== employeeData[index].attendanceStatus
        );
           console.log(changedValues);
           
        // const formattedData = changedValues.map((member) => ({
        //   fkMemberId: member.memberId,
        //   attendanceStatus: member.attendanceStatus,
        // }));
        // try {
        //   const response = await updateMemberattendace(sessionID, formattedData);
        //   if (response?.success) {
        //     // showSuccessMessage(response?.message);
           
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
      };
  return (
    <Layout
      module={false}
      centerlogohide={true}
      sidebarItems={
        userData && userData?.userType === "Officer"
          ? EfilingSideBarItem
          : EfilingSideBarBranchItem
      }>

                      <div className="container-fluid">
        {employeeData.length > 0 && (
          <Formik
            initialValues={{ sessionMembers: employeeData }}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form>
                <>
                  <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                  { employeeData?.map((member, index) => (
                        <div key={index} className="col">
                          <AttendanceCard
                            memberName={member?.firstName}
                            memberParty={`${(member?.designations?.designationName)}`}
                            view={false}
                            attendance={"Present"}
                            index={index}
                          />
                        </div>
                      ))}
                  </div>

    
                    <div
                      className="row mt-2"
                      style={{
                        position: "absolute",
                        // bottom: 610,
                        // left: 500,
                        right: 180,
                        top: 100,
                      }}
                    >
                      <div className="col">
                        <button
                          className="btn btn-primary float-end"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
            
                </>
              </Form>
            )}
          </Formik>
        )}
      </div>

    </Layout>
  )
}

export default EfilingLeaveManagement