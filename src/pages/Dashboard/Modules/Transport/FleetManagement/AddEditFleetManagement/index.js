import React, { useEffect, useState } from 'react'
import { Layout } from '../../../../../../components/Layout'
import { TransportSideBarItems } from '../../../../../../utils/sideBarItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { ToastContainer } from 'react-toastify'
import { showErrorMessage, showSuccessMessage } from '../../../../../../utils/ToastAlert'
import { UpdateFlagApi, createFlagApi, getSingleFlagById } from '../../../../../../api/APIs/Services/efiling.service'
import { getUserData } from '../../../../../../api/Auth'
import { Curtains } from '@mui/icons-material'


const validationSchema = Yup.object({
  flagName: Yup.string().required("Flag is required"),
});

function AddEditFleetManagement() {
  const location = useLocation();
  const userData = getUserData()

  const navigate = useNavigate()
  const [filesData, setFileData] = useState([])
  const [fileId, setFIleId] = useState(location?.state?.SrNo);

  const formik = useFormik({
    initialValues: {
      VehicleRegNo: "",
      Model: "",
      make: "",
      EngineCapacity: "",
      EngineNo: "",
      ChassisNo: "",
      ConditionWetherCondemnedroadWorthy: "",
      JackRod: "",
      CondemnationPapers: "",
      RegisterationBook: "",
      SpareWheel: "",
      ToolKit: "",
      Keys: "",
      SteeringLock: "",
      SeatCover: "",
      FootMate: "",
      CDPlayerTapeRadio: "",
      CigaretteLighter: "",
      MovementRegister: "",
      WheelCaps: "",
      Curtains: "",
      AC: "",
      Hooter: "",
      FogLights: "",
      RemoteControls: "",
      Aerial: "",
      FleetCard: "",
      MeterReading: "",
      Others: "",
      Petrol: ""

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      if (fileId) {
        handleUpdateFlag(values)
      } else {
        console.log("Please enter", values);
        handleCreateFlag(values)
      }
    },
  });

  const handleCreateFlag = async (values) => {
    const Data = {
      fkBranchId: userData?.fkBranchId,
      flag: values?.flagName
    }
    try {
      const response = await createFlagApi(Data)
      if (response.success) {
        showSuccessMessage(response?.message)
        formik.resetForm()
        setTimeout(() => {
          navigate("/efiling/dashboard/flags");
        }, 1000)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const handleUpdateFlag = async (values) => {
    const Data = {
      fkBranchId: userData?.fkBranchId,
      flag: values?.flagName
    }
    try {
      const response = await UpdateFlagApi(filesData?.id, Data)
      if (response.success) {
        showSuccessMessage(response?.message)
        formik.resetForm()
        setTimeout(() => {
          navigate("/efiling/dashboard/flags");
        }, 1000)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  const getSingleHeadingAPi = async () => {

    try {
      const response = await getSingleFlagById(fileId)
      if (response.success) {
        // showSuccessMessage(response?.message)
        setFileData(response?.data)
      }
    } catch (error) {
      showErrorMessage(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (fileId) {
      getSingleHeadingAPi();
    }
  }, []);

  useEffect(() => {
    // Update form values when termsById changes
    if (filesData) {
      formik.setValues({
        flagName: filesData?.flag || ""
      });
    }
  }, [filesData, formik.setValues]);

  return (
    <Layout sidebarItems={TransportSideBarItems} centerlogohide={true} module={false}>
      <ToastContainer />
      <div class="container-fluid">
        <div class="card">
          <div class="card-header red-bg" style={{ background: "#14ae5c" }}>
            {fileId ? <h1>Update Fleet</h1> : <h1>Create Fleet</h1>}
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Vehicle Register No <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.VehicleRegNo}
                        className={`form-control ${formik.touched.VehicleRegNo &&
                          formik.errors.VehicleRegNo
                          ? "is-invalid"
                          : ""
                          }`}
                        id="VehicleRegNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.VehicleRegNo &&
                        formik.errors.VehicleRegNo && (
                          <div className="invalid-feedback">
                            {formik.errors.VehicleRegNo}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Make <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.make}
                        className={`form-control ${formik.touched.make &&
                          formik.errors.make
                          ? "is-invalid"
                          : ""
                          }`}
                        id="make"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.make &&
                        formik.errors.make && (
                          <div className="invalid-feedback">
                            {formik.errors.make}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Model <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Model}
                        className={`form-control ${formik.touched.Model &&
                          formik.errors.Model
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Model"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Model &&
                        formik.errors.Model && (
                          <div className="invalid-feedback">
                            {formik.errors.Model}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Engine Capacity <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.EngineCapacity}
                        className={`form-control ${formik.touched.EngineCapacity &&
                          formik.errors.EngineCapacity
                          ? "is-invalid"
                          : ""
                          }`}
                        id="EngineCapacity"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.EngineCapacity &&
                        formik.errors.EngineCapacity && (
                          <div className="invalid-feedback">
                            {formik.errors.EngineCapacity}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className='row'>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Engine No <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.EngineNo}
                        className={`form-control ${formik.touched.EngineNo &&
                          formik.errors.EngineNo
                          ? "is-invalid"
                          : ""
                          }`}
                        id="EngineNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.EngineNo &&
                        formik.errors.EngineNo && (
                          <div className="invalid-feedback">
                            {formik.errors.EngineNo}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Chassis No <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.ChassisNo}
                        className={`form-control ${formik.touched.ChassisNo &&
                          formik.errors.ChassisNo
                          ? "is-invalid"
                          : ""
                          }`}
                        id="ChassisNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.ChassisNo &&
                        formik.errors.ChassisNo && (
                          <div className="invalid-feedback">
                            {formik.errors.ChassisNo}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Condition Wether Condemned/road Worthy <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.ConditionWetherCondemnedroadWorthy}
                        className={`form-control ${formik.touched.ConditionWetherCondemnedroadWorthy &&
                          formik.errors.ConditionWetherCondemnedroadWorthy
                          ? "is-invalid"
                          : ""
                          }`}
                        id="ConditionWetherCondemnedroadWorthy"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.ConditionWetherCondemnedroadWorthy &&
                        formik.errors.ConditionWetherCondemnedroadWorthy && (
                          <div className="invalid-feedback">
                            {formik.errors.ConditionWetherCondemnedroadWorthy}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Condemnation Papers <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.CondemnationPapers}
                        className={`form-control ${formik.touched.CondemnationPapers &&
                          formik.errors.CondemnationPapers
                          ? "is-invalid"
                          : ""
                          }`}
                        id="CondemnationPapers"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.CondemnationPapers &&
                        formik.errors.CondemnationPapers && (
                          <div className="invalid-feedback">
                            {formik.errors.CondemnationPapers}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className='row'>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Registeration Book <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.RegisterationBook}
                        className={`form-control ${formik.touched.RegisterationBook &&
                          formik.errors.RegisterationBook
                          ? "is-invalid"
                          : ""
                          }`}
                        id="RegisterationBook"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.RegisterationBook &&
                        formik.errors.RegisterationBook && (
                          <div className="invalid-feedback">
                            {formik.errors.RegisterationBook}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Spare Wheel <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.SpareWheel}
                        className={`form-control ${formik.touched.SpareWheel &&
                          formik.errors.SpareWheel
                          ? "is-invalid"
                          : ""
                          }`}
                        id="SpareWheel"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.SpareWheel &&
                        formik.errors.SpareWheel && (
                          <div className="invalid-feedback">
                            {formik.errors.SpareWheel}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Jack & Rod <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.JackRod}
                        className={`form-control ${formik.touched.JackRod &&
                          formik.errors.JackRod
                          ? "is-invalid"
                          : ""
                          }`}
                        id="JackRod"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.JackRod &&
                        formik.errors.JackRod && (
                          <div className="invalid-feedback">
                            {formik.errors.JackRod}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Tool Kit <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.ToolKit}
                        className={`form-control ${formik.touched.ToolKit &&
                          formik.errors.ToolKit
                          ? "is-invalid"
                          : ""
                          }`}
                        id="ToolKit"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.ToolKit &&
                        formik.errors.ToolKit && (
                          <div className="invalid-feedback">
                            {formik.errors.ToolKit}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className='row'>


                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Keys <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Keys}
                        className={`form-control ${formik.touched.Keys &&
                          formik.errors.Keys
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Keys"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Keys &&
                        formik.errors.Keys && (
                          <div className="invalid-feedback">
                            {formik.errors.Keys}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Steering Lock <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.SteeringLock}
                        className={`form-control ${formik.touched.SteeringLock &&
                          formik.errors.SteeringLock
                          ? "is-invalid"
                          : ""
                          }`}
                        id="SteeringLock"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.SteeringLock &&
                        formik.errors.SteeringLock && (
                          <div className="invalid-feedback">
                            {formik.errors.SteeringLock}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Seat Cover <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.SeatCover}
                        className={`form-control ${formik.touched.SeatCover &&
                          formik.errors.SeatCover
                          ? "is-invalid"
                          : ""
                          }`}
                        id="SeatCover"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.SeatCover &&
                        formik.errors.SeatCover && (
                          <div className="invalid-feedback">
                            {formik.errors.SeatCover}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Foot Mate <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.FootMate}
                        className={`form-control ${formik.touched.FootMate &&
                          formik.errors.FootMate
                          ? "is-invalid"
                          : ""
                          }`}
                        id="FootMate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.FootMate &&
                        formik.errors.FootMate && (
                          <div className="invalid-feedback">
                            {formik.errors.FootMate}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className='row'>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">CD Player / Tape / Radio <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.CDPlayerTapeRadio}
                        className={`form-control ${formik.touched.CDPlayerTapeRadio &&
                          formik.errors.CDPlayerTapeRadio
                          ? "is-invalid"
                          : ""
                          }`}
                        id="CDPlayerTapeRadio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.CDPlayerTapeRadio &&
                        formik.errors.CDPlayerTapeRadio && (
                          <div className="invalid-feedback">
                            {formik.errors.CDPlayerTapeRadio}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Cigarette Lighter <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.CigaretteLighter}
                        className={`form-control ${formik.touched.CigaretteLighter &&
                          formik.errors.CigaretteLighter
                          ? "is-invalid"
                          : ""
                          }`}
                        id="CigaretteLighter"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.CigaretteLighter &&
                        formik.errors.CigaretteLighter && (
                          <div className="invalid-feedback">
                            {formik.errors.CigaretteLighter}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Movement Register <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.MovementRegister}
                        className={`form-control ${formik.touched.MovementRegister &&
                          formik.errors.MovementRegister
                          ? "is-invalid"
                          : ""
                          }`}
                        id="MovementRegister"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.MovementRegister &&
                        formik.errors.MovementRegister && (
                          <div className="invalid-feedback">
                            {formik.errors.MovementRegister}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Wheel Caps <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.WheelCaps}
                        className={`form-control ${formik.touched.WheelCaps &&
                          formik.errors.WheelCaps
                          ? "is-invalid"
                          : ""
                          }`}
                        id="WheelCaps"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.WheelCaps &&
                        formik.errors.WheelCaps && (
                          <div className="invalid-feedback">
                            {formik.errors.WheelCaps}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className='row'>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Curtains <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Curtains}
                        className={`form-control ${formik.touched.Curtains &&
                          formik.errors.Curtains
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Curtains"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Curtains &&
                        formik.errors.Curtains && (
                          <div className="invalid-feedback">
                            {formik.errors.Curtains}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">A.C <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.AC}
                        className={`form-control ${formik.touched.AC &&
                          formik.errors.AC
                          ? "is-invalid"
                          : ""
                          }`}
                        id="AC"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.AC &&
                        formik.errors.AC && (
                          <div className="invalid-feedback">
                            {formik.errors.AC}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Hooter <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Hooter}
                        className={`form-control ${formik.touched.Hooter &&
                          formik.errors.Hooter
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Hooter"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Hooter &&
                        formik.errors.Hooter && (
                          <div className="invalid-feedback">
                            {formik.errors.Hooter}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Fog Lights <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.FogLights}
                        className={`form-control ${formik.touched.FogLights &&
                          formik.errors.FogLights
                          ? "is-invalid"
                          : ""
                          }`}
                        id="FogLights"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.FogLights &&
                        formik.errors.FogLights && (
                          <div className="invalid-feedback">
                            {formik.errors.FogLights}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className='row'>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Remote Controls <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.RemoteControls}
                        className={`form-control ${formik.touched.RemoteControls &&
                          formik.errors.RemoteControls
                          ? "is-invalid"
                          : ""
                          }`}
                        id="RemoteControls"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.RemoteControls &&
                        formik.errors.RemoteControls && (
                          <div className="invalid-feedback">
                            {formik.errors.RemoteControls}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Aerial <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Aerial}
                        className={`form-control ${formik.touched.Aerial &&
                          formik.errors.Aerial
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Aerial"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Aerial &&
                        formik.errors.Aerial && (
                          <div className="invalid-feedback">
                            {formik.errors.Aerial}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Fleet Card <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.FleetCard}
                        className={`form-control ${formik.touched.FleetCard &&
                          formik.errors.FleetCard
                          ? "is-invalid"
                          : ""
                          }`}
                        id="FleetCard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.FleetCard &&
                        formik.errors.FleetCard && (
                          <div className="invalid-feedback">
                            {formik.errors.FleetCard}
                          </div>
                        )}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Meter Reading <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.MeterReading}
                        className={`form-control ${formik.touched.MeterReading &&
                          formik.errors.MeterReading
                          ? "is-invalid"
                          : ""
                          }`}
                        id="MeterReading"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.MeterReading &&
                        formik.errors.MeterReading && (
                          <div className="invalid-feedback">
                            {formik.errors.MeterReading}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className='row'>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Others <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Others}
                        className={`form-control ${formik.touched.Others &&
                          formik.errors.Others
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Others"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Others &&
                        formik.errors.Others && (
                          <div className="invalid-feedback">
                            {formik.errors.Others}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Petrol <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Petrol}
                        className={`form-control ${formik.touched.Petrol &&
                          formik.errors.Petrol
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Petrol"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Petrol &&
                        formik.errors.Petrol && (
                          <div className="invalid-feedback">
                            {formik.errors.Petrol}
                          </div>
                        )}
                    </div>
                  </div>
                </div>


                <div className='mt-3'>
                  <p className='text-black font-bold' style={{ fontSize: '20px' }}>Handed Over By</p>
                </div>

              <div className='row mt-3'>
              <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Name <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Name}
                        className={`form-control ${formik.touched.Name &&
                          formik.errors.Name
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Name &&
                        formik.errors.Name && (
                          <div className="invalid-feedback">
                            {formik.errors.Name}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Designation : Staff Car Driver <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.DesignationStaffCarDriver}
                        className={`form-control ${formik.touched.DesignationStaffCarDriver &&
                          formik.errors.DesignationStaffCarDriver
                          ? "is-invalid"
                          : ""
                          }`}
                        id="DesignationStaffCarDriver"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.DesignationStaffCarDriver &&
                        formik.errors.DesignationStaffCarDriver && (
                          <div className="invalid-feedback">
                            {formik.errors.DesignationStaffCarDriver}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Phone <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Phone}
                        className={`form-control ${formik.touched.Phone &&
                          formik.errors.Phone
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Phone &&
                        formik.errors.Phone && (
                          <div className="invalid-feedback">
                            {formik.errors.Phone}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Date <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Date}
                        className={`form-control ${formik.touched.Date &&
                          formik.errors.Date
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Date &&
                        formik.errors.Date && (
                          <div className="invalid-feedback">
                            {formik.errors.Date}
                          </div>
                        )}
                    </div>
                  </div>

              </div>




              <div className='mt-3'>
                  <p className='text-black font-bold' style={{ fontSize: '20px' ,borderBottomWidth :"1px" ,borderBottomColor : 'black'}}>Taken Over By</p>
                </div>

              <div className='row mt-3'>
              <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Name <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Name}
                        className={`form-control ${formik.touched.Name &&
                          formik.errors.Name
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Name &&
                        formik.errors.Name && (
                          <div className="invalid-feedback">
                            {formik.errors.Name}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Designation <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Designation}
                        className={`form-control ${formik.touched.Designation &&
                          formik.errors.Designation
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Designation"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Designation &&
                        formik.errors.Designation && (
                          <div className="invalid-feedback">
                            {formik.errors.Designation}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Phone <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Phone}
                        className={`form-control ${formik.touched.Phone &&
                          formik.errors.Phone
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Phone &&
                        formik.errors.Phone && (
                          <div className="invalid-feedback">
                            {formik.errors.Phone}
                          </div>
                        )}
                    </div>
                  </div>

                  <div class="col-3">
                    <div class="mb-3">
                      <label class="form-label">Date <span className='text-danger'>*</span></label>
                      <input
                        type="text"
                        placeholder={""}
                        value={formik.values.Date}
                        className={`form-control ${formik.touched.Date &&
                          formik.errors.Date
                          ? "is-invalid"
                          : ""
                          }`}
                        id="Date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.Date &&
                        formik.errors.Date && (
                          <div className="invalid-feedback">
                            {formik.errors.Date}
                          </div>
                        )}
                    </div>
                  </div>

              </div>




                <div class="row">
                  <div class="col">
                    <button class="btn btn-primary float-end" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddEditFleetManagement