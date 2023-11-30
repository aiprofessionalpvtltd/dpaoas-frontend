import React from "react";

export const CheckedItem = ({ checked, handleCheckboxChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{checked?.permission}</label>
      <div id="selected-module-1" className="seleted-module">
        <div className="row">
          {checked?.option?.map((optionItem, index) => (
            <div className="col-md-6 select-fix parent_selector" key={index}>
              <div
                data-id="orange"
                className="select-op-sm-orangeBG"
                style={{ borderLeft: `8px solid ` }}
              >
                <input
                  type="checkbox"
                  value={optionItem.id}
                  className="cls-permission"
                  checked={true}
                  onChange={() =>
                    handleCheckboxChange(
                      checked?.itemId,
                      optionItem?.id,
                      checked?.permission
                    )
                  }
                />
                {optionItem?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};