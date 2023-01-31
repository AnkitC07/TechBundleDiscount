import { Badge } from '@shopify/polaris';
import React from 'react';

function BadgeCustom(props) {
    return <Badge status={props.status}>{props.text}</Badge>;
}
export default BadgeCustom