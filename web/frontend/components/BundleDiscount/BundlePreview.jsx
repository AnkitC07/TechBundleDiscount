import { Card, Banner } from "@shopify/polaris";
import React, { useState } from "react";
import { useEffect } from "react";

export default function BundlePreview({ bundle, currency, design}) {
  // console.log(bundle,"checking values")
  // useEffect(()=>{
  //   // console.log('update values..............')
  // },[bundle])

  console.log(design,"Design checking data")
  return (
    <div className="BundlepreviewStyle">
      <div className="previewScroll">
        <div className="customCard">
          <Card title={bundle.offerHeader} sectioned>
            {JSON.stringify(bundle.bundleProducts).includes("title") == true ? (
              <BundlePreviewPro bundle={bundle} currency={currency} />
            ) : (
              <EmptyState />
            )}
          </Card>
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
    <div style={{ background: "lightgray", width: "100%", height: "100%" }}>
      <div className="emptyPreview">Offer Preview</div>
    </div>
  );
};

const BundlePreviewPro = ({ bundle, currency }) => {
  const [total, setTotal] = useState(0);
  const [disTotal, setDisTotal] = useState(0);
  const [price, setPrice] = useState([]);
  const [variantPrice, setVariantPrice] = useState(0);

  const getTotal = () => {
    let count = 0;
    let disCount = 0;
    bundle.bundleProducts.forEach((item, i) => {
      console.log(price, i);
      item != "" ? (count = count + Number(price[i])) : null;

      item != ""
        ? (disCount =
            disCount +
            Number(
              applyDiscount(
                price[i],
                bundle.bundleDiscount.addDiscount.discountValue
              )
            ))
        : null;
    });
    setTotal((Math.round(count * 100) / 100).toFixed(2));
    setDisTotal((Math.round(disCount * 100) / 100).toFixed(2));
  };

  useEffect(() => {
    bundle.bundleProducts.forEach((item, i) => {
      item != "" ? (price[i] = item.variants[0].price) : null;
    });
    setPrice([...price]);
    getTotal();
  }, [bundle]);

  useEffect(() => {
    console.log(price);
    getTotal();
  }, [price]);

  function applyDiscount(price, discountPercentage) {
    console.log(price, discountPercentage);
    const discount = price * (discountPercentage / 100);
    return (Math.round((price - discount) * 100) / 100).toFixed(2);
  }

  // console.log(bundle, "checking objs");
  return (
    <>
      <div style={{ border: "1px solid gray", padding: "8px" }}>
        <div style={{ marginBottom: "25px" }}>
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
                    <div>
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
                      <div>
                        {currency}
                        {bundle.bundleDiscount.addDiscount.discountValue > 0
                          ? applyDiscount(
                              price[i],
                              bundle.bundleDiscount.addDiscount.discountValue
                            )
                          : price[i]}
                      </div>
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
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {bundle.bundleProducts.length - 1 == i ? (
                    ""
                  ) : (
                    <div style={{ margin: "15px 0" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background: "lightgray",
                          position: "relative",
                        }}
                      >
                        <svg
                          style={{
                            width: "20px",
                            fill: "#5c5f62",
                            position: "absolute",
                            top: "-9",
                            left: "47%",
                          }}
                          viewBox="0 0 20 20"
                          focusable="false"
                          aria-hidden="true"
                        >
                          <path d="M0 10c0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10-10 4.486-10 10zm5 0a1 1 0 0 1 1-1h3v-3a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 0 1-1-1z"></path>
                        </svg>
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
            borderTop: "1px solid gray",
            padding: "10px 10px 0px 10px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Total</span>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                color: "#008060",
                letterSpacing: "1px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              SAVE {bundle.bundleDiscount.addDiscount.discountValue}%
            </p>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
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
                {total}
              </span>
              <span>
                {currency}
                {disTotal}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "px" }}>
        <button
          class="grab_deal_btn "
          type="button"
          style={{
            width: "100%",
            color: "white",
            background: "#348766",
            border: "none",
            boxShadow: "none",
            marginTop: "10px",
            padding: "10px 0px",
            fontSize: "16px",
          }}
        >
          GRAB THIS DEAL
        </button>
      </div>
    </>
  );
};

const Variants = ({ v, bundle, vIndex, price, setPrice }) => {
  return (
    <>
      <div style={{ margin: "10px 0px", width: "100%" }}>
        <select
          style={{ width: "100%", padding: "5px" }}
          onChange={(e) => {
            price[vIndex] = e.target.value;
            setPrice([...price]);
          }}
        >
          {bundle.advanceSetting.customerOption.status == true ? (
            <option selected disabled>
              Choose an option
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
