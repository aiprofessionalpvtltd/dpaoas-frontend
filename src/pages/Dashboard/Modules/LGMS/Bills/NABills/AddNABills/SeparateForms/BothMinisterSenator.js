import React, { useEffect, useState } from "react";
import Select from "react-select"; // Assuming you are using react-select
import {
  getAllMinisterTenures,
  getMinisterParliamentaryYearsByTenure,
} from "../../../../../../../../api/APIs/Services/LegislationModule.service";
import { showErrorMessage } from "../../../../../../../../utils/ToastAlert";

const BothMinisterSenator = ({
  // ministerTenure,
  // ministerParliamentaryYear,
  ministersOnParliamentaryYear,
  formik,
  ministerParliamentaryYear,
  fetchParliamentaryYears,
  getParliamentaryYearsonTheBaseOfTenure,
  getMNAOnParliamentaryYear,
  setMinisterID,
  ministryDataOnMinister,
  getMinistriesOnTenure,
  ministryDataOnTenure,
}) => {
  console.log(
    "formik from Both Component",
    formik?.values?.fkMnaParliamentaryYearId
  );

  const [ministerTenure, setMinisterTenure] = useState([]);
  const fetchTenures = async () => {
    try {
      let tenureData = [];

      // Call `getAllMinisterTenure` for Ministers
      const response = await getAllMinisterTenures(0, 5000, "Ministers");
      if (response?.success) {
        setMinisterTenure(response?.data?.tenures);
      }

      // Update the state to store combined tenures
    } catch (error) {
      showErrorMessage(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchTenures();
  }, []);

  return (
    <div className="row">
      {/* MNA Tenure */}
      <div className="col">
        <label className="form-label">MNA Tenure</label>
        <Select
          options={
            Array.isArray(ministerTenure) && ministerTenure?.length > 0
              ? ministerTenure.map((item) => ({
                  value: item?.id,
                  label: `${item?.tenureName} (${item?.tenureType})`,
                }))
              : []
          }
          onChange={(selectedOption) => {
            formik.setFieldValue("fkMinisterTenureId", selectedOption);

            fetchParliamentaryYears(selectedOption?.value);
            getMinistriesOnTenure(selectedOption?.value);
            // formik.setFieldValue("selectedMNA", null);
            // formik.setFieldValue("selectedMNA", null);
            // formik.setFieldValue("selectedMinistry", null);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.fkMinisterTenureId}
          id="fkMinisterTenureId"
          name="fkMinisterTenureId"
          isClearable={true}
        />
        {formik.touched.fkMinisterTenureId &&
          formik.errors.fkMinisterTenureId && (
            <div className="invalid-feedback">
              {formik.errors.fkMinisterTenureId}
            </div>
          )}
      </div>

      {/* MNA Parliamentary Year */}
      <div className="col">
        <div className="mb-3">
          <label className="form-label">MNA Parliamentary Years</label>
          <select
            id="fkMnaParliamentaryYearId"
            name="fkMnaParliamentaryYearId"
            className={`form-select ${
              formik.touched.fkMnaParliamentaryYearId &&
              formik.errors.fkMnaParliamentaryYearId
                ? "is-invalid"
                : ""
            }`}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              const selectedId = e.target.value;
              formik.handleChange(e);
              getMNAOnParliamentaryYear(selectedId);
            }}
            value={formik?.values?.fkMnaParliamentaryYearId}
          >
            <option value="" disabled hidden>
              Select
            </option>
            {ministerParliamentaryYear &&
              ministerParliamentaryYear?.length > 0 &&
              ministerParliamentaryYear.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.parliamentaryTenure}
                </option>
              ))}
          </select>
          {formik.touched.fkMnaParliamentaryYearId &&
            formik.errors.fkMnaParliamentaryYearId && (
              <div className="invalid-feedback">
                {formik.errors.fkMnaParliamentaryYearId}
              </div>
            )}
        </div>
      </div>

      {/* Introduced By */}
      <div className="col">
        <div className="mb-3">
          <label className="form-label">Introduced in NA By</label>
          <Select
            options={
              Array.isArray(ministersOnParliamentaryYear) &&
              ministersOnParliamentaryYear.length > 0
                ? ministersOnParliamentaryYear.map((item) => ({
                    value: item?.id,
                    label: item?.mnaName,
                  }))
                : []
            }
            onChange={(selectedOption) => {
              formik.setFieldValue("senateBillMnaMovers", selectedOption);
              formik.setFieldValue("selectedMinistry", null);
              setMinisterID(selectedOption?.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.senateBillMnaMovers}
            name="senateBillMnaMovers"
            className={`${
              formik.touched.senateBillMnaMovers &&
              formik.errors.senateBillMnaMovers
                ? "is-invalid"
                : ""
            }`}
          />
          {formik.touched.senateBillMnaMovers &&
            formik.errors.senateBillMnaMovers && (
              <div className="invalid-feedback">
                {formik.errors.senateBillMnaMovers}
              </div>
            )}
        </div>
      </div>

      <div className="col">
        <label className="form-label">Concerned Ministry / Division</label>
        <Select
          options={
            ministryDataOnTenure &&
            ministryDataOnTenure?.map((item) => ({
              value: item.id,
              label: item?.ministryName,
            }))
          }
          name="senateBillMinistryMovers"
          id="senateBillMinistryMovers"
          onChange={(selectedOptions) =>
            formik.setFieldValue("senateBillMinistryMovers", selectedOptions)
          }
          className={` ${
            formik.touched.senateBillMinistryMovers &&
            formik.errors.senateBillMinistryMovers
              ? "is-invalid"
              : ""
          }`}
          value={formik.values.senateBillMinistryMovers}
          // isMulti={true}
        />
        {formik.touched.senateBillMinistryMovers &&
          formik.errors.senateBillMinistryMovers && (
            <div class="invalid-feedback">
              {formik.errors.senateBillMinistryMovers}
            </div>
          )}
      </div>
    </div>
  );
};

export default BothMinisterSenator;

// <div className="row">
// <div className="col">
//   <label className="form-label">MNA Tenure</label>

//   <Select
//     options={
//       Array.isArray(ministerTenure) &&
//       ministerTenure?.length > 0
//         ? ministerTenure.map((item) => ({
//             value: item?.id,
//             label: `${item?.tenureName} (${item?.tenureType})`,
//             tenureType: item?.tenureType,
//           }))
//         : []
//     }
//     onChange={(selectedOption) => {
//       formik.setFieldValue(
//         "ministerTenure",
//         selectedOption
//       );

//       getParliamentaryYearsonTheBaseOfTenure(
//         selectedOption?.value
//       );

//       // formik.setFieldValue("selectedSenator", "");
//       formik.setFieldValue("selectedMNA", null);
//       formik.setFieldValue("selectedMinistry", null);
//     }}
//     onBlur={formik.handleBlur}
//     value={formik.values.ministerTenure}
//     id="ministerTenure"
//     name="ministerTenure"
//     isClearable={true}
//   />
//   {formik.touched.ministerTenure &&
//     formik.errors.ministerTenure && (
//       <div className="invalid-feedback">
//         {formik.errors.ministerTenure}
//       </div>
//     )}
// </div>
// <div class="col">
//   <div class="mb-3">
//     <label className="form-label">
//       MNA Parliamentary Year
//     </label>

//     <select
//       id="ministerParliamentaryYear"
//       name="ministerParliamentaryYear"
//       className={`form-select  ${
//         formik.touched.ministerParliamentaryYear &&
//         formik.errors.ministerParliamentaryYear
//           ? "is-invalid"
//           : ""
//       }`}
//       onBlur={formik.handleBlur}
//       // onChange={formik.handleChange}
//       onChange={(e) => {
//         const selectedId = e.target.value;
//         formik.handleChange(e);
//         // setMembersOnParliamentaryYear([]);
//         getMNAOnParliamentaryYear(e.target.value);
//       }}
//       value={formik.values?.ministerParliamentaryYear}
//     >
//       <option value="" disabled hidden>
//         Select
//       </option>
//       {ministerParliamentaryYear &&
//         ministerParliamentaryYear?.length > 0 &&
//         ministerParliamentaryYear.map((item) => (
//           <option value={item.id}>
//             {item.parliamentaryTenure}
//           </option>
//         ))}
//     </select>
//     {formik.touched.ministerParliamentaryYear &&
//       formik.errors.ministerParliamentaryYear && (
//         <div className="invalid-feedback">
//           {formik.errors.ministerParliamentaryYear}
//         </div>
//       )}
//   </div>
// </div>
// <div class="col">
//   <div class="mb-3">
//     <label class="form-label">Introduced By</label>
//     <Select
//       options={
//         Array.isArray(ministersOnParliamentaryYear) &&
//         ministersOnParliamentaryYear.length > 0
//           ? ministersOnParliamentaryYear.map(
//               (item) => ({
//                 value: item?.id,
//                 label: item?.mnaName,
//               })
//             )
//           : []
//       }
//       onChange={(selectedOption) => {
//         formik.setFieldValue(
//           "selectedMNA",
//           selectedOption
//         );
//         formik.setFieldValue("selectedMinistry", null);
//         setMinisterID(selectedOption?.value);
//       }}
//       onBlur={formik.handleBlur}
//       value={formik.values.selectedMNA}
//       name="selectedMNA"
//       className={`${
//         formik.touched.selectedMNA &&
//         formik.errors.selectedMNA
//           ? "is-invalid"
//           : ""
//       }`}
//     />

//     {formik.touched.selectedMNA &&
//       formik.errors.selectedMNA && (
//         <div class="invalid-feedback">
//           {formik.errors.selectedMNA}
//         </div>
//       )}
//   </div>
// </div>
// </div>
