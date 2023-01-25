import { Button } from "@shopify/polaris";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch.js";
import NavbarMain from "../layouts/NavbarMain.jsx";
import ToastComp from "../layouts/ToastComp.jsx";

const BundleDiscount = () => {
  const fetch = useAuthenticatedFetch();
  const [products, productsState] = useState([]);
  const [lastId, lastIdState] = useState(0);
  const [currency, setCurrency] = useState("");
  const [customer, setCustomer] = useState([]);
  const [active, setActive] = useState(true);
  const [msg, setMsg] = useState('');
  const [btnLoading, setBtnLoading] = useState({
    type: "",
    status: false
  })
  const id = null
  const [btnMain, setBtnMain] = useState(id == null ? true : false)
  //************ Main States ************//
  const dates = new Date();
  dates.setDate(dates.getDate() + 1);
  const [placement, setPlacement] = useState({
    selectProduct: {
      allProducts: true,
      specificProducts: false,
      allCollections: false,
      specificCollections: false,
      allProductsWithTags: false,
      customPosition: false,
    },
    specificProducts: [],
    specificCollection: [],
    tags: "",
  });
  const [Html, setHtml] = useState('')
  const [ispublished, setIspublished] = useState(false)
  const [bundle, setBundle] = useState({
    offerHeader: "Buy more and save",
    bundleProducts: [],
    bundleDiscount: {
      addDiscount: {
        status: true,
        discountValue: 10,
        discountType: "% OFF",
      },
      freeShiping: {
        status: false,
      },
      freeGift: {
        status: false,
        freeGiftSlected: [],
      },
      noDiscount: {
        status: false,
      },
    },
    advanceSetting: {
      customerOption: {
        status: false,
      },
      hideStorefront: {
        status: false,
      },
      specific: {
        status: false,
        specificSlected: [],
      },
      startDate: {
        status: false,
        date: {
          start: new Date(),
          end: new Date(),
        },
      },
      endDate: {
        status: false,
        date: {
          start: new Date(dates),
          end: new Date(dates),
        },
      },
      roundDiscount: {
        status: false,
        roundDiscountSelected: ".00",
      },
      targetCustomer: {
        status: false,
        targetCustomerSelected: [],
      },
    },
  });
  const [selectedTab, setTabState] = useState("Content");
  const [designSettings, designSatte] = useState({
    settings: {
      FontColor: "#0a0a0a",
      FontSize: 15,
      FontFamily: "sans-serif",
      FontStyle: {
        b: false,
        i: false,
        u: false,
      },
      Alignment: "left",
      VariantBgColor: "#ffffff",
    },
    button: {
      bg: "#008060",
      color: "#fffcfc",
      borderRadius: 6,
      buttonAction: "add to cart",
      text: "GRAB THIS DEAL",
      Moreoptions: "More options ",
      Unavailablebtn: "UNAVAILABLE",
      UnavailableNotice: "Unavailable, please try another option",
      ChooseOption: "Choose an option",
    },
    priceSavings: {
      freeGift: 'Free',
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
  });
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
  /************************************/






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
      .catch((err) => { });
  }, [lastId]);

  useEffect(() => {
    fetch("/api/getCurrency")
      .then((res) => res.json())
      .then((data) => setCurrency(data.cur))
      .catch((err) => console.log(err));

    fetch("/api/getCustomers")
      .then((res) => res.json())
      .then((data) => setCustomer(data))
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
  const handelPublish = async (statusUpdate) => {
    setBtnLoading({
      type: statusUpdate,
      status: true
    })
    const body = {
      content: bundle,
      design: designSettings,
      placement: placement,
      Html: Html,
      badge: settings,
      ispublished: statusUpdate == "save" ? ispublished : statusUpdate,
    }
    fetch('/api/setBundle', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setBtnLoading({
          type: statusUpdate,
          status: false
        })
        if (data.status == 'published') {
          setMsg('Published')
          setBtnMain(false)
        }
        setActive(true);
      })
      .catch(err => console.log(err))

  };

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
                    <p>Discount ID: Save or Publish to show discount ID</p>
                    {/* <p>
											Timer ID: <span>  {id ? `${id}` : 'Save or Publish to show timer ID'}</span>
										</p> */}

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
                        {/* <div class="Polaris-ButtonGroup__Item">
														<span class="Polaris-ActionMenu-SecondaryAction Polaris-ActionMenu-SecondaryAction--destructive">
															<button class="Polaris-Button Polaris-Button--outline" aria-disabled="false" type="button"
																onClick={()=>modalActivator("Delete")}
															>
																<span class="Polaris-Button__Content">
																	<span class="Polaris-Button__Text">Delete</span>
																</span>
															</button>
														</span>
													</div> */}


                        <div class="Polaris-ButtonGroup__Item">
                          <span class="Polaris-ActionMenu-SecondaryAction">
                            <button class="Polaris-Button Polaris-Button--outline" aria-disabled="false" type="button"
                              onClick={() => modalActivator("Duplicate")}
                            >
                              <span class="Polaris-Button__Content">
                                <span class="Polaris-Button__Text">Duplicate</span>
                              </span>
                            </button>
                          </span>
                        </div>
                        {/* <div class="Polaris-ButtonGroup__Item">
														<span class="Polaris-ActionMenu-SecondaryAction">
															<button class="Polaris-Button Polaris-Button--outline" aria-disabled="false" type="button" 
															onClick={()=>modalActivator("Duplicate")}
															>
																<span class="Polaris-Button__Content">
																	<span class="Polaris-Button__Text">Duplicate</span>
																</span>
															</button>
														</span>
													</div> */}


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

                        {/* <div class="Polaris-ButtonGroup__Item">
                          <span class="Polaris-ActionMenu-SecondaryAction">
                            <Button
                              onClick={() => handelPublish("save")}
                              loading={btnLoading.type == "save" ? btnLoading.status : false}
                            >Save</Button>
                          </span>
                        </div> */}

                      </div>
                    </div>
                  </div>
                  {/* <div class="Polaris-Page-Header__PrimaryActionWrapper">
                    <Button
                      primary
                      onClick={() => {
                        handelPublish("unPublished");
                      }}
                    //  loading={btnLoading}
                    >
                      Publish
                    </Button>
                  </div> */}
                  <div class="Polaris-Page-Header__PrimaryActionWrapper">
                    {btnMain
                      ?
                      <Button primary onClick={() => {
                        handelPublish("published")
                      }} loading={btnLoading.type == "published" ? btnLoading.status : false}>Publish</Button>
                      :
                      <Button destructive onClick={() => {
                        handelPublish("unPublished")
                      }} loading={btnLoading.type == "unPublished" ? btnLoading.status : false}>Unpublish</Button>}

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row ">
          <NavbarMain
            states={{ placement, setPlacement, bundle, setBundle, selectedTab, setTabState, designSettings, designSatte, settings, settingState }}
            nav={navdata}
            products={products}
            productsState={productsState}
            currency={currency}
            customer={customer}
            setCustomer={setCustomer}
            setHtml={setHtml}
          />
        </div>
      </div>
      <ToastComp active={active} setActive={setActive} msg={msg} />
    </section>
  );
};

export default BundleDiscount;
