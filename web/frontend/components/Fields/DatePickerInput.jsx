import { Button, DatePicker, Popover } from '@shopify/polaris'
import { useEffect, useContext } from 'react'
import { useState, useCallback } from 'react'
import TextFieldComp from './TextFieldComp'

export default function DatePickerExample(props) {
  const d = new Date()

  // console.log(d)
  const [active, setActive] = useState(false)
  const [{ month, year }, setDate] = useState({
    month: d.getMonth(),
    year: d.getFullYear(),
  })


  // console.log(props.state1, 'timed')
  const handleMonthChange = useCallback(
    (month, year) => {
      setDate({ month, year })
      console.log(month, year, "checking orders ")
    },
    [],
  )
  const togglePopover = (e) => {
    setActive(!active)
  }
  let finalDate = ''
  try {
    // console.log(typeof props.state1.end,)
    const dates = new Date(props.state1.end)
    const y = dates.getFullYear()
    let m = String(dates.getMonth() + 1)
    m = m.length == 1 ? `0${m}` : m
    let dt = String(dates.getDate())
    dt = dt.length == 1 ? `0${dt}` : dt
    finalDate = `${y}-${m}-${dt}`
  } catch (err) {
    console.log(err)
  }

  const Activator = () => {
    return (
      <div onClick={togglePopover}>
        <TextFieldComp type={'text'} placeholder={finalDate} value={finalDate} />
        {/* <InputComponent
          onChange={() => { }}
          default={String(props.state1.end).substring(4, 15)}
        /> */}
      </div>
    )
  }

            // disableDatesBefore={{
            //   start: new Date(props.disableBefore.start),
            //   end: new Date(props.disableBefore.end),
            // }}
  return (
    <>
      <div className="date_picker">
        <Popover
          active={!props.disable == false ? false : active}
          activator={<Activator />}
          onClose={togglePopover}
          sectioned
          fixed
          preferredAlignment={'center'}
          zIndexOverride={999999999}
        >
          <DatePicker
            month={month}
            year={year}
            onChange={props.onChange}
            onMonthChange={handleMonthChange}
            selected={{
              start: new Date(props.state1.start),
              end: new Date(props.state1.end),
            }}
          />
        </Popover>
      </div>
    </>
  )
}
