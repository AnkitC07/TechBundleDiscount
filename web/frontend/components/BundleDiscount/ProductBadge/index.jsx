import "bootstrap/dist/css/bootstrap.min.css";
import Description from "../../Common/Description";
import { Button, Icon } from "@shopify/polaris";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import ProductBadgeSettings from "./ProductBadgeSettings";
import Preview from "./Preview";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const ProductBadge = () => {
  const [sticky, stateSticky] = useState("");
  const [settings, settingState] = useState({
    bundle_id: "",
    BadgeHeader: "Buy more and save test",
    Design: {
      BadgePosition: {
        right: true,
        left: false,
      },
      Style: {
        round: true,
        rectangle: false,
      },
      Color: "#008060",
      Border: "#008060",
      Font: "#ffffff",
      Width: 70,
      Height: 40,
      Radius: 55,
      FontSize: 18,
      FontFamily: "serif",
      FontStyle: {
        b: true,
        i: false,
        u: false,
      },
      Desktop: "right",
      Mobile: "left",
    },
  });
  return (
    <>
      <div className="container mb-5">
        {/* <div>
          <div
            className={`sticky d-flex align-items-center justify-content-between `}
          >
            <div className="d-flex align-items-center">
              <div className="mb-3 mt-3">
                <NavLink className="count_btn" to="/">
                  <Button
                    removeUnderline
                    icon={MobileBackArrowMajor}
                    onClick={() => {}}
                  ></Button>
                </NavLink>
              </div>
              <div className="mx-2">
                <p className="fs-5 fw-semibold">Product Badge</p>
              </div>
            </div>
            <div>
              <div className="d-flex align-items-center">
                <div className="mx-2">
                  <Button plain destructive removeUnderline>
                    Delete
                  </Button>
                </div>
                <div className="mx-2">
                  <Button>Save</Button>
                </div>
                <div className="mx-2">
                  <Button primary>Publish</Button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="row topSpace">
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
            <Description
              heading={"Offer Product Badge"}
              description={`Customize your discount's product badge to display on your product carousel across homepage and collection page If our automated placement is lackluster, please contact support for assistance. Some themes required a custom touch - we stand ready to support any necessary optimizations.`}
            />
          </div>
          <div className="col-lg-5 col-md-5 col-sm-4 col-xs-12">
            <ProductBadgeSettings states={{ settings, settingState }} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <Preview data={settings} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBadge;
