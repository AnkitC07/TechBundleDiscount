import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Pagecss from "../../css/Main_nav.module.css";
import Content from "../BundleDiscount/Content";
import Design from "../BundleDiscount/Design";
import Placement from "../BundleDiscount/Placement";
import ProductBadge from "../BundleDiscount/ProductBadge";

const NavbarMain = ({
  nav,
  products,
  productsState,
  currency,
  customer,
  setCustomer,
  states,
  setHtml,
  setBadgeHtlml,
  id
}) => {

  const { placement, setPlacement, bundle, setBundle, selectedTab, setTabState, designSettings, designSatte, settings, settingState } = states
  const navRender = (title) => {
    switch (title) {
      case "Content":
        return (
          <Content
            bundle={bundle}
            setBundle={setBundle}
            products={products}
            productsState={productsState}
            currency={currency}
            design={designSettings}
            customer={customer}
            setCustomer={setCustomer}
            setHtml={setHtml}
          />
        );
      case "Placement":
        return (
          <Placement
            states={{
              designSettings,
              placement,
              setPlacement,
              bundle,
              setBundle,
              id
            }}
          />
        );
      case "Design":
        return (
          <Design states={{ designSettings, designSatte, bundle, setBundle }} />
        );
      case "Badge":
        return <ProductBadge states={{ settings, settingState, bundle, setBadgeHtlml }} />;
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
      <div className="topSpace">{navRender(selectedTab)}</div>
      {/* <Content /> */}
    </>
  );
};

export default NavbarMain;
