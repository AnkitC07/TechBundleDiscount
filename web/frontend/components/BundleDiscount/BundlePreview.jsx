import { Card, Banner } from "@shopify/polaris";
import React from "react";
import { useEffect } from "react";

export default function BundlePreview({bundle}) {
  const data = bundle  
  data.bundleProducts = [
      {
        session: {
          id: "offline_discountapp-new.myshopify.com",
          shop: "discountapp-new.myshopify.com",
          state: "322224524323194",
          isOnline: false,
          scope:
            "write_price_rules,write_products,read_inventory,read_product_listings,read_themes,write_orders",
          accessToken: "shpua_df9a031a1dc237b243d83f6ff4ca068b",
        },
        id: 7806459871473,
        title: "Example T-Shirt",
        variants: [
          {
            session: {
              id: "offline_discountapp-new.myshopify.com",
              shop: "discountapp-new.myshopify.com",
              state: "322224524323194",
              isOnline: false,
              scope:
                "write_price_rules,write_products,read_inventory,read_product_listings,read_themes,write_orders",
              accessToken: "shpua_df9a031a1dc237b243d83f6ff4ca068b",
            },
            product_id: 7806459871473,
            id: 43264142967025,
            title: 'Lithograph - Height: 9" x Width: 12"',
            price: "25.00",
            sku: null,
            position: 1,
            inventory_policy: "deny",
            compare_at_price: null,
            fulfillment_service: "manual",
            inventory_management: null,
            option1: 'Lithograph - Height: 9" x Width: 12"',
            option2: null,
            option3: null,
            created_at: "2022-09-13T14:47:32+05:30",
            updated_at: "2022-09-13T14:47:32+05:30",
            taxable: true,
            barcode: null,
            grams: 3629,
            image_id: null,
            weight: 3629,
            weight_unit: "g",
            inventory_item_id: 45360212345073,
            inventory_quantity: 0,
            old_inventory_quantity: 0,
            requires_shipping: true,
            admin_graphql_api_id: "gid://shopify/ProductVariant/43264142967025",
          },
          {
            session: {
              id: "offline_discountapp-new.myshopify.com",
              shop: "discountapp-new.myshopify.com",
              state: "322224524323194",
              isOnline: false,
              scope:
                "write_price_rules,write_products,read_inventory,read_product_listings,read_themes,write_orders",
              accessToken: "shpua_df9a031a1dc237b243d83f6ff4ca068b",
            },
            product_id: 7806459871473,
            id: 43264142999793,
            title: "Small",
            price: "19.99",
            sku: "example-shirt-s",
            position: 2,
            inventory_policy: "deny",
            compare_at_price: "24.99",
            fulfillment_service: "manual",
            inventory_management: null,
            option1: "Small",
            option2: null,
            option3: null,
            created_at: "2022-09-13T14:47:32+05:30",
            updated_at: "2022-09-13T14:47:32+05:30",
            taxable: true,
            barcode: null,
            grams: 200,
            image_id: null,
            weight: 200,
            weight_unit: "g",
            inventory_item_id: 45360212377841,
            inventory_quantity: 0,
            old_inventory_quantity: 0,
            requires_shipping: true,
            admin_graphql_api_id: "gid://shopify/ProductVariant/43264142999793",
          },
          {
            session: {
              id: "offline_discountapp-new.myshopify.com",
              shop: "discountapp-new.myshopify.com",
              state: "322224524323194",
              isOnline: false,
              scope:
                "write_price_rules,write_products,read_inventory,read_product_listings,read_themes,write_orders",
              accessToken: "shpua_df9a031a1dc237b243d83f6ff4ca068b",
            },
            product_id: 7806459871473,
            id: 43264143032561,
            title: "Medium",
            price: "19.99",
            sku: "example-shirt-m",
            position: 3,
            inventory_policy: "deny",
            compare_at_price: "24.99",
            fulfillment_service: "manual",
            inventory_management: "shopify",
            option1: "Medium",
            option2: null,
            option3: null,
            created_at: "2022-09-13T14:47:32+05:30",
            updated_at: "2022-09-13T14:47:32+05:30",
            taxable: true,
            barcode: null,
            grams: 200,
            image_id: null,
            weight: 200,
            weight_unit: "g",
            inventory_item_id: 45360212410609,
            inventory_quantity: 0,
            old_inventory_quantity: 0,
            requires_shipping: true,
            admin_graphql_api_id: "gid://shopify/ProductVariant/43264143032561",
          },
        ],
        options: [
          {
            product_id: 7806459871473,
            id: 9906421235953,
            name: "Title",
            position: 1,
            values: ['Lithograph - Height: 9" x Width: 12"', "Small", "Medium"],
          },
        ],
        image: {
          product_id: 7806459871473,
          id: 37853777658097,
          position: 1,
          created_at: "2022-09-13T14:47:32+05:30",
          updated_at: "2022-09-13T14:47:32+05:30",
          alt: null,
          width: 5000,
          height: 3335,
          src: "https://cdn.shopify.com/s/files/1/0662/1052/9521/products/green-t-shirt.jpg?v=1663060652",
          variant_ids: [],
          admin_graphql_api_id: "gid://shopify/ProductImage/37853777658097",
        },
      },
      {
        session: {
          id: "offline_discountapp-new.myshopify.com",
          shop: "discountapp-new.myshopify.com",
          state: "322224524323194",
          isOnline: false,
          scope:
            "write_price_rules,write_products,read_inventory,read_product_listings,read_themes,write_orders",
          accessToken: "shpua_df9a031a1dc237b243d83f6ff4ca068b",
        },
        id: 7806459937009,
        title: "Example Pants",
        variants: [
          {
            session: {
              id: "offline_discountapp-new.myshopify.com",
              shop: "discountapp-new.myshopify.com",
              state: "322224524323194",
              isOnline: false,
              scope:
                "write_price_rules,write_products,read_inventory,read_product_listings,read_themes,write_orders",
              accessToken: "shpua_df9a031a1dc237b243d83f6ff4ca068b",
            },
            product_id: 7806459937009,
            id: 43264143229169,
            title: "Jeans, W32H34",
            price: "49.99",
            sku: null,
            position: 1,
            inventory_policy: "deny",
            compare_at_price: "57.99",
            fulfillment_service: "manual",
            inventory_management: null,
            option1: "Jeans, W32H34",
            option2: null,
            option3: null,
            created_at: "2022-09-13T14:47:42+05:30",
            updated_at: "2022-09-13T14:47:42+05:30",
            taxable: true,
            barcode: null,
            grams: 1250,
            image_id: null,
            weight: 1250,
            weight_unit: "g",
            inventory_item_id: 45360212607217,
            inventory_quantity: 0,
            old_inventory_quantity: 0,
            requires_shipping: true,
            admin_graphql_api_id: "gid://shopify/ProductVariant/43264143229169",
          },
        ],
        options: [
          {
            product_id: 7806459937009,
            id: 9906421367025,
            name: "Title",
            position: 1,
            values: ["Jeans, W32H34"],
          },
        ],
        image: {
          product_id: 7806459937009,
          id: 37853778215153,
          position: 1,
          created_at: "2022-09-13T14:47:42+05:30",
          updated_at: "2022-09-13T14:47:42+05:30",
          alt: null,
          width: 5000,
          height: 3333,
          src: "https://cdn.shopify.com/s/files/1/0662/1052/9521/products/distressed-kids-jeans.jpg?v=1663060662",
          variant_ids: [],
          admin_graphql_api_id: "gid://shopify/ProductImage/37853778215153",
        },
      },
      {
        session: {
          id: "offline_discountapp-new.myshopify.com",
          shop: "discountapp-new.myshopify.com",
          state: "322224524323194",
          isOnline: false,
          scope:
            "write_price_rules,write_products,read_inventory,read_product_listings,read_themes,write_orders",
          accessToken: "shpua_df9a031a1dc237b243d83f6ff4ca068b",
        },
        id: 7806460002545,
        title: "Example Hat",
        variants: [
          {
            session: {
              id: "offline_discountapp-new.myshopify.com",
              shop: "discountapp-new.myshopify.com",
              state: "322224524323194",
              isOnline: false,
              scope:
                "write_price_rules,write_products,read_inventory,read_product_listings,read_themes,write_orders",
              accessToken: "shpua_df9a031a1dc237b243d83f6ff4ca068b",
            },
            product_id: 7806460002545,
            id: 43264143425777,
            title: "Grey",
            price: "17.99",
            sku: null,
            position: 1,
            inventory_policy: "deny",
            compare_at_price: "22.99",
            fulfillment_service: "manual",
            inventory_management: null,
            option1: "Grey",
            option2: null,
            option3: null,
            created_at: "2022-09-13T14:47:45+05:30",
            updated_at: "2022-09-13T14:47:45+05:30",
            taxable: true,
            barcode: null,
            grams: 275,
            image_id: null,
            weight: 275,
            weight_unit: "g",
            inventory_item_id: 45360212836593,
            inventory_quantity: 0,
            old_inventory_quantity: 0,
            requires_shipping: true,
            admin_graphql_api_id: "gid://shopify/ProductVariant/43264143425777",
          },
        ],
        options: [
          {
            product_id: 7806460002545,
            id: 9906421432561,
            name: "Title",
            position: 1,
            values: ["Grey"],
          },
        ],
        image: {
          product_id: 7806460002545,
          id: 37853778378993,
          position: 1,
          created_at: "2022-09-13T14:47:45+05:30",
          updated_at: "2022-09-13T14:47:45+05:30",
          alt: null,
          width: 5000,
          height: 3333,
          src: "https://cdn.shopify.com/s/files/1/0662/1052/9521/products/kids-beanie.jpg?v=1663060665",
          variant_ids: [],
          admin_graphql_api_id: "gid://shopify/ProductImage/37853778378993",
        },
      },
      {
        session: {
          id: "offline_discountapp-new.myshopify.com",
          shop: "discountapp-new.myshopify.com",
          state: "322224524323194",
          isOnline: false,
          scope:
            "write_price_rules,write_products,read_inventory,read_product_listings,read_themes,write_orders",
          accessToken: "shpua_df9a031a1dc237b243d83f6ff4ca068b",
        },
        id: 7880395784433,
        title: "Zipped Jacket",
        variants: [
          {
            session: {
              id: "offline_discountapp-new.myshopify.com",
              shop: "discountapp-new.myshopify.com",
              state: "322224524323194",
              isOnline: false,
              scope:
                "write_price_rules,write_products,read_inventory,read_product_listings,read_themes,write_orders",
              accessToken: "shpua_df9a031a1dc237b243d83f6ff4ca068b",
            },
            product_id: 7880395784433,
            id: 43567494856945,
            title: "Default Title",
            price: "65.00",
            sku: null,
            position: 1,
            inventory_policy: "deny",
            compare_at_price: null,
            fulfillment_service: "manual",
            inventory_management: null,
            option1: "Default Title",
            option2: null,
            option3: null,
            created_at: "2023-01-02T13:11:01+05:30",
            updated_at: "2023-01-02T13:11:01+05:30",
            taxable: true,
            barcode: null,
            grams: 0,
            image_id: null,
            weight: 0,
            weight_unit: "kg",
            inventory_item_id: 45665104199921,
            inventory_quantity: 1,
            old_inventory_quantity: 1,
            requires_shipping: true,
            admin_graphql_api_id: "gid://shopify/ProductVariant/43567494856945",
          },
        ],
        options: [
          {
            product_id: 7880395784433,
            id: 10001888411889,
            name: "Title",
            position: 1,
            values: ["Default Title"],
          },
        ],
        image: {
          product_id: 7880395784433,
          id: 38356821475569,
          position: 1,
          created_at: "2023-01-02T13:11:01+05:30",
          updated_at: "2023-01-02T13:11:01+05:30",
          alt: null,
          width: 925,
          height: 617,
          src: "https://cdn.shopify.com/s/files/1/0662/1052/9521/products/menswear-blue-zip-up-jacket_925x_f19390e8-603a-415d-8c24-f19ffd72a869.jpg?v=1672645261",
          variant_ids: [],
          admin_graphql_api_id: "gid://shopify/ProductImage/38356821475569",
        },
      },
    ]

    // console.log(bundle,"checking values")
  // useEffect(()=>{
  //   // console.log('update values..............')
  // },[bundle])

  return (
    <div className="BundlepreviewStyle">
      <div className="previewScroll">
        <div className="customCard">
          <Card title={"Preview"} sectioned>
            {JSON.stringify(bundle.bundleProducts).includes("title") == true ? (
              <BundlePreviewPro bundle={bundle} />
            ) : (
              <EmptyState />
            )}
          </Card>
        </div>
      </div>
      <div className="mt-4">
        <Banner icon={false} onDismiss={() => {}}>
          <p>
            You can design the app in the "Design" tab after you're done
            creating your offer.
          </p>
        </Banner>
      </div>
    </div>
  );
}

const EmptyState = () => {
  return (
    <div style={{ background: "lightgray", width: "100%", height: "100%" }}>
      <div className="emptyPreview">Offer Preview</div>
    </div>
  );
};

const BundlePreviewPro = ({ bundle }) => {
  // console.log(bundle, "checking objs");
  return (
    <>
      <div style={{ border: "1px solid gray", padding: "8px" }}>
        {bundle.bundleProducts.map((x, i) => {
          return (
            <>
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        border: "1px solid lightgray",
                        boxSizing: "border-box",
                        width: "70px",
                        height: "48px",
                        background: `url(${x.image.src}) center center / contain no-repeat rgb(237, 237, 237)`,
                      }}
                    ></div>
                  </div>
                  <div style={{ margin: "0px 7px" }}>{x.title}</div>
                  <div>{x.variants[0].price}</div>
                </div>
                {x.variants.length > 1 ? (
                  <div className="productSelects">
                    <Variants v={x.variants} bundle={bundle}/>
                  </div>
                ) : (
                  ""
                )}
         
                {bundle.bundleProducts.length - 1 == i ? (
                  ""
                ) : (
                  <div style={{ margin: "15px 0" }}>
                    <div
                      style={{
                        width: "100%",
                        height: "1px",
                        background: "lightgray",
                        position: "relative",
                      }}
                    >
                      <svg
                        style={{
                          width: "20px",
                          fill: "#5c5f62",
                          position: "absolute",
                          top: "-9",
                          left: "47%",
                        }}
                        viewBox="0 0 20 20"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path d="M0 10c0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10-10 4.486-10 10zm5 0a1 1 0 0 1 1-1h3v-3a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 0 1-1-1z"></path>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

const Variants = ({ v,bundle}) => {
  console.log("checking bundles updated variants")
  return (
    <>
      <div style={{ margin: "10px 0px", width: "100%" }}>
        <select style={{ width: "100%", padding: "5px" }}>
          {bundle.advanceSetting.customerOption.status == true?<option selected disabled>Choose an option</option>:''}
          {v.map((x, i) => {
            return <option value={x.id}>{x.title}</option>;
          })}
        </select>
      </div>
    </>
  );
};
