import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  storename: {
    type: String,
  },
  storetoken: {
    type: String,
  },
  onboarding:{
    type: Boolean
  },
  planType:{
    type:String
  },
  planPrice:{
    type:String
  },
});

export default mongoose.model("store", storeSchema);