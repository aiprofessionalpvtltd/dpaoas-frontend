import React from "react";
import { Link } from "react-router-dom";
import arrowLeft from "../../assets/arrow.png";

const UncheckedItem = ({ item, handleHideShow, hiddenItems, handleCheckboxChange, checkedItems }) => {
  return (
    <div key={item.id}>
      <Link
        className="hideDetailsButton primaryButton2"
        onClick={() => handleHideShow(item.id)}
      >
        {item.permission}
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
            {item.option.map((option) => (
              <div className="col-6 mb-3" key={option.id}>
                <div
                  data-id="orange"
                  className="select-op-sm-orangeBG"
                  style={{ borderLeft: `8px solid ` }}
                >
                  <input
                    type="checkbox"
                    name="role_permissions[]"
                    value={option.id}
                    className="cls-permission"
                    id={`cb-${option.id}`}
                    data-id={option.id}
                    data-ajax="1"
                    checked={checkedItems.some(
                      (checkedItem) =>
                        checkedItem.itemId === item.id &&
                        checkedItem.optionId === option.id
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        item.id,
                        option.id,
                        item.permission
                      )
                    }
                  />
                  {option?.label}
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

export default UncheckedItem;