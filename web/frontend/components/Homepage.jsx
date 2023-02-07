import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  Spinner,
  Button,
} from "@shopify/polaris";
import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";
import PublishedList from "./Fields/PublishedList";
import { AppFooter } from "./layouts/AppFooter";
import { CheckBoxRef } from "./layouts/CheckBoxRef";
import CheckHead from "./layouts/CheckHead";
// import { getShopName } from '../components/common_functions/functions.js'
// import trophyImgUrl from "../assets/home-trophy.png";

// import { ProductsCard } from "./ProductsCard";

export default function Homepage({ themes }) {
  const fetch = useAuthenticatedFetch();
  const [discountData, setDiscountData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handelPublish = async () => {
      const res = await fetch("/api/getAllDiscount");
      const data = await res.json();
      console.log("response", data);
      setDiscountData(data.status);
      setLoading(false);
    };
    handelPublish();
  }, []);

  return (
    <Page>
      <section className="countdown_main">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <CheckHead />
              <div className="Polaris-Page-Header Polaris-Page-Header--noBreadcrumbs Polaris-Page-Header--mediumTitle Polaris-PageActions">
                <div className="Polaris-Page-Header__Row">
                  <div className="Polaris-Page-Header__TitleWrapper">
                    <div>
                      <div className="Polaris-Header-Title__TitleAndSubtitleWrapper">
                        <h1 className="Polaris-Header-Title">
                          Your Bundle Discount
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="Polaris-Page-Header__RightAlign">
                    <div className="Polaris-Page-Header__PrimaryActionWrapper">
                      <NavLink className="count_btn" to="/bundleDiscount">
                        <button
                          className="Polaris-Button Polaris-Button--primary"
                          type="button"
                        >
                          <span className="Polaris-Button__Content">
                            <span className="Polaris-Button__Text">
                              Create Bundle Discount
                            </span>
                          </span>
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {" "}
                  <Spinner accessibilityLabel="Spinner example" size="large" />
                </div>
              ) : (
                <div className="Polaris-Card">
                  {discountData.length !== 0 ? (
                    <PublishedList item={discountData} />
                  ) : (
                    <>
                      <Card>
                        <div className="p-5">
                          <div className="text-center">
                            <img
                              alt=""
                              src="discount.png"
                              className="Polaris-EmptyState__Image"
                              role="presentation"
                              style={{ width: "176px" }}
                            />
                          </div>
                          <div className="p-2">
                            <p className="Polaris-DisplayText Polaris-DisplayText--sizeSmall text-center">
                              This is where you'll manage your discount
                            </p>
                          </div>
                          <div className="text-center ">
                            <p className="w-75 m-auto">
                              Start by creating your first bundle discount and
                              publishing it to your store.
                            </p>
                          </div>
                          <div className="mt-5 text-center">
                            <NavLink className="count_btn" to="/bundleDiscount">
                              <Button primary>Create Bundle Discount</Button>
                            </NavLink>
                          </div>
                        </div>
                        <div></div>
                      </Card>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-3" style={{ fontSize: "15px" }}>
          <p>Bundle Discount not displaying?</p>
          <p className="d-flex justify-content-center">
            Make sure they are{" "}
            <a
              href={`https://admin.shopify.com/store/${themes.session.shop.replace(
                ".myshopify.com",
                ""
              )}/themes/${themes.id}/editor`}
              className="Polaris-Link text-decoration-none"
              target="_blank"
              style={{ display: "flex", marginLeft: "5px" }}
            >
              enabled in your theme
              <span class="Polaris-Icon"><span class="Polaris-VisuallyHidden">(opens a new window)</span><svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M14 13v1a1 1 0 0 1-1 1H6c-.575 0-1-.484-1-1V7a1 1 0 0 1 1-1h1c1.037 0 1.04 1.5 0 1.5-.178.005-.353 0-.5 0v6h6V13c0-1 1.5-1 1.5 0zm-3.75-7.25A.75.75 0 0 1 11 5h4v4a.75.75 0 0 1-1.5 0V7.56l-3.22 3.22a.75.75 0 1 1-1.06-1.06l3.22-3.22H11a.75.75 0 0 1-.75-.75z"></path></svg></span>
            </a>
          </p>
        </div>

        <div className="container-fluid ref_app">
          <div className="row ">
            <div className="col-md-12">
              <div className="Polaris-Page-Header Polaris-Page-Header--noBreadcrumbs Polaris-Page-Header--mediumTitle">
                <div className="Polaris-Page-Header__Row">
                  <div className="Polaris-Page-Header__TitleWrapper">
                    <div>
                      <div className="Polaris-Header-Title__TitleAndSubtitleWrapper">
                        <h1 className="Polaris-Header-Title">
                          Apps you might like
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CheckBoxRef
              title="Shop Pre Order Manager "
              src="Main_revised_PreOrder-Lite-App-ScreenShot.png"
              description="Get more sales and revenue by taking preorders for coming soon items and items out of stock. Capture purchase intent, get more sales."
              rating="4.7"
              btnText="View on Shopify app store"
              link="https://apps.shopify.com/cancode-preorder"
            />
            <CheckBoxRef
              title="Posh Wrap: Gift Option Manager"
              src="App_Marketplace_MainBanner_Shopify.jpg"
              description="Upsell gift options to your customers from product pages and the shopping cart to increase your order value."
              rating="5.0"
              btnText="View on Shopify app store"
              link="https://apps.shopify.com/shop-gift-option"
            />
            <CheckBoxRef
              title="CanCode.io Terms & Conditions"
              src="Mainpage_2versionCheckbox-App-ScreenShot.png"
              description="Compliance made easy with I Agree: Terms & Conditions Checkbox."
              rating=""
              btnText="View on Shopify app store"
              link="https://apps.shopify.com/cancodeio_checklist"
            />
            {/* <CheckBoxRef
                            title="CanCode.io Discount & Bundle"
                            src="App_Marketplace_MainBanner_Shopify.jpg"
                            description="Get more sales by offering customers discounts and bundle deals."
                            rating=""
                            btnText="Coming Soon"
                            style={{ background: "lightgray", pointerEvents: "none" }}
                            link=""
                        /> */}
          </div>
        </div>
      </section>
      <AppFooter />
    </Page>
  );
}
