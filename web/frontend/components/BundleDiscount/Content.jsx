import {
  Button,
  Card,
  Checkbox,
  Icon,
  Popover,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import CheckBoxComponent from "../Fields/CheckBoxComponent";
import ChoiceListComp from "../Fields/ChoiceListComp";
import DatePickerExample from "../Fields/DatePickerInput";
import InputComponent from "../Fields/InputComponent";
import InputSelect from "../Fields/InputSelect";
import SearchFilter from "../Fields/SearchFilter";
import TextFieldComp from "../Fields/TextFieldComp";
import { SearchMinor, CirclePlusMajor } from "@shopify/polaris-icons";
import ResourcePickerComp from "../Fields/ResourcePickerComp";
import ComboBoxComp from "../Fields/ComboBoxComp";
import BundlePreview from "./BundlePreview";

const Content = ({
  bundle,
  setBundle,
  products,
  productsState,
  currency,
  design,
  customer,
  setCustomer,
}) => {
  const [bundleDiv, setbundleDiv] = useState(
    bundle.bundleProducts.length == 0
      ? ["", ""]
      : bundle.bundleProducts.length > 0 && bundle.bundleProducts.length < 2
      ? [...bundle.bundleProducts, ""]
      : [...bundle.bundleProducts]
  );
  bundle.bundleProducts = bundleDiv;

  // const [bundleDiv, setbundleDiv] = useState(bundle.bundleProducts);

  // useEffect(() => {
  //   setbundleDiv(bundle.bundleProducts);
  // }, [bundle]);

  const updateRadio = (key) => {
    const data = bundle.bundleDiscount;
    Object.keys(data).forEach((x) => {
      data[x].status = false;
    });
    data[key].status = true;
    setBundle({ ...bundle });
  };
  //---Choice list states ends---//
  //---Free gift choice list---//

  const handleFreeGift = (value, status) => {
    if (status == true) {
      bundle.bundleDiscount.freeGift.freeGiftSlected = [
        ...bundle.bundleDiscount.freeGift.freeGiftSlected,
        value,
      ];
    } else {
      let deleted = bundle.bundleDiscount.freeGift.freeGiftSlected;
      const index = deleted.findIndex((x) => x == value);
      deleted.splice(index, 1);
      bundle.bundleDiscount.freeGift.freeGiftSlected = deleted;
    }

    setBundle({ ...bundle });
  };

  //---Childrens  in choicelists---//
  //---Free gift choice list---//
  const discountType = [
    {
      data: "% OFF",
      value: "% OFF",
      selected: "true",
    },
    {
      data: `${currency}OFF`,
      value: `${currency}OFF`,
    },
  ];
  const freeGift = [
    {
      label: `Product #1`,
      value: "1",
    },
  ];

  const removeTag = (i) => {
    console.log(i);
    if (bundle.bundleProducts[i] != "") {
      productsState([bundle.bundleProducts[i], ...products]);
      if (i == 0 || i == 1) {
        bundle.bundleProducts[i] = "";
      } else {
        bundle.bundleProducts.splice(i, 1);
      }
    } else {
      bundle.bundleProducts.splice(i, 1);
    }
    setBundle({ ...bundle });
    console.log(products, "Products");
  };
  const handelCheck = (x, i) => {
    console.log("Index", i);
    console.log("BundelProducts=> ", bundle.bundleProducts);
    if (bundle.bundleProducts.length == 0) {
      bundle.bundleProducts = [...bundle.bundleProducts, x];
    } else {
      // console.log("Slicing=>", bundle.bundleProducts[i]);
      if (bundle.bundleProducts[i] == "") {
        const index = products.findIndex((el) => el.id === x.id);
        products.splice(index, 1);
        productsState([...products]);
        bundle.bundleProducts[i] = x;
      } else {
        products.push(bundle.bundleProducts[i]);
        bundle.bundleProducts[i] = x;
        const index = products.findIndex((el) => el.id === x.id);
        products.splice(index, 1);
        productsState([...products]);
      }
      console.log(products, "Products");
    }
    setBundle({ ...bundle });
  };
  return (
    <>
      <div className="row pb-5">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="customCard">
            <div className="Polaris-Card">
              <div className="Polaris-Card__Section">
                <div className="Polaris-FormLayout">
                  <div className="Polaris-FormLayout__Item">
                    <span className="Polaris-TextStyle--variationStrong">
                      Bundle Offer Detail
                    </span>
                  </div>
                  <div className="Polaris-FormLayout__Item">
                    <div className="Polaris-Labelled__LabelWrapper">
                      <div className="Polaris-Label">
                        <label
                          id="nameLabel"
                          htmlFor="name"
                          className="Polaris-Label__Text"
                        >
                          Offer header
                        </label>
                      </div>
                    </div>
                    <InputComponent
                      id="name"
                      type="text"
                      default={bundle.offerHeader}
                      onChange={(e) => {
                        setBundle({
                          ...bundle,
                          offerHeader: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="Polaris-Card__Section">
                <div className="sc-bczRLJ czvMoD">
                  <div className="Polaris-FormLayout">
                    <div className="Polaris-FormLayout__Item">
                      <span className="Polaris-TextStyle--variationStrong">
                        Bundle Products
                      </span>
                      <div className=" Polaris-Text--subdued">
                        Bundle offers will show inside each product page that is
                        included in the bundle .
                      </div>
                      <div id="product_search_section" class="mt-4">
                        {bundleDiv.map((item, i) => (
                          <div
                            class="products_selected position_relative"
                            data-id="product_select_box1"
                            key={i.toString()}
                          >
                            {i > 1 ? (
                              <i
                                onClick={() => removeTag(i)}
                                class="fa-solid fa-trash"
                              ></i>
                            ) : (
                              ""
                            )}

                            <div class="Polaris-TextContainer ">
                              {/* <TextFieldComp label={item} prefix={<Icon source={SearchMinor} />} placeholder={'Select a product'} /> */}
                              <div className="searchBoxTag">
                                {" "}
                                <ComboBoxComp
                                  type={"BundleProducts"}
                                  bundle={bundle}
                                  i={i + 1}
                                  products={products}
                                  productsState={productsState}
                                  setBundle={setBundle}
                                  removeTag={removeTag}
                                  handelCheck={handelCheck}
                                />
                              </div>
                            </div>
                            {i === bundleDiv.length - 1 ? (
                              <div
                                className="position_center pointerclass"
                                onClick={() => {
                                  bundleDiv.push("");
                                  setBundle({ ...bundle });
                                }}
                              >
                                <Icon
                                  source={CirclePlusMajor}
                                  color="primary"
                                />
                              </div>
                            ) : (
                              <div className="position_center ">
                                <Icon source={CirclePlusMajor} color="base" />
                              </div>
                            )}
                          </div>
                        ))}
                        <center>
                          <p
                            class="mt-4 add_another_pro"
                            onClick={() => {
                              bundleDiv.push("");
                              setBundle({ ...bundle });
                            }}
                          >
                            Add another product
                          </p>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Polaris-Card__Section">
                <div className="sc-bczRLJ czvMoD">
                  <div className="Polaris-FormLayout">
                    <div>
                      <div className="Polaris-FormLayout__Item">
                        <span className="Polaris-TextStyle--variationStrong">
                          Bundle discount
                        </span>
                      </div>
                      <CheckBoxComponent
                        id="adddiscount"
                        name="bundleDiscount"
                        label="Add Discount"
                        decription=""
                        checked={bundle.bundleDiscount.addDiscount.status}
                        onChange={(e) => {
                          updateRadio("addDiscount");
                        }}
                      />
                      {bundle.bundleDiscount.addDiscount.status ? (
                        <div
                          id="addDiscount"
                          className="Polaris-FormLayout__Item"
                        >
                          <div className="inputAndSlect">
                            <InputComponent
                              type={"number"}
                              min={0}
                              max={100}
                              placeholder={"10"}
                              default={
                                bundle.bundleDiscount.addDiscount.discountValue
                              }
                              onChange={(e) => {
                                bundle.bundleDiscount.addDiscount.discountValue =
                                  e.target.value;
                                setBundle({ ...bundle });
                              }}
                            />
                            <InputSelect
                              id="addDiscountSelect"
                              option={discountType}
                              value={
                                bundle.bundleDiscount.addDiscount.discountType
                              }
                              placeholder="Unpublish timer"
                              onChange={(e) => {
                                bundle.bundleDiscount.addDiscount.discountType =
                                  e.target.value;
                                setBundle({ ...bundle });
                              }}
                            />
                          </div>
                          {bundle.bundleDiscount.addDiscount.discountValue ===
                            "" ||
                          bundle.bundleDiscount.addDiscount.discountValue >
                            100 ? (
                            <div className="inputWarning">
                              <i class="fa-solid fa-triangle-exclamation"></i>
                              <span>
                                Please fill out this field. Value lessthan or
                                equal to 100.
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}

                      <CheckBoxComponent
                        id="freeship"
                        name="bundleDiscount"
                        label="Free Shipping"
                        decription="Free shipping cannot be combined with other types of discounts."
                        checked={bundle.bundleDiscount.freeShiping.status}
                        onChange={(e) => {
                          updateRadio("freeShiping");
                        }}
                      />
                      <CheckBoxComponent
                        id="freegift"
                        name="bundleDiscount"
                        label="Free Gift"
                        decription="Select a bundle product you want to give free."
                        checked={bundle.bundleDiscount.freeGift.status}
                        onChange={(e) => {
                          updateRadio("freeGift");
                        }}
                      />
                      {bundle.bundleDiscount.freeGift.status ? (
                        <>
                          <div className="Polaris-FormLayout__Item">
                            {/* {bundle.bundleDiscount.freeGift.freeGiftSlected == 0 ? */}
                            <div className="Polaris-Choice__Descriptions Polaris-Text--subdued">
                              Select atleast one product
                            </div>
                            {/* //  : */}
                            <div className="Polaris-Choice__Descriptions freeProducts-Bundle ">
                              <div className="selected_product_list">
                                {/* <ChoiceListComp selected={freeSelected} handleChange={freeHandleChange} choice={freeGift} /> */}
                                {bundle.bundleProducts.map((x, i) => {
                                  console.log(x, "gift");
                                  return (
                                    <>
                                      {x !== "" ? (
                                        <Checkbox
                                          label={`Product #${i + 1}`}
                                          checked={bundle.bundleDiscount.freeGift.freeGiftSlected.includes(
                                            x.id
                                          )}
                                          onChange={(e) =>
                                            handleFreeGift(x.id, e)
                                          }
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                            {/* // } */}
                          </div>

                          <div className="Polaris-FormLayout__Item">
                            <div
                              className="Polaris-Text--subdued"
                              id="nameHelpText"
                            >
                              <strong>Please Note :</strong> Bundle offers will
                              show inside each product page that is included in
                              the bundle .
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      <CheckBoxComponent
                        id="nodiscount"
                        name="bundleDiscount"
                        label="No Discount"
                        decription=""
                        checked={bundle.bundleDiscount.noDiscount.status}
                        onChange={(e) => {
                          updateRadio("noDiscount");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="Polaris-Card__Section">
                <div className="sc-bczRLJ czvMoD">
                  <div className="Polaris-FormLayout">
                    <div className="Polaris-FormLayout__Item">
                      <span className="Polaris-TextStyle--variationStrong">
                        Advanced settings
                      </span>
                    </div>
                    <div className="advanceChoiceList choiceList">
                      <ChoiceListComp
                        selected={selected}
                        handleChange={handleChange}
                        choice={choiceListArray}
                      /> 
                    </div>
                  </div>
                </div>
              </div> */}
              <AdvanceSettings
                bundle={bundle}
                setBundle={setBundle}
                products={products}
                productsState={productsState}
                customer={customer}
                setCustomer={setCustomer}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <BundlePreview bundle={bundle} currency={currency} design={design} />
        </div>

        {/* <div className="col col-md-5" id='productTimer' ref={ref}>
                    <div style={{ position: 'sticky', top: '20px' }} >
                    </div>
                </div> */}
        {/* <ResourcePickerComp type="Product" state1={false} /> */}
      </div>
    </>
  );
};

const AdvanceSettings = ({
  bundle,
  setBundle,
  products,
  productsState,
  customer,
  setCustomer,
}) => {
  const roundDiscountSelect = [
    {
      data: ".00",
      value: ".00",
    },
    {
      data: ".49",
      value: ".49",
    },
    {
      data: ".50",
      value: ".50",
    },
    {
      data: ".95",
      value: ".95",
    },
    {
      data: ".99",
      value: ".99",
    },
  ];
  //---Childrens in choicelists---//
  const specificChild = () => {
    return (
      <>
        <div className=" Polaris-Text--subdued mt-2">
          Select atleast one product
        </div>
        <div className="selected_product_list">
          {bundle.bundleProducts.map((x, i) => {
            return (
              <>
                {x !== "" ? (
                  <Checkbox
                    label={`Product #${i + 1}`}
                    checked={bundle.advanceSetting.specific.specificSlected.includes(
                      x.id
                    )}
                    onChange={(e) => handleSpecificCheck(x.id, e)}
                  />
                ) : (
                  ""
                )}
              </>
            );
          })}
        </div>
      </>
    );
  };

  const startDateChild = () => {
    return (
      <div className="row">
        <div className="col-lg-8 col-md-18 col-sm-12 mt-1">
          <div className="mb-1">
            <DatePickerExample
              state1={bundle.advanceSetting.startDate.date}
              onChange={(e) => {
                bundle.advanceSetting.startDate.date = e;
                setBundle({ ...bundle });
              }}
              // disable={!modal.isEnabled}
            />
            <span id="start_date_err" className="err"></span>
          </div>
        </div>
      </div>
    );
  };

  const endDateChild = () => {
    return (
      <div className="row">
        <div className="col-lg-8 col-md-18 col-sm-12 mt-1">
          <div className="mb-0">
            <DatePickerExample
              state1={bundle.advanceSetting.endDate.date}
              onChange={(e) => {
                bundle.advanceSetting.endDate.date = e;
                setBundle({ ...bundle });
              }}
              // disable={!modal.isEnabled}
            />
            <span id="end_date_err" className="err"></span>
          </div>
        </div>
      </div>
    );
  };

  const roundDiscountChild = () => {
    return (
      <div className="row">
        <div className="col-lg-8 col-md-18 col-sm-12 mt-1">
          <InputSelect
            id="round_discount"
            option={roundDiscountSelect}
            value={bundle.advanceSetting.roundDiscount.roundDiscountSelected}
            // placeholder="Unpublish timer"
            onChange={(e) => {
              bundle.advanceSetting.roundDiscount.roundDiscountSelected =
                e.target.value;
              setBundle({ ...bundle });
            }}
          />
        </div>
      </div>
    );
  };

  const targetDiscountChild = () => {
    const removeTag = (i) => {
      console.log(i);
      setCustomer([
        bundle.advanceSetting.targetCustomer.targetCustomerSelected[i],
        ...customer,
      ]);
      bundle.advanceSetting.targetCustomer.targetCustomerSelected.splice(i, 1);
      setBundle({ ...bundle });
    };
    const handelCheck = (x, i) => {
      console.log(x);
      bundle.advanceSetting.targetCustomer.targetCustomerSelected = [
        x,
        ...bundle.advanceSetting.targetCustomer.targetCustomerSelected,
      ];
      const index = customer.findIndex((el) => el.id === x.id);
      customer.splice(index, 1);
      setCustomer([...customer]);
      setBundle({ ...bundle });
    };
    return (
      <div className="targetSearch">
        <div className="searchBoxTag">
          <ComboBoxComp
            type={"AdvancedSettings"}
            bundle={bundle}
            i={0}
            products={customer}
            productsState={setCustomer}
            setBundle={setBundle}
            removeTag={removeTag}
            handelCheck={handelCheck}
          />
        </div>
      </div>
    );
  };

  const handleSpecificCheck = (value, status) => {
    if (status == true) {
      bundle.advanceSetting.specific.specificSlected = [
        ...bundle.advanceSetting.specific.specificSlected,
        value,
      ];
    } else {
      let deleted = bundle.advanceSetting.specific.specificSlected;
      const index = deleted.findIndex((x) => x == value);
      deleted.splice(index, 1);
      bundle.advanceSetting.specific.specificSlected = deleted;
    }
    setBundle({ ...bundle });
  };

  const choiceListArray = [
    {
      label: "Customer must choose an option",
      value: "choose an option",
      helpText:
        "Show “choose an option” inside the variant selection and block the main button until variants are manually selected",
      checked: bundle.advanceSetting.customerOption.status,
      key: "customerOption",
    },
    {
      label: "Hide from storefront",
      value: "hide",
      helpText:
        "Check this box if you want to hide the offer widget in the storefront, but apply discounts based on these rules.",
      checked: bundle.advanceSetting.hideStorefront.status,
      key: "hideStorefront",
    },
    {
      label: "Show only on specific product pages",
      value: "specific",
      renderChildren: specificChild,
      checked: bundle.advanceSetting.specific.status,
      key: "specific",
    },
    {
      label: "Set start time",
      value: "startTime",
      renderChildren: startDateChild,
      checked: bundle.advanceSetting.startDate.status,
      key: "startDate",
    },
    {
      label: "Set end time",
      value: "endTime",
      renderChildren: endDateChild,
      checked: bundle.advanceSetting.endDate.status,
      key: "endDate",
    },
    {
      label: "Round discounted prices",
      value: "roundDiscount",
      renderChildren: roundDiscountChild,
      checked: bundle.advanceSetting.roundDiscount.status,
      key: "roundDiscount",
    },
    {
      label: "Target customers",
      value: "target",
      helpText:
        "To enable this feature, please create customer tags to customers your customer in “Customer” menu",
      renderChildren: targetDiscountChild,
      checked: bundle.advanceSetting.targetCustomer.status,
      key: "targetCustomer",
    },
  ];

  const UpdateStatus = (key, status) => {
    bundle.advanceSetting[key].status = status;
    setBundle({ ...bundle });
  };
  return (
    <>
      {/* <Card sectioned> */}
      <Card.Section title="Advanced Settings">
        {choiceListArray.map((x, i) => {
          return (
            <div className="mb-3" key={`000${i}`}>
              <Checkbox
                label={x.label}
                checked={x.checked}
                helpText={x.helpText}
                onChange={(e) => UpdateStatus(`${x.key}`, e)}
              />
              {bundle.advanceSetting[x.key].status == true ? (
                x.renderChildren == undefined ? (
                  ""
                ) : (
                  <x.renderChildren />
                )
              ) : (
                ""
              )}
            </div>
          );
        })}
      </Card.Section>
      {/* </Card> */}
    </>
  );
};

export default Content;
