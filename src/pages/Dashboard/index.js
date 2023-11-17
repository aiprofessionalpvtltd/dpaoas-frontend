import React from 'react'
import '../../pages/custom.css'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

export const Dashboard = () => {
  const navigate = useNavigate();

  const Data = [
    {
      id: "1",
      name: "Admin",
      status: "Active"
    },
    {
      id: "2",
      name: "Editor",
      status: "InActive"
    },
    {
      id: "3",
      name: "Manager",
      status: "Active"
    },
    {
      id: "4",
      name: "Employee",
      status: "Active"
    }
  ]

  const handleEditClick = (name) => {
    navigate("/EditRole", { state:  name  })
  };
  return (
    <div className='dashboard-content'>
      <Header />
      <div className='container-fluid'>
        <div class='card'>
          <div class="card-header red-bg" style={{ background: "#f3f3f3" }}>
            <h1 class="float-start" style={{ color: "#000" }}>Roles List</h1>
            <button class="btn btn-primary float-end" type="button" onClick={() => navigate('/AddRole')}>Add Roles</button>
            <div class="clearfix"></div>
          </div>
          <div class='card-body'>
            <div class="container-fluid">
              <div class="row">
                <table class="table table-striped red-bg-head">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">Name</th>
                      <th class="text-center" scope="col">Staus</th>
                      <th class="text-center" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Data.map(item => (
                      <tr>
                        <td class="text-center">{item.name}</td>
                        <td class="text-center"><span class={`label label-sm ${item.status === 'Active' ? 'label-success' : 'label-danger'}`}>{item.status}</span></td>
                        <td class="text-center">
                          <button onClick={() => handleEditClick(item.name)} class="btn default btn-xs black" data-id="2"><i class="fas fa-edit"></i> Edit</button>
                          <a href="/" class="btn default btn-xs black" data-id="2"><i class="fas fa-trash"></i> Suspended</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class="row">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
