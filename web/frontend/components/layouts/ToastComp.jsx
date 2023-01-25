import { Toast, Frame, Page, Button } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function ToastComp(props) {

    const toggleActive = useCallback(() => props.setActive((active) => !active), []);

    const toastMarkup = props.active ? (
        <Toast content={props.msg} onDismiss={toggleActive} />
    ) : null;

    return (
        <div >
            <Frame>

                {toastMarkup}

            </Frame>
        </div>
    );
}
export default ToastComp