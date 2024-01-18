import React, { useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { SMSsidebarItems } from '../../../../../../utils/sideBarItems'
import Header from '../../../../../../components/Header'
import { Button } from 'react-bootstrap'
import CustomTable from '../../../../../../components/CustomComponents/CustomTable'

function SMSAdvancedSMS() {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 4; // Set your desired page size

    const handlePageChange = (page) => {
        // Update currentPage when a page link is clicked
        setCurrentPage(page);
    };
    const Data = [
        {
            Name: "COntact Person Name",
            Detail: "Senate OF pakistan"
        },
        {
            Name: "COntact Person Name",
            Detail: "Senate OF pakistan"
        },
        {
            Name: "COntact Person Name",
            Detail: "Senate OF pakistan"
        },
        {
            Name: "COntact Person Name",
            Detail: "Senate OF pakistan"
        }
    ]
    return (
        <Layout module={true} sidebarItems={SMSsidebarItems} centerlogohide={true}>
            <Header
                dashboardLink={"/sms/dashboard"}
                title1={"Advanced SMS"}
                addLink1={"/sms/send-sms/advanced"}

            />
            <div className="dash-detail-container" style={{ margin: "12px" }}>
                <div class="row">
                    <div class="col-12">
                        <label for="" class="form-label">
                            Template Name
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id=""
                            placeholder=""
                        />
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "16px",
                    }}
                >
                    <Button style={{ marginRight: "8px" }}>
                        Submit
                    </Button>
                </div>
                <div class="row">
                    <div class="col-12">
                        <CustomTable
                            data={Data}
                            headerShown={true}
                            ActionHide={true}
                            hideEditIcon={true}
                            headertitlebgColor={"#666"}
                            headertitletextColor={"#FFF"}
                            handlePageChange={handlePageChange}
                            currentPage={currentPage}
                            pageSize={pageSize}
                        // totalCount={count}

                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label class="form-label">Preview</label>
                            <textarea class="form-control" style={{width:"100%"}}></textarea>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <label class="form-label">Message Template</label>
                            <select class="form-select">
                                <option>Select</option>
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <label for="" class="form-label">
                                Template Name
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                id=""
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "16px",
                    }}
                >
                    <Button style={{ marginRight: "8px" }}>
                        Save
                    </Button>
                </div>
            </div>
        </Layout>
    )
}

export default SMSAdvancedSMS
