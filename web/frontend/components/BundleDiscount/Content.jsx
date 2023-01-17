import { Checkbox, Icon, TextField } from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import CheckBoxComponent from '../Fields/CheckBoxComponent'
import ChoiceListComp from '../Fields/ChoiceListComp'
import DatePickerExample from '../Fields/DatePickerInput'
import InputComponent from '../Fields/InputComponent'
import InputSelect from '../Fields/InputSelect'
import SearchFilter from '../Fields/SearchFilter'
import TextFieldComp from '../Fields/TextFieldComp'
import { SearchMinor, CirclePlusMajor } from '@shopify/polaris-icons';
import ResourcePickerComp from '../Fields/ResourcePickerComp'
import ComboBoxComp from '../Fields/ComboBoxComp'

const Content = ({ bundle, setBundle }) => {

    const product = [
        {
            "id": 7666904072442,
            "title": "Example T-Shirt",
            "body_html": "Awesome!",
            "vendor": "Acme",
            "product_type": "Shirts",
            "created_at": "2022-07-05T10:03:15+05:30",
            "handle": "example-t-shirt",
            "updated_at": "2022-08-19T18:08:39+05:30",
            "published_at": "2022-07-05T10:03:14+05:30",
            "template_suffix": "",
            "status": "active",
            "published_scope": "web",
            "tags": "mens t-shirt example",
            "admin_graphql_api_id": "gid://shopify/Product/7666904072442",
            "variants": [
                {
                    "id": 42954711892218,
                    "product_id": 7666904072442,
                    "title": "Lithograph",
                    "price": "25.00",
                    "sku": "shirt",
                    "position": 1,
                    "inventory_policy": "continue",
                    "compare_at_price": null,
                    "fulfillment_service": "manual",
                    "inventory_management": "shopify",
                    "option1": "Lithograph",
                    "option2": null,
                    "option3": null,
                    "created_at": "2022-07-05T10:03:16+05:30",
                    "updated_at": "2022-08-19T14:49:15+05:30",
                    "taxable": true,
                    "barcode": "",
                    "grams": 3629,
                    "image_id": 37680601334010,
                    "weight": 3629,
                    "weight_unit": "g",
                    "inventory_item_id": 45050420134138,
                    "inventory_quantity": -10,
                    "old_inventory_quantity": -10,
                    "requires_shipping": true,
                    "admin_graphql_api_id": "gid://shopify/ProductVariant/42954711892218"
                },
                {
                    "id": 42954711924986,
                    "product_id": 7666904072442,
                    "title": "Small",
                    "price": "19.99",
                    "sku": "shirt",
                    "position": 2,
                    "inventory_policy": "continue",
                    "compare_at_price": "24.99",
                    "fulfillment_service": "manual",
                    "inventory_management": "shopify",
                    "option1": "Small",
                    "option2": null,
                    "option3": null,
                    "created_at": "2022-07-05T10:03:16+05:30",
                    "updated_at": "2022-08-19T16:16:02+05:30",
                    "taxable": true,
                    "barcode": "",
                    "grams": 200,
                    "image_id": null,
                    "weight": 200,
                    "weight_unit": "g",
                    "inventory_item_id": 45050420166906,
                    "inventory_quantity": -2,
                    "old_inventory_quantity": -2,
                    "requires_shipping": true,
                    "admin_graphql_api_id": "gid://shopify/ProductVariant/42954711924986"
                },
                {
                    "id": 42954711957754,
                    "product_id": 7666904072442,
                    "title": "Medium",
                    "price": "19.99",
                    "sku": "example-shirt-m",
                    "position": 3,
                    "inventory_policy": "continue",
                    "compare_at_price": "24.99",
                    "fulfillment_service": "manual",
                    "inventory_management": "shopify",
                    "option1": "Medium",
                    "option2": null,
                    "option3": null,
                    "created_at": "2022-07-05T10:03:16+05:30",
                    "updated_at": "2022-08-18T11:51:23+05:30",
                    "taxable": true,
                    "barcode": "",
                    "grams": 200,
                    "image_id": null,
                    "weight": 200,
                    "weight_unit": "g",
                    "inventory_item_id": 45050420199674,
                    "inventory_quantity": 1,
                    "old_inventory_quantity": 1,
                    "requires_shipping": true,
                    "admin_graphql_api_id": "gid://shopify/ProductVariant/42954711957754"
                }
            ],
            "options": [
                {
                    "id": 9748493697274,
                    "product_id": 7666904072442,
                    "name": "Title",
                    "position": 1,
                    "values": [
                        "Lithograph",
                        "Small",
                        "Medium"
                    ]
                }
            ],
            "images": [
                {
                    "id": 37484196593914,
                    "product_id": 7666904072442,
                    "position": 1,
                    "created_at": "2022-07-05T10:03:15+05:30",
                    "updated_at": "2022-07-05T10:03:15+05:30",
                    "alt": null,
                    "width": 5000,
                    "height": 3335,
                    "src": "https://cdn.shopify.com/s/files/1/0653/7094/7834/products/green-t-shirt.jpg?v=1656995595",
                    "variant_ids": [],
                    "admin_graphql_api_id": "gid://shopify/ProductImage/37484196593914"
                },
                {
                    "id": 37680601334010,
                    "product_id": 7666904072442,
                    "position": 2,
                    "created_at": "2022-08-09T10:00:26+05:30",
                    "updated_at": "2022-08-09T10:00:26+05:30",
                    "alt": null,
                    "width": 285,
                    "height": 177,
                    "src": "https://cdn.shopify.com/s/files/1/0653/7094/7834/products/download.jpg?v=1660019426",
                    "variant_ids": [
                        42954711892218
                    ],
                    "admin_graphql_api_id": "gid://shopify/ProductImage/37680601334010"
                }
            ],
            "image": {
                "id": 37484196593914,
                "product_id": 7666904072442,
                "position": 1,
                "created_at": "2022-07-05T10:03:15+05:30",
                "updated_at": "2022-07-05T10:03:15+05:30",
                "alt": null,
                "width": 5000,
                "height": 3335,
                "src": "https://cdn.shopify.com/s/files/1/0653/7094/7834/products/green-t-shirt.jpg?v=1656995595",
                "variant_ids": [],
                "admin_graphql_api_id": "gid://shopify/ProductImage/37484196593914"
            }
        },
        {
            "id": 7666904137978,
            "title": "Exampleaaaaa",
            "body_html": "",
            "vendor": "Acme",
            "product_type": "Pants",
            "created_at": "2022-07-05T10:03:18+05:30",
            "handle": "example-pants",
            "updated_at": "2022-08-18T11:51:44+05:30",
            "published_at": "2022-07-05T10:03:51+05:30",
            "template_suffix": "",
            "status": "active",
            "published_scope": "web",
            "tags": "mens pants example",
            "admin_graphql_api_id": "gid://shopify/Product/7666904137978",
            "variants": [
                {
                    "id": 42954712219898,
                    "product_id": 7666904137978,
                    "title": "Jeans, W32H34",
                    "price": "49.99",
                    "sku": "jeans",
                    "position": 1,
                    "inventory_policy": "continue",
                    "compare_at_price": "57.99",
                    "fulfillment_service": "manual",
                    "inventory_management": "shopify",
                    "option1": "Jeans, W32H34",
                    "option2": null,
                    "option3": null,
                    "created_at": "2022-07-05T10:03:18+05:30",
                    "updated_at": "2022-08-18T11:51:38+05:30",
                    "taxable": true,
                    "barcode": "",
                    "grams": 1250,
                    "image_id": null,
                    "weight": 1250,
                    "weight_unit": "g",
                    "inventory_item_id": 45050420461818,
                    "inventory_quantity": 1,
                    "old_inventory_quantity": 1,
                    "requires_shipping": true,
                    "admin_graphql_api_id": "gid://shopify/ProductVariant/42954712219898"
                },
                {
                    "id": 43072019792122,
                    "product_id": 7666904137978,
                    "title": "black",
                    "price": "49.99",
                    "sku": "jeans",
                    "position": 2,
                    "inventory_policy": "continue",
                    "compare_at_price": "57.99",
                    "fulfillment_service": "manual",
                    "inventory_management": "shopify",
                    "option1": "black",
                    "option2": null,
                    "option3": null,
                    "created_at": "2022-08-02T15:01:27+05:30",
                    "updated_at": "2022-08-18T11:51:44+05:30",
                    "taxable": true,
                    "barcode": "",
                    "grams": 1250,
                    "image_id": null,
                    "weight": 1250,
                    "weight_unit": "g",
                    "inventory_item_id": 45167996928250,
                    "inventory_quantity": 1,
                    "old_inventory_quantity": 1,
                    "requires_shipping": true,
                    "admin_graphql_api_id": "gid://shopify/ProductVariant/43072019792122"
                }
            ],
            "options": [
                {
                    "id": 9748493795578,
                    "product_id": 7666904137978,
                    "name": "Title",
                    "position": 1,
                    "values": [
                        "Jeans, W32H34",
                        "black"
                    ]
                }
            ],
            "images": [
                {
                    "id": 37484196790522,
                    "product_id": 7666904137978,
                    "position": 1,
                    "created_at": "2022-07-05T10:03:18+05:30",
                    "updated_at": "2022-07-05T10:03:18+05:30",
                    "alt": null,
                    "width": 5000,
                    "height": 3333,
                    "src": "https://cdn.shopify.com/s/files/1/0653/7094/7834/products/distressed-kids-jeans.jpg?v=1656995598",
                    "variant_ids": [],
                    "admin_graphql_api_id": "gid://shopify/ProductImage/37484196790522"
                }
            ],
            "image": {
                "id": 37484196790522,
                "product_id": 7666904137978,
                "position": 1,
                "created_at": "2022-07-05T10:03:18+05:30",
                "updated_at": "2022-07-05T10:03:18+05:30",
                "alt": null,
                "width": 5000,
                "height": 3333,
                "src": "https://cdn.shopify.com/s/files/1/0653/7094/7834/products/distressed-kids-jeans.jpg?v=1656995598",
                "variant_ids": [],
                "admin_graphql_api_id": "gid://shopify/ProductImage/37484196790522"
            }
        },
        {
            "id": 7862048358650,
            "title": "hoddie",
            "body_html": "",
            "vendor": "ankit_learning_store",
            "product_type": "",
            "created_at": "2022-12-07T14:08:38+05:30",
            "handle": "hoddie",
            "updated_at": "2022-12-07T14:08:40+05:30",
            "published_at": "2022-12-07T14:08:39+05:30",
            "template_suffix": "",
            "status": "active",
            "published_scope": "web",
            "tags": "",
            "admin_graphql_api_id": "gid://shopify/Product/7862048358650",
            "variants": [
                {
                    "id": 43747803529466,
                    "product_id": 7862048358650,
                    "title": "Default Title",
                    "price": "12.00",
                    "sku": "",
                    "position": 1,
                    "inventory_policy": "continue",
                    "compare_at_price": null,
                    "fulfillment_service": "manual",
                    "inventory_management": "shopify",
                    "option1": "Default Title",
                    "option2": null,
                    "option3": null,
                    "created_at": "2022-12-07T14:08:38+05:30",
                    "updated_at": "2022-12-07T14:08:38+05:30",
                    "taxable": true,
                    "barcode": "",
                    "grams": 0,
                    "image_id": null,
                    "weight": 0,
                    "weight_unit": "kg",
                    "inventory_item_id": 45811859718394,
                    "inventory_quantity": 0,
                    "old_inventory_quantity": 0,
                    "requires_shipping": true,
                    "admin_graphql_api_id": "gid://shopify/ProductVariant/43747803529466"
                }
            ],
            "options": [
                {
                    "id": 9982520033530,
                    "product_id": 7862048358650,
                    "name": "Title",
                    "position": 1,
                    "values": [
                        "Default Title"
                    ]
                }
            ],
            "images": [],
            "image": null
        },
        {
            "id": 7695918563578,
            "title": "short sleeves T-shirt",
            "body_html": "White coloured plain",
            "vendor": "ankit_learning_store",
            "product_type": "Clothing",
            "created_at": "2022-08-02T14:39:38+05:30",
            "handle": "short-sleeves-t-shirt",
            "updated_at": "2022-08-18T11:52:04+05:30",
            "published_at": "2022-08-02T14:39:39+05:30",
            "template_suffix": "",
            "status": "active",
            "published_scope": "web",
            "tags": "",
            "admin_graphql_api_id": "gid://shopify/Product/7695918563578",
            "variants": [
                {
                    "id": 43071981420794,
                    "product_id": 7695918563578,
                    "title": "Default Title",
                    "price": "450.00",
                    "sku": "shirt",
                    "position": 1,
                    "inventory_policy": "continue",
                    "compare_at_price": "500.00",
                    "fulfillment_service": "manual",
                    "inventory_management": "shopify",
                    "option1": "Default Title",
                    "option2": null,
                    "option3": null,
                    "created_at": "2022-08-02T14:39:38+05:30",
                    "updated_at": "2022-08-18T11:52:04+05:30",
                    "taxable": true,
                    "barcode": "",
                    "grams": 100,
                    "image_id": null,
                    "weight": 0.1,
                    "weight_unit": "kg",
                    "inventory_item_id": 45167958360314,
                    "inventory_quantity": 0,
                    "old_inventory_quantity": 0,
                    "requires_shipping": true,
                    "admin_graphql_api_id": "gid://shopify/ProductVariant/43071981420794"
                }
            ],
            "options": [
                {
                    "id": 9785619644666,
                    "product_id": 7695918563578,
                    "name": "Title",
                    "position": 1,
                    "values": [
                        "Default Title"
                    ]
                }
            ],
            "images": [],
            "image": null
        }
    ]
    const [bundleDiv, setbundleDiv] = useState(['Product #1', 'Product #2'])
    const updateRadio = (key) => {
        const data = bundle.bundleDiscount;
        Object.keys(data).forEach(x => {
            data[x].status = false
        })
        data[key].status = true
        setBundle({ ...bundle })
    };
    //---Advance Settings Choice list states---//
    const [selected, setSelected] = useState(['hidden']);
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleChange = useCallback((value) => setSelected(value), []);

    //---Choice list states ends---//
    //---Free gift choice list---//
    const [freeSelected, setFreeSelected] = useState(['hidden']);
    const freeHandleChange = useCallback((value) => setFreeSelected(value), []);
    const roundDiscountSelect = [
        {
            data: '.00',
            value: '.00',
        },
        {
            data: '.49',
            value: '.49',
        },
        {
            data: '.50',
            value: '.50',
        },
        {
            data: '.95',
            value: '.95',
        },
        {
            data: '.99',
            value: '.99',
        },
    ]
    const handleSpecificCheck = (value) => {
        bundle.advanceSetting.specific.specificSlected = [...bundle.advanceSetting.specific.specificSlected, value]
    };
    //---Childrens in choicelists---//
    const specificChild = useCallback(
        (isSelected) => {
            return (
                isSelected && (
                    <>
                        {/* // bundle.bundleDiscount.freeGift.freeGiftSlected.length == 0 ? */}
                        <div className=" Polaris-Text--subdued mt-2">
                            Select atleast one product
                        </div>
                        {/* //  : */}
                        <div className='selected_product_list'>
                            {/* <ChoiceListComp selected={freeSelected} handleChange={freeHandleChange} choice={freeGift} /> */}
                            {bundle.bundleDiscount.freeGift.freeGiftSlected.map((x, i) =>
                                <Checkbox
                                    label={`Product #${i + 1}`}
                                    checked={bundle.advanceSetting.specific.specificSlected[i]}
                                    onChange={() => handleSpecificCheck()}
                                />
                            )}

                        </div>
                    </>
                )
            )
        }
        ,
        [handleChange, freeSelected],
    );
    const startDateChild = useCallback(
        (isSelected) => {
            return (
                isSelected && (
                    <div className="row">
                        <div className="col-lg-8 col-md-18 col-sm-12 mt-1">
                            <div className="mb-1">
                                <DatePickerExample
                                    state1={bundle.advanceSetting.startDate.date}
                                    onChange={(e) => {
                                        bundle.advanceSetting.startDate.date = e
                                        setBundle({ ...bundle })
                                    }}
                                // disable={!modal.isEnabled}
                                />
                                <span id="start_date_err" className="err"></span>
                            </div>
                        </div>
                    </div>
                )
            )
        }
        ,
        [handleChange],
    );
    const endDateChild = useCallback(
        (isSelected) => {
            return (
                isSelected && (
                    <div className="row">
                        <div className="col-lg-8 col-md-18 col-sm-12 mt-1">
                            <div className="mb-0">
                                <DatePickerExample
                                    state1={bundle.advanceSetting.endDate.date}
                                    onChange={(e) => {
                                        bundle.advanceSetting.endDate.date = e
                                        setBundle({ ...bundle })
                                    }}
                                // disable={!modal.isEnabled}
                                />
                                <span id="end_date_err" className="err"></span>
                            </div>
                        </div>
                    </div>
                )
            )
        }
        ,
        [handleChange],
    );
    const roundDiscountChild = useCallback(
        (isSelected) => {
            return (
                isSelected && (
                    <div className="row">
                        <div className="col-lg-8 col-md-18 col-sm-12 mt-1">
                            <InputSelect
                                id="round_discount"
                                option={roundDiscountSelect}
                                value={bundle.advanceSetting.roundDiscount.roundDiscountSelected}
                                // placeholder="Unpublish timer"
                                onChange={(e) => {
                                    bundle.advanceSetting.roundDiscount.roundDiscountSelected = e.target.value;
                                    setBundle({ ...bundle })
                                    // console.log(e)
                                    // setContent({
                                    //     ...content,
                                    //     onceItEnd: e.target.value,
                                    // })
                                }}
                            />
                        </div>
                    </div>
                )
            )
        }
        ,
        [handleChange],
    );
    const targetDiscountChild = useCallback(
        (isSelected) => {
            return (
                isSelected && (
                    // <SearchFilter />
                    <div className="searchBoxTag">
                        <ComboBoxComp />
                    </div>
                )
            )
        }
        ,
        [handleChange],
    );
    //---Childrens  in choicelists---//
    //---Free gift choice list---//
    const discountType = [
        {
            data: '% OFF',
            value: '% OFF',
            selected
        },
        {
            data: '$ OFF',
            value: '$ OFF',
        },
    ]
    const freeGift = [
        {
            label: `Product #1`,
            value: '1',
        },
    ]
    const choiceListArray = [
        {
            label: 'Customer must choose an option',
            value: 'choose an option',
            helpText:
                'Show “choose an option” inside the variant selection and block the main button until variants are manually selected',
        },
        {
            label: 'Hide from storefront',
            value: 'hide',
            helpText:
                'Check this box if you want to hide the offer widget in the storefront, but apply discounts based on these rules.',
        },
        {
            label: 'Show only on specific product pages',
            value: 'specific',
            renderChildren: specificChild,
        },
        {
            label: 'Set start time',
            value: 'startTime',
            renderChildren: startDateChild,
        },
        {
            label: 'Set end time',
            value: 'endTime',
            renderChildren: endDateChild,
        },
        {
            label: 'Round discounted prices',
            value: 'roundDiscount',
            renderChildren: roundDiscountChild,
        },
        {
            label: 'Target customers',
            value: 'target',
            helpText:
                'To enable this feature, please create customer tags to customers your customer in “Customer” menu',
            renderChildren: targetDiscountChild,
        },
    ]

    useEffect(() => {
        console.log('Bundle=> ', bundle)

    }, [bundle])

    return (
        <>
            <div className="row pb-5">
                <div className="ol-lg-6 col-md-6 col-sm-6">
                    <div className="Polaris-Card" >
                        <div className="Polaris-Card__Section">
                            <div className="Polaris-FormLayout">
                                <div className="Polaris-FormLayout__Item">
                                    <span className="Polaris-TextStyle--variationStrong">
                                        Bundle Offer Detail
                                    </span>
                                </div>
                                <div className="Polaris-FormLayout__Item">
                                    <div className="Polaris-Labelled__LabelWrapper">
                                        <div className="Polaris-Label">
                                            <label
                                                id="nameLabel"
                                                htmlFor="name"
                                                className="Polaris-Label__Text"
                                            >
                                                Offer header
                                            </label>
                                        </div>
                                    </div>
                                    <InputComponent
                                        id="name"
                                        type="text"
                                        default={bundle.offerHeader}
                                        onChange={(e) => {
                                            setBundle({
                                                ...bundle,
                                                offerHeader: e.target.value,
                                            })
                                        }}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="Polaris-Card__Section">
                            <div className="sc-bczRLJ czvMoD">
                                <div className="Polaris-FormLayout">
                                    <div className="Polaris-FormLayout__Item">
                                        <span className="Polaris-TextStyle--variationStrong">
                                            Bundle Products
                                        </span>
                                        <div className=" Polaris-Text--subdued">
                                            Bundle offers will show inside each product page that is included in the bundle .
                                        </div>
                                        <div id="product_search_section" class="mt-5">
                                            {bundleDiv.map((item, i) =>
                                                <div class="products_selected position_relative" data-id="product_select_box1">

                                                    <div class="Polaris-TextContainer ">
                                                        {/* <TextFieldComp label={item} prefix={<Icon source={SearchMinor} />} placeholder={'Select a product'} /> */}
                                                        <div className="searchBoxTag"> <ComboBoxComp /></div>
                                                    </div>
                                                    {i === bundleDiv.length - 1 ?
                                                        <div className="position_center pointerclass" onClick={() => { bundleDiv.push(`Product #${++i + 1}`); setBundle({ ...bundle }) }}>
                                                            <Icon
                                                                source={CirclePlusMajor}
                                                                color="primary"

                                                            />
                                                        </div>
                                                        :
                                                        <div className="position_center " >
                                                            <Icon
                                                                source={CirclePlusMajor}
                                                                color="base"

                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            )}
                                            <center>
                                                <p class="mt-4 add_another_pro ">Add another product</p>
                                            </center>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Polaris-Card__Section">
                            <div className="sc-bczRLJ czvMoD">
                                <div className="Polaris-FormLayout">
                                    <div>
                                        <div className="Polaris-FormLayout__Item">
                                            <span className="Polaris-TextStyle--variationStrong">
                                                Bundle discount
                                            </span>
                                        </div>
                                        <CheckBoxComponent
                                            id="adddiscount"
                                            name="bundleDiscount"
                                            label="Add Discount"
                                            decription=""
                                            checked={bundle.bundleDiscount.addDiscount.status}
                                            onChange={(e) => {
                                                updateRadio("addDiscount");
                                            }}
                                        />
                                        {bundle.bundleDiscount.addDiscount.status ? <div
                                            id="addDiscount"
                                            className="Polaris-FormLayout__Item"
                                        >
                                            <div className="inputAndSlect">
                                                <InputComponent
                                                    type={'number'}
                                                    placeholder={'10'}
                                                    default={bundle.bundleDiscount.addDiscount.discountValue}
                                                    onChange={(e) => {
                                                        bundle.bundleDiscount.addDiscount.discountValue = e.target.value
                                                        setBundle({ ...bundle })
                                                    }}
                                                />
                                                <InputSelect
                                                    id="addDiscountSelect"
                                                    option={discountType}
                                                    value={bundle.bundleDiscount.addDiscount.discountType}
                                                    placeholder="Unpublish timer"
                                                    onChange={(e) => {
                                                        bundle.bundleDiscount.addDiscount.discountType = e.target.value
                                                        setBundle({ ...bundle })
                                                    }}
                                                />
                                            </div>
                                        </div> : ''}

                                        <CheckBoxComponent
                                            id="freeship"
                                            name="bundleDiscount"
                                            label="Free Shipping"
                                            decription="Free shipping cannot be combined with other types of discounts."
                                            checked={bundle.bundleDiscount.freeShiping.status}
                                            onChange={(e) => {
                                                updateRadio("freeShiping");
                                            }}
                                        />
                                        <CheckBoxComponent
                                            id="freegift"
                                            name="bundleDiscount"
                                            label="Free Gift"
                                            decription="Select a bundle product you want to give free."
                                            checked={bundle.bundleDiscount.freeGift.status}
                                            onChange={(e) => {
                                                updateRadio("freeGift");
                                            }}
                                        />
                                        {bundle.bundleDiscount.freeGift.status ? <>
                                            <div className="Polaris-FormLayout__Item">
                                                {/* {bundle.bundleDiscount.freeGift.freeGiftSlected == 0 ? */}
                                                <div className="Polaris-Choice__Descriptions Polaris-Text--subdued">
                                                    Select atleast one product
                                                </div>
                                                {/* //  : */}
                                                <div className='Polaris-Choice__Descriptions freeProducts-Bundle '>
                                                    <div className='selected_product_list'>
                                                        {/* <ChoiceListComp selected={freeSelected} handleChange={freeHandleChange} choice={freeGift} /> */}
                                                        {bundle.bundleDiscount.freeGift.freeGiftSlected.map((x, i) =>
                                                            <Checkbox
                                                                label={`Product #${i + 1}`}
                                                                checked={bundle.advanceSetting.specific.specificSlected[i]}
                                                                onChange={() => handleSpecificCheck()}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                {/* // } */}
                                            </div>

                                            <div className="Polaris-FormLayout__Item">
                                                <div className="Polaris-Text--subdued" id="nameHelpText">
                                                    <strong>Please Note :</strong>   Bundle offers will show inside each product page that is included in the bundle .
                                                </div>
                                            </div></> : ''}

                                        <CheckBoxComponent
                                            id="nodiscount"
                                            name="bundleDiscount"
                                            label="No Discount"
                                            decription=""
                                            checked={bundle.bundleDiscount.noDiscount.status}
                                            onChange={(e) => {
                                                updateRadio("noDiscount");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Polaris-Card__Section">
                            <div className="sc-bczRLJ czvMoD">
                                <div className="Polaris-FormLayout">
                                    <div className="Polaris-FormLayout__Item">
                                        <span className="Polaris-TextStyle--variationStrong">
                                            Advanced settings
                                        </span>
                                    </div>
                                    <div className="advanceChoiceList choiceList">
                                        <ChoiceListComp selected={selected} handleChange={handleChange} choice={choiceListArray} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="col col-md-5" id='productTimer' ref={ref}>
                    <div style={{ position: 'sticky', top: '20px' }} >
                    </div>
                </div> */}
                {/* <ResourcePickerComp type="Product" state1={false} /> */}
            </div>
        </>
    )
}

export default Content