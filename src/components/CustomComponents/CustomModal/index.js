import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const validationSchema = Yup.object({
    visitorname: Yup.string().required('Visitor Name is required'),
    cnic: Yup.string().required('Cnic is required'),
    visitordetail: Yup.string().required('Visitor Detail By is required'),

});
function CustomModal({ isOpen, onRequestClose }) {
    const formik = useFormik({
        initialValues: {
            visitorname: '',
            cnic: '',
            visitordetail: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });
    return (
        <Modal
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div class='card'>
                <div class='card-header red-bg' style={{ background: "#14ae5c !important" }}>
                    <h1>ADD Duplicate Visitors</h1>
                </div>
                <div class='card-body'>
                    <form onSubmit={formik.handleSubmit}>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Visitor Name</label>
                                        <input type="text" className={`form-control ${formik.touched.visitorname && formik.errors.visitorname ? 'is-invalid' : ''}`}
                                            id="visitorname"
                                            placeholder={formik.values.visitorname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.visitorname} />
                                        {formik.touched.visitorname && formik.errors.visitorname && (
                                            <div className='invalid-feedback'>{formik.errors.visitorname}</div>
                                        )}
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">CNIC</label>
                                        <input type="text" className={`form-control ${formik.touched.cnic && formik.errors.cnic ? 'is-invalid' : ''}`}
                                            id="cnic"
                                            placeholder={formik.values.cnic}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.cnic} />
                                        {formik.touched.cnic && formik.errors.cnic && (
                                            <div className='invalid-feedback'>{formik.errors.cnic}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label class="form-label">Visitor Details</label>

                                        <textarea
                                            cols="30"
                                            rows="10"
                                            placeholder={formik.values.visitordetail}
                                            className={`form-control ${formik.touched.visitordetail && formik.errors.visitordetail ? 'is-invalid' : ''}`}
                                            id='visitordetail'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.visitordetail}
                                        ></textarea>
                                        {formik.touched.visitordetail && formik.errors.visitordetail && (
                                            <div className='invalid-feedback'>{formik.errors.visitordetail}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-primary" type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default CustomModal
