import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Pagecss from "../../css/Main_nav.module.css";
import Content from "../BundleDiscount/Content";
import Design from "../BundleDiscount/Design";
import Placement from "../BundleDiscount/Placement";
import ProductBadge from "../BundleDiscount/ProductBadge";

const NavbarMain = ({ nav, products }) => {
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
  const [bundle, setBundle] = useState({
    offerHeader: "",
    bundleProducts: ['',''],     
    bundleDiscount: {
      addDiscount: {
        status: true,
        discountValue: "",
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
  const navRender = (title) => {
    switch (title) {
      case "Content":
        return (
          <Content bundle={bundle} setBundle={setBundle} products={products} />
        );
      case "Placement":
        return (
          <Placement states={{ placement, setPlacement, bundle, setBundle }} />
        );
      case "Design":
        return (
          <Design states={{ designSettings, designSatte, bundle, setBundle }} />
        );
      case "Badge":
        return <ProductBadge states={{ settings, settingState,bundle }} />;
    }
  };

  return (
    <>
      <div className={`bundle_box${Pagecss.box} bundle_box`}>
        <ul className="countdown" id="navBar">
          {nav.map((x) => {
            return (
              <li
                key={x.title}
                id={x.title}
                onClick={() => {
                  setTabState(x.title);
                }}
                className={`countdown_tab ${
                  x.title === selectedTab ? "NavTabActive" : ""
                }`}
              >
                {x.title}
              </li>
            );
          })}
        </ul>
        <Outlet />
      </div>
      <div className="topSpace">{navRender(selectedTab)}</div>
      {/* <Content /> */}
    </>
  );
};

export default NavbarMain;
