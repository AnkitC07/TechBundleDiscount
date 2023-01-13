import React, { useEffect, useRef } from 'react'
function InputComponent(props) {
  // const def = props.default
  // console.log(def)
  useEffect(() => { }, [props])

  return (
    <>
      <div

        className="Polaris-Connected__Item Polaris-Connected__Item--primary"
        style={{ marginRight: '2px' }}
      >
        <div className="Polaris-TextField Polaris-TextField--hasValue ">
          <input
            id={props.id}
            className="Polaris-TextField__Input"
            type={props.type}
            defaultValue={props.default}
            placeholder={props.placeholder}
            name={props.name}
            default={props.default}
            aria-labelledby={props.label}
            value={props.default}
            onChange={props.onChange}
          />
          <div className="Polaris-TextField__Backdrop" />
        </div>
      </div>
    </>
  )
}

export default InputComponent
