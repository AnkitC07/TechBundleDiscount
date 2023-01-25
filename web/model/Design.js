import mongoose from "mongoose";

const designSchema = new mongoose.Schema({
  settings: {
    type: Object,
  },
  button: {
    type: Object,
  },
  priceSavings: {
    type: Object,
  },
});

export default mongoose.model("designSchema", designSchema);
