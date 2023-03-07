import '../css/app.css'
import '../css/custom_style.css'
import Homepage from "../components/Homepage";
import getShopName from '../components/Common/getShopName';
import OnboardingScreens from '../components/Onboarding';
import { useEffect, useState } from 'react';
import { useAuthenticatedFetch } from '../hooks/useAuthenticatedFetch';
import addStore from '../../model/Controller/store';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  
  const Navigate = useNavigate()
  const fetch = useAuthenticatedFetch();
  const shopName = getShopName()
  const [themes,themeState] = useState({})
  const [onboardingScreen, setOnboarding] = useState({
    loading: true,
    status: true,
  });

  useEffect(() => {
    const getStoreDetails = async () => {
      const fetchData = await fetch(`/api/getDetails`);
      const getdata = await fetchData.json();
      themeState(getdata.theme)
      if(getdata.data.plan.trialDays == "0" && getdata.data.plan.type == "Free Plan"){
        Navigate("/Plan")
      }
  
      if (getdata.status == 200) {
        if (getdata.data == null) {

          setOnboarding({ loading: false, status: true });
          return;
        }

        if (getdata.data.onboarding == true) {
          setOnboarding({ loading: false, status: true });
        } else {
          setOnboarding({ loading: false, status: false });
        }
      } else {
        setOnboarding({ loading: true, status: true });
      }
    }
    getStoreDetails()

  }, []);
  return (
    <>
      <Homepage themes={themes}/>
      {onboardingScreen.loading == false && onboardingScreen.status == true ? (
        <OnboardingScreens />
      ) : (
        ''
      )}
    </>
  );
}
