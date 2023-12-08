import React from "react";
import { Layout } from "../../../../../../components/Layout";
import { QMSSideBarItems } from "../../../../../../utils/sideBarItems";
import Header from "../../../../../../components/Header";

function QMSNoticeQuestion() {
  return (
    <Layout module={true} sidebarItems={QMSSideBarItems} centerlogohide={true}>
      <Header
        dashboardLink={"/"}
        addLink1={"/qms/dashboard"}
        title1={"Question"}
        addLink2={"/qms/notice/notice-question"}
        title2={"Notice Question"}
      />
      <div class="container-fluid">
        <div class="card mt-4">
          <div
            class="card-header red-bg"
            style={{ background: "#14ae5c !important" }}
          >
            <h1>Question Received from Notice Office</h1>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">
                        Sr#
                      </th>
                      <th class="text-center" scope="col">
                        Notice Diary Number
                      </th>
                      <th class="text-center" scope="col">
                        Session Number
                      </th>
                      <th class="text-center" scope="col">
                        Subject Matter
                      </th>
                      <th class="text-center" scope="col">
                        Notice Date
                      </th>
                      <th class="text-center" scope="col">
                        Notice Time
                      </th>
                      <th class="text-center" scope="col">
                        Category
                      </th>
                      <th class="text-center" scope="col">
                        Submitted By
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center green-color">1</td>
                      <td class="text-center green-color">2648</td>
                      <td class="text-center green-color">332</td>
                      <td class="text-center green-color">No English Text</td>
                      <td class="text-center green-color">23-10-2023</td>
                      <td class="text-center green-color">4:36pm</td>
                      <td class="text-center green-color">Starred</td>
                      <td class="text-center green-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center red-message-color">2</td>
                      <td class="text-center red-message-color">2648</td>
                      <td class="text-center red-message-color">332</td>
                      <td class="text-center red-message-color">
                        No English Text
                      </td>
                      <td class="text-center red-message-color">23-10-2023</td>
                      <td class="text-center red-message-color">34:36pm</td>
                      <td class="text-center red-message-color">Starred</td>
                      <td class="text-center red-message-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center green-color">3</td>
                      <td class="text-center green-color">2648</td>
                      <td class="text-center green-color">332</td>
                      <td class="text-center green-color">No English Text</td>
                      <td class="text-center green-color">23-10-2023</td>
                      <td class="text-center green-color">4:36pm</td>
                      <td class="text-center green-color">Starred</td>
                      <td class="text-center green-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center red-message-color">4</td>
                      <td class="text-center red-message-color">2648</td>
                      <td class="text-center red-message-color">332</td>
                      <td class="text-center red-message-color">
                        No English Text
                      </td>
                      <td class="text-center red-message-color">23-10-2023</td>
                      <td class="text-center red-message-color">34:36pm</td>
                      <td class="text-center red-message-color">Starred</td>
                      <td class="text-center red-message-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 class="mt-3">Revived Questions</h3>
              <div class="dash-detail-container" style={{ marginTop: "20px" }}>
                <table class="table red-bg-head th">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">
                        Sr#
                      </th>
                      <th class="text-center" scope="col">
                        Notice Diary Number
                      </th>
                      <th class="text-center" scope="col">
                        Session Number
                      </th>
                      <th class="text-center" scope="col">
                        Subject Matter
                      </th>
                      <th class="text-center" scope="col">
                        Notice Date
                      </th>
                      <th class="text-center" scope="col">
                        Notice Time
                      </th>
                      <th class="text-center" scope="col">
                        Category
                      </th>
                      <th class="text-center" scope="col">
                        Submitted By
                      </th>
                      <th class="text-center" scope="col">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center green-color">1</td>
                      <td class="text-center green-color">2648</td>
                      <td class="text-center green-color">332</td>
                      <td class="text-center green-color">No English Text</td>
                      <td class="text-center green-color">23-10-2023</td>
                      <td class="text-center green-color">4:36pm</td>
                      <td class="text-center green-color">Starred</td>
                      <td class="text-center green-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                      <td class="text-center green-color">
                        <button class="btn btn-primary" type="submit">
                          View Review
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center red-message-color">2</td>
                      <td class="text-center red-message-color">2648</td>
                      <td class="text-center red-message-color">332</td>
                      <td class="text-center red-message-color">
                        No English Text
                      </td>
                      <td class="text-center red-message-color">23-10-2023</td>
                      <td class="text-center red-message-color">34:36pm</td>
                      <td class="text-center red-message-color">Starred</td>
                      <td class="text-center red-message-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                      <td class="text-center green-color">
                        <button class="btn btn-primary" type="submit">
                          View Review
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center green-color">3</td>
                      <td class="text-center green-color">2648</td>
                      <td class="text-center green-color">332</td>
                      <td class="text-center green-color">No English Text</td>
                      <td class="text-center green-color">23-10-2023</td>
                      <td class="text-center green-color">4:36pm</td>
                      <td class="text-center green-color">Starred</td>
                      <td class="text-center green-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                      <td class="text-center green-color">
                        <button class="btn btn-primary" type="submit">
                          View Review
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center red-message-color">4</td>
                      <td class="text-center red-message-color">2648</td>
                      <td class="text-center red-message-color">332</td>
                      <td class="text-center red-message-color">
                        No English Text
                      </td>
                      <td class="text-center red-message-color">23-10-2023</td>
                      <td class="text-center red-message-color">34:36pm</td>
                      <td class="text-center red-message-color">Starred</td>
                      <td class="text-center red-message-color">
                        Dr. Afnan Ullah Khan{" "}
                      </td>
                      <td class="text-center green-color">
                        <button class="btn btn-primary" type="submit">
                          View Review
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QMSNoticeQuestion;
