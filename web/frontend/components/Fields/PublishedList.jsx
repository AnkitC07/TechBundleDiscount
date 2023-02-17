import {
  Card,
  ResourceList,
  Avatar,
  ResourceItem,
  Stack,
} from "@shopify/polaris";
import React from "react";
import BadgeCustom from "./BadgeCustom";

function PublishedList({ item }) {

  
  return (
    <Card>
      <ResourceList
        resourceName={{ singular: "customer", plural: "customers" }}
        items={item}
        renderItem={(item) => {
            let start = ''
            let end = "" 
            let finalStr = ""
            if(item.Content.advanceSetting.startDate.status == true){
                const date = new Date(item.Content.advanceSetting.startDate.date.start)
                start = date.toDateString()
             }
             if(item.Content.advanceSetting.endDate.status == true){
                const date = new Date(item.Content.advanceSetting.endDate.date.end)
                 end = date.toDateString()
             }

             if(start == "" && end == ""){
                finalStr = "No specific start and end time"
             }else if(start !== "" && end !== "" ){
                finalStr = `${start} and ${end}`
             }else{
                finalStr = `${start}${end}`
             }
          return (
            <ResourceItem id={item._id} url={`/bundleDiscount?id=${item._id}`}>
              <Stack distribution="fillEvenly">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div>
                      <h1 style={{ fontWeight: "bold" }}>
                        {item.Content.discountName}
                      </h1>
                    </div>
                    <div className="px-5">
                      <h1 style={{ fontWeight: "400" }}>
                        {item.Content.offerHeader}
                      </h1>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div>
                        {finalStr}
                    </div>
                    <div className="px-5">
                      {item.IsPublished == "published" ? (
                        <BadgeCustom status={"success"} text={"Published"} />
                      ) : (
                        <BadgeCustom status={""} text={"Not Published"} />
                      )}
                    </div>
                  </div>
                </div>
              </Stack>
            </ResourceItem>
          );
        }}
      />
    </Card>
  );
}
export default PublishedList;
