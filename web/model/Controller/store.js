import Stores from "../Stores.js";

const addStore = async (shopName, storetoken) => {
  try {
    const findShop = await Stores.findOne({ storename: shopName });

    if (!findShop) {
      const data = await Stores.create({
        storename: shopName,
        storetoken: storetoken,
        onboarding: true,
        plan: {
          type: "Free Plan",
          price: "0",
          trialDays: "15",
        },
      });
      return data;
    } else {
      await Stores.findOneAndUpdate(
        {
          storename: shopName,
        },
        {
          storetoken: storetoken,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateStore = async (shopName) => {
  try {
    let findShop = await Stores.findOne({ storename: shopName });

    if (!findShop) {
      return;
    }

    findShop.onboarding = false;

    await findShop.save();
  } catch (error) {
    // console.log(error)
  }
};

export const updatePlan = async (shopName, planType, planPrice,id) => {
  try {
    let findShop = await Stores.findOne({ storename: shopName });

    if (!findShop) {
      return;
    }

    findShop.plan.type = planType;
    findShop.plan.price = planPrice;
    findShop.plan.id = id
    return await findShop.save();
    
  } catch (error) {}
};

export const getStoreAccessToken = async (shopName) => {
  console.log(shopName, "getStoreAccessToken function");
  try {
    const findShop = await Stores.findOne({ storename: shopName });
    console.log(findShop);
    return {
      shop: findShop.storename,
      token: findShop.storeAccessToken,
    };
  } catch (error) {
    const findShop = await Stores.findOne({ storename: shopName });

    console.log(error);
    console.log(findShop);
  }
};

export default addStore;
