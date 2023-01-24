import Stores from "../Stores.js";

const addStore = async (shopName, storetoken) => {
  try {
    const findShop = await Stores.findOne({ storename: shopName });

    if (!findShop) {
      await Stores.create({
        storename: shopName,
        storetoken: storetoken,
        onboarding: true,
      });
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
