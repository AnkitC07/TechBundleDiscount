import { TextField } from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import CheckBoxComponent from '../Fields/CheckBoxComponent'
import ChoiceListComp from '../Fields/ChoiceListComp'
import DatePickerExample from '../Fields/DatePickerInput'
import InputComponent from '../Fields/InputComponent'
import InputSelect from '../Fields/InputSelect'
import SearchFilter from '../Fields/SearchFilter'

const Content = ({ bundle, setBundle }) => {


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

    //---Childrens in choicelists---//
    const specificChild = useCallback(
        (isSelected) => {
            return (
                isSelected && (

                    bundle.bundleDiscount.freeGift.freeGiftSlected == 1 ?
                        <div className=" Polaris-Text--subdued mt-2">
                            Select atleast one product
                        </div> : <div className='f'>
                            <ChoiceListComp selected={freeSelected} handleChange={freeHandleChange} choice={freeGift} />
                        </div>

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
                    <SearchFilter />
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
                <div className="col col-md-7">
                    <div className="Polaris-Card" style={{ maxWidth: '450px' }}>
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
                                            id="customPosition"
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
                                                    id="onceItEnds"
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
                                                {bundle.bundleDiscount.freeGift.freeGiftSlected == 0 ? <div className="Polaris-Choice__Descriptions Polaris-Text--subdued">
                                                    Select atleast one product
                                                </div> : <div className='Polaris-Choice__Descriptions freeProducts-Bundle '>
                                                    <ChoiceListComp selected={freeSelected} handleChange={freeHandleChange} choice={freeGift} />
                                                </div>}
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
            </div>
        </>
    )
}

export default Content