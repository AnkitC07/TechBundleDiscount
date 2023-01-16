import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Pagecss from "../../css/Main_nav.module.css";
import Content from "../BundleDiscount/Content";
import Design from "../BundleDiscount/Design";
import Placement from "../BundleDiscount/Placement";
import ProductBadge from "../BundleDiscount/ProductBadge";

const NavbarMain = ({ nav }) => {
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
    button:{
      bg:'#348766',
      color:'#ffffff',
      borderRadius:50,
      buttonAction:'add to cart',
      text:'Grab this deal',
      Moreoptions:'More options',
      Unavailablebtn:'UNAVAILABLE',
      UnavailableNotice:'Unavailable, please try another option',
      ChooseOption:'Choose an option'
    }
  });
  const navRender = (title) => {
    switch (title) {
      case "Content":
        return <Content />;
      case "Placement":
        return <Placement />;
      case "Design":
        return <Design states={{ designSettings, designSatte }} />;
      case "Badge":
        return <ProductBadge />;
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
