import { Card } from "@shopify/polaris";
import { useEffect } from "react";
import { useState } from "react";
import Colorpicker from "../Common/ColorPicker";

const Design = ({ states }) => {
  const { designSettings, designSatte } = states
  return (
    <>
      <div className="bundle_top">
        <Card title={"General Settings"} sectioned>
          <p className="mt-4 fs-6 fw-semibold">Height</p>
          <Colorpicker
            colors={designSettings.FontSize}
            state={{ designSettings, designSatte }}
            value={"FontSize"}
          />
        </Card>
      </div>
    </>
  );
};

export default Design;
