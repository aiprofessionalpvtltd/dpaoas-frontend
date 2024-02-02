import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Tiles = ({ title, value, link, cardbg, icon, type }) => {
  return (
    <>
      {type === "TileWithIcon" ? (
        <div class="card widget-flat text-bg-pink">
          <div class="card-body">
            <div class="float-end">
              <i class="fas fa-file-alt widget-icon-red">
                <FontAwesomeIcon icon={icon} />
              </i>
            </div>
            <h6 class="text-uppercase mt-0" title="Customers">
              {title}
            </h6>
            <h2 class="my-2">{value}</h2>
          </div>
        </div>
      ) : (
        <Link to={link}>
          <div
            class={`card ${cardbg} text-white widget-visitor-card`}
            style={{ overflow: "hidden" }}
          >
            <div
              class="card-block-small text-center"
              style={{ height: "150px" }}
            >
              <h2 style={{ marginTop: "15px" }}>{title}</h2>
              <i>
                <FontAwesomeIcon icon={icon} />
              </i>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
