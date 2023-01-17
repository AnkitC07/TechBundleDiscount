import { Listbox, Combobox, Icon, Stack, Tag, TextField } from '@shopify/polaris';
import { SearchMinor } from '@shopify/polaris-icons';
import { useState, useCallback, useMemo } from 'react';

function ComboBoxComp() {
    // const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];
    const [selectedTags, setSelectedTags] = useState(['Rustic', 'Antique', 'Vinyl', 'Refurbished'])
    const [textFieldValue, setTextFieldValue] = useState('');

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

    return (
        <TextField
            // label="Tags"
            prefix={''}
            value={textFieldValue}
            onChange={handleTextFieldChange}
            placeholder="Select a product"
            autoComplete="off"
            verticalContent={verticalContentMarkup}
        />
    );
}

export default ComboBoxComp