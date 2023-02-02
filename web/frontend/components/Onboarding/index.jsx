import { Button, Select, Modal, Card, Tabs } from "@shopify/polaris";
import { useState, useCallback ,useEffect} from "react";
import './onboarding.css'
import { useNavigate } from "react-router-dom";

import thank from './Thank you for installing CanCode.io App’s - Countdown Timer Banner.svg'
import logo from './Logo.svg'
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
  const [optionsValues,optionsState] = useState([])
  const fetch = useAuthenticatedFetch();
  const shopName = getShopName();

  useEffect(()=>{
    optionsData()
  },[])

  const handleSelectChange = useCallback((value) => {
    setSelected(value)
  }, []);

  const optionsData = async () =>{
    const fetchData = await fetch(`/api/getTheme?shopName=${shopName}`)
    const getData = await fetchData.json()
    console.log(getData,"onboarding page")
    let newoptions = getData.data.map(x=>{return{label:x.name,value:`${x.id}`}})
    let selectedOptions = getData.data.filter(x=>x.role == 'main')
    setSelected(`${selectedOptions[0].id}`)
    optionsState(newoptions)
  }

  const dropdown = () => {
    return (
      <div className="customSelectStyle">
        <Select
        id="customSelectStyle"
        label={<b>Select a theme to add the Pre-Order Button App Embeds</b>}
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
            Please enable the Terms & Condition Checkbox embed in your store
            theme setting
          </b>
        </p>
        <p className="subtext" style={{marginTop:"10px"}}>Step 1: Go to theme customization</p>
        <p className="subtext">Step 2: Go to theme setting</p>
        <p className="subtext">Step 3: Click App embeds</p>
        <p className="subtext">Step 4; Enable Pre-Order Button App Embeds</p>
      </div>
      <div className="image">
        {imgLoading == true ? <p className="loading"></p> : ""}
        <img
          src={"install.svg"}
          onLoad={() => loadingstate(false)}
          style={{width:"100%"}}
          className={imgLoading == true ? "isloading" : ""}
        />
      </div>
      <div className="dropdwon">
        {dropdown()}
        <div className="button">
          <Button primary onClick={()=>{
           window.open(`https://${shopName}/admin/themes/${selected}/editor?context=apps`)
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

function PolarisModal({ active ,onclick}) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();
  const shopName = getShopName();

  const content = [
    {
      heading: `How does the 
      Countdown Timer Banner work?
      `,
      subheading:
        "With Cancode.io Countdown Timer, you can now easily persuade your customers to complete their purchase before the time runs out.",
      faq: {
        faqText: "Learn more in our FAQ",
        faqUrl: "https://cancode.tawk.help/",
      },
      src: 'Layer_1.svg',
      footerSrc: [
        thank,
       logo,
      ],
    },
    {
      heading: `Create a Countdown Timer`,
      subheading: "Click the “Create a new timer” on the dashboard",
      faq: {
        faqText: "Learn more in our FAQ",
        faqUrl: "https://cancode.tawk.help/",
      },
      src: "a_1 1.svg",
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
      subheading: "If you need any help, please contact our email and live chat",
      faq: {
        faqText: "Learn more in our FAQ",
        faqUrl: "https://cancode.tawk.help/",
      },
      src: "24s.svg",
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
        `/api/updateonboarding?shopName=${shopName}`
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
  const [active,setActive] = useState(true)

  const handle = ()  =>{
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
