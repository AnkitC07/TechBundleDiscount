import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  storename: {
    type: String,
  },
  storetoken: {
    type: String,
  },
  onboarding: {
    type: Boolean,
  },
  plan: {
    type: {
      type: String,
    },
    price: {
      type: String,
    },
    trialDays: {
      type: String,
    },
  },
});

export default mongoose.model("store", storeSchema);
