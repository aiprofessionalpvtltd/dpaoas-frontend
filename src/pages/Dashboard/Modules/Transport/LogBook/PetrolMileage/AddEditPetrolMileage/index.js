import React, { useEffect, useState } from 'react';
import { Layout } from '../../../../../../../components/Layout';
import { TransportSideBarItems } from '../../../../../../../utils/sideBarItems';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { showErrorMessage, showSuccessMessage } from '../../../../../../../utils/ToastAlert';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import {  createMileage, getMileageById, updateMileage } from '../../../../../../../api/APIs/Services/Transport.service';


// Validation schema
const validationSchema = Yup.object({
  DateMonth: Yup.date().required('Date is required'),
  MileagePerformedDuringMonth: Yup.number().required('Mileage is required').positive().integer(),
  PetrolSuppliedDuringMonth: Yup.number().required('Petrol supplied is required').positive(),
  AverageMilagePerLtrsForMonth: Yup.number().required('Average mileage is required').positive(),
  TotalMilageUptoDate: Yup.number().required('Total mileage is required').positive(),
  initalsOfficerInChargeStaffCar: Yup.string().required('Officer initials are required'),
});

function AddEditPetrolMileage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // Use id from URL if available

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateSelect = (date) => {
    formik.setFieldValue('DateMonth', date);
    setIsCalendarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      DateMonth: '',
      MileagePerformedDuringMonth: '',
      PetrolSuppliedDuringMonth: '',
      AverageMilagePerLtrsForMonth: '',
      TotalMilageUptoDate: '',
      initalsOfficerInChargeStaffCar: '',
      remark: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (id) {
          await updateMileage(id, values);
          showSuccessMessage('Mileage updated successfully');
        } else {
          await createMileage(values);
          showSuccessMessage('Mileage created successfully');
        }
        navigate('/your-redirect-path'); // Update the path as needed
      } catch (error) {
        showErrorMessage('An error occurred');
      }
    },
  });

  useEffect(() => {
    if (id) {
      // Fetch and populate existing data if id is present
      const fetchMileage = async () => {
        try {
          const mileage = await getMileageById(id);
          formik.setValues(mileage);
        } catch (error) {
          showErrorMessage('Error fetching mileage data');
        }
      };
      fetchMileage();
    }
  }, [id]);

  return (
    <Layout sidebarItems={TransportSideBarItems} centerlogohide={true} module={false}>
      <ToastContainer />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: '#14ae5c' }}>
            {id ? <h1>Update Petrol Mileage</h1> : <h1>Create Petrol Mileage</h1>}
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-4">
                    <div className="mb-3" style={{ position: 'relative' }}>
                      <label className="form-label">
                        Date Month <span className='text-danger'>*</span>
                      </label>
                      <span
                        style={{
                          position: 'absolute',
                          right: '15px',
                          top: '36px',
                          zIndex: 1,
                          fontSize: '20px',
                          color: '#666',
                          cursor: 'pointer',
                        }}
                        onClick={handleCalendarToggle}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </span>
                      <DatePicker
                        selected={formik.values.DateMonth}
                        onChange={handleDateSelect}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.DateMonth && formik.errors.DateMonth ? 'is-invalid' : ''}`}
                        open={isCalendarOpen}
                        onClickOutside={() => setIsCalendarOpen(false)}
                        onInputClick={handleCalendarToggle}
                        maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                      />
                      {formik.touched.DateMonth && formik.errors.DateMonth && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {formik.errors.DateMonth}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Mileage Performed During The Month <span className='text-danger'>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        value={formik.values.MileagePerformedDuringMonth}
                        className={`form-control ${formik.touched.MileagePerformedDuringMonth && formik.errors.MileagePerformedDuringMonth ? 'is-invalid' : ''}`}
                        id="MileagePerformedDuringMonth"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.MileagePerformedDuringMonth && formik.errors.MileagePerformedDuringMonth && (
                        <div className="invalid-feedback">
                          {formik.errors.MileagePerformedDuringMonth}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Petrol (Ltrs) Supplied During The Month <span className='text-danger'>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        value={formik.values.PetrolSuppliedDuringMonth}
                        className={`form-control ${formik.touched.PetrolSuppliedDuringMonth && formik.errors.PetrolSuppliedDuringMonth ? 'is-invalid' : ''}`}
                        id="PetrolSuppliedDuringMonth"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.PetrolSuppliedDuringMonth && formik.errors.PetrolSuppliedDuringMonth && (
                        <div className="invalid-feedback">
                          {formik.errors.PetrolSuppliedDuringMonth}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Average Mileage per (Ltrs) For The Month <span className='text-danger'>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        value={formik.values.AverageMilagePerLtrsForMonth}
                        className={`form-control ${formik.touched.AverageMilagePerLtrsForMonth && formik.errors.AverageMilagePerLtrsForMonth ? 'is-invalid' : ''}`}
                        id="AverageMilagePerLtrsForMonth"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.AverageMilagePerLtrsForMonth && formik.errors.AverageMilagePerLtrsForMonth && (
                        <div className="invalid-feedback">
                          {formik.errors.AverageMilagePerLtrsForMonth}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Total Mileage upto Date <span className='text-danger'>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        value={formik.values.TotalMilageUptoDate}
                        className={`form-control ${formik.touched.TotalMilageUptoDate && formik.errors.TotalMilageUptoDate ? 'is-invalid' : ''}`}
                        id="TotalMilageUptoDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.TotalMilageUptoDate && formik.errors.TotalMilageUptoDate && (
                        <div className="invalid-feedback">
                          {formik.errors.TotalMilageUptoDate}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Initials of officer-in-charge staff car <span className='text-danger'>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        value={formik.values.initalsOfficerInChargeStaffCar}
                        className={`form-control ${formik.touched.initalsOfficerInChargeStaffCar && formik.errors.initalsOfficerInChargeStaffCar ? 'is-invalid' : ''}`}
                        id="initalsOfficerInChargeStaffCar"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.initalsOfficerInChargeStaffCar && formik.errors.initalsOfficerInChargeStaffCar && (
                        <div className="invalid-feedback">
                          {formik.errors.initalsOfficerInChargeStaffCar}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-4">
                    <label className="form-label">Remark</label>
                    <textarea
                      placeholder=""
                      className={`form-control ${formik.touched.remark && formik.errors.remark ? 'is-invalid' : ''}`}
                      value={formik.values.remark}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="remark"
                      name="remark"
                    ></textarea>
                    {formik.touched.remark && formik.errors.remark && (
                      <div className="invalid-feedback">
                        {formik.errors.remark}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <button className="btn btn-primary float-end" type="submit">
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
  );
}

export default AddEditPetrolMileage;
