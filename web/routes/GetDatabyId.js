import express from "express";
import mongoose from "mongoose";
import Bundle from "../model/Bundle.js";

const GetDatabyId = express.Router();

GetDatabyId.post("/getDataById", async (req, res) => {
  try {
    let data;
    await Bundle.findById(req.body.id)
      .then((item) => {
        console.log("data by Id", item);
        data = item;
      })
      .catch((err) => {
        // res.status(400).send('Unable to save to database')
        console.log(err);
      });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default GetDatabyId;
