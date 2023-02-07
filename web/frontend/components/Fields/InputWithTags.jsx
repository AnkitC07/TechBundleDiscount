import { Tag, Stack } from "@shopify/polaris";
import { useEffect, useState } from "react";

const InputWithTags = ({ states, label, placeholder }) => {
  const { placement, setPlacement } = states
  const [tags, tagsState] = useState(placement.tags.split(","));

  const removeTag = async (e) => {
    const remove = tags.filter(x => x !== e)
    tagsState(remove)
    placement.tags = remove.join(",")
    setPlacement({ ...placement })
  }

  console.log(placement)
  const tagMarkup = tags.map((option) => (
    <Tag key={option} onRemove={() => removeTag(option)}>
      {option}
    </Tag>
  ));

  return (
    <>
      <div className="">
        <div className="Polaris-Labelled__LabelWrapper">
          <div className="Polaris-Label">
            <label
              id="PolarisTextField1Label"
              for="PolarisTextField1"
              className="Polaris-Label__Text"
            >
              <span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular">
                {label}
              </span>
            </label>
          </div>
        </div>
        <div className="Polaris-Connected">
          <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
            <div className="Polaris-TextField">
              <div
                className="Polaris-TextField__VerticalContent"
                id="addTagsData"
              >
                <div className="Polaris-Stack Polaris-Stack--spacingExtraTight Polaris-Stack--alignmentCenter">
                  <Stack spacing="tight">{tagMarkup}</Stack>
                </div>
                <input
                  id="PolarisTextField1"
                  placeholder={placeholder}
                  autocomplete="off"
                  className="Polaris-TextField__Input"
                  type="text"
                  aria-labelledby="PolarisTextField1Label PolarisTextField1-VerticalContent"
                  aria-invalid="false"
                  onKeyDown={(e) => {
                    const values = e.target.value
                    if (e.keyCode == 13 || e.keyCode == 44) {
                      tagsState(() => [...tags, values])
                      setPlacement({ ...placement, tags: [...tags, values].join(",") })
                      e.target.value = ""
                    }
                  }}
                />
              </div>
              <div className="Polaris-TextField__Backdrop"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputWithTags;
