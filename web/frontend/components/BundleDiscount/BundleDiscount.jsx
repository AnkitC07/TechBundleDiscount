import { Badge, Box, Button, Spinner } from "@shopify/polaris";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch.js";
import getShopName from "../Common/getShopName.jsx";
import CustomModal from "../layouts/Modal.jsx";
import NavbarMain from "../layouts/NavbarMain.jsx";
import ToastComp from "../layouts/ToastComp.jsx";
import Preview from "./ProductBadge/Preview.jsx";
// import Preview from "../"
const BundleDiscount = () => {
  const [badgeHtml, setBadgeHtlml] = useState(
    '<div style="display: flex; justify-content: flex-end;"><div style="color: rgb(255, 255, 255); display: flex; align-items: center; justify-content: center; font-family: serif; background: rgb(0, 128, 96); font-size: 18px; padding: 5px 10px; border-radius: 55px; border: 1px solid rgb(0, 128, 96); width: 70%; height: 40px; text-align: center; overflow: hidden; font-style: normal; font-weight: bold;">Buy more and save test</div></div>'
  );
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();
  const [products, productsState] = useState([]);
  const [lastId, lastIdState] = useState(0);
  const [currency, setCurrency] = useState("");
  const [customer, setCustomer] = useState([]);
  const [loading,loadingState] = useState(false)

  const [modal, modalState] = useState({
    status: false,
    title: "",
    content: "",
    primary: [],
  });
  const [active, setActive] = useState(false);
  const [msg, setMsg] = useState("");
  const [btnLoading, setBtnLoading] = useState({
    type: "",
    status: false,
  });
  // Getting Id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");

  const [modalbtnloading, loadingModalbtn] = useState(false);
  const [btnMain, setBtnMain] = useState(id == null ? true : false);
  const [banner, setBanner] = useState(false);
  const [ID, setID] = useState(null);

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
    tags: [],
  });
  const [Html, setHtml] = useState("");
  const [ispublished, setIspublished] = useState(false);
  const [bundle, setBundle] = useState({
    discountName: "Bundle Discount",
    offerHeader: "Buy more and save",
    bundleProducts: ["", ""],
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
      freeGift: "FREE",
      FreeShippingTag: "FREE SHIPPING INCLUDED",
      FreeGiftTag: "FREE GIFT INCLUDED",
      SaveTag: "SAVE {discount}",
      Total: "Total",
      tagColor: "#008060",
      priceColor: "#050505",
      ComparePriceColor: "#797979",
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
      }
    },
  });
  /************************************/

  useEffect(() => {
    fetch(`/api/products?id=${lastId}`)
      .then((res) => res.json())
      .then((x) => {
        // console.log(x, "products ids");
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

    fetch("/api/getCustomers")
      .then((res) => res.json())
      .then((data) => setCustomer(data))
      .catch((err) => console.log(err));

    const getDataById = async () => {
      const res = await fetch("/api/getDataById", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await res.json();
      const products = { ...data.data.Content };
      console.log("Data: ", data);
      setTimeout(() => {
        designSatte(data.data.Design);
        setPlacement(data.data.Placement);
        settingState(data.data.Badge);
        setHtml(data.data.Html);
        setIspublished(data.data.IsPublished);
        setBtnMain(data.data.IsPublished == "published" ? false : true);
        setBundle(products);
        loadingState(false)
      }, 1000);
    };

    if (id !== null) {
      loadingState(true)
      getDataById();
    }
    return () => {
      setID(null);
    };
  }, []);

  if (ID !== undefined && id == null) {
    id = ID;
  }
  // console.log(ID)
  const BanneronDismiss = () => {
    setBanner(false);
  };

  const modalActivator = async (type) => {
    if (type == "Delete") {
      modalState({
        state: true,
        title: "Delete timer",
        content: `Are you sure you want to delete this timer?`,
        primary: [
          {
            content: "Delete",
            onAction: () => {
              loadingModalbtn(true);
              deleteBtn(id);
            },
            destructive: true,
            loading: modalbtnloading,
          },
        ],
      });
      return false;
    } else if (type == "Duplicate") {
      modalState({
        state: true,
        title: "Duplicate timer",
        // content: `Are you sure you want to duplicate Bundle Discount?`,
        content: `Are you sure you want to duplicate ${bundle.discountName}?`,
        primary: [
          {
            content: "Duplicate",
            onAction: () => {
              loadingModalbtn(true);
              handelPublish("Duplicate");
            },
          },
        ],
      });
      return false;
    }
    // console.log(modal);
  };
  const deleteBtn = async (idrec) => {
    loadingModalbtn(true);
    const deletebyid = await fetch(`/api/deleterecord?id=${idrec}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const getResult = await deletebyid.json();
    if (getResult.code == 200) {
      setActive(true);
      setMsg("Deleted");
      loadingModalbtn(false);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };
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
    console.log("Html=> ", Html)
    setBtnLoading({
      type: statusUpdate,
      status: true,
    });
    setHtml(document.querySelector("#getHTMLData") !== null ? document.querySelector("#getHTMLData").innerHTML : '')
    const previewhtml = document.querySelector("#getHTMLData") !== null ? document.querySelector("#getHTMLData").innerHTML : ''
    // console.log('PUBLISH==>', document.querySelector("#getHTMLData").innerHTML)
    const body = {
      content: bundle,
      design: designSettings,
      placement: placement,
      Html: previewhtml,
      BadgeHtml: badgeHtml,
      badge: settings,
      ispublished: statusUpdate == "save" ? ispublished : statusUpdate,
    };

    fetch(`/api/setBundle?status=${statusUpdate}&id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response form Publish=> ", data);
        setBtnLoading({
          type: statusUpdate,
          status: false,
        });
        if (data) {
          if (data.status == "published") {
            setMsg("Published");
            setBtnMain(false);
            setIspublished("published");
            setBanner(true);
            // id = data.id
          } else if (data.status == "save") {
            setMsg("Save");
          } else if (data.status == "Duplicate") {
            setMsg("Duplicate");
            // loadingModalbtn(false)
            setTimeout(() => {
              navigate("/");
            }, 1500);
          } else {
            setMsg("Unpublished");
            setBtnMain(true);
            setIspublished("unpublished");
          }
          setActive(true);
        }
        setActive(true);
        setID(data.id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
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
                            {bundle.discountName}
                          </h1>
                          <div class="Polaris-Header-Title__TitleMetadata">
                            {ispublished == "published" ? (
                              <Badge status="success">Published</Badge>
                            ) : (
                              <Badge>Not published</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="Polaris-Header-Title__SubTitle">
                      <p>
                        Discount ID:{" "}
                        <span>
                          {" "}
                          {id ? `${id}` : "Save or Publish to show discount ID"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="Polaris-Page-Header__RightAlign">
                    <div class="Polaris-ActionMenu">
                      <div class="Polaris-ActionMenu-Actions__ActionsLayout">
                        <div class="Polaris-ButtonGroup Polaris-ButtonGroup--extraTight">
                          {id != null ? (
                            <>
                              <div class="Polaris-ButtonGroup__Item">
                                <span class="Polaris-ActionMenu-SecondaryAction Polaris-ActionMenu-SecondaryAction--destructive">
                                  <button
                                    class="Polaris-Button Polaris-Button--outline"
                                    aria-disabled="false"
                                    type="button"
                                    onClick={() => modalActivator("Delete")}
                                  >
                                    <span class="Polaris-Button__Content">
                                      <span class="Polaris-Button__Text">
                                        Delete
                                      </span>
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
                                    onClick={() => modalActivator("Duplicate")}
                                  >
                                    <span class="Polaris-Button__Content">
                                      <span class="Polaris-Button__Text">
                                        Duplicate
                                      </span>
                                    </span>
                                  </button>
                                </span>
                              </div>
                            </>
                          ) : (
                            ""
                          )}

                          <div class="Polaris-ButtonGroup__Item">
                            <span class="Polaris-ActionMenu-SecondaryAction">
                              <Button
                                onClick={() => handelPublish("save")}
                                loading={
                                  btnLoading.type == "save"
                                    ? btnLoading.status
                                    : false
                                }
                              >
                                Save
                              </Button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="Polaris-Page-Header__PrimaryActionWrapper">
                      {btnMain ? (
                        <Button
                          primary
                          onClick={() => {
                            handelPublish("published");
                          }}
                          loading={
                            btnLoading.type == "published"
                              ? btnLoading.status
                              : false
                          }
                        >
                          Publish
                        </Button>
                      ) : (
                        <Button
                          destructive
                          onClick={() => {
                            handelPublish("unPublished");
                          }}
                          loading={
                            btnLoading.type == "unPublished"
                              ? btnLoading.status
                              : false
                          }
                        >
                          Unpublish
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row ">
            <NavbarMain
              states={{
                placement,
                setPlacement,
                bundle,
                setBundle,
                selectedTab,
                setTabState,
                designSettings,
                designSatte,
                settings,
                settingState,
                loading
              }}
              nav={navdata}
              products={products}
              productsState={productsState}
              currency={currency}
              customer={customer}
              setCustomer={setCustomer}
              setHtml={setHtml}
              setBadgeHtlml={setBadgeHtlml}
              id={id}
            />
          </div>
        </div>
        <ToastComp active={active} setActive={setActive} msg={msg} />
        {modal.state == true ? (
          <CustomModal
            state={true}
            primaryAction={[
              {
                content: modal.primary[0].content,
                onAction: modal.primary[0].onAction,
                loading: modalbtnloading,
                destructive: modal.primary[0].destructive,
              },
            ]}
            secondaryActions={[
              {
                content: "Cancel",
                onAction: async () => {
                  modalState({ ...modal, state: false });
                },
              },
            ]}
            title={modal.title}
            content={modal.content}
          />
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default BundleDiscount;
