// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import bodyParser from "body-parser";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import { title } from "process";
import bundleRouter from "./routes/SetBundle.js";
import "./database/config.js";
import AllDiscount from "./routes/AllDiscount.js";
import GetDatabyId from "./routes/GetDatabyId.js";
import createHmac from "create-hmac";
import addStore, { updateStore } from "./model/Controller/store.js";
import cron from 'node-cron'
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();


// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);


app.use(express.json());


cron.schedule("0 0 0 * * *", function () {
  console.log('Cron Job run every Day')
  
});

// function verifyWebhook(payload, hmac) {
//   const message = JSON.stringify(payload).toString();
//   var check = createHmac("sha256", "559b428e001f7a75611db9f8e77309b4")
//     .update(message)
//     .digest("base64");
//   return check === hmac;
// }

//   // START GDPR end point =====================================================================
//   app.post("/api/data-request", async (req, res) => {
//     console.log('checking')
//     const hmac = req.headers["x-shopify-hmac-sha256"];
//     const topic = req.header("X-Shopify-Topic");
//     const verified = verifyWebhook(req.body, hmac);
//     if (verified) {
//       console.log("GDPR is verified",topic)
//       res.status(200).send({ data: "data-request triggered" });
//     } else {
//       console.log("GDPR is not verified",topic)
//       res.status(401).send({ data: "data-request triggered" });
//     }
//   });

//   app.post("/api/data-erasure", (req, res) => {
//     const hmac = req.headers["x-shopify-hmac-sha256"];
//     const topic = req.header("X-Shopify-Topic");
//     const verified = verifyWebhook(req.body, hmac);
//     if (verified) {
//       console.log("GDPR is verified",topic)
//       res.status(200).send({ data: "data-request triggered" });
//     } else {
//       console.log("GDPR is not verified",topic)
//       res.status(401).send({ data: "data-request triggered" });
//     }
//   });

//   app.post("/api/shop-data-erasure", (req, res) => {
//     const hmac = req.headers["x-shopify-hmac-sha256"];
//     const topic = req.header("X-Shopify-Topic");
//     const verified = verifyWebhook(req.body, hmac);
//     if (verified) {
//       console.log("GDPR is verified",topic)
//       res.status(200).send({ data: "data-request triggered" });
//     } else {
//       console.log("GDPR is not verified",topic)
//       res.status(401).send({ data: "data-request triggered" });
//     }
//   });

app.get("/api/paymenturl", async (req, res) => {
  console.log(req.query.shop, "Session-----");
  console.log(
    "----------------------------------------------------------------------------------------"
  );

  const session = {
    shop: req.query.shop,
    accessToken: req.query.token,
  };
  console.log(session);
  try {
    const chargeId = req.query.charge_id;
    const url = `https://${req.query.shop}/admin/apps/surebright-app?shop=${req.query.shop}`;
    console.log(req.query.planPrice, "Priceee");

    const recurring_application_charge =
      new shopify.api.rest.RecurringApplicationCharge({
        session: session,
      });
    recurring_application_charge.name = "Super Duper Plan";
    recurring_application_charge.status = "accepted";
    recurring_application_charge.return_url = url;
    recurring_application_charge.test = true;
    recurring_application_charge.price = req.query.planPrice;
    recurring_application_charge.terms = "testing Data";
    await recurring_application_charge.save({
      update: true,
    });

    // database entry
    // await updatePlan(
    //   shopName,
    //   req.query,
    //   data.body.recurring_application_charge
    // );
    //    res.status(200).json({ data: session });
    res.redirect(`/api/auth?shop=${req.query.shop}`);
  } catch (error) {
    // console.log(error)
    res.status(404).json({
      status: false,
      error: error,
    });
  }
});
// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

// Inserted store details

app.get("/api/storeDetails", async (req,res)=>{
    console.log("storedetails")
})

// SUBSCRIBED PLAN
app.post("/api/payment-api", bodyParser.json(), async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", " *");
  try {
    // var shop_name_token = await getStoreAccessToken(req.body.shopName);
    let shopName = res.locals.shopify.session.shop;
    let tokenAccess = res.locals.shopify.session.accessToken;

    const recurring_application_charge =
      new shopify.api.rest.RecurringApplicationCharge({
        session: res.locals.shopify.session,
      });
    recurring_application_charge.name = "Super Duper Plan";
    recurring_application_charge.return_url = `https://def8-125-99-173-2.in.ngrok.io/api/paymenturl?shop=${shopName}&planType=${req.body.plan.title}&planPrice=${req.body.plan.price}&token=${tokenAccess}`;
    recurring_application_charge.test = true;
    recurring_application_charge.price = req.body.plan.price;
    recurring_application_charge.terms = "testing Data";
    await recurring_application_charge.save({
      update: true,
    });

    const url = recurring_application_charge.confirmation_url;

    res.status(200).json({
      status: true,
      data: {
        url,
      },
    });
  } catch (error) {
    // console.log(error)
    res.status(404).json({
      status: false,
      error: error,
    });
  }
});

app.use("/api", bundleRouter);
app.use("/api", AllDiscount);
app.use("/api", GetDatabyId);
app.post("/api/setStore", async (req, res) => {
  console.log("Lower SetStore Hit");
  console.log("Session", res.locals.shopify.session);
});
app.get("/api/setStore", async (req, res) => {
  console.log("Lower SetStore Hit");
  console.log("Session", res.locals.shopify.session);
});

// app.get("/api/getTheme", async (req, res) => {
//   console.log("get theme");
//   try {
//     const session = res.locals.shopify.session;
//     const { Theme } = await import(
//       `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
//     );
//     const themes = await Theme.all({ session });
//     res.status(200).json({ status: 200, data: themes });
//   } catch (err) {
//     res.status(200).json({ status: 400, err: err });
//   }
// });

// app.get("/api/updateonboarding", async (req, res) => {
//   try {
//     const session = res.locals.shopify.session;
//     const shopName = session.shop;
//     await updateStore(shopName);
//     res.status(200).json({ status: 200, msg: "success" });
//   } catch (err) {
//     res.status(200).json({ status: 400, testing: "asdasd" });
//   }
// });

app.get("/api/products", async (req, res) => {
  try {
    const id = req.query.id;
    const countData = await shopify.api.rest.Product.all({
      session: res.locals.shopify.session,
      since_id: id,
      limit: 250,
      fields: "title,image,id,price,variants,options",
    });
    console.log(res.locals.shopify.session);
    res.status(200).send(countData);
  } catch (err) {
    res.status(200).send({ error: err });
  }
});
app.get("/api/getCurrency", async (req, res) => {
  try {
    const shop = await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    });
    // console.log(shop[0].money_format.split("{{amount}}")[0]);
    res.status(200).send({ cur: shop[0].money_format.split("{{amount}}")[0] });
  } catch (error) {
    res.status(200).send({ error: error });
  }
});
app.get("/api/getCustomers", async (req, res) => {
  try {
    const customer = await shopify.api.rest.Customer.all({
      session: res.locals.shopify.session,
    });
    // console.log("Customer", customer);
    res.status(200).send(customer);
  } catch (error) {
    res.status(200).send({ error: error });
  }
});

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  // const session = await Shopify.Utils.loadCurrentSession(req, res, true);
  console.log("------first----");
  // addStore(
  //   res.locals.shopify.session.shop,
  //   res.locals.shopify.session.accessToken
  // );
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
