import { TextField } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import CheckBoxComponent from '../Fields/CheckBoxComponent'
import ChoiceListComp from '../Fields/ChoiceListComp'
import InputComponent from '../Fields/InputComponent'
import InputSelect from '../Fields/InputSelect'

const Content = () => {
    //---Advance Settings Choice list states---//
    const [selected, setSelected] = useState(['hidden']);
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleChange = useCallback((value) => setSelected(value), []);

    //---Choice list states ends---//
    //---Free gift choice list---//
    const [freeSelected, setFreeSelected] = useState(['hidden']);
    const freeHandleChange = useCallback((value) => setFreeSelected(value), []);


    //---Childrens in choicelists---//
    const renderChildren = useCallback(
        (isSelected) =>
            isSelected && (
                <>
                    <TextField
                        label="Minimum Quantity"
                        labelHidden
                        onChange={(value) => setTextFieldValue(value)}
                        value={textFieldValue}
                        autoComplete="off"
                    />
                    {/* {console.log(isSelected)} */}
                </>
            ),
        [handleChange, textFieldValue],
    );
    const specificChild = useCallback(
        (isSelected) => {
            console.log(isSelected)
            return (
                isSelected && (
                    <>dfsa</>
                    // <div className="Polaris-FormLayout__Item">
                    //     {console.log(isSelected)}
                    //     <div className="Polaris-Choice__Descriptions Polaris-Text--subdued">
                    //         Select atleast one product
                    //     </div>
                    //     <div className='Polaris-Choice__Descriptions freeProducts-Bundle '>
                    //         <ChoiceListComp selected={freeSelected} handleChange={freeHandleChange} choice={freeGift} />
                    //     </div>
                    // </div>
                )
            )
        }
        ,
        [handleChange, freeSelected],
    );
    //---Childrens  in choicelists---//
    //---Free gift choice list---//
    const discountType = [
        {
            data: '% OFF',
            value: '%',
            selected
        },
        {
            data: '$ OFF',
            value: '$',
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
            specificChild,
        },
        {
            label: 'Set start time',
            value: 'startTime',
            renderChildren
        },
        {
            label: 'Set end time',
            value: 'endTime',
        },
        {
            label: 'Round discounted prices',
            value: 'roundDiscount',
        },
        {
            label: 'Target customers',
            value: 'target',
            helpText:
                'To enable this feature, please create customer tags to customers your customer in “Customer” menu',
        },
    ]

    return (
        <>
            <div className="row px-5 pb-5">
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
                                    // default={content.productTimer}
                                    // onChange={(e) => {
                                    //     setContent({
                                    //         ...content,
                                    //         productTimer: e.target.value,
                                    //     })
                                    // }}
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
                                        // checked={content.timerType == 'toDate' ? true : null}
                                        // onChange={(e) => {
                                        //     setContent({ ...content, timerType: e.target.value })
                                        // }}
                                        />
                                        <div
                                            id="customPosition"
                                            className="Polaris-FormLayout__Item"
                                        >
                                            <div className="inputAndSlect">
                                                <InputComponent
                                                    type={'number'}
                                                    placeholder={'10'}
                                                // default={placement.tags}
                                                // onChange={(e) => {
                                                //     setPlacement({
                                                //         ...placement,
                                                //         tags: e.target.value,
                                                //     })
                                                // }}
                                                />
                                                <InputSelect
                                                    id="onceItEnds"
                                                    option={discountType}
                                                // value={content.onceItEnd}
                                                // placeholder="Unpublish timer"
                                                // onChange={(e) => {
                                                //     setContent({
                                                //         ...content,
                                                //         onceItEnd: e.target.value,
                                                //     })
                                                // }}
                                                />
                                            </div>
                                        </div>
                                        <CheckBoxComponent
                                            id="freeship"
                                            name="bundleDiscount"
                                            label="Free Shipping"
                                            decription="Free shipping cannot be combined with other types of discounts."
                                        // checked={content.timerType == 'fixed' ? true : null}
                                        // onChange={(e) => {
                                        //     setContent({ ...content, timerType: e.target.value })
                                        // }}
                                        />
                                        <CheckBoxComponent
                                            id="freegift"
                                            name="bundleDiscount"
                                            label="Free Gift"
                                            decription="Select a bundle product you want to give free."
                                        // checked={content.timerType == 'recurring' ? true : null}
                                        // onChange={(e) => {
                                        //     setContent({ ...content, timerType: e.target.value })
                                        // }}
                                        />
                                        <div className="Polaris-FormLayout__Item">
                                            <div className="Polaris-Choice__Descriptions Polaris-Text--subdued">
                                                Select atleast one product
                                            </div>
                                            <div className='Polaris-Choice__Descriptions freeProducts-Bundle '>
                                                <ChoiceListComp selected={freeSelected} handleChange={freeHandleChange} choice={freeGift} />
                                            </div>
                                        </div>
                                        <div className="Polaris-FormLayout__Item">
                                            <div className="Polaris-Text--subdued" id="nameHelpText">
                                                <strong>Please Note :</strong>   Bundle offers will show inside each product page that is included in the bundle .
                                            </div>
                                        </div>
                                        <CheckBoxComponent
                                            id="nodiscount"
                                            name="bundleDiscount"
                                            label="No Discount"
                                            decription=""
                                        // checked={content.timerType == 'recurring' ? true : null}
                                        // onChange={(e) => {
                                        //     setContent({ ...content, timerType: e.target.value })
                                        // }}
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

                        {/* <div className="Polaris-Card__Section">
                            <div className="sc-bczRLJ czvMoD">
                                <div className="Polaris-FormLayout">
                                    <div>
                                        <div className="Polaris-FormLayout__Item">
                                            <span className="Polaris-TextStyle--variationStrong">
                                                Timer Type
                                            </span>
                                        </div>
                                        <CheckBoxComponent
                                            id="toDate"
                                            name="toDate"
                                            label="Countdown to a date"
                                            checked={content.timerType == 'toDate' ? true : null}
                                            decription="Timer that ends at the specific date."
                                            onChange={(e) => {
                                                setContent({ ...content, timerType: e.target.value })
                                            }}
                                        />
                                        <CheckBoxComponent
                                            id="fixed"
                                            name="toDate"
                                            label="Fixed minutes"
                                            checked={content.timerType == 'fixed' ? true : null}

                                            decription="Individual fixed minutes countdown for each buyer session."
                                            onChange={(e) => {
                                                setContent({ ...content, timerType: e.target.value })
                                            }}
                                        />
                                        <CheckBoxComponent
                                            id="recurring"
                                            name="toDate"
                                            checked={content.timerType == 'recurring' ? true : null}
                                            label="Daily recurring timer"
                                            decription="E.g. every weekday from 9 am to 11 am"
                                            onChange={(e) => {
                                                setContent({ ...content, timerType: e.target.value })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sc-bczRLJ czvMoD pt-3">
                                <div className="Polaris-FormLayout">
                                    {content.timerType == 'toDate' ? (
                                        content.timerStart == 'rightNow' ? (
                                            <>
                                                <div className="Polaris-FormLayout__Item">
                                                    <div className="Polaris-Labelled__LabelWrapper">
                                                        <div className="Polaris-Label">
                                                            <label
                                                                id="startDateLabel"
                                                                htmlFor="startDate"
                                                                className="Polaris-Label__Text"
                                                            >
                                                                Timer Start
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <CheckBoxComponent
                                                    id="rightNow"
                                                    name="timerStart"
                                                    checked={content.timerStart == 'rightNow' ? true : null}
                                                    label="Right now"
                                                    onChange={(e) => {
                                                        setContent({
                                                            ...content,
                                                            timerStart: e.target.value,
                                                        })
                                                    }}
                                                />
                                                <CheckBoxComponent
                                                    id="schedule"
                                                    name="timerStart"
                                                    checked={content.timerStart == 'schedule' ? true : null}
                                                    label="Schedule to start later"
                                                    onChange={(e) => {
                                                        setContent({
                                                            ...content,
                                                            timerStart: e.target.value,
                                                        })
                                                        // console.log(content.timerStart)
                                                    }}
                                                />
                                                <div className="Polaris-FormLayout__Item">
                                                    <div>
                                                        <div className="">
                                                            <div className="Polaris-Labelled__LabelWrapper">
                                                                <div className="Polaris-Label">
                                                                    <label
                                                                        id="endDateLabel"
                                                                        htmlFor="endDate"
                                                                        className="Polaris-Label__Text"
                                                                    >
                                                                        End date
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <DatePickerExample
                                                                state1={content.selectedEndDates}
                                                                onChange={(e) => {
                                                                    setContent({
                                                                        ...content,
                                                                        selectedEndDates: e,
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    role="group"
                                                    className="Polaris-FormLayout--condensed"
                                                >
                                                    <div className="Polaris-FormLayout__Items">
                                                        <div className="Polaris-FormLayout__Item">
                                                            <div className="">
                                                                <div className="Polaris-Labelled__LabelWrapper">
                                                                    <div className="Polaris-Label">
                                                                        <label
                                                                            id="hoursLabel"
                                                                            htmlFor="hours"
                                                                            className="Polaris-Label__Text"
                                                                        >
                                                                            Hours
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <InputNumber
                                                                    id="hours"
                                                                    label="hoursLabel"
                                                                    defaultValue={content.endHrs}
                                                                    state1={content.endHrs}
                                                                    onChange={(e) => {
                                                                        setContent({
                                                                            ...content,
                                                                            endHrs: e,
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="Polaris-FormLayout__Item">
                                                            <div className="">
                                                                <div className="Polaris-Labelled__LabelWrapper">
                                                                    <div className="Polaris-Label">
                                                                        <label
                                                                            id="minutesLabel"
                                                                            htmlFor="minutes"
                                                                            className="Polaris-Label__Text"
                                                                        >
                                                                            Minutes
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <InputNumber
                                                                    id="minutes"
                                                                    label="minutesLabel"
                                                                    defaultValue={content.endMnt}
                                                                    state1={content.endMnt}
                                                                    onChange={(e) => {
                                                                        setContent({
                                                                            ...content,
                                                                            endMnt: e,
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="Polaris-FormLayout__Item">
                                                    <div className="Polaris-Labelled__LabelWrapper">
                                                        <div className="Polaris-Label">
                                                            <label
                                                                id="startDateLabel"
                                                                htmlFor="startDate"
                                                                className="Polaris-Label__Text"
                                                            >
                                                                Timer Start
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <CheckBoxComponent
                                                    id="rightNow"
                                                    name="timerStart"
                                                    checked={content.timerStart == 'rightNow' ? true : null}
                                                    label="Right now"
                                                    onChange={(e) => {
                                                        setContent({
                                                            ...content,
                                                            timerStart: e.target.value,
                                                        })
                                                    }}
                                                />
                                                <CheckBoxComponent
                                                    id="schedule"
                                                    name="timerStart"
                                                    checked={content.timerStart == 'schedule' ? true : null}
                                                    label="Schedule to start later"
                                                    onChange={(e) => {
                                                        setContent({
                                                            ...content,
                                                            timerStart: e.target.value,
                                                        })
                                                        // console.log(content.timerStart)
                                                    }}
                                                />
                                                <div className="Polaris-FormLayout__Item">
                                                    <div>
                                                        <div className="">
                                                            <div className="Polaris-Labelled__LabelWrapper">
                                                                <div className="Polaris-Label">
                                                                    <label
                                                                        id="startDateLabel"
                                                                        htmlFor="startDate"
                                                                        className="Polaris-Label__Text"
                                                                    >
                                                                        Start date
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <DatePickerExample
                                                                state1={content.selectedDates}
                                                                onChange={(e) => {
                                                                    setContent({
                                                                        ...content,
                                                                        selectedDates: e,
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    role="group"
                                                    className="Polaris-FormLayout--condensed"
                                                >
                                                    <div className="Polaris-FormLayout__Items">
                                                        <div className="Polaris-FormLayout__Item">
                                                            <div className="">
                                                                <div className="Polaris-Labelled__LabelWrapper">
                                                                    <div className="Polaris-Label">
                                                                        <label
                                                                            id="hoursLabel"
                                                                            htmlFor="hours"
                                                                            className="Polaris-Label__Text"
                                                                        >
                                                                            Hours
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <InputNumber
                                                                    id="hours"
                                                                    label="hoursLabel"
                                                                    defaultValue={content.startHrs}
                                                                    onChange={(e) => {
                                                                        setContent({
                                                                            ...content,
                                                                            startHrs: e,
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="Polaris-FormLayout__Item">
                                                            <div className="">
                                                                <div className="Polaris-Labelled__LabelWrapper">
                                                                    <div className="Polaris-Label">
                                                                        <label
                                                                            id="minutesLabel"
                                                                            htmlFor="minutes"
                                                                            className="Polaris-Label__Text"
                                                                        >
                                                                            Minutes
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <InputNumber
                                                                    id="minutes"
                                                                    label="minutesLabel"
                                                                    defaultValue={content.startMnt}
                                                                    onChange={(e) => {
                                                                        setContent({
                                                                            ...content,
                                                                            startMnt: e,
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Polaris-FormLayout__Item">
                                                    <div>
                                                        <div className="">
                                                            <div className="Polaris-Labelled__LabelWrapper">
                                                                <div className="Polaris-Label">
                                                                    <label
                                                                        id="endDateLabel"
                                                                        htmlFor="endDate"
                                                                        className="Polaris-Label__Text"
                                                                    >
                                                                        End date
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <DatePickerExample
                                                                state1={content.selectedEndDates}
                                                                onChange={(e) => {
                                                                    setContent({
                                                                        ...content,
                                                                        selectedEndDates: e,
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    role="group"
                                                    className="Polaris-FormLayout--condensed"
                                                >
                                                    <div className="Polaris-FormLayout__Items">
                                                        <div className="Polaris-FormLayout__Item">
                                                            <div className="">
                                                                <div className="Polaris-Labelled__LabelWrapper">
                                                                    <div className="Polaris-Label">
                                                                        <label
                                                                            id="hoursLabel"
                                                                            htmlFor="hours"
                                                                            className="Polaris-Label__Text"
                                                                        >
                                                                            Hours
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <InputNumber
                                                                    id="hours"
                                                                    label="hoursLabel"
                                                                    defaultValue={content.endHrs}
                                                                    state1={content.endHrs}
                                                                    onChange={(e) => {
                                                                        setContent({
                                                                            ...content,
                                                                            endHrs: e,
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="Polaris-FormLayout__Item">
                                                            <div className="">
                                                                <div className="Polaris-Labelled__LabelWrapper">
                                                                    <div className="Polaris-Label">
                                                                        <label
                                                                            id="minutesLabel"
                                                                            htmlFor="minutes"
                                                                            className="Polaris-Label__Text"
                                                                        >
                                                                            Minutes
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <InputNumber
                                                                    id="minutes"
                                                                    label="minutesLabel"
                                                                    defaultValue={content.endMnt}
                                                                    state1={content.endMnt}
                                                                    onChange={(e) => {
                                                                        setContent({
                                                                            ...content,
                                                                            endMnt: e,
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    ) : content.timerType == 'fixed' ? (
                                        <div className="Polaris-FormLayout__Item">
                                            <InputNumber
                                                id="fixedMnt"
                                                label="fixed"
                                                defaultValue={content.fixedTime}
                                                onChange={(e) => {
                                                    setContent({
                                                        ...content,
                                                        fixedTime: e,
                                                    })
                                                }}
                                            />
                                        </div>
                                    ) : content.timerType == 'recurring' ? (
                                        <>
                                            <div className="Polaris-FormLayout__Item">
                                                <div className="Polaris-Labelled__LabelWrapper">
                                                    <div className="Polaris-Label">
                                                        <label
                                                            id="RepeatOn"
                                                            htmlFor="RepeatOn"
                                                            className="Polaris-Label__Text"
                                                        >
                                                            Repeat on
                                                        </label>
                                                    </div>
                                                </div>
                                                <ul class="Polaris-ChoiceList__Choices">
                                                    <li class="Polaris-ChoiceList__ChoiceItem">
                                                        <CheckboxExample
                                                            label={'Monday'}
                                                            state1={content.RepeatOn.monday}
                                                            onChange={(e) => {
                                                                setContent((state) => {
                                                                    return {
                                                                        ...state,
                                                                        RepeatOn: {
                                                                            ...content.RepeatOn,
                                                                            monday: e,
                                                                        },
                                                                    }
                                                                })
                                                                console.log(e)
                                                            }}
                                                        />
                                                    </li>
                                                    <li class="Polaris-ChoiceList__ChoiceItem">
                                                        <CheckboxExample
                                                            label={'Tuesday'}
                                                            state1={content.RepeatOn.tuesday}
                                                            onChange={(e) => {
                                                                setContent((state) => {
                                                                    return {
                                                                        ...state,
                                                                        RepeatOn: {
                                                                            ...content.RepeatOn,
                                                                            tuesday: e,
                                                                        },
                                                                    }
                                                                })
                                                                console.log(e)
                                                            }}
                                                        />
                                                    </li>
                                                    <li class="Polaris-ChoiceList__ChoiceItem">
                                                        <CheckboxExample
                                                            label={'Wednesday'}
                                                            state1={content.RepeatOn.wednesday}
                                                            onChange={(e) => {
                                                                setContent((state) => {
                                                                    return {
                                                                        ...state,
                                                                        RepeatOn: {
                                                                            ...content.RepeatOn,
                                                                            wednesday: e,
                                                                        },
                                                                    }
                                                                })
                                                                console.log(e)
                                                            }}
                                                        />
                                                    </li>
                                                    <li class="Polaris-ChoiceList__ChoiceItem">
                                                        <CheckboxExample
                                                            label={'Thursday'}
                                                            state1={content.RepeatOn.thursday}
                                                            onChange={(e) => {
                                                                setContent((state) => {
                                                                    return {
                                                                        ...state,
                                                                        RepeatOn: {
                                                                            ...content.RepeatOn,
                                                                            thursday: e,
                                                                        },
                                                                    }
                                                                })
                                                                console.log(e)
                                                            }}
                                                        />
                                                    </li>
                                                    <li class="Polaris-ChoiceList__ChoiceItem">
                                                        <CheckboxExample
                                                            label={'Friday'}
                                                            state1={content.RepeatOn.friday}
                                                            onChange={(e) => {
                                                                setContent((state) => {
                                                                    return {
                                                                        ...state,
                                                                        RepeatOn: {
                                                                            ...content.RepeatOn,
                                                                            friday: e,
                                                                        },
                                                                    }
                                                                })
                                                                console.log(e)
                                                            }}
                                                        />
                                                    </li>
                                                    <li class="Polaris-ChoiceList__ChoiceItem">
                                                        <CheckboxExample
                                                            label={'Saturday'}
                                                            state1={content.RepeatOn.saturday}
                                                            onChange={(e) => {
                                                                setContent((state) => {
                                                                    return {
                                                                        ...state,
                                                                        RepeatOn: {
                                                                            ...content.RepeatOn,
                                                                            saturday: e,
                                                                        },
                                                                    }
                                                                })
                                                                console.log(e)
                                                            }}
                                                        />
                                                    </li>
                                                    <li class="Polaris-ChoiceList__ChoiceItem">
                                                        <CheckboxExample
                                                            label={'Sunday'}
                                                            state1={content.RepeatOn.sunday}
                                                            onChange={(e) => {
                                                                setContent((state) => {
                                                                    return {
                                                                        ...state,
                                                                        RepeatOn: {
                                                                            ...content.RepeatOn,
                                                                            sunday: e,
                                                                        },
                                                                    }
                                                                })
                                                                console.log(e)
                                                            }}
                                                        />
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="Polaris-FormLayout__Items">
                                                <div className="Polaris-FormLayout__Item">
                                                    <div className="Polaris-Labelled__LabelWrapper">
                                                        <div className="Polaris-Label">
                                                            <label
                                                                id="startDateLabel"
                                                                htmlFor="startDate"
                                                                className="Polaris-Label__Text"
                                                            >
                                                                Daily start timer
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <InputNumber
                                                        id="hours"
                                                        label="hoursLabel"
                                                        defaultValue={content.dailyStartHrs}
                                                        onChange={(e) => {
                                                            setContent({
                                                                ...content,
                                                                dailyStartHrs: e,
                                                            })
                                                        }}
                                                    />
                                                    <div
                                                        class="Polaris-Text--subdued"
                                                        id="minutesHelpText"
                                                    >
                                                        Hours
                                                    </div>
                                                </div>
                                                <div className="Polaris-FormLayout__Item">
                                                    <div className="Polaris-Labelled__LabelWrapper">
                                                        <div className="Polaris-Label">
                                                            <label
                                                                id="startDateLabel"
                                                                htmlFor="startDate"
                                                                className="Polaris-Label__Text"
                                                            >
                                                                &nbsp;
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <InputNumber
                                                        id="mnt"
                                                        label="mntLabel"
                                                        defaultValue={content.dailyStartMnt}
                                                        onChange={(e) => {
                                                            setContent({
                                                                ...content,
                                                                dailyStartMnt: e,
                                                            })
                                                        }}
                                                    />
                                                    <div
                                                        class="Polaris-Text--subdued"
                                                        id="minutesHelpText"
                                                    >
                                                        Minutes
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Polaris-FormLayout__Items">
                                                <div className="Polaris-FormLayout__Item">
                                                    <div className="Polaris-Labelled__LabelWrapper">
                                                        <div className="Polaris-Label">
                                                            <label
                                                                id="startDateLabel"
                                                                htmlFor="startDate"
                                                                className="Polaris-Label__Text"
                                                            >
                                                                Daily end timer
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <InputNumber
                                                        id="hours"
                                                        label="hoursLabel"
                                                        defaultValue={content.dailyEndHrs}
                                                        onChange={(e) => {
                                                            setContent({
                                                                ...content,
                                                                dailyEndHrs: e,
                                                            })
                                                        }}
                                                    />
                                                    <div
                                                        class="Polaris-Text--subdued"
                                                        id="minutesHelpText"
                                                    >
                                                        Hours
                                                    </div>
                                                </div>
                                                <div className="Polaris-FormLayout__Item">
                                                    <div className="Polaris-Labelled__LabelWrapper">
                                                        <div className="Polaris-Label">
                                                            <label
                                                                id="startDateLabel"
                                                                htmlFor="startDate"
                                                                className="Polaris-Label__Text"
                                                            >
                                                                &nbsp;
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <InputNumber
                                                        id="mnt"
                                                        label="mntLabel"
                                                        defaultValue={content.dailyEndMnt}
                                                        onChange={(e) => {
                                                            setContent({
                                                                ...content,
                                                                dailyEndMnt: e,
                                                            })
                                                        }}
                                                    />
                                                    <div
                                                        class="Polaris-Text--subdued"
                                                        id="minutesHelpText"
                                                    >
                                                        Minutes
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Polaris-FormLayout__Item">
                                                <div className="Polaris-Labelled__LabelWrapper">
                                                    <div className="Polaris-Label">
                                                        <label
                                                            id="startDateLabel"
                                                            htmlFor="startDate"
                                                            className="Polaris-Label__Text"
                                                        >
                                                            Starts
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <CheckBoxComponent
                                                id="startToday"
                                                name="startTimer"
                                                checked={true}
                                                label="Today"
                                                onChange={(e) => {
                                                    setContent({ ...content, starts: e.target.value })
                                                }}
                                            />
                                            <CheckBoxComponent
                                                id="startSpcf"
                                                name="startTimer"
                                                label="Specefic date"
                                                onChange={(e) => {
                                                    setContent({ ...content, starts: e.target.value })
                                                }}
                                            />
                                            {content.starts == "startSpcf" ?
                                                <div className="Polaris-FormLayout__Item">
                                                    <div>
                                                        <div className="">
                                                            <div className="Polaris-Labelled__LabelWrapper">
                                                                <div className="Polaris-Label">
                                                                    <label
                                                                        id="startDateLabel"
                                                                        htmlFor="startDate"
                                                                        className="Polaris-Label__Text"
                                                                    >
                                                                        Start date
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <DatePickerExample
                                                                state1={content.selectedDates}
                                                                onChange={(e) => {
                                                                    setContent({
                                                                        ...content,
                                                                        selectedDates: e,
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div> : ""}
                                            <div className="Polaris-FormLayout__Item">
                                                <div className="Polaris-Labelled__LabelWrapper">
                                                    <div className="Polaris-Label">
                                                        <label
                                                            id="startDateLabel"
                                                            htmlFor="startDate"
                                                            className="Polaris-Label__Text"
                                                        >
                                                            Ends
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <CheckBoxComponent
                                                id="endNever"
                                                name="endTimer"
                                                label="Never"
                                                checked={true}
                                                onChange={(e) => {
                                                    setContent({ ...content, ends: e.target.value })
                                                }}
                                            />
                                            <CheckBoxComponent
                                                id="endSpcf"
                                                name="endTimer"
                                                label="Specefic date"
                                                onChange={(e) => {
                                                    setContent({ ...content, ends: e.target.value })
                                                    // console.log(content.timerStart)
                                                }}
                                            />
                                            {content.ends == "endSpcf" ?
                                                <div className="Polaris-FormLayout__Item">
                                                    <div>
                                                        <div className="">
                                                            <div className="Polaris-Labelled__LabelWrapper">
                                                                <div className="Polaris-Label">
                                                                    <label
                                                                        id="endDateLabel"
                                                                        htmlFor="endDate"
                                                                        className="Polaris-Label__Text"
                                                                    >
                                                                        End date
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <DatePickerExample
                                                                state1={content.selectedEndDates}
                                                                onChange={(e) => {
                                                                    setContent({
                                                                        ...content,
                                                                        selectedEndDates: e,
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div> : ""}
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                            <div className="Polaris-FormLayout pt-3">
                                <div className="Polaris-FormLayout__Item">
                                    <div className="">
                                        <div className="Polaris-Labelled__LabelWrapper">
                                            <div className="Polaris-Label">
                                                <label
                                                    id="onceItEndsLabel"
                                                    htmlFor="onceItEnds"
                                                    className="Polaris-Label__Text"
                                                >
                                                    Once it ends
                                                </label>
                                            </div>
                                        </div>
                                        <InputSelect
                                            id="onceItEnds"
                                            option={myoption}
                                            value={content.onceItEnd}
                                            placeholder="Unpublish timer"
                                            onChange={(e) => {
                                                setContent({
                                                    ...content,
                                                    onceItEnd: e.target.value,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="Polaris-Card__Section">
                            <NavLink to="/ProductPage/Design">
                                <button
                                    className="Polaris-Button Polaris-Button--fullWidth"
                                    type="button"
                                >
                                    <span className="Polaris-Button__Content">
                                        <span className="Polaris-Button__Text">
                                            Continue to Design
                                        </span>
                                    </span>
                                </button>
                            </NavLink>
                        </div> */}
                    </div>
                </div>

                {/* <div className="col col-md-5" id='productTimer' ref={ref}>
                    <div

                        // className="product-page-wrapper"

                        style={{ position: 'sticky', top: '20px' }}
                    >
                        <Timerbadge design={design} content={content} />

                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Content