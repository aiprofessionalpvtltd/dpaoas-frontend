import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../../../../components/Header";
import { Layout } from "../../../../../components/Layout";
import { HRMsidebarItems } from "../../../../../utils/sideBarItems";
import { CheckedItem } from "../../../../../components/EditRole/CheckedItem";
import { UncheckedItem } from "../../../../../components/EditRole/UncheckedItem";
import { getPermissionsData } from "../../../../../api/Auth";
import { getModules } from "../../../../../api/APIs";

function HRMEditRole() {
  const [hiddenItems, setHiddenItems] = useState(null);
  const handleHideShow = (id) => {
    setHiddenItems((prevHiddenItems) => (prevHiddenItems === id ? null : id));
  };

  const userPermissions = getPermissionsData();
  const location = useLocation();
  // console.log("State", location.state);
  // console.log("State", userPermissions);
  const [allItems, setAllItems] = useState([
    {
      id: "1",
      permission: "Users",
      option: [
        { id: 1, label: "View" },
        { id: 2, label: "Edit" },
        { id: 3, label: "Create" },
        { id: 4, label: "Delete" },
      ],
      backgroundColors: "#fb9527",
    },
    {
      id: "2",
      permission: "Role",
      option: [
        { id: 1, label: "View" },
        { id: 2, label: "Edit" },
        { id: 3, label: "Create" },
        { id: 4, label: "Delete" },
      ],
      backgroundColors: "#fb3157",
    },
  ]);
  const [permissionsArray, setPermissionsArray] = useState([
    {
      id: "1",
      permission: "Users",
      option: [
        { id: 1, label: "View" },
        { id: 2, label: "Edit" },
      ],
      backgroundColors: "#fb9527",
    },
    {
      id: "2",
      permission: "Role",
      option: [
        { id: 1, label: "View" },
        { id: 3, label: "Create" },
      ],
      backgroundColors: "#fb3157",
    },
  ]);
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
                ?.option.find((opt) => opt.id === optionId)?.label,
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
          option: item.option.filter(
            (option) =>
              !(
                checkedItem &&
                checkedItem.option.some(
                  (checkedOption) => checkedOption.id === option.id,
                )
              ),
          ),
        };
      })
    : allItems;

  useEffect(() => {
    const initialCheckedItems = permissionsArray.flatMap((permission) =>
      permission.option.map((option) => ({
        itemId: permission.id,
        option: option,
        permission: permission.permission,
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
          label: item.option.label,
        });
      } else {
        outputArr.push({
          itemId: item.itemId,
          permission: item.permission,
          option: [
            {
              id: item.option.id,
              label: item.option.label,
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <Layout module={true} sidebarItems={HRMsidebarItems} centerlogohide={true}>
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
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Role name * </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder={location?.state?.name}
                    />
                  </div>
                  {checkedItems
                    .sort((a, b) => a.itemId.localeCompare(b.itemId))
                    .map((checked, index) => (
                      <CheckedItem
                        key={index}
                        checked={checked}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    ))}

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-primary" type="button">
                      Submit
                    </button>
                  </div>
                </div>
                <div className="col">
                  <div className="permisionbox">
                    {filteredItems.map((item) => (
                      <UncheckedItem
                        key={item.id}
                        item={item}
                        handleHideShow={handleHideShow}
                        hiddenItems={hiddenItems}
                        handleCheckboxChange={handleCheckboxChange}
                        checkedItems={checkedItems}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HRMEditRole;
