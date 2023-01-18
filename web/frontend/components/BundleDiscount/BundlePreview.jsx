import { Card, Banner } from "@shopify/polaris";
import React from "react";

export default function BundlePreview() {
  return (
    <div className="BundlepreviewStyle">
      <div className="customCard">
        <Card title={"Preview"} sectioned>
          <div
            style={{ background: "lightgray", width: "100%", height: "100%" }}
          >
            <div className="emptyPreview">Offer Preview</div>
          </div>
        </Card>
      </div>
      <div className="mt-4">
        <Banner icon={false} onDismiss={() => {}}>
            <p>You can design the app in the "Design" tab after you're done creating your offer.</p>
        </Banner>
      </div>
    </div>
  );
}
