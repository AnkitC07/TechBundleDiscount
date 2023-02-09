import { Card, Banner } from "@shopify/polaris";
import React, { useState } from "react";
import { useEffect } from "react";
import parser from "html-react-parser";
export default function BundlePreview({ bundle, currency, design, setHtml }) {
  const { settings, button, priceSavings } = design;

  return (
    <div className="BundlepreviewStyle">
      <div id="getHTMLData" className="previewScroll">
        <div className="customCard">
          {JSON.stringify(bundle.bundleProducts).includes("title") == true ? (
            <div
              style={{
                background: "white",
                padding: "0px 10px 10px 10px",
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
            You can design the bundle style in the "Design" tab after you're
            done creating your offer.
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
  const [compareTotal, setCompareTotal] = useState(0);
  const [compareDisTotal, setCompareDisTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [disTotal, setDisTotal] = useState(0);
  const [price, setPrice] = useState({});
  const [vIndex, setVIndex] = useState(0);

  const getTotal = () => {
    // console.log(price, "GEtTotal");
    let count = 0;
    let disCount = 0;

    const obj = Object.keys(price);
    for (let i = 0; i < obj.length; i++) {
      if (
        bundle.bundleDiscount.addDiscount.status == true &&
        bundle.bundleDiscount.addDiscount.discountType == `${currency}OFF`
      ) {
        count = count + Number(price[obj[i]].price);
      } else {
        count = count + Number(price[obj[i]].comparePrice);
      }
      disCount = disCount + Number(price[obj[i]].price);
    }

    setTotal((Math.round(count * 100) / 100).toFixed(2));
    if (
      bundle.bundleDiscount.addDiscount.status == true &&
      bundle.bundleDiscount.addDiscount.discountType == `${currency}OFF`
    ) {
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
    let obj = {};

    for (let i = 0; i < bundle.bundleProducts.length; i++) {
      const item = bundle.bundleProducts[i];
      if (item !== "") {
        const priceVal = item.variants[0].price;
        const compareVal = item.variants[0].compare_at_price;
        if (bundle.advanceSetting.customerOption.status == true) {
          if (item.variants.length <= 1 || price[item.id]?.selected == true) {
            obj = {
              ...obj,
              [item.id]: { price: priceVal, comparePrice: compareVal },
            };
          }
        } else if (
          bundle.bundleDiscount.freeGift.status &&
          bundle.bundleDiscount.freeGift.freeGiftSlected.includes(item.id)
        ) {
          obj = { ...obj, [item.id]: { price: 0, comparePrice: priceVal } };
        } else if (bundle.bundleDiscount.addDiscount.status) {
          obj = {
            ...obj,
            [item.id]: {
              price: applyDiscount(
                priceVal,
                bundle.bundleDiscount.addDiscount.discountValue
              ),
              comparePrice: priceVal,
            },
          };
        } else {
          obj = {
            ...obj,
            [item.id]: { price: priceVal, comparePrice: compareVal },
          };
        }
      }
    }

    const keys = Object.keys(obj);
    if (bundle.advanceSetting.roundDiscount.status) {
      for (let i = 0; i < keys.length; i++) {
        let roundOffPrice = obj[keys[i]].price;
        if (
          !bundle.bundleDiscount.freeGift.freeGiftSlected.includes(
            Number(keys[i])
          )
        ) {
          roundOffPrice = roundOffPrice.split(".");
          roundOffPrice[1] =
            bundle.advanceSetting.roundDiscount.roundDiscountSelected.split(
              "."
            )[1];
          roundOffPrice = roundOffPrice.join(".");
          obj[keys[i]].price = roundOffPrice;
        }
      }
    }

    setPrice(obj);
  }, [bundle]);

  useEffect(() => {
    getTotal();
  }, [price]);

  function applyDiscount(price, discountPercentage) {
    let discount = price * (discountPercentage / 100);
    discount = (Math.round((price - discount) * 100) / 100).toFixed(2);
    if (bundle.bundleDiscount.addDiscount.discountType !== "% OFF") {
      let fixedDiscount = bundle.bundleDiscount.addDiscount.discountValue;
      return price;
    } else {
      return discount;
    }
  }

  return (
    <>
      <div
        style={{
          overflow: "hidden",
          border: `1px solid black`,
        }}
      >
        <div
          style={{
            marginBottom: "25px",
            padding: "8px",
          }}
        >
          {bundle.bundleProducts.map((x, i) => {
            // console.log(price[x.id], "checking price obj");
            return x != "" ? (
              <>
                <div className={`bundleAppProductRow`} data-variant={x.variants[0].id} data-id={x.id} style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{maxWidth:"225px",display: "flex", alignItems: "center" }}>
                      <div>
                        <div
                          style={{
                            border: "1px solid lightgray",
                            display:"flex"
                          }}
                        >
                          <img height={48} src={x.image ? x.image.src : "no_image.png"}/>
                        </div>
                      </div>
                      <div style={{ margin: "0px 7px" }}>{x.title}</div>
                    </div>
                    <Price
                      design={design}
                      data={x}
                      bundle={bundle}
                      currency={currency}
                      priceStates={price[x.id]}
                    />
                  </div>
                  {x.variants.length > 1 ? (
                    <div className="productSelects">
                      <Variants
                        v={x.variants}
                        bundle={bundle}
                        price={price}
                        vIndex={vIndex}
                        xIndex={i}
                        setPrice={setPrice}
                        design={design}
                        applyDiscount={applyDiscount}
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
          <span style={{ fontWeight: "bold" }}>
            {design.priceSavings.Total}
          </span>
          <div>
            <p
              style={{
                color: design.priceSavings.tagColor,
                letterSpacing: "1px",
                fontWeight: "bold",
                textAlign: "right",
                marginBottom:'0px 0px 6px 0px'
              }}
            >
              {bundle.bundleDiscount.freeGift.status
                ? design.priceSavings.FreeGiftTag !== ""
                  ? design.priceSavings.FreeGiftTag
                  : "FREE GIFT INCLUDED"
                : bundle.bundleDiscount.freeShiping.status
                ? design.priceSavings.FreeShippingTag !== ""
                  ? design.priceSavings.FreeShippingTag
                  : "FREE SHIPPING INCLUDED"
                : bundle.bundleDiscount.noDiscount.status
                ? ""
                : bundle.bundleDiscount.addDiscount.discountType ==
                  `${currency}OFF`
                ? replaceDiscount(
                    `${currency}${bundle.bundleDiscount.addDiscount.discountValue}`,
                    design.priceSavings.SaveTag
                  )
                : replaceDiscount(
                    `${bundle.bundleDiscount.addDiscount.discountValue}%`,
                    design.priceSavings.SaveTag
                  )}
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
                <span
                 className="bundleAppDiscountedPrice"
                  style={{
                    whiteSpace: "nowrap",
                    textDecoration: "line-through",
                    textAlign: "right",
                    lineHeight: "21px",
                    color: "rgb(144, 149, 155)",
                  }}
                >
                  {bundle.bundleDiscount.noDiscount.status
                    ? ""
                    : total > 0
                    ? `${currency} ${total}`
                    : ""}
                </span>
                <span className="bundleAppTotal">
                  {currency}
                  {disTotal}
                </span>
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

const replaceDiscount = (dis, val) => {
  let value = val;
  let discount = dis;
  value = parser(`${value.replace("{discount}", discount)}`);
  return value;
};

const Price = ({ design, data, bundle, currency, priceStates }) => {
  const pr = priceStates;
  return (
    <>
      <div className="bundleAppprice" style={{textAlign:'right'}}>
        <div className="bundle-app-delete-price">
        {pr?.comparePrice !== null && pr?.comparePrice !== undefined ? (
          bundle.bundleDiscount.addDiscount.status &&
          bundle.bundleDiscount.addDiscount.discountType === "% OFF" ? (
            <div className="bundle-app-dlt-price">
              <span style={{color:design.priceSavings.ComparePriceColor}}>
                <del>
                  {currency} {pr?.comparePrice}
                </del>
              </span>
            </div>
          ) : bundle.bundleDiscount.addDiscount.status &&
            bundle.bundleDiscount.addDiscount.discountType ==
              `${currency}OFF` ? (
            ""
          ) : (
            <div className="bundle-app-dlt-price">
              <span style={{color:design.priceSavings.ComparePriceColor}}>
                <del>
                  {currency} {pr?.comparePrice}
                </del>
              </span>
            </div>
          )
        ) : (
          ""
        )}
        </div>
        <div className="bundle-app-main-price" style={{ textAlign: "right",color:design.priceSavings.priceColor }}>
          {bundle.bundleDiscount.freeGift.status &&
          bundle.bundleDiscount.freeGift.freeGiftSlected.includes(data.id) ? (
            <span
              style={{ color: design.priceSavings.tagColor, fontWeight: "700", textAlign: "right" }}
            >
              {design.priceSavings.freeGift !== ""
                ? design.priceSavings.freeGift
                : "FREE"}
            </span>
          ) : pr?.price == undefined ? (
            ""
          ) : (
            `${currency} ${pr?.price}`
          )}
        </div>
      </div>
    </>
  );
};

const Variants = ({
  v,
  bundle,
  vIndex,
  price,
  setPrice,
  design,
  applyDiscount,
  xIndex,
}) => {
  const { settings, button, priceSavings } = design;

  return (
    <>
      <div style={{ margin: "10px 0px", width: "100%" }}>
        <select
          id="select1"
          data-index={xIndex}
          data-proId={v[0].product_id}
          className="bundleAppDiscountSelect"
          style={{
            width: "100%",
            padding: "5px",
            borderColor: settings.FontColor,
            color: settings.FontColor,
            background: settings.VariantBgColor,
          }}
          onChange={(e) => {
            let prices = e.target.value;
            let compr = e.target.options[e.target.selectedIndex];
            let comp = compr.getAttribute("data-comparePrice");
            let variantId = compr.getAttribute("data-id");
            const priceObj = price;

            // e.target.value = prices
            priceObj[v[0].product_id] = {
              price: bundle.bundleDiscount.addDiscount.status
                ? applyDiscount(
                    prices,
                    bundle.bundleDiscount.addDiscount.discountValue
                  )
                : prices,
              comparePrice: bundle.bundleDiscount.addDiscount.status
                ? prices
                : comp,
              selected: true,
            };

            const getselectedVariant = bundle.bundleProducts[
              xIndex
            ].variants.findIndex((x) => x.id == variantId);
            const firstVariant = bundle.bundleProducts[xIndex].variants[0];
            bundle.bundleProducts[xIndex].variants[0] =
              bundle.bundleProducts[xIndex].variants[getselectedVariant];
            bundle.bundleProducts[xIndex].variants[getselectedVariant] =
              firstVariant;
            setPrice({ ...price });
            if (bundle.advanceSetting.customerOption.status == true) {
              e.target.options[1].selected = true;
            } else {
              e.target.options[0].selected = true;
            }
          }}
        >
          {bundle.advanceSetting.customerOption.status == true ? (
            <option selected="true" disabled>
              {button.ChooseOption == ""
                ? "Choose an option"
                : button.ChooseOption}
            </option>
          ) : (
            ""
          )}
          {v.map((x, i) => {
            return (
              <>
                <option
                  // selected="selected"
                  value={x.price}
                  data-id={x.id}
                  data-comparePrice={x.compare_at_price}
                >
                  {x.title}
                </option>
              </>
            );
          })}
        </select>
      </div>
    </>
  );
};
