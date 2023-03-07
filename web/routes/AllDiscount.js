import express from "express";
import mongoose from "mongoose";
import Bundle from "../model/Bundle.js";

const AllDiscount = express.Router();

AllDiscount.get("/getAllDiscount", async (req, res) => {
  try {
    let data;
    data = await Bundle.find({ Store: res.locals.shopify.session.shop }).sort({createdAt:-1}).catch(
      (err) => {
        res.status(500).send("Unable to get all discount");
        console.log(err, "All Discount");
      }
    );

    res.status(200).json({ status: data});
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

export default AllDiscount;
