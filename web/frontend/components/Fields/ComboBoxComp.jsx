import { Listbox, Combobox, Icon, Stack, Tag, TextField } from '@shopify/polaris';
import { SearchMinor } from '@shopify/polaris-icons';
import { useEffect } from 'react';
import { useState, useCallback, useMemo } from 'react';

function ComboBoxComp(props) {
    // const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];
    const [selectedTags, setSelectedTags] = useState([])
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
            props.onRemove(tag)
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
    const handelCheck = (x) => {
        props.onClick(x)
        console.log('checking', x.title)
        // selectedTags = [`${x.title}`]
        setSelectedTags([`${x.title}`])
    }



    return (
        <>
            <TextField
                // label="Tags"
                onFocus={togglePopoverActive}
                // onBlur={togglePopoverActive}
                prefix={''}
                value={textFieldValue}
                onChange={handleTextFieldChange}
                placeholder="Select a product"
                autoComplete="off"
                className={'selected_pro'}
                verticalContent={verticalContentMarkup}
            />
            {popoverActive ?
                <div className="product_show">
                    <ul className="products_li selected_pro">
                        {props.products.map((x, i) =>
                            <li
                                key={x.id}
                                className='selected_pro'
                                onClick={(e) => {
                                    handelCheck(x)

                                    setTimeout(() => {
                                        togglePopoverActive()
                                    }, 200)
                                }} >
                                <div className="selected_pro product_list save_bar_display_block" id={x.id} data-pro_id={x.id} data-pro_title={x.title}>
                                    <div className="selected_pro pro_image">
                                        <img src={x.image ? x.image.src : 'no_image.png'} className="imgae_res selected_pro" />
                                    </div>
                                    <div className="product_title selected_pro"><span>{x.title}</span></div>
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