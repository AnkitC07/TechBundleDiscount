import { Card, Banner } from "@shopify/polaris";
import React, { useState } from "react";
import { useEffect } from "react";

export default function BundlePreview({ bundle, currency, design }) {
  const { settings, button, priceSavings } = design;
  const data = {
    settings: {
      FontColor: "#008060",
      FontSize: 18,
      FontFamily: "serif",
      FontStyle: {
        b: false,
        i: false,
        u: false,
      },
      Alignment: "",
      VariantBgColor: "#008060",
    },
    button: {
      bg: "#348766",
      color: "#ffffff",
      borderRadius: 50,
      buttonAction: "add to cart",
      text: "Grab this deal",
      Moreoptions: "More options",
      Unavailablebtn: "UNAVAILABLE",
      UnavailableNotice: "Unavailable, please try another option",
      ChooseOption: "Choose an option",
    },
    priceSavings: {
      freeGift: "Free",
      FreeShippingTag: "Free shipping",
      FreeGiftTag: "Free",
      SaveTag: "SAVE {{discount}}",
      Total: "Total",
      tagColor: "#008060",
      priceColor: "#008060",
      ComparePriceColor: "#008060",
      showTotal: false,
      ShowPriceUnit: false,
      ShowComparePrice: false,
    },
  };

  return (
    <div className="BundlepreviewStyle">
      <div className="previewScroll">
        <div className="customCard">
          {JSON.stringify(bundle.bundleProducts).includes("title") == true ? (
            <div
              style={{
                color: `${settings.FontColor}`,
                fontSize: `${settings.FontSize}px`,
                fontFamily: settings.FontFamily,
                fontStyle: settings.FontStyle.i == true ? "italic" : "",
                fontWeight: settings.FontStyle.b == true ? "700" : "",
                textDecoration: settings.FontStyle.u == true ? "underline" : "",
              }}
            >
              <p
                style={{
                  fontSize: `${settings.FontSize + 2}px`,
                  textAlign: settings.Alignment,
                  margin: "10px 0px",
                  fontWeight: 600,
                }}
              >
                {bundle.offerHeader}
              </p>
              <BundlePreviewPro
                bundle={bundle}
                currency={currency}
                design={design}
              />
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <div className="mt-4">
        <Banner icon={false} onDismiss={() => {}}>
          <p>
            You can design the app in the "Design" tab after you're done
            creating your offer.
          </p>
        </Banner>
      </div>
    </div>
  );
}

const EmptyState = () => {
  return (
    <div
      style={{
        background: "lightgray",
        width: "100%",
        height: "100%",
        color: "black",
      }}
    >
      <div className="emptyPreview">Offer Preview</div>
    </div>
  );
};

const BundlePreviewPro = ({ bundle, currency, design }) => {
  const { settings, button, priceSavings } = design;
  const [total, setTotal] = useState(0);
  const [disTotal, setDisTotal] = useState(0);
  const [price, setPrice] = useState([]);
  const [variantPrice, setVariantPrice] = useState(0);

  const getTotal = () => {
    let count = 0;
    let disCount = 0;
    bundle.bundleProducts.forEach((item, i) => {
      // console.log(price, i);
      item != "" ? (count = count + Number(price[i])) : null;
      if (item != "") {
        if (bundle.advanceSetting.roundDiscount.status) {
          let arr = [];
          arr = applyDiscount(
            price[i],
            bundle.bundleDiscount.addDiscount.discountValue
          ).split(".");
          arr[1] = bundle.advanceSetting.roundDiscount.roundDiscountSelected;
          arr = arr.toString().replace(",", "");
          // console.log(arr, "Array");
          disCount = disCount + Number(arr);
        } else {
          disCount =
            disCount +
            Number(
              applyDiscount(
                price[i],
                bundle.bundleDiscount.addDiscount.discountValue
              )
            );
        }
      }
    });
    setTotal((Math.round(count * 100) / 100).toFixed(2));
    if (bundle.bundleDiscount.addDiscount.discountType == `${currency}OFF`) {
      setDisTotal(
        (
          Math.round(
            (count - bundle.bundleDiscount.addDiscount.discountValue) * 100
          ) / 100
        ).toFixed(2)
      );
    } else {
      setDisTotal((Math.round(disCount * 100) / 100).toFixed(2));
    }
    return disTotal;
  };

  useEffect(() => {
    bundle.bundleProducts.forEach((item, i) => {
      item != "" ? (price[i] = item.variants[0].price) : null;
    });
    setPrice([...price]);
    getTotal();
    console.log(bundle, "Bundle");
  }, [bundle]);

  useEffect(() => {
    getTotal();
  }, [price]);

  function applyDiscount(price, discountPercentage) {
    let discount = price * (discountPercentage / 100);
    discount = (Math.round((price - discount) * 100) / 100).toFixed(2);
    if (bundle.advanceSetting.roundDiscount.status) {
      let temp = discount.toString().split(".");
      temp[1] = bundle.advanceSetting.roundDiscount.roundDiscountSelected;
      discount = temp.toString().replace(",", "");
    }
    return discount;
  }

  // console.log(bundle, "checking objs");
  // console.log(design);
  return (
    <>
      <div
        style={{
          overflow: "hidden",
          border: `1px solid ${settings.FontColor}`,
        }}
      >
        <div style={{ marginBottom: "25px", padding: "8px" }}>
          {bundle.bundleProducts.map((x, i) => {
            return x != "" ? (
              <>
                <div style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>
                        <div
                          style={{
                            border: "1px solid lightgray",
                            boxSizing: "border-box",
                            width: "70px",
                            height: "48px",
                            background: `url(${
                              x.image ? x.image.src : "no_image.png"
                            }) center center / contain no-repeat rgb(237, 237, 237)`,
                          }}
                        ></div>
                      </div>
                      <div style={{ margin: "0px 7px" }}>{x.title}</div>
                    </div>
                    <div>
                      {bundle.bundleDiscount.noDiscount.status ? (
                        ""
                      ) : bundle.bundleDiscount.addDiscount.discountType !==
                        `${currency}OFF` ? (
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            textDecoration: "line-through",
                            textAlign: "right",
                            fontSize: "15px",
                            lineHeight: "21px",
                            color: "rgb(144, 149, 155)",
                          }}
                        >
                          {currency}
                          {price[i]}
                        </div>
                      ) : (
                        ""
                      )}
                      {bundle.bundleDiscount.freeGift.freeGiftSlected.includes(
                        x.id
                      ) && bundle.bundleDiscount.freeGift.status ? (
                        <span
                          style={{
                            color: "#008060",
                            letterSpacing: "1px",
                            fontWeight: "bold",
                          }}
                        >
                          FREE
                        </span>
                      ) : bundle.bundleDiscount.noDiscount.status ? (
                        <div>
                          {currency}
                          {price[i]}
                        </div>
                      ) : bundle.bundleDiscount.addDiscount.discountType !==
                        `${currency}OFF` ? (
                        <div>
                          {currency}
                          {bundle.bundleDiscount.addDiscount.discountValue > 0
                            ? applyDiscount(
                                price[i],
                                bundle.bundleDiscount.addDiscount.discountValue
                              )
                            : price[i]}
                        </div>
                      ) : (
                        <div>
                          {currency}
                          {price[i]}
                        </div>
                      )}
                    </div>
                  </div>
                  {x.variants.length > 1 ? (
                    <div className="productSelects">
                      <Variants
                        v={x.variants}
                        bundle={bundle}
                        price={price}
                        vIndex={i}
                        setPrice={setPrice}
                        design={design}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {bundle.bundleProducts.length - 1 == i ? (
                    ""
                  ) : (
                    <div style={{ margin: "20px 0" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: button.bg,
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: "19px",
                            background: "white",
                            position: "absolute",
                            top: "-10px",
                            left: "47%",
                            border: "50px",
                          }}
                        >
                          <svg
                            style={{
                              // width: "21px",
                              fill: button.bg,
                              // position: "absolute",
                              // top: "-9",
                              // left: "47%",
                            }}
                            viewBox="0 0 20 20"
                            focusable="false"
                            aria-hidden="true"
                          >
                            <path d="M0 10c0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10-10 4.486-10 10zm5 0a1 1 0 0 1 1-1h3v-3a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 0 1-1-1z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              ""
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${settings.FontColor}`,
            padding: "20px 10px 10px 10px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Total</span>
          <div>
            <p
              style={{
                color: "#008060",
                letterSpacing: "1px",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              {bundle.bundleDiscount.freeGift.freeGiftSlected.length > 0 &&
              bundle.bundleDiscount.freeGift.status
                ? "FREE GIFT INCLUDED"
                : bundle.bundleDiscount.freeShiping.status
                ? "FREE SHIPPING INCLUDED"
                : bundle.bundleDiscount.noDiscount.status
                ? ""
                : bundle.bundleDiscount.addDiscount.discountType ==
                  `${currency}OFF`
                ? `SAVE ${currency}${bundle.bundleDiscount.addDiscount.discountValue}`
                : `SAVE ${bundle.bundleDiscount.addDiscount.discountValue}%`}
            </p>
            <div style={{ textAlign: "right" }}>
              <span
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {bundle.bundleDiscount.noDiscount.status ? (
                  <>
                    {currency}
                    {total}
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        textDecoration: "line-through",
                        textAlign: "right",
                        lineHeight: "21px",
                        color: "rgb(144, 149, 155)",
                      }}
                    >
                      {currency}
                      {total}
                    </span>
                    <span>
                      {currency}
                      {disTotal}
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "px" }}>
        <button
          name={button.buttonAction}
          class="grab_deal_btn "
          type="button"
          style={{
            width: "100%",
            color: button.color,
            background: button.bg,
            border: "none",
            boxShadow: "none",
            marginTop: "10px",
            padding: "10px 0px",
            fontSize: `${settings.FontSize}px`,
            borderRadius: `${button.borderRadius}px`,
          }}
        >
          {button.text}
        </button>
      </div>
    </>
  );
};

const Variants = ({ v, bundle, vIndex, price, setPrice, design }) => {
  const { settings, button, priceSavings } = design;
  return (
    <>
      <div style={{ margin: "10px 0px", width: "100%" }}>
        <select
          style={{
            width: "100%",
            padding: "5px",
            borderColor: settings.FontColor,
            color: settings.FontColor,
            background: settings.VariantBgColor,
          }}
          onChange={(e) => {
            price[vIndex] = e.target.value;
            setPrice([...price]);
          }}
        >
          {bundle.advanceSetting.customerOption.status == true ? (
            <option selected disabled>
              {button.ChooseOption == ""
                ? "Choose an option"
                : button.ChooseOption}
            </option>
          ) : (
            ""
          )}
          {v.map((x, i) => {
            return <option value={x.price}>{x.title}</option>;
          })}
        </select>
      </div>
    </>
  );
};
