import React from 'react'

function CheckBoxComponent(props) {
  return (
    <>
      <div className="Polaris-FormLayout__Item">
        <div>
          <label className="Polaris-Choice" htmlFor={props.id}>
            <span className="Polaris-Choice__Control">
              <span className="Polaris-RadioButton">
                <input
                  id={props.id}
                  value={props.id}
                  name={props.name}
                  type="radio"
                  onChange={props.onChange}
                  className="Polaris-RadioButton__Input"
                  defaultChecked={props.checked}
                />
                <span className="Polaris-RadioButton__Backdrop" />
              </span>
            </span>
            <span className="Polaris-Choice__Label">{props.label}</span>
          </label>
          <div className="Polaris-Choice__Descriptions">
            <div className="Polaris-Choice__HelpText" id="toDateHelpText">
              {props.decription}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckBoxComponent
