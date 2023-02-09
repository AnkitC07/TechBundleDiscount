import express from "express";
import Bundle from "../model/Bundle.js";
import Stores from "../model/Stores.js";
const ThemeExtension = express.Router();
import shopify from "../shopify.js";

const checkSpecific = (bundle, productId) => {
  let returnVAl = [];
  for (let i = 0; i < bundle.length; i++) {
    if (bundle[i].Placement.specificProducts.length > 0) {
      if (
        bundle[i].Placement.specificProducts.some((x) =>
          x.id.includes(productId)
        )
      ) {
        return bundle[i];
      }
    }
  }
  return false;
};

const updateBundle = async (specBundle, session) => {
  let temp = [];
  specBundle.Content.bundleProducts.map(
    (obj) => obj.id != undefined && temp.push(obj.id)
  );
  temp = [...new Set(temp)];
  const newData = await getproductsById(temp, session);
  specBundle.Content.bundleProducts = newData;
  return specBundle;
};

const getproductsById = async (ids, session) => {
  console.log("For Updated data: ", ids);
  const newBundleData = await shopify.api.rest.Product.all({
    session: session,
    ids: ids.toString(),
  });
  return newBundleData;
};

const dbquery = async (query) => {
  console.log(query, "Query");
  return await Bundle.findOne(query);
};
const splitCollectionId = (str) => {
  let temp = str.split(",");
  temp.pop();
  return temp;
};

async function createDiscountCode(priceRules) {
  const code = new shopify.api.rest.DiscountCode({
    session: priceRules.session,
  });
  code.price_rule_id = priceRules.id;
  code.code = priceRules.title;
  await code.save({
    update: true,
  });
  return code;
}

function getFreeGiftProductIDs(body) {
  try {
    const data = body.variantIds.filter((x) =>
      body.freeGiftSlected.includes(Number(x.productid))
    );
    return data.map((x) => x.id);
  } catch (err) {
    return err;
  }
}

function prerequisite_variant_ids(body) {
  try {
    const data = body.variantIds.filter(
      (x) => body.freeGiftSlected.includes(Number(x.productid)) == false
    );
    return data.map((x) => x.id);
  } catch (err) {
    return [];
  }
}

ThemeExtension.post("/CreateDiscount", async (req, res) => {
  const body = req.body;
  console.log(body);
  const data = await Stores.findOne({ storename: body.shop });
  const session = { shop: data.storename, accessToken: data.storetoken };
  const discountType = {
    addDiscount: {
      value_type: body.discountType == "% OFF" ? "percentage" : "fixed_amount",
      value: `-${body.discountValue}`,
      entitled_variant_ids: body.variantIds.map((x) => x.id),
      prerequisite_variant_ids: [],
      allocation_method: "across",
    },
    freeGift: {
      value_type: "percentage",
      value: "-100",
      entitled_variant_ids: getFreeGiftProductIDs(body),
      prerequisite_variant_ids: prerequisite_variant_ids(body),
      allocation_method: "each",
    },
    freeShiping: {
      value_type: "percentage",
      value: "-100",
      entitled_variant_ids: [],
      prerequisite_variant_ids: [],
      allocation_method: "each",
    },
  };
  if (body.discountTitle == "noDiscount") {
    res.status(200).send(false);
  } else {
    const random = Date.now();
    const price_rule = new shopify.api.rest.PriceRule({ session: session });
    //  const price_rule = {}
    price_rule.title = `BD[${random}]`;
    price_rule.value_type = discountType[body.discountTitle].value_type;
    price_rule.value = discountType[body.discountTitle].value;
    price_rule.customer_selection = "all";
    price_rule.target_type =
      body.discountTitle == "freeShiping" ? "shipping_line" : "line_item";
    price_rule.starts_at = new Date();
    price_rule.target_selection =
      body.discountTitle == "freeShiping" ? "all" : "entitled";
    price_rule.allocation_method =
      discountType[body.discountTitle].allocation_method;
    price_rule.entitled_variant_ids =
      discountType[body.discountTitle].entitled_variant_ids;
    price_rule.prerequisite_variant_ids =
      discountType[body.discountTitle].prerequisite_variant_ids;
    price_rule.prerequisite_to_entitlement_quantity_ratio = {
      prerequisite_quantity:
        body.discountTitle !== "freeGift"
          ? null
          : discountType[body.discountTitle].prerequisite_variant_ids.length,
      entitled_quantity:
        body.discountTitle !== "freeGift"
          ? null
          : discountType[body.discountTitle].entitled_variant_ids.length,
    };
    price_rule.allocation_limit = 1;

    await price_rule.save({
      update: true,
    });
    const code = await createDiscountCode(price_rule);
    console.log(price_rule);
    res.status(200).send(code);
  }
});

const queries = [
  {
    "Placement.selectProduct.customPosition": { $eq: true },
  },
  {
    "Placement.selectProduct.specificProducts": { $eq: true },
  },
  {
    "Placement.selectProduct.allProductsWithTags": { $eq: true },
  },
  {
    "Placement.selectProduct.specificCollections": { $eq: true },
  },
  {
    "Placement.selectProduct.allCollections": { $eq: true },
  },
  {
    "Placement.selectProduct.allProducts": { $eq: true },
  },
];

const getProducts = async (name, value, session) => {
  const obj = {
    session: session,
	query:{handle:"floral-white-top"}
  };
//   obj[name] = value;
//   console.log(obj)
  const newBundleData = await shopify.api.rest.Product.find(obj);
  return newBundleData;
};

ThemeExtension.post("/getBadge", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `*`);
  const body = req.body;
  const store = await Stores.findOne({ storename: body.shop });
  const session = {
    shop: store.storename,
    accessToken: store.storetoken,
  };

  console.log(body.handle)
  const query = {handle:body.handle}
  const prod = await getProducts("query",query, session);
 console.log(prod.title)
  const badgeQuery = [
    {
      "Placement.selectProduct.customPosition": { $eq: true },
    },
    {
      $and: [
        { "Placement.selectProduct.specificProducts": { $eq: true } },
        {
          "Placement.specificProducts.id": [`gid://shopify/Product/${prod.id}`],
        },
      ],
    },
    {
      "Placement.selectProduct.allProductsWithTags": { $eq: true },
    },
    {
      "Placement.selectProduct.specificCollections": { $eq: true },
    },
    {
      "Placement.selectProduct.allCollections": { $eq: true },
    },
    {
      "Placement.selectProduct.allProducts": { $eq: true },
    },
  ];
  const data = await Bundle.findOne({
    Store: body.shop,
    IsPublished: "published",
    $or: badgeQuery,
  });
  res.status(200).send(data);
});

ThemeExtension.post("/bunldeDiscount", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `*`);
  const body = req.body;
  const shop = body.shop;
  const id = body.id;
  const tag = body.tag;
  const collectionId = splitCollectionId(req.query.collectionId);

  const Store = await Stores.findOne({
    storename: shop,
  });
  const token = Store.storetoken;
  const session = {
    shop: shop,
    accessToken: token,
  };
  // let bundle = await Bundle.find({ Store: shop, IsPublished: "published" });

  for (let i = 0; i < queries.length; i++) {
    queries[i].Store = shop;
    queries[i].IsPublished = "published";
    let data = await dbquery(queries[i]);
    console.log(data);
    if (data !== null) {
      if (data.Placement.selectProduct.customPosition) {
        console.log("Inside custom position");
        const updatedBundle = await updateBundle(data, session);
        data = updatedBundle;
        res.send({ Store, data });
        break;
      } else if (
        data.Placement.selectProduct.specificProducts == true &&
        data.Placement.specificProducts.some((x) => x.id.includes(id))
      ) {
        console.log("Inside specific");
        const updatedBundle = await updateBundle(data, session);
        data = updatedBundle;
        res.send({ Store, data });
        break;
      } else if (data.Placement.selectProduct.allProductsWithTags == true) {
        let flag = false;
        const productTag = tag.split(/\s+/);
        const bundleTag = data.Placement.tags.split(/\s+/);
        console.log("Inside tags", bundleTag, "and", productTag);
        for (let i = 0; i < productTag.length; i++) {
          if (bundleTag.includes(productTag[i])) {
            flag = true;
            res.send({ Store, data });
            break;
          }
        }
        if (flag) {
          break;
        } else {
          continue;
        }
      } else if (
        data.Placement.selectProduct.specificCollections &&
        collectionId.includes(
          data.Placement.specificCollection[0].id.split("Collection/")[1]
        )
      ) {
        console.log(
          "Inside all specific collection",
          collectionId.includes(
            data.Placement.specificCollection[0].id.split("Collection/")[1]
          ),
          data.Placement.specificCollection[0].id.split("Collection/")[1]
        );
        res.send({ Store, data });
        break;
      } else if (data.Placement.selectProduct.allCollections == true) {
        console.log("Inside all collection");
        const updatedBundle = await updateBundle(data, session);
        data = updatedBundle;
        res.send({ Store, data });
        break;
      } else if (data.Placement.selectProduct.allProducts == true) {
        console.log("Inside all Products");
        const updatedBundle = await updateBundle(data, session);
        data = updatedBundle;
        res.send({ Store, data });
        break;
      }
    }
  }

  console.log("theme hit");
});

export default ThemeExtension;
