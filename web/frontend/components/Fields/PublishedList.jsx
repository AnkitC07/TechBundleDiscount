import { Card, ResourceList, Avatar, ResourceItem, Stack, } from '@shopify/polaris';
import React from 'react';
import BadgeCustom from './BadgeCustom';

function PublishedList({ item }) {


    return (

        <Card>
            <ResourceList
                resourceName={{ singular: 'customer', plural: 'customers' }}
                items={item}
                renderItem={(item) => {
                    // const { id, url, name, location } = item;
                    // const media = <Avatar customer size="medium" name={name} />;

                    return (
                        <ResourceItem
                            id={item._id}
                            url={`/bundleDiscount?id=${item._id}`}
                        // accessibilityLabel={`View details for ${name}`}
                        >

                            <Stack distribution="fillEvenly">
                                <div>
                                    <h1 style={{ fontWeight: "bold" }}>
                                        {item.Content.discountName}
                                    </h1>
                                </div>
                                <div>
                                    <h1 style={{ fontWeight: "bold" }}>
                                        {item.Content.offerHeader}
                                    </h1>
                                </div>
                                <div className=" dwxbiy">
                                    <div></div>
                                    <div></div>
                                    <div>
                                        {item.IsPublished == "published" ? (
                                            <BadgeCustom status={"success"} text={"Published"} />
                                        ) : (
                                            <BadgeCustom status={""} text={"Not Published"} />
                                        )}
                                    </div>
                                </div>
                            </Stack>
                        </ResourceItem>
                    );
                }}
            />
        </Card >
    );
}
export default PublishedList