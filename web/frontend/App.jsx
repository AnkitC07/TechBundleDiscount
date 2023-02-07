import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";

// import { useAuthenticatedFetch } from "./hooks/useAuthenticatedFetch";
// import getShopName from "./components/Common/getShopName";
// import OnboardingScreens from '../frontend/components/Onboarding/index'

export default function App() {
 
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
    return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu
              navigationLinks={[
                {
                  label: "Plan",
                  destination: "/Plan"
                },
                {
                  label: "Suggestion",
                  destination: "/Suggestion",
                },
                {
                  label: "Help",
                  destination: "/Help",
                },
              ]}
            />
            <Routes pages={pages} />
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
