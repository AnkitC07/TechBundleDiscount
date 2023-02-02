import { Button, Card, Icon, ProgressBar, Spinner, Text } from "@shopify/polaris";
import { AppFooter } from '../components/layouts/AppFooter'
import { TickMinor } from "@shopify/polaris-icons";
import "../css/plan.css";
import { useState } from "react";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";

const Plan = () => {
  const freeplan = [
    {
      icon: TickMinor,
      label: "Unlimited Bundle Discount Setup",
    },
    {
      icon: TickMinor,
      label: "Scheduled Bundle Discount",
    },
    {
      icon: TickMinor,
      label: "Custom widget design feature",
    },
  ];

  const essential = [
    {
      icon: TickMinor,
      label: "Unlimited Bundle Discount Setup",
    },
    {
      icon: TickMinor,
      label: "Scheduled Bundle Discount",
    },
    {
      icon: TickMinor,
      label: "Custom widget design feature",
    },
    {
      icon: TickMinor,
      label: "Custom product badge features",
    },
    {
      icon: TickMinor,
      label: "Fast and responsive support",
    },
    {
      icon: TickMinor,
      label: "Custom widget placement style support",
    },
  ];
  return (
    <>
      <div className="container mt-4">
        <Card sectioned>
          <Text variant="bodyMd" as="p">
            You're currently on <b>14 Days Free Trial</b> Plan. (0 / unlimited
            monthly views)
          </Text>
          <div className="mt-3">
            <ProgressBar
              progress={Math.floor(7.2 * 1)}
              size="small"
              color="primary"
            />
          </div>
        </Card>
        <div className="mt-4">
          <Card sectioned title="14 Days Free Trial">
            <Text variant="bodyMd" as="p">
              <div>
                <div>Unlimited Bundle Discount Setup</div>

                <div className="d-flex ">
                  <div className="px-2">
                    <Icon source={TickMinor} />
                  </div>
                  <div>Scheduled Bundle Discount</div>
                </div>

                <div className="d-flex">
                  <div className="px-2">
                    <Icon source={TickMinor} />
                  </div>
                  <div>Custom widget design feature</div>
                </div>
              </div>
            </Text>
          </Card>

          <div className="mt-4">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <PlanCard title="Essential" features={essential} price="0.99" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <PlanCard
                  title="Free Plan"
                  subTitle="14 Days Free Trial"
                  features={freeplan}
                  price="Free"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Card sectioned>
              <div className="d-flex align-items-center">
                <div>
                  <Text variant="bodyLg" fontWeight="bold" as="p">
                    Logo
                  </Text>
                </div>

                <div className="px-5">
                  <div>
                    <Text variant="bodyMd" fontWeight="semibold" as="p">
                      30 Day Money Back Guarantee - No questions asked!
                    </Text>
                  </div>
                  <div className="mt-2">
                    <Text variant="bodyMd" as="p">
                      Write to us within the first 30 days of your paid
                      subscription and we will refund you the money via
                      Shopify's billing. No questions asked.
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

const PlanCard = ({ title, subTitle, features, price }) => {
  const fetch = useAuthenticatedFetch()
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const plan_subscribed = {
    title: title,
    price: price
  }
  const handleButton = async () => {
    console.log(plan_subscribed, "Plan")
    //   setLoadingPlan(true);
    //   setDisabledButton(true);
    //   await fetch(`/api/payment-api`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ plan: plan_subscribed }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setLoadingPlan(false)
    //       setDisabledButton(false);
    //       if (data.data) {
    //         const url = data.data.url;
    //         console.log(url);
    //         // window.open(url, "_self");
    //         window.top.location.href = url;
    //         // window.open(data.data.url)
    //       }
    //     })
    //     .catch((error) => {
    //       setLoadingPlan(false);
    //       setDisabledButton(false);
    //       console.log(error);
    //     });
  };








  return (
    <>
      <Card sectioned title={title}>
        <div style={{ height: "200px" }}>
          {subTitle == null ? (
            ""
          ) : (
            <Text variant="bodyMd" as="p">
              {subTitle}
            </Text>
          )}
          {features.map((x) => {
            return (
              <>
                <div className="d-flex lh-lg align-items-center">
                  <div>
                    <Icon source={x.icon} />
                  </div>
                  <div className="px-2">{x.label}</div>
                </div>
              </>
            );
          })}
        </div>

        {price == "Free" ? (
          <div>
            <Text variant="heading3xl" as="h2">
              {price}
            </Text>
          </div>
        ) : (
          <div className="d-flex align-items-end">
            <div>
              <Text variant="heading3xl" as="h2">
                ${price}
              </Text>
            </div>
            <div>
              <Text variant="bodyMd" fontWeight="bold" as="p" color="subdued">
                /Month
              </Text>
            </div>
          </div>
        )}

        <div className="mt-4">
          <Button primary fullWidth={true} onClick={() => handleButton()} disabled={disabledButton}>
            {!loadingPlan ? (
              <Text variant="bodyMd" fontWeight="bold" as="p">
                Choose Your Plan
              </Text>
            ) : (
              <Spinner accessibilityLabel="Small spinner example" size="small" />
            )}


          </Button>
        </div>
      </Card>
    </>
  );
};

export default Plan;
