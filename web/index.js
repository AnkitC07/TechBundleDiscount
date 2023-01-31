// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import { title } from "process";
import bundleRouter from "./routes/SetBundle.js";
import "./database/config.js";
import AllDiscount from "./routes/AllDiscount.js";
import GetDatabyId from "./routes/GetDatabyId.js";
import createHmac from "create-hmac";
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


// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());



app.use("/api", bundleRouter);
app.use("/api", AllDiscount);
app.use("/api", GetDatabyId);

app.get("/api/products", async (req, res) => {
  try {
    const id = req.query.id;
    const countData = await shopify.api.rest.Product.all({
      session: res.locals.shopify.session,
      since_id: id,
      limit: 250,
      fields: "title,image,id,price,variants,options",
    });
    console.log(res.locals.shopify.session)
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
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
