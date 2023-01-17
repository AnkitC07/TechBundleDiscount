import { Listbox, Combobox, Icon, Stack, Tag, TextField } from '@shopify/polaris';
import { SearchMinor } from '@shopify/polaris-icons';
import { useState, useCallback, useMemo } from 'react';

function ComboBoxComp(props) {
    // const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];
    const [selectedTags, setSelectedTags] = useState(['Rustic'])
    const [textFieldValue, setTextFieldValue] = useState('');
    const [popoverActive, setPopoverActive] = useState(false);
    const togglePopoverActive =
        () => setPopoverActive((popoverActive) => !popoverActive)
    const handleTextFieldChange = useCallback(
        (value) => setTextFieldValue(value),
        [],
    );
    const removeTag = useCallback(
        (tag) => () => {
            setSelectedTags((previousTags) =>
                previousTags.filter((previousTag) => previousTag !== tag),
            );
        },
        [],
    );
    const verticalContentMarkup =
        selectedTags.length > 0 ? (
            <Stack spacing="extraTight" alignment="center">
                {selectedTags.map((tag) => (
                    <Tag key={tag} onRemove={removeTag(tag)}>{tag}</Tag>
                ))}
            </Stack>
        ) : null;
    // console.log(props.products)
    const handelCheck = (id) => [
        console.log('checking', id)
    ]
    return (
        <>
            <TextField
                // label="Tags"
                onFocus={togglePopoverActive}
                onBlur={togglePopoverActive}
                prefix={''}
                value={textFieldValue}
                onChange={handleTextFieldChange}
                placeholder="Select a product"
                autoComplete="off"
                verticalContent={verticalContentMarkup}
            />
            {popoverActive ?
                <div className="product_show">
                    <ul className="products_li ">
                        {props.products.map((x, i) =>
                            <li onClick={handelCheck(x.id)} >
                                <div className="product_list save_bar_display_block" id={x.id} data-pro_id={x.id} data-pro_title={x.title}>
                                    <div className="pro_image">
                                        <img src={x.image ? x.image.src : 'no_image.png'} className="imgae_res" />
                                    </div>
                                    <div className="product_title"><span>{x.title}</span></div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                : ''}
        </>
    );
}

export default ComboBoxComp