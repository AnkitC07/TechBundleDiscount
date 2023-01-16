import {
  Button,
  ButtonGroup,
  Card,
  hsbToHex,
  RangeSlider,
  Select,
  TextField,
} from "@shopify/polaris";
import { useEffect } from "react";
import { useState } from "react";
import Colorpicker from "../Common/ColorPicker";
import Headings from "../Common/Heading";
import {
  TextAlignmentRightMajor,
  TextAlignmentCenterMajor,
  TextAlignmentLeftMajor,
} from "@shopify/polaris-icons";

const Design = ({ states }) => {
  const { designSettings, designSatte } = states;

  const UpdateState = (obj, key, value) => {
    const data = obj;
    data[key] = value;
    designSatte({ ...designSettings });
  };

  const updateFontStyle = (obj, e, key) => {
    const data = obj;
    if (e.classList.contains("Polaris-Button--primary")) {
      data[key] = false;
    } else {
      data[key] = true;
    }
    designSatte({ ...designSettings });
  };

  const suffixStyles = {
    minWidth: "24px",
    textAlign: "right",
    border: "1px solid #c3c3c3",
    padding: "4px 10px",
    borderRadius: "7px",
  };

  const fontFamily = [
    { label: "Serif", value: "serif", style: { fontFamily: "serif" } },
    {
      label: "Sans-serif",
      value: "sans-serif",
      style: { fontFamily: "sans-serif" },
    },
    {
      label: "Monospace",
      value: "monospace",
      style: { fontFamily: "monospace" },
    },
    { label: "Cursive", value: "cursive", style: { fontFamily: "cursive" } },
    { label: "Fantasy", value: "fantasy", style: { fontFamily: "fantasy" } },
  ];

  const buttonAction = [
    { label: "Add To Cart", value: "add to cart"},
    { label: "Checkout", value: "checkout"}
  ]

  const updateColorPicker = (key, subkey, e, type) => {
    const data = designSettings[key];
    if (type == "color") {
      data[subkey] = hsbToHex(e);
    } else {
      data[subkey] = e;
    }

    designSatte({ ...designSettings });
  };

  const updateText = (obj,key,e) =>{
    obj[key] = e
    designSatte({ ...designSettings });
  }

  return (
    <>
      <div className="row mb-5">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <Card title={"General Settings"} sectioned>
            <div>
              <Headings text={"Font Color"} />
              <Colorpicker
                colors={designSettings.settings.FontColor}
                state={{ designSettings, designSatte }}
                value={"FontColor"}
                pickerChanges={(e) => {
                  updateColorPicker("settings", "FontColor", e, "color");
                }}
                textChange={(e) => {
                  updateColorPicker("settings", "FontColor", e, "text");
                }}
              />
            </div>

            <div className="mt-4">
              <Headings text={"Font Size"} />
              <RangeSlider
                value={designSettings.settings.FontSize}
                onChange={(e) => {
                  UpdateState(designSettings.settings, "FontSize", e);
                }}
                output
                suffix={
                  <p style={suffixStyles}>{designSettings.settings.FontSize}</p>
                }
              />
            </div>
            <div className="mt-4">
              <Headings text={"Font Size"} />
              <div
                className="mt-2"
                style={{ fontFamily: designSettings.settings.FontFamily }}
              >
                <Select
                  options={fontFamily}
                  onChange={(e) => {
                    const data = designSettings.settings;
                    data.FontFamily = e;
                    designSatte({ ...designSettings });
                  }}
                  value={designSettings.settings.FontFamily}
                />
              </div>
            </div>

            <div className="mt-4">
              <Headings text={"Font Style"} />
              <ButtonGroup segmented>
                <Button
                  primary={designSettings.settings.FontStyle.b}
                  onClick={(e) => {
                    updateFontStyle(
                      designSettings.settings.FontStyle,
                      e.currentTarget,
                      "b"
                    );
                  }}
                >
                  <b>B</b>
                </Button>
                <Button
                  primary={designSettings.settings.FontStyle.i}
                  onClick={(e) => {
                    updateFontStyle(
                      designSettings.settings.FontStyle,
                      e.currentTarget,
                      "i"
                    );
                  }}
                >
                  <i>I</i>
                </Button>
                <Button
                  primary={designSettings.settings.FontStyle.u}
                  onClick={(e) => {
                    updateFontStyle(
                      designSettings.settings.FontStyle,
                      e.currentTarget,
                      "u"
                    );
                  }}
                >
                  <u>U</u>
                </Button>
              </ButtonGroup>
            </div>

            <div className="mt-4">
              <Headings text={"Text Alignment"} />
              <ButtonGroup segmented>
                <Button
                  icon={TextAlignmentLeftMajor}
                  primary={designSettings.settings.Alignment == "left"}
                  onClick={() => {
                    UpdateState(designSettings.settings, "Alignment", "left");
                  }}
                />
                <Button
                  icon={TextAlignmentCenterMajor}
                  primary={designSettings.settings.Alignment == "center"}
                  onClick={() => {
                    UpdateState(designSettings.settings, "Alignment", "center");
                  }}
                />
                <Button
                  icon={TextAlignmentRightMajor}
                  primary={designSettings.settings.Alignment == "right"}
                  onClick={() => {
                    UpdateState(designSettings.settings, "Alignment", "right");
                  }}
                />
              </ButtonGroup>
            </div>

            <div className="mt-4">
              <Headings text={"Variants background color"} />
              <Colorpicker
                colors={designSettings.settings.VariantBgColor}
                state={{ designSettings, designSatte }}
                value={"VariantBgColor"}
                pickerChanges={(e) => {
                  updateColorPicker("settings", "VariantBgColor", e, "color");
                }}
                textChange={(e) => {
                  updateColorPicker("settings", "VariantBgColor", e, "text");
                }}
              />
            </div>
          </Card>

          <Card title={"Button Design"} sectioned>
            <div>
              <Headings text="Button Color" />
              <Colorpicker
                colors={designSettings.button.bg}
                state={{ designSettings, designSatte }}
                value={"bg"}
                pickerChanges={(e) => {
                  updateColorPicker("button", "bg", e, "color");
                }}
                textChange={(e) => {
                  updateColorPicker("button", "bg", e, "text");
                }}
              />
            </div>

            <div className="mt-4">
              <Headings text="Button Text Color" />
              <Colorpicker
                colors={designSettings.button.color}
                state={{ designSettings, designSatte }}
                value={"color"}
                pickerChanges={(e) => {
                  updateColorPicker("button", "color", e, "color");
                }}
                textChange={(e) => {
                  updateColorPicker("button", "color", e, "text");
                }}
              />
            </div>

            <div className="mt-4">
              <Headings text="Border Radius" />
              <RangeSlider
                value={designSettings.button.borderRadius}
                onChange={(e) => {
                  UpdateState(designSettings.button, "borderRadius", e);
                }}
                output
                suffix={
                  <p style={suffixStyles}>{designSettings.button.borderRadius}</p>
                }
              />
            </div>

            <div className="mt-4">
              <Headings text="Button action" />
              <Select
                  options={buttonAction}
                  onChange={(e) => {
                    const data = designSettings.button;
                    data.buttonAction = e;
                    designSatte({ ...designSettings });
                  }}
                  value={designSettings.button.buttonAction}
                />
            </div>

            <div className="mt-4">
              <Headings text="Button text" />
              <TextField 
              value={designSettings.button.text}
              onChange={(e)=>{
                updateText(designSettings.button,'text',e)
              }}
              />
            </div>

            <div className="mt-4">
              <Headings text="More options text" />
              <TextField 
              value={designSettings.button.Moreoptions}
              onChange={(e)=>{
                updateText(designSettings.button,'Moreoptions',e)
              }}
              />
            </div>

            <div className="mt-4">
              <Headings text="Unavailable button text" />
              <TextField 
              value={designSettings.button.Unavailablebtn}
              onChange={(e)=>{
                updateText(designSettings.button,'Unavailablebtn',e)
              }}
              />
            </div>

            <div className="mt-4">
              <Headings text="Unavailable notice text" />
              <TextField 
              value={designSettings.button.UnavailableNotice}
              onChange={(e)=>{
                updateText(designSettings.button,'UnavailableNotice',e)
              }}
              />
            </div>

            <div className="mt-4">
              <Headings text="Choose an option" />
              <TextField 
              value={designSettings.button.ChooseOption}
              onChange={(e)=>{
                updateText(designSettings.button,'ChooseOption',e)
              }}
              />
            </div>
          </Card>

            <Card title='Prices And Savings' sectioned>

            </Card>
          
        </div>
      </div>
    </>
  );
};

export default Design;
