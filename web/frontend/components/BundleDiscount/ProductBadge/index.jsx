import "bootstrap/dist/css/bootstrap.min.css";
import Description from "../../Common/Description";
import { Button, Icon } from "@shopify/polaris";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import ProductBadgeSettings from "./ProductBadgeSettings";
import Preview from "./Preview";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const ProductBadge = ({ states }) => {
  const { settings, settingState, setBadgeHtlml } = states;
  useEffect(() => {
    setBadgeHtlml(document.querySelector('#PreviewHtml_Get')?.innerHTML)
  }, [])
  return (
    <>
      <div className="mb-5">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <div className="customCard">
              <div className="descriptionProductBadge">
                <Description
                  heading={"Offer Product Badge"}
                  description={`Customize your discount's product badge to display on your product carousel across homepage and collection page If our automated placement is lackluster, please contact support for assistance. Some themes required a custom touch - we stand ready to support any necessary optimizations.`}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <div className="customCard">
              <ProductBadgeSettings states={{ settings, settingState }} />
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
            <div className="customCard">
              <Preview data={settings} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBadge;
