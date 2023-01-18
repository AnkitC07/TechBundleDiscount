import "bootstrap/dist/css/bootstrap.min.css";
import Description from "../../Common/Description";
import { Button, Icon } from "@shopify/polaris";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import ProductBadgeSettings from "./ProductBadgeSettings";
import Preview from "./Preview";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const ProductBadge = ({states}) => {
  const {settings, settingState} = states
  return (
    <>
      <div className="mb-5">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <div className="descriptionProductBadge">
            <Description
              heading={"Offer Product Badge"}
              description={`Customize your discount's product badge to display on your product carousel across homepage and collection page If our automated placement is lackluster, please contact support for assistance. Some themes required a custom touch - we stand ready to support any necessary optimizations.`}
            />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <ProductBadgeSettings states={{ settings, settingState }} />
          </div>
          <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
            <Preview data={settings} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBadge;
