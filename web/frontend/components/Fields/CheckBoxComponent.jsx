import { RadioButton } from '@shopify/polaris'
import React from 'react'

function CheckBoxComponent(props) {
  return (
    <>
      <div className="Polaris-FormLayout__Item">
        <div>

          <RadioButton
            label={props.label}
            checked={props.checked}
            // id={props.id}
            name={props.name}
            helpText={props.decription}
            onChange={props.onChange}
          />
        </div>
      </div>
    </>
  )
}

export default CheckBoxComponent
