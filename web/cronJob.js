import express from "express";
import Stores from "./model/Stores.js";

export const cronjob = async () => {
  const allStores = await Stores.find({"plan.type":{$ne:"Essential"}});
  for (let i = 0; i < allStores.length; i++) {
    if (allStores[i].plan.trialDays > 0) {

      const updated = await Stores.findOneAndUpdate(
        { storename: allStores[i].storename },
        {
          plan: {
            ...allStores[i].plan,
            trialDays: allStores[i].plan.trialDays - 1,
          },
        }
      );
    }
  }
};
