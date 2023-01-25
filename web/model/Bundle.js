import mongoose from "mongoose";

const bundleSchema = new mongoose.Schema({
  Content: {
    type: Object,
  },
  Design: {
    type: Object,
  },
  Placement: {
    type: Object,
  },
  Html: {
    type: String,
  },
  Badge: {
    type: Object,
  },
  IsPublished: String,
  Store: {
    type: String,
  },
});

export default mongoose.model("bundleSchema", bundleSchema);
