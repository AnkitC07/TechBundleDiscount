import { ResourcePicker } from '@shopify/app-bridge-react'
import React from 'react'

const ResourcePickerComp = (props) => {
  return (
    <ResourcePicker
      {...props}
      resourceType={props.type}
      open={props.state1}
      showVariants={false}
      onCancel={() => props.state2(false)}
    />
  )
}

export default ResourcePickerComp
