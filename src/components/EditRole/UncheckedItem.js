import React from "react";
import { Link } from "react-router-dom";
import arrowLeft from "../../assets/arrow.png";

export const UncheckedItem = ({
  item,
  handleHideShow,
  hiddenItems,
  handleCheckboxChange,
  checkedItems,
  bgColor,
}) => {
  return (
    <div key={item.id}>
      <Link
        className="hideDetailsButton primaryButton2"
        style={{ backgroundColor: bgColor }}
        onClick={() => handleHideShow(item.id)}
      >
        {item.label}
        <img
          id="rotate-icon1"
          src={arrowLeft}
          alt="icon"
          className="rotating-button"
        />
      </Link>
      {hiddenItems === item.id && (
        <div className="main-role">
          <div className="row mb-3">
            {item.hasAccess.map((access) => (
              <div className="col-6 mb-3" key={access.id}>
                <div
                  data-id={bgColor}
                  className="select-op-sm-orangeBG"
                  style={{ borderLeft: `8px solid ${bgColor}` }}
                >
                  <input
                    type="checkbox"
                    name="role_permissions[]"
                    value={access.id}
                    className="cls-permission"
                    id={`cb-${access.id}`}
                    data-id={access.id}
                    data-ajax="1"
                    checked={checkedItems.some(
                      (checkedItem) =>
                        checkedItem.itemId === item.id &&
                        checkedItem.option.some(
                          (checkedOption) => checkedOption.id === access.id,
                        ),
                    )}
                    onChange={() =>
                      handleCheckboxChange(item.id, access.id, item.label)
                    }
                  />
                  {access?.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <br />
    </div>
  );
};
