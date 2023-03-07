import { Stack, Tag, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";
import CheckBoxComponent from "../Fields/CheckBoxComponent";
import InputComponent from "../Fields/InputComponent";
import InputWithTags from "../Fields/InputWithTags";
import ResourcePickerComp from "../Fields/ResourcePickerComp";
import CustomPosition from "../layouts/CustomPosition";
import BundlePreview from "./BundlePreview";

const Placement = ({ states }) => {
  const { placement, setPlacement, bundle, designSettings, id, currency } =
    states;

  const [open, setOpen] = useState(false);
  const [openc, setOpenc] = useState(false);
  const [selectedPro, setProducts] = useState(placement.selectProduct);
  const updateState = async (keyData) => {
    Object.keys(selectedPro).forEach((key) => {
      selectedPro[key] = false;
    });
    selectedPro[keyData] = true;
    setProducts(selectedPro);
    setPlacement({ ...placement, selectProduct: selectedPro });
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-6 ">
          <div className="Polaris-Card" style={{ maxWidth: "500px" }}>
            <div className="Polaris-Card__Section">
              <div className="sc-bczRLJ czvMoD">
                <div className="Polaris-FormLayout">
                  <div>
                    <div className="Polaris-FormLayout__Item">
                      <span className="Polaris-Text--root Polaris-Text--headingMd Polaris-Text--semibold">
                        Select Products
                      </span>
                    </div>
                    <CheckBoxComponent
                      id="allproducts"
                      name="products"
                      label="All products"
                      checked={selectedPro.allProducts}
                      onChange={(e) => {
                        updateState("allProducts");
                      }}
                    />
                    {selectedPro.allProducts == true && (
                      <div className="my-2 mx-4 Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular Polaris-Text--subdued">
                        <p className="my-1">
                          Each product page can set up 1 widget only.
                        </p>
                        <p>
                          Please check your previous placement setting for the
                          widget, if you had set a bundle discount for another
                          active bundle widget, to display on all products
                          pages, the bundle discount at specific products
                          placement will not able to display.
                        </p>
                      </div>
                    )}
                    <CheckBoxComponent
                      id="spcProduct"
                      name="products"
                      label="Specific products"
                      checked={selectedPro.specificProducts}
                      onChange={(e) => {
                        updateState("specificProducts");
                      }}
                    />
                  </div>
                  <div className="Polaris-FormLayout__Item ">
                    <button
                      className={`Polaris-Button Polaris-Button--fullWidth ${
                        selectedPro.specificProducts == true
                          ? ""
                          : "disable-div"
                      }`}
                      type="button"
                      onClick={() => setOpen(true)}
                      id="spcProduct-btn"
                    >
                      <span className="Polaris-Button__Content">
                        <span className="Polaris-Button__Text">
                          Select Products
                        </span>
                      </span>
                    </button>
                  </div>

                  <CheckBoxComponent
                    id="allproducts"
                    name="products"
                    label="All collections"
                    checked={selectedPro.allCollections}
                    onChange={(e) => {
                      updateState("allCollections");
                    }}
                  />

                  <CheckBoxComponent
                    id="specificCollections"
                    name="specificCollections"
                    label="Specific collections"
                    checked={selectedPro.specificCollections}
                    onChange={(e) => {
                      updateState("specificCollections");
                    }}
                  />

                  <div className="Polaris-FormLayout__Item ">
                    <button
                      className={`Polaris-Button Polaris-Button--fullWidth ${
                        selectedPro.specificCollections == true
                          ? ""
                          : "disable-div"
                      }`}
                      type="button"
                      onClick={() => setOpenc(true)}
                      id="spcProduct-btn"
                    >
                      <span className="Polaris-Button__Content">
                        <span className="Polaris-Button__Text">
                          Select Collections
                        </span>
                      </span>
                    </button>
                  </div>

                  <CheckBoxComponent
                    id="spcTags"
                    name="products"
                    label="All products with specific tags"
                    checked={selectedPro.allProductsWithTags}
                    onChange={(e) => {
                      updateState("allProductsWithTags");
                    }}
                  />
                  <div
                    id="customPosition"
                    className={`Polaris-FormLayout__Item ${
                      selectedPro.allProductsWithTags == true ? "" : "hide-div"
                    }`}
                  >
                    <InputWithTags
                      tags={placement.tags}
                      states={{ placement, setPlacement }}
                      placeholder={"Enter tags"}
                    />
                  </div>
                  <CheckBoxComponent
                    id="cstmPosition"
                    name="products"
                    label="Custom position"
                    checked={selectedPro.customPosition}
                    onChange={(e) => {
                      updateState("customPosition");
                    }}
                  />
                  <div
                    className="Polaris-Labelled__HelpText"
                    id="insideTopSpacingHelpText"
                    style={{ paddingLeft: "50px" }}
                  >
                    Add timer anywhere using app blocks or code snippet provided
                    below.
                  </div>
                </div>
              </div>
            </div>

            <CustomPosition id={id} checked={selectedPro.customPosition} />
          </div>
        </div>
        <div className="col-lg-6 col-md-5">
          <BundlePreview
            bundle={bundle}
            design={designSettings}
            currency={currency}
          />
        </div>
      </div>
      <div>
        <ResourcePickerComp
          type="Product"
          state1={open}
          state2={setOpen}
          onSelection={(e) => {
            setOpen(false);
            setPlacement({
              ...placement,
              specificProducts: e.selection.map((x) => {
                return { id: x.id };
              }),
            });
          }}
          initialSelectionIds={placement.specificProducts}
        />
        <ResourcePickerComp
          type="Collection"
          state1={openc}
          state2={setOpen}
          onSelection={(e) => {
            setOpenc(false);
            setPlacement({
              ...placement,
              specificCollection: e.selection.map((x) => {
                return { id: x.id };
              }),
            });
          }}
          initialSelectionIds={placement.specificCollection}
        />
      </div>
    </>
  );
};

export default Placement;
