import React from 'react'
import { Layout } from '../../../../../components/Layout'
import { VMSsidebarItems } from '../../../../../utils/sideBarItems'
import { useLocation } from 'react-router-dom'

function VMSAddEditPass() {
  const location = useLocation()

  return (
    <Layout module={true} sidebarItems={VMSsidebarItems} centerlogohide={true}>
      <div class='card'>
        <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
          {location && location?.state ? (
            <h1>Edit Pass</h1>
          ) : <h1>Add Pass</h1>}
        </div>
        <div class='card-body'>
          <div class="container-fluid">
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Pass Date</label>
                  <input class="form-control" type="text" />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Requested By</label>
                  <input class="form-control" type="text" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Branch</label>
                  <select class="form-select">
                    <option>IT</option>
                    <option>HR</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Visit Purpose</label>
                  <textarea class="form-control"></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Card Type</label>
                  <select class="form-select">
                    <option>Personal</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Company Name</label>
                  <input class="form-control" type="text" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">From Date</label>
                  <input class="form-control" type="text" />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">To Date</label>
                  <input class="form-control" type="text" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Active</label>
                  <select class="form-select">
                    <option>Document Type</option>
                    <option>External</option>
                    <option>Internal</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Allow Off Days</label>
                  <div style={{ display: "flex" }}>
                    <div class="form-check" style={{ marginTop: "14px" }}>
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label class="form-check-label" for="flexCheckDefault">
                        Saturday
                      </label>
                    </div>
                    <div class="form-check" style={{ marginTop: "14px", marginLeft: "20px" }}>
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label class="form-check-label" for="flexCheckDefault">
                        Sunday
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label class="form-label">Remarks</label>
                  <textarea class="form-control" name="" id="" cols="30" rows="10"></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="button">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default VMSAddEditPass
