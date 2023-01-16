import { Card, hsbToHex } from "@shopify/polaris";
import { useEffect } from "react";
import { useState } from "react";
import Colorpicker from "../Common/ColorPicker";

const Design = ({ states }) => {
  const { designSettings, designSatte } = states;
  return (
    <>
      <div className="row">
        <div className="col-6">
          <Card title={"General Settings"} sectioned>
            <p className="mb-2 fs-6 fw-semibold">Height</p>
            <Colorpicker
              colors={designSettings.FontColor}
              state={{ designSettings, designSatte }}
              value={"FontColor"}
              pickerChanges={(e) => {
                console.log("update state values");
                const data = designSettings;
                data["FontColor"] = hsbToHex(e);
                designSatte({ ...designSettings });
              }}
              textChange={(e) => {
                const data = designSettings;
                data["FontColor"] = e;
                designSatte({ ...designSettings });
              }}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Design;
