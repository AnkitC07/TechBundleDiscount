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
    id:{
      type:Number,
      default:null
    }
  },
});

export default mongoose.model("store", storeSchema);
