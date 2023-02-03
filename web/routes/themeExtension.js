import express from "express";
import Bundle from "../model/Bundle.js";
import Stores from "../model/Stores.js";
const ThemeExtension = express.Router();
import shopify from "../shopify.js";

ThemeExtension.post("/bunldeDiscount", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `*`);
  const body = req.body;
  const shop = body.shop;
  const id = body.id;
  const Store = await Stores.findOne({
    storename: shop,
  });
  let query = {
   $cond: {
      if: { $eq: ["$qty", 100] },
      then: { $multiply: ["$price", NumberDecimal("0.50")] },
      else: { $multiply: ["$price", NumberDecimal("0.75")] }
   }
};
  const bundle = await Bundle.find({ Store: shop, IsPublished: "published",  });

  let data = [];
  bundle.forEach((x) => {
    x.Content.bundleProducts.map(
      (obj) => obj.id != undefined && data.push(obj.id)
    );
  });
  data = [...new Set(data)];

//   const newBundleData = await shopify.api.rest.Product.all({
//     session: res.locals.shopify.session,
//     ids: data,
//   });
//   console.log(newBundleData);

  console.log("theme hit");
  res.send({ Store, bundle });
});

export default ThemeExtension;
