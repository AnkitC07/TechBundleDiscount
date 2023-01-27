import {
    Card,
    Page,
    Layout,
    TextContainer,
    Image,
    Stack,
    Link,
    Heading,
    Spinner,
} from '@shopify/polaris'
import { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { useAuthenticatedFetch } from '../hooks/useAuthenticatedFetch'
import PublishedList from './Fields/PublishedList'
import { AppFooter } from './layouts/AppFooter'
import { CheckBoxRef } from './layouts/CheckBoxRef'
import CheckHead from './layouts/CheckHead'
// import { getShopName } from '../components/common_functions/functions.js'
// import trophyImgUrl from "../assets/home-trophy.png";

// import { ProductsCard } from "./ProductsCard";


export default function Homepage() {
    const fetch = useAuthenticatedFetch()
    const [discountData, setDiscountData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handelPublish = async () => {

            const res = await fetch('/api/getAllDiscount')
            const data = await res.json()
            console.log('response', data)
            setDiscountData(data.status)
            setLoading(false)
        }
        handelPublish()
    }, [])
    return (
        <Page>
            <section className="countdown_main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <CheckHead />
                            <div className="Polaris-Page-Header Polaris-Page-Header--noBreadcrumbs Polaris-Page-Header--mediumTitle Polaris-PageActions" >
                                <div className="Polaris-Page-Header__Row">
                                    <div className="Polaris-Page-Header__TitleWrapper">
                                        <div>
                                            <div className="Polaris-Header-Title__TitleAndSubtitleWrapper">
                                                <h1 className="Polaris-Header-Title">
                                                    Your Bundle Discount
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Polaris-Page-Header__RightAlign">
                                        <div className="Polaris-Page-Header__PrimaryActionWrapper">
                                            <NavLink className="count_btn" to="/bundleDiscount">
                                                <button
                                                    className="Polaris-Button Polaris-Button--primary"
                                                    type="button"
                                                >
                                                    <span className="Polaris-Button__Content">
                                                        <span className="Polaris-Button__Text">
                                                            Create Bundle Discount
                                                        </span>
                                                    </span>
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}> <Spinner accessibilityLabel="Spinner example" size="large" /></div> :
                                <div className="Polaris-Card">
                                    {
                                        discountData.length !== 0 ? <PublishedList item={discountData} /> :
                                            <div className="Polaris-Card__Section">
                                                <div className="Polaris-EmptyState Polaris-EmptyState--withinContentContainer">
                                                    <div className="Polaris-EmptyState__Section">
                                                        <div className="Polaris-EmptyState__DetailsContainer">
                                                            <div className="Polaris-EmptyState__Details">
                                                                <div className="Polaris-TextContainer">
                                                                    <p className="Polaris-DisplayText Polaris-DisplayText--sizeSmall">
                                                                        This is where you'll manage your discount
                                                                    </p>
                                                                    <div className="Polaris-EmptyState__Content">
                                                                        <p>
                                                                            Start by creating your first bundle discount and
                                                                            publishing it to your store.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="Polaris-EmptyState__Actions">
                                                                    <div className="Polaris-Stack Polaris-Stack--spacingTight Polaris-Stack--distributionCenter Polaris-Stack--alignmentCenter">
                                                                        <div className="Polaris-Stack__Item">
                                                                            <NavLink className="count_btn" to="/bundleDiscount">
                                                                                <button
                                                                                    className="Polaris-Button Polaris-Button--primary"
                                                                                    type="button"
                                                                                >
                                                                                    <span className="Polaris-Button__Content">
                                                                                        <span className="Polaris-Button__Text">
                                                                                            Create Bundle Discount
                                                                                        </span>
                                                                                    </span>
                                                                                </button>
                                                                            </NavLink>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="Polaris-EmptyState__ImageContainer">
                                                            <img
                                                                alt=""
                                                                src="discount.png"
                                                                className="Polaris-EmptyState__Image"
                                                                role="presentation"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="container-fluid ref_app">
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="Polaris-Page-Header Polaris-Page-Header--noBreadcrumbs Polaris-Page-Header--mediumTitle">
                                <div className="Polaris-Page-Header__Row">
                                    <div className="Polaris-Page-Header__TitleWrapper">
                                        <div>
                                            <div className="Polaris-Header-Title__TitleAndSubtitleWrapper">
                                                <h1 className="Polaris-Header-Title">
                                                    Apps you might like
                                                </h1>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <CheckBoxRef
                            title="Shop Pre Order Manager "
                            src="Main_revised_PreOrder-Lite-App-ScreenShot.png"
                            description="Get more sales and revenue by taking preorders for coming soon items and items out of stock. Capture purchase intent, get more sales."
                            rating="4.7"
                            btnText="View on Shopify app store"
                            link="https://apps.shopify.com/cancode-preorder"
                        />
                        <CheckBoxRef
                            title="Posh Wrap: Gift Option Manager"
                            src="App_Marketplace_MainBanner_Shopify.jpg"
                            description="Upsell gift options to your customers from product pages and the shopping cart to increase your order value."
                            rating="5.0"
                            btnText="View on Shopify app store"
                            link="https://apps.shopify.com/shop-gift-option"
                        />
                        <CheckBoxRef
                            title="CanCode.io Terms & Conditions"
                            src="Mainpage_2versionCheckbox-App-ScreenShot.png"
                            description="Compliance made easy with I Agree: Terms & Conditions Checkbox."
                            rating=""
                            btnText="View on Shopify app store"
                            link="https://apps.shopify.com/cancodeio_checklist"
                        />
                        {/* <CheckBoxRef
                            title="CanCode.io Discount & Bundle"
                            src="App_Marketplace_MainBanner_Shopify.jpg"
                            description="Get more sales by offering customers discounts and bundle deals."
                            rating=""
                            btnText="Coming Soon"
                            style={{ background: "lightgray", pointerEvents: "none" }}
                            link=""
                        /> */}
                    </div>
                </div>


            </section>
            <AppFooter />
        </Page>
    )
}
