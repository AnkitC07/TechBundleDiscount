import { Card, ResourceList, Avatar, ResourceItem, Stack, } from '@shopify/polaris';
import React from 'react';
import BadgeCustom from './BadgeCustom';

function PublishedList({ item }) {
    console.log(item[0].Type, "checking")
    const switchFn = (item) => {

        switch (item) {
            case 'Product Page':
                return '/ProductPage'
            case 'Top/Bottom Page':
                return '/Top_BottomPage/Content_top'
            case 'Landing Page':
                return '/LandingPage'
            // case 'Product Page':
            //     return '/ProductPage'
            // default:
            //     break;
        }
    }
    return (

        <Card>
            <ResourceList
                resourceName={{ singular: 'customer', plural: 'customers' }}
                items={item}
                renderItem={(item) => {
                    // const { id, url, name, location } = item;
                    // const media = <Avatar customer size="medium" name={name} />;
                    const page = switchFn(item.Type)
                    console.log(page, "page")
                    return (
                        <ResourceItem
                            id={item._id}
                            url={`${page}?id=${item._id}`}
                        // accessibilityLabel={`View details for ${name}`}
                        >
                            <Stack distribution="fillEvenly">
                                <h1 style={{ fontWeight: 'bold' }}>
                                    {item.Content.productTimer}
                                    {item.Content.timerName}
                                </h1>
                                <div className=" dwxbiy">
                                    <div>
                                        {item.Type}
                                    </div>
                                    <div>
                                        2 min
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