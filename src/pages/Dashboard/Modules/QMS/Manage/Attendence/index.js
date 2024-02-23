import { ToastContainer } from "react-toastify";
import Header from "../../../../../../components/Header";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import { useLocation } from "react-router-dom";

function QMSAttendence() {
  const location = useLocation();
  console.log(location?.state);
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/qms/manage/attendence"}
        // addLink1={"/qms/manage/sitting-days"}
        title1={"Attendence"}
      />
      <ToastContainer />
      <div className="container-fluid">
        <div className="dash-detail-container" style={{ marginTop: "20px" }}>
          <div class="row">
            <div class="d-grid gap-2 d-md-flex justify-content">
              {/* <button class="btn btn-primary mb-3" type="submit">
                Print Resolutions
              </button> */}
              <p>Attendence</p>
            </div>
          </div>
          <table class="table red-bg-head th">
            <thead>
              <tr>
                <th class="text-center" scope="col">
                  SR #
                </th>
                <th class="text-center" scope="col">
                  Member Name
                </th>
                <th class="text-center" scope="col">
                  Attendecnce
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">1</td>
                <td class="text-center">Saqib Khan</td>
                <td class="text-center">
                  <select className="form-select">
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="leave">Leave</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
export default QMSAttendence;
