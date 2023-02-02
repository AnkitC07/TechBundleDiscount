import express from "express";
import Stores from "./model/Stores.js";

export const cronjob = async () => {
  const allStores = await Stores.find();
  console.log(allStores, "AllStores");

  for (let i = 0; i < allStores.length; i++) {
    if (allStores[i].plan.trialDays > 0) {
      //   const temp = {
      //     ...allStores[i].plan,
      //     trialDays: allStores[i].plan.trialDays - 1,
      //   };
      //   console.log(temp, "Days");
      const updated = await Stores.findOneAndUpdate(
        { storename: allStores[i].storename },
        {
          plan: {
            ...allStores[i].plan,
            trialDays: allStores[i].plan.trialDays - 1,
          },
        }
      );
      console.log(updated, "Updated");
    } else {
      console.log("Free trial ended for  ",);
    }
  }
};
