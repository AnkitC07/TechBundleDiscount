import '../css/app.css'
import '../css/custom_style.css'
import Homepage from "../components/Homepage";
import getShopName from '../components/Common/getShopName';
import OnboardingScreens from '../components/Onboarding';
import { useEffect, useState } from 'react';
import { useAuthenticatedFetch } from '../hooks/useAuthenticatedFetch';
import addStore from '../../model/Controller/store';

export default function HomePage() {
  const fetch = useAuthenticatedFetch();

  const shopName = getShopName()
  const [themeId, themeIdState] = useState('')
  const [onboardingScreen, setOnboarding] = useState({
    loading: true,
    status: true,
  });
  const [preview, urlState] = useState('')

  useEffect(() => {
    const getStoreDetails = async () => {

      const fetchData = await fetch(`/api/getDetails`);
      const getdata = await fetchData.json();

      console.log(getdata, "get details data")
      if (getdata.theme !== null) {
        themeIdState(getdata.theme.id)
        if (shopName.includes('admin.shopify.com')) {
          let shop = ''
          if (getdata.theme.session.shop.includes('myshopify.com')) {
            shop = getdata.theme.session.shop.split('.myshopify.com')
            shop = shop[0]
            urlState(`https://admin.shopify.com/store/${shop}/themes/${getdata.theme.id}/editor?context=apps`)
          }
        } else {
          urlState(`https://${shopName}/admin/themes/${getdata.theme.id}/editor?context=apps`)
        }
      }
      // if (getdata.data !== null && getdata.data.tag !== undefined) {
      //   setTag(getdata.data.tag)
      // }
      // console.log(getdata,"store data")
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
      <Homepage />
      {onboardingScreen.loading == false && onboardingScreen.status == true ? (
        <OnboardingScreens />
      ) : (
        ''
      )}
    </>
  );
}
