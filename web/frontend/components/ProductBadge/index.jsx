import "bootstrap/dist/css/bootstrap.min.css";
import Description from "../Common/Description";
import { Button, Icon } from "@shopify/polaris";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import ProductBadgeSettings from "./ProductBadgeSettings";

const ProductBadge = () => {
  return (
    <>
      <div className="container mb-5">
        <div>
          <div className="d-flex align-items-center">
            <div className="mb-3 mt-3">
              <Button
                removeUnderline
                icon={MobileBackArrowMajor}
                onClick={() => {
                  alert("back");
                }}
              ></Button>
            </div>
            <div className="mx-2">
                <p className="fs-5 fw-semibold">Product Badge</p>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
            <Description 
            heading={'Offer Product Badge'}
            description={`Customize your discount's product badge to display on your product carousel across homepage and collection page If our automated placement is lackluster, please contact support for assistance. Some themes required a custom touch - we stand ready to support any necessary optimizations.`}
            />
          </div>
          <div className="col-lg-5 col-md-5 col-sm-4 col-xs-12">
            <ProductBadgeSettings />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
        </div>
      </div>
    </>
  );
};

export default ProductBadge;
