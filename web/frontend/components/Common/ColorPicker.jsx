import React from "react";
import {
    ColorPicker,
    hsbToHex,
    Popover,
    TextField,
    hexToRgb,rgbToHsb
  } from "@shopify/polaris";
  
import { useState,useEffect } from "react";

export const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    // return `rgb(${r} ${g} ${b})`
    return {r,g,b}
}


const Colorpicker = ({ colors, state, value }) => {
    console.log(colors)
  const [color, setColor] = useState({
    hue: 1,
    brightness: 0,
    saturation: 39,
  });

  const [popoverActive, setPopoverActive] = useState(false);

  function handlePopoverClose() {
    setPopoverActive(false);
  }

  function handlePopoverOpen() {
    setPopoverActive(true);
  }

  const rbg = colors;

  useEffect(()=>{
    changeColor(colors)
  },[])

  const changeColor = (hex) =>{
    let rgb = hexToRgb(hex)
    rgb = rgbToHsb(rgb)
    setColor(rgb)
    console.log(state.settings,"updated color values")
  }

  const activator = (
    <div
      className="kEdTUc"
      onClick={handlePopoverOpen}
      style={{
        height: "36px",
        width: "48px",
        cursor: "pointer",
        border: "1px solid",
        borderRadius: "0.3rem",
        background: `${rbg}`,
      }}
    />
  );
  try {
    return (
      <>
        <div className="row">
          <div className="col-2">
            <div className="Polaris-Connected__Item">
              <Popover
                active={popoverActive}
                activator={activator}
                onClose={handlePopoverClose}
              >
                <Popover.Section>
                  <ColorPicker
                    onChange={(e) => {
                      const data = state.settings.BadgeDesign;
                      data[value] = hsbToHex(e);
                      state.settingState({ ...state.settings });
                      setColor(e);
                    }}
                    color={color}
                  />
                </Popover.Section>
              </Popover>
            </div>
          </div>
          <div className="col-10">
            <TextField 
                value={colors}
                onChange={(e)=>{
                    const hsbV = rgbToHsb(hexToRgb(e))
                    setColor(hsbV)
                    const data = state.settings.BadgeDesign;
                    data[value] = e;
                    state.settingState({ ...state.settings });
                }}
            />
          </div>
        </div>
      </>
    );
  } catch (err) {
    return <></>;
  }
};

export default Colorpicker;
