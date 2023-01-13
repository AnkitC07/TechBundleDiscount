import { ChoiceList, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function ChoiceListComp(props) {

    // const [selected, setSelected] = useState(['hidden']);
    // const [textFieldValue, setTextFieldValue] = useState('');

    // const handleChange = useCallback((value) => setSelected(value), []);
    // const renderChildren = useCallback(
    //     (isSelected) =>
    //         isSelected && (
    //             <TextField
    //                 label="Minimum Quantity"
    //                 labelHidden
    //                 onChange={(value) => setTextFieldValue(value)}
    //                 value={textFieldValue}
    //                 autoComplete="off"
    //             />
    //         ),
    //     [handleChange, textFieldValue],
    // );

    return (
        <ChoiceList
            allowMultiple
            // title="While the customer is checking out"
            choices={props.choice}
            selected={props.selected}
            onChange={props.handleChange}
        />
    );
}
export default ChoiceListComp