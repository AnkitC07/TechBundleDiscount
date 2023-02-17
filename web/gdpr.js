import { DeliveryMethod } from "@shopify/shopify-api";
import Stores from "./model/Stores.js";
import shopify from "./shopify.js";

export default {
  /**
   * Customers can request their data from a store owner. When this happens,
   * Shopify invokes this webhook.
   *
   * https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#customers-data_request
   */
  CUSTOMERS_DATA_REQUEST: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      console.log("customer Request data");
      return 200;
    },
  },

  /**
   * Store owners can request that data is deleted on behalf of a customer. When
   * this happens, Shopify invokes this webhook.
   *
   * https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#customers-redact
   */
  CUSTOMERS_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId, req, res) => {
      const payload = JSON.parse(body);
      console.log(payload);
      console.log("CUSTOMERS_REDACT data ...");
      return 200;
    },
  },

  /**
   * 48 hours after a store owner uninstalls your app, Shopify invokes this
   * webhook.
   *
   * https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#shop-redact
   */
  SHOP_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      console.log("shop deleted");
      return 200;
    },
  },
  ORDERS_CREATE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      if (body.includes("bundleDiscount") == true) {
        let shopData = payload.order_status_url;
        shopData = shopData.split("https://");
        shopData = shopData[1].split("/");
        shopData = shopData[0];
        const store = await Stores.findOne({ storename: shopData });
        const session = {
          shop: store.storename,
          accessToken: store.storetoken,
        };
        try {
          const order = new shopify.api.rest.Order({
            session: session,
          });
          order.id = payload.id;
          order.tags = "Bundle Discount app";
          await order.save({
            update: true,
          });
        } catch (err) {}
      }
      return 200;
    },
  },
};
