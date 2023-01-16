import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Pagecss from "../../css/Main_nav.module.css";
import Content from "../BundleDiscount/Content";
import Design from "../BundleDiscount/Design";
import Placement from "../BundleDiscount/Placement";
import ProductBadge from "../BundleDiscount/ProductBadge";

const NavbarMain = ({ nav }) => {
  const dates = new Date();
  dates.setDate(dates.getDate() + 1);
  const [bundle, setBundle] = useState({
    offerHeader: '',
    bundleProducts: {},
    bundleDiscount: {
      addDiscount: {
        status: false,
        discountValue: '',
        discountType: '',
      },
      freeShiping: {
        status: false,
      },
      freeGift: {
        status: false,
        freeGiftSlected: []
      },
      noDiscount: {
        status: false
      }
    },
    advanceSetting: {
      customerOption: {
        status: false
      },
      hideStorefront: {
        status: false,
      },
      specific: {
        status: false,
        specificSlected: []
      },
      startDate: {
        status: false,
        date: {
          start: new Date(),
          end: new Date(),
        }
      },
      endDate: {
        status: false,
        date: {
          start: new Date(dates),
          end: new Date(dates),
        }
      },
      roundDiscount: {
        status: false,
        roundDiscountSelected: '.00'
      },
      targetCustomer: {
        status: false,
        targetCustomerSelected: []

      }
    }
  })
  const [selectedTab, setTabState] = useState("Content");
  const [designSettings, designSatte] = useState({
    FontSize: '#008060'
  })
  const navRender = (title) => {
    switch (title) {
      case "Content":
        return <Content bundle={bundle} setBundle={setBundle} />;
      case "Placement":
        return <Placement />;
      case "Design":
        return <Design states={{ designSettings, designSatte }} />;
      case 'Badge':
        return <ProductBadge />
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
                className={`countdown_tab ${x.title === selectedTab ? "NavTabActive" : ""
                  }`}
              >
                {x.title}
              </li>
            );
          })}
        </ul>
        <Outlet />
      </div>
      <div className="topSpace">
        {navRender(selectedTab)}
      </div>
      {/* <Content /> */}
    </>
  );
};

export default NavbarMain;
