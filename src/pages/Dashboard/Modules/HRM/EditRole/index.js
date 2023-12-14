import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../../../../components/Header";
import { Layout } from "../../../../../components/Layout";
import { HRMsidebarItems } from "../../../../../utils/sideBarItems";
import { CheckedItem } from "../../../../../components/EditRole/CheckedItem";
import { UncheckedItem } from "../../../../../components/EditRole/UncheckedItem";
import { getModules, getRoleById, updateRole } from "../../../../../api/APIs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showSuccessMessage } from "../../../../../utils/ToastAlert";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  roleName: Yup.string().required("Role name is required"),
});

function HRMEditRole() {
  const [hiddenItems, setHiddenItems] = useState(null);
  const handleHideShow = (id) => {
    setHiddenItems((prevHiddenItems) => (prevHiddenItems === id ? null : id));
  };

  const location = useLocation();
  const [roleId, setRoleId] = useState(
    location?.state ? location.state?.id : null,
  );

  const initialValues = {
    roleName: location.state?.name ? location.state?.name : "",
    roledescription: location.state?.description
      ? location.state?.description
      : "",
  };

  const [allItems, setAllItems] = useState([]);
  const [permissionsArray, setPermissionsArray] = useState([]);

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (itemId, optionId, permission) => {
    const isChecked = checkedItems.some(
      (item) =>
        item.itemId === itemId &&
        item.option.some((opt) => opt.id === optionId) &&
        item.permission === permission,
    );

    if (isChecked) {
      // Item is checked, remove the specific option from the option array within the corresponding permission group.
      setCheckedItems((prevCheckedItems) => {
        return prevCheckedItems.map((item) =>
          item.itemId === itemId && item.permission === permission
            ? {
                itemId: itemId,
                permission: permission,
                option: item.option.filter((opt) => opt.id !== optionId),
              }
            : item,
        );
      });
    } else {
      // Item is not checked, add a new permission group with the checked option.
      setCheckedItems((prevCheckedItems) => [
        ...prevCheckedItems.filter((item) => item.itemId !== itemId), // Remove previous item with the same itemId
        {
          itemId: itemId,
          permission: permission,
          option: [
            ...(prevCheckedItems.find(
              (item) =>
                item.itemId === itemId && item.permission === permission,
            )?.option || []), // Use existing options if available
            {
              id: optionId,
              label: allItems
                .find((item) => item.id === itemId)
                ?.hasAccess.find((opt) => opt.id === optionId)?.name,
            },
          ],
        },
      ]);
    }
  };

  const filteredItems = permissionsArray.length
    ? allItems.map((item) => {
        const checkedItem = checkedItems.find(
          (checked) => checked.itemId === item.id,
        );

        return {
          ...item,
          hasAccess: item.hasAccess.filter(
            (access) =>
              !(
                checkedItem &&
                checkedItem.option.some(
                  (checkedOption) => checkedOption.id === access.id,
                )
              ),
          ),
        };
      })
    : allItems.map((item) => {
        const checkedItem = checkedItems.find(
          (checked) => checked.itemId === item.id,
        );

        return {
          ...item,
          hasAccess: item.hasAccess.filter(
            (access) =>
              !(
                checkedItem &&
                checkedItem.option.some(
                  (checkedOption) => checkedOption.id === access.id,
                )
              ),
          ),
        };
      });

  useEffect(() => {
    const initialCheckedItems = permissionsArray.flatMap((permission) =>
      permission.hasAccess.map((access) => ({
        itemId: permission.id,
        option: access,
        permission: permission.label,
      })),
    );

    const outputArr = [];

    initialCheckedItems.forEach((item) => {
      const existingItem = outputArr.find(
        (outputItem) =>
          outputItem.itemId === item.itemId &&
          outputItem.permission === item.permission,
      );

      if (existingItem) {
        existingItem.option.push({
          id: item.option.id,
          label: item.option.name,
        });
      } else {
        outputArr.push({
          itemId: item.itemId,
          permission: item.permission,
          option: [
            {
              id: item.option.id,
              label: item.option.name,
            },
          ],
        });
      }
    });

    setCheckedItems(outputArr);
  }, [permissionsArray]);

  const fetchModules = async () => {
    try {
      const response = await getModules();
      setAllItems(response.data?.modulesPermissions);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchModuleById = async () => {
    try {
      const response = await getRoleById(roleId);
      setPermissionsArray(response.data?.permissions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchModuleById();
    fetchModules();
  }, []);

  const EditRoleApi = async (values) => {
    const permissionOptionIds = checkedItems.flatMap((item) =>
      item.option.map((option) => option.id),
    );

    const data = {
      name: values?.roleName,
      description: values?.roledescription,
      permissionsToUpdate: permissionOptionIds,
    };

    try {
      const response = await updateRole(roleId, data);
      if (response.success) {
        showSuccessMessage(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      EditRoleApi(values);
    },
  });

  const colors = [
    "#1b4b59",
    "#fb3157",
    "#53d769",
    "#fd3d3a",
    "#d925e0",
    "#345e9a",
    "#2ab4c0",
    "#d08008",
    "#357A54",
    "#7f4902",
    "#b74242",
    "#8537a7",
    "#d1c937",
    "#49e6bf",
    "#3f00ff",
    "#471a0b",
    "#d925e0",
    "#b58eaa",
    "#a32f0a",
    "#d96e00",
    "#098689",
    "#157efb",
    "#cddc39",
    "#7f4902",
    "#bf7c7c",
    "#990000",
    "#fb9527",
    "#099113",
    "#39dc39",
    "#2a0c7a",
  ];

  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
      <ToastContainer />
      <Header
        dashboardLink={"/hrm/dashboard"}
        addLink1={"/hrm/dashboard"}
        addLink2={"/hrm/editrole"}
        title1={"Roles"}
        title2={"Edit Role"}
      />
      <div className="container-fluid">
        <div className="card">
          <div className="card-header red-bg" style={{ background: "#666" }}>
            <h1>Edit Role</h1>
          </div>
          <div className="card-body pb-5">
            <div className="container-fluid">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Role name * </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.roleName && formik.errors.roleName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="roleName"
                        placeholder={"Role name"}
                        value={formik.values.roleName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.roleName && formik.errors.roleName && (
                        <div className="invalid-feedback">
                          {formik.errors.roleName}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        placeholder={formik.values.roledescription}
                        className={`form-control ${
                          formik.touched.roledescription &&
                          formik.errors.roledescription
                            ? "is-invalid"
                            : ""
                        }`}
                        id="roledescription"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.roledescription}
                      ></textarea>
                      {formik.touched.roledescription &&
                        formik.errors.roledescription && (
                          <div className="invalid-feedback">
                            {formik.errors.roledescription}
                          </div>
                        )}
                    </div>
                    {checkedItems
                      .sort((a, b) => {
                        const itemIdA = String(a?.itemId || ""); // Convert to string
                        const itemIdB = String(b?.itemId || ""); // Convert to string
                        return itemIdA.localeCompare(itemIdB);
                      })
                      .map((checked, index) => (
                        <CheckedItem
                          key={index}
                          checked={checked}
                          bgColor={colors[index]}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      ))}

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                  <div className="col">
                    <div className="permisionbox">
                      {filteredItems.map((item, index) => (
                        <UncheckedItem
                          key={index}
                          item={item}
                          handleHideShow={handleHideShow}
                          hiddenItems={hiddenItems}
                          bgColor={colors[index]}
                          handleCheckboxChange={handleCheckboxChange}
                          checkedItems={checkedItems}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HRMEditRole;
