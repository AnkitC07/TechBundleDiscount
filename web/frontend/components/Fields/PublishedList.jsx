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
                                <h1 style={{ fontWeight: 'bold' }}>
                                    {item.Content.offerHeader}
                                    {/*  {item.Content.timerName} */}
                                </h1>
                                <div className=" dwxbiy">
                                    <div>
                                        {/* {item.Type} */}
                                    </div>
                                    <div>
                                        {/* 2 min */}
                                    </div>
                                    <div>

                                        {item.IsPublished == 'published' ?
                                            <BadgeCustom status={'success'} text={'Published'} />
                                            :
                                            <BadgeCustom status={''} text={'Not Published'} />
                                        }
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