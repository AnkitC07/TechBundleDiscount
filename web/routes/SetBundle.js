import express from "express";
import bundleSchema from "../model/Bundle.js";
const bundleRouter = express.Router();

bundleRouter.post("/setBundle", async (req, res) => {
  try {
    // console.log(req.body, "Body");
    // console.log(res.locals.shopify.session);
    const body = req.body;
    const sendStatus =
      req.query.status == "save" || req.query.status == "Duplicate"
        ? req.query.status
        : body.ispublished;
    await bundleSchema
      .create({
        Content: body.content,
        Design: body.design,
        Placement: body.placement,
        Html: body.Html,
        Badge: body.badge,
        IsPublished: body.ispublished,
        Store: res.locals.shopify.session.shop,
      })
      .then((item) => {
        console.log(item);
        res.status(200).json({ status: sendStatus, id: item._id });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("Unable to save to database");
      });

    // res.status(200).send({ status: "published" });
  } catch (error) {
    res.status(200).send({ error: error });
  }
});
export default bundleRouter;
