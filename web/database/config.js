import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(
      "mongodb://bundleDiscountShopify:bundleDiscountapp$123@3.136.75.195:27017/bundleDiscount"
    )
    .then(() => {
      console.log("MongoDB Connected...");
    });
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
  const db = mongoose.connection;

  // Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

export default main;
