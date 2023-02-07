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

	// console.log(specBundle, "DATAA");
	return specBundle;
};

const getproductsById = async (ids, session) => {
	console.log(ids);
	const newBundleData = await shopify.api.rest.Product.all({
		session: session,
		ids: ids.toString(),
	});
	return newBundleData;
};

const dbquery = async (query) => {
	return await Bundle.findOne(query);
};
const splitCollectionId = (str) => {
	let temp = str.split(',')
	temp.pop()
	return temp;
}
ThemeExtension.post("/bunldeDiscount", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", `*`);
	const body = req.body;
	const shop = body.shop;
	const id = body.id;
	const tag = body.tag;
	const collectionId = splitCollectionId(req.query.collectionId)


	const Store = await Stores.findOne({
		storename: shop,
	});
	const token = Store.storetoken;
	const session = {
		shop: shop,
		accessToken: token,
	};
	// let bundle = await Bundle.find({ Store: shop, IsPublished: "published" });
	const queries = [
		{
			Store: shop,
			IsPublished: "published",
			"Placement.selectProduct.customPosition": { $eq: true },
		},
		{
			Store: shop,
			IsPublished: "published",
			"Placement.selectProduct.specificProducts": { $eq: true },
		},
		{
			Store: shop,
			IsPublished: "published",
			"Placement.selectProduct.allProductsWithTags": { $eq: true },
		},
		{
			Store: shop,
			IsPublished: "published",
			"Placement.selectProduct.specificCollections": { $eq: true },
		},
		{
			Store: shop,
			IsPublished: "published",
			"Placement.selectProduct.allCollections": { $eq: true },
		},
		{
			Store: shop,
			IsPublished: "published",
			"Placement.selectProduct.allProducts": { $eq: true },
		},
	];

	console.log(collectionId, 'collectionId')
	for (let i = 0; i < queries.length; i++) {
		let data = await dbquery(queries[i]);
		if (data !== null) {
			console.log(data.Placement.selectProduct, "<=Data");
			if (data.Placement.selectProduct.customPosition) {
				console.log("Inside custom position");
			} else if (
				data.Placement.selectProduct.specificProducts == true &&
				data.Placement.specificProducts.some((x) => x.id.includes(id))
			) {
				console.log("Inside specific");
				const updatedBundle = await updateBundle(data, session);
				data = updatedBundle;
				res.send({ Store, data });
				break;
			} else if (
				data.Placement.selectProduct.allProductsWithTags == true
			) {

				console.log("Inside tags");
				res.send({ Store, data });
				break;
			} else if (data.Placement.selectProduct.specificCollections && collectionId.includes(data.Placement.specificCollection[0].id.split('Collection/')[1])) {
				console.log("Inside all specific collection", data.Placement.specificCollection[0].id.split('Collection/')[1]);
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
	// queries.forEach(async (query) => {});

	// for (let i = 0; i < bundle.length; i++) {
	//   if (
	//     bundle[i].Placement.selectProduct.specificProducts &&
	//     bundle[i].Placement.specificProducts.some((x) => x.id.includes(id))
	//   ) {
	//     const updatedBundle = await updateBundle([bundle[i]], session);
	//     bundle = updatedBundle;

	//     res.send({ Store, bundle, type: "all" });
	//   }
	// }

	// for (let i = 0; i < bundle.length; i++) {
	//   if (
	//     bundle[i].Placement.selectProduct.allProductsWithTags &&
	//     bundle[i].Placement.tags.includes(tag)
	//   ) {
	//     console.log("Inside tags");
	//   }
	// }
	// for (let i = 0; i < bundle.length; i++) {
	//   if (bundle[i].Placement.selectProduct.allCollections) {
	//     console.log("Inside all collection");
	//   }
	// }
	// for (let i = 0; i < bundle.length; i++) {
	//   if (bundle[i].Placement.selectProduct.allProducts) {
	//     console.log("Inside all Products");
	//     const updatedBundle = await updateBundle([bundle[i]], session);
	//     bundle = updatedBundle;

	//     res.send({ Store, bundle, type: "all" });
	//     // return;
	//   }
	// }

	// if (specificBundle !== false) {
	//   const updatedBundle = await updateBundle(specificBundle, session);
	//   console.log(updatedBundle, "UpdatedBundle");
	//   bundle = updatedBundle;
	// }
	// if (bundle.Placement.selectProduct.allProducts == true) {
	//   console.log("All Products");
	// }
	console.log("theme hit");
	// res.send({ Store });
});

export default ThemeExtension;
