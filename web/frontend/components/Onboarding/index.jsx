import { Button, Select, Modal, Card, Tabs } from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import './onboarding.css'
import { useNavigate } from "react-router-dom";

import thank from '../../public/Thankyou-Bundle Discount Manager.svg'
import getShopName from "../Common/getShopName";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";

function Setup({ content }) {
  const [imgLoading, loadingstate] = useState(true);
  useEffect(() => {
    loadingstate(true);
  }, [content]);

  return (
    <>
      <div className="mainContentTabs">
        <div className="heading">
          <p>{content.heading}</p>
        </div>
        <div className="subheading">
          <p>{content.subheading}</p>
        </div>
        <div className="faq">
          <a href={content.faq.faqUrl} target="_blank">
            {content.faq.faqText}
          </a>
        </div>
        <div className="image">
          {imgLoading == true ? <p className="loading"></p> : ""}
          <img
            src={content.src}
            onLoad={() => loadingstate(false)}
            className={imgLoading == true ? "isloading" : ""}
          />
        </div>
        {content.footerSrc.map((img) => {
          return (
            <div className="image">
              <img src={img} />
            </div>
          );
        })}
      </div>
    </>
  );
}

function Installation() {
  const [selected, setSelected] = useState();
  const [imgLoading, loadingstate] = useState(true);
  const [optionsValues, optionsState] = useState([])
  const fetch = useAuthenticatedFetch();
  const [shop,shopState] = useState('')
  useEffect(() => {
    optionsData()
  }, [])

  const handleSelectChange = useCallback((value) => {
    setSelected(value)
  }, []);

  const optionsData = async () => {
    const fetchData = await fetch(`/api/getTheme`)
    const getData = await fetchData.json()
    shopState(getData.shop)
    let newoptions = getData.data.map(x => { return { label: x.name, value: `${x.id}` } })
    let selectedOptions = getData.data.filter(x => x.role == 'main')
    setSelected(`${selectedOptions[0].id}`)
    optionsState(newoptions)
  }

  const dropdown = () => {
    return (
      <div className="customSelectStyle">
        <Select
          id="customSelectStyle"
          label={<b>Select a theme to add the Bundle Discount  App Embeds</b>}
          options={optionsValues}
          onChange={handleSelectChange}
          value={selected}
        />
      </div>
    );
  };
  return (
    <>
      <div>
        <p>
          <b>
            Please enable the Bundle Discount Manager embed in your store theme setting
          </b>
        </p>
        <p className="subtext" style={{ marginTop: "10px" }}>Step 1: Go to theme customization</p>
        <p className="subtext">Step 2: Go to theme setting</p>
        <p className="subtext">Step 3: Click App embeds</p>
        <p className="subtext">Step 4; Enable Bundle Discount Manager App Embeds</p>
      </div>
      <div className="image">
        {imgLoading == true ? <p className="loading"></p> : ""}
        <img
          src={"4_App-on-boarding-Art-Work 3.svg"}
          onLoad={() => loadingstate(false)}
          style={{ width: "100%" }}
          className={imgLoading == true ? "isloading" : ""}
        />
      </div>
      <div className="dropdwon">
        {dropdown()}
        <div className="button">
          <Button primary onClick={() => {
            let shopDomain = shop.replace(".myshopify.com","")
            window.open(`https://admin.shopify.com/store/${shopDomain}/themes/${selected}/editor?context=apps`)
          }}>Preview in theme</Button>
        </div>
      </div>
    </>
  );
}

function TabsExample({ content, state, all, displayState }) {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
    displayState(selectedTabIndex);
  }, []);

  const tabs = [
    {
      id: "setup",
      content: "1. Set Up Guide",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
      component: <Setup content={content} />,
    },
    {
      id: "install",
      content: "2. Installation",
      panelID: "accepts-marketing-content-1",
      component: <Installation />,
    },
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <Card.Section>
          <div className="mainTabsBody">
            {tabs[selected].component}
            {selected == 0 ? (
              <div className="dots">
                {all.map((x, i) => {
                  return (
                    <div
                      onClick={() => {
                        state.setIndex(i);
                      }}
                      className={`subdots ${state.index == i ? "active" : ""}`}
                    ></div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </Card.Section>
      </Tabs>
    </Card>
  );
}

function PolarisModal({ active, onclick }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();

  const content = [
    {
      heading: `How does the 
Bundle Discount Manager work?`,
      subheading:
        "You can use this Bundle discount app for giving your customer discounts and offers",
      faq: {
        faqText: "Learn more in our FAQ",
        faqUrl: "https://cancode.tawk.help/",
      },
      src: 'Group 30.svg',
      footerSrc: [
        thank,
      ],
    },
    {
      heading: `Create a chekbox`,
      subheading: "Click the “Create Bundle Discount” on the dashboard",
      faq: {
        faqText: "Learn more in our FAQ",
        faqUrl: "https://cancode.tawk.help/",
      },
      src: "Screenshot-2023-02-01-at-1.23 1.svg",
      footerSrc: [],
    },
    {
      heading: `Customize your own style`,
      subheading:
        "You can customize your store countdown timer suit your needs with our app",
      faq: {
        faqText: "Learn more in our FAQ",
        faqUrl: "https://cancode.tawk.help/",
      },
      src: "customize.svg",
      footerSrc: [],
    },
    {
      heading: `27/7 Support`,
      subheading: "If you need any help, please contact our email",
      faq: {
        faqText: "Learn more in our FAQ",
        faqUrl: "https://cancode.tawk.help/",
      },
      src: "Screen-3 3.svg",
      footerSrc: [],
    },
  ];

  const isDisplay = (e) => {
    if (e == 0) {
      setDisplay(true);
      return false;
    }
    setDisplay(false);
  };

  const handleChange = async () => {
    if (display == false) {
      const fetchData = await fetch(
        `/api/updateonboarding`
      );
      const getData = await fetchData.json();
      if (getData.status == 200) {
        onclick()
      }
    }
    if (content.length - 1 > index) {
      setIndex(index + 1);
    }
  };

  useEffect(()=>{
    document.querySelector(".Polaris-Modal-CloseButton").style.display = "none"
    return()=>{
      document.querySelector(".Polaris-Modal-CloseButton").style.removeProperty('display')
    } 
  },[])
  return (
    <Modal
      open={active}
      primaryAction={{
        content: display == true ? "Next" : "Done",
        onAction: handleChange,
      }}
    >
      <TabsExample
        content={content[index]}
        all={content}
        displayState={isDisplay}
        state={{ index, setIndex }}
      />
    </Modal>
  );
}
export default function OnboardingScreens(props) {
  const [active, setActive] = useState(true)

  const handle = () => {
    setActive(false)
  }

  return (
    <>
      <div id="onboardingModal">
        <PolarisModal active={active} onclick={handle} />
      </div>
    </>
  );
}
