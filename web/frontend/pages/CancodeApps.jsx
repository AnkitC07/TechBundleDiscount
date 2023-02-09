import { Text } from "@shopify/polaris";
import ShowApps from "../components/layouts/ShowApps";

const CancodeApps = () => {
  const app = [
    {
      title: "Shop Pre Order Manager",
      src: "Main_revised_PreOrder-Lite-App-ScreenShot.png",
      description:
        "Get more sales and revenue by taking preorders for coming soon items and items out of stock. Capture purchase intent, get more sales.",
      rating: "4.7",
      link: "https://apps.shopify.com/cancode-preorder",
    },
    {
      title: "Posh Wrap: Gift Option Manager",
      src: "App_Marketplace_MainBanner_Shopify.jpg",
      description:
        "Upsell gift options to your customers from product pages and the shopping cart to increase your order value.",
      rating: "5.0",
      link: "https://apps.shopify.com/shop-gift-option",
    },
    {
      title: "CanCode.io Terms & Conditions",
      src: "Mainpage_2versionCheckbox-App-ScreenShot.png",
      description:
        "Compliance made easy with I Agree: Terms & Conditions Checkbox.",
      rating: "",
      link: "https://apps.shopify.com/cancodeio_checklist",
    },
    {
      title: "Wily Simple Pre Order Button",
      src: "Main_revised_PreOrder-Lite-App-ScreenShot.png",
      description:
        "Don't miss a sale by making pre-order an option to customers",
      rating: "",
      link: "https://apps.shopify.com/cancodeiopreorderbutton",
    },
    {
      title: "CanCode.io Countdown Timer Bar",
      src: "CNOIn56R4vsCEAE=.webp",
      description: "Quick sales made easy in short time with Countdown Timer",
      rating: "",
      link: "https://apps.shopify.com/cancode-io-countdown-timer-bar",
    },
  ];
  return (
    <>
      <div className="containerCustom">
        <div className="mt-4">
          <Text variant="headingLg" as="h5">
            Our Apps
          </Text>
        </div>
        <div className="row">
          {app.map((x) => {
            return (
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-4">
                <ShowApps
                  title={x.title}
                  src={x.src}
                  description={x.description}
                  rating={x.rating}
                  link={x.link}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CancodeApps;
