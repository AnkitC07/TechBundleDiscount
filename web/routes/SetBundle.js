import express from "express";
import Bundle from "../model/Bundle.js";
import bundleSchema from "../model/Bundle.js";
const bundleRouter = express.Router();

bundleRouter.post("/setBundle", async (req, res) => {
  try {
    const status = req.query.status;
    const id = req.query.id;
    const body = req.body;

    const sendStatus =
      req.query.status == "save" || req.query.status == "Duplicate"
        ? req.query.status
        : body.ispublished;
    if (id == "null" || id == "" || req.query.status == "Duplicate") {
      await bundleSchema
        .create({
          Content: body.content,
          Design: body.design,
          Placement: body.placement,
          Html: body.Html,
          BadgeHtml: body.BadgeHtml,
          Badge: body.badge,
          IsPublished: body.ispublished,
          Store: res.locals.shopify.session.shop,
        })
        .then((item) => {
          console.log(item, "Created");
          res.status(200).json({ status: sendStatus, id: item._id });
        })
        .catch((err) => {
          console.log(err, "While Creating");
          res.status(400).send("Unable to save to database");
        });
    } else {
      console.log("update");
      console.log(sendStatus);
      bundleSchema.findByIdAndUpdate(
        { _id: id },
        {
          Content: body.content,
          Design: body.design,
          Placement: body.placement,
          Html: body.Html,
          BadgeHtml: body.BadgeHtml,
          Badge: body.badge,
          IsPublished: body.ispublished,
          Store: res.locals.shopify.session.shop,
        },
        { new: true },
        function (err, result) {
          if (err) return;
          res.status(200).json({ status: sendStatus, id: result._id });
        }
      );
    }
    // res.status(200).send({ status: "published" });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

bundleRouter.delete("/deleterecord", async (req, res) => {
  try {
    const id = req.query.id;
    console.log("delete id", id);
    bundleSchema.findByIdAndDelete({ _id: id }, function (err, obj) {
      if (err) {
        console.log(err);
        res.status(500).json({ code: 400, error: err });
      }
      console.log(obj, "deleted");
      res.status(200).json({ code: 200, messgae: "deleted" });
    });
  } catch (err) {
    res.status(500).json({ code: 500, error: err });
  }
});
export default bundleRouter;
