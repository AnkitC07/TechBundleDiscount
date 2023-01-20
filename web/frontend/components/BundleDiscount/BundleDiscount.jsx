import { Button } from "@shopify/polaris";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch.js";
import NavbarMain from "../layouts/NavbarMain.jsx";

const BundleDiscount = () => {
  const fetch = useAuthenticatedFetch();
  const [products, productsState] = useState([]);
  const [lastId, lastIdState] = useState(0);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    fetch(`/api/products?id=${lastId}`)
      .then((res) => res.json())
      .then((x) => {
        console.log(x, "products ids");
        const len = x.length - 1;
        const id = x[len].id;
        const pro = products.concat(x);
        productsState(pro);
        lastIdState(id);
      })
      .catch((err) => {});
  }, [lastId]);
  
  useEffect(() => {
    fetch("/api/getCurrency")
      .then((res) => res.json())
      .then((data) => setCurrency(data.cur))
      .catch((err) => console.log(err));
  }, []);
  //   console.log(products, "products ids checking");
  const navdata = [
    {
      title: "Content",
      path: "",
    },
    {
      title: "Design",
      path: "",
    },
    {
      title: "Placement",
      path: "",
    },
    {
      title: "Badge",
      path: "",
    },
  ];
  const handelPublish = async () => {};

  return (
    <section className="product_main_page">
      <div className="containerCustom mb-5">
        <div className="row sticky">
          <div className="col-md-12">
            <div className="Polaris-Page-Header Polaris-Page-Header--hasNavigation Polaris-Page-Header--hasActionMenu Polaris-Page-Header--mediumTitle">
              <div className="Polaris-Page-Header__Row">
                <div className="Polaris-Page-Header__BreadcrumbWrapper">
                  <nav role="navigation">
                    <NavLink className="count_btn" to="/">
                      <button
                        className="Polaris-Breadcrumbs__Breadcrumb"
                        type="button"
                      >
                        <span className="Polaris-Breadcrumbs__Icon">
                          <span className="Polaris-Icon">
                            <span className="Polaris-VisuallyHidden"></span>
                            <svg
                              viewBox="0 0 20 20"
                              className="Polaris-Icon__Svg"
                              focusable="false"
                              aria-hidden="true"
                            >
                              <path d="M17 9h-11.586l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414l-3.293-3.293h11.586a1 1 0 1 0 0-2z"></path>
                            </svg>
                          </span>
                        </span>
                      </button>
                    </NavLink>
                  </nav>
                </div>
                <div className="Polaris-Page-Header__TitleWrapper">
                  <div>
                    <div className="Polaris-Header-Title__TitleAndSubtitleWrapper">
                      <div className="Polaris-Header-Title__TitleWithMetadataWrapper">
                        <h1 className="Polaris-Header-Title">
                          {/* {content.productTimer} */}
                          Bundle Discount Name
                        </h1>
                        <div className="Polaris-Header-Title__TitleMetadata">
                          <span className="Polaris-Badge">Not published</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="Polaris-Header-Title__SubTitle">
                    <p>Timer ID: Save or Publish to show timer ID</p>
                  </div>
                </div>
                <div className="Polaris-Page-Header__RightAlign">
                  <div class="Polaris-ActionMenu">
                    <div class="Polaris-ActionMenu-Actions__ActionsLayout">
                      <div class="Polaris-ButtonGroup Polaris-ButtonGroup--extraTight">
                        {/* {id != null ? <> */}
                        <div class="Polaris-ButtonGroup__Item">
                          <span class="Polaris-ActionMenu-SecondaryAction Polaris-ActionMenu-SecondaryAction--destructive">
                            <button
                              class="Polaris-Button Polaris-Button--outline"
                              aria-disabled="false"
                              type="button"
                              onClick={() => {
                                // deleteBtn(id)
                              }}
                            >
                              <span class="Polaris-Button__Content">
                                <span class="Polaris-Button__Text">Delete</span>
                              </span>
                            </button>
                          </span>
                        </div>
                        <div class="Polaris-ButtonGroup__Item">
                          <span class="Polaris-ActionMenu-SecondaryAction">
                            <button
                              class="Polaris-Button Polaris-Button--outline"
                              aria-disabled="false"
                              type="button"
                            >
                              <span class="Polaris-Button__Content">
                                <span class="Polaris-Button__Text">
                                  Duplicate
                                </span>
                              </span>
                            </button>
                          </span>
                        </div>
                        {/* </> : ''} */}

                        <div class="Polaris-ButtonGroup__Item">
                          <span class="Polaris-ActionMenu-SecondaryAction">
                            <button
                              class="Polaris-Button Polaris-Button--outline"
                              type="button"
                              onClick={handelPublish}
                            >
                              <span class="Polaris-Button__Content">
                                <span class="Polaris-Button__Text">Save</span>
                              </span>
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="Polaris-Page-Header__PrimaryActionWrapper">
                    <Button
                      primary
                      onClick={() => {
                        handelPublish("unPublished");
                      }}
                      //  loading={btnLoading}
                    >
                      Publish
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row ">
          <NavbarMain
            nav={navdata}
            products={products}
            productsState={productsState}
            currency={currency}
          />
        </div>
      </div>
    </section>
  );
};

export default BundleDiscount;
