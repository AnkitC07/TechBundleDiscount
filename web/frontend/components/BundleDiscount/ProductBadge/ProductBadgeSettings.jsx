import {
  Card,
  TextField,
  Select,
  RadioButton,
  RangeSlider,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import {
  TextAlignmentRightMajor,
  TextAlignmentCenterMajor,
  TextAlignmentLeftMajor,
} from "@shopify/polaris-icons";
import Colorpicker from "../../Common/ColorPicker";

const ProductBadgeSettings = ({states}) => {
  const {settings, settingState} = states
  const [selected, setSelected] = useState("12323");

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

  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const UpdateState = (key, value) => {
    settingState({ ...settings, [key]: value });
  };

  const updateRadio = (key, subkey, value) => {
    const data = settings.Design[key];
    Object.keys(data).forEach((x) => {
      data[x] = false;
    });
    data[subkey] = true;
    settingState({ ...settings });
  };

  const updateRange = (key, value) => {
    const data = settings.Design;
    data[key] = value;
    settingState({ ...settings });
  };

  const updateFontStyle = (e,key) =>{
    const data = settings.Design.FontStyle
    if(e.classList.contains('Polaris-Button--primary')){
      data[key] = false
    }else{
      data[key] = true
    }
    settingState({...settings})
  }
  
  const suffixStyles = {
    minWidth: "24px",
    textAlign: "right",
    border: "1px solid #c3c3c3",
    padding: "4px 10px",
    borderRadius: "7px",
  };

  return (
    <>
      <div className="mb-5">
        <Card title="Product Badge Details" sectioned>
          <TextField
            label="Product Badge header"
            value={settings.BadgeHeader}
            onChange={(e) => UpdateState("BadgeHeader", e)}
            autoComplete="off"
          />
        </Card>
        <Card title="Badge Design" sectioned>
          <p className="fs-6 fw-semibold">Position</p>
          <div className="mt-2 row">
            <div className="col-6">
              <RadioButton
                label="Top Right"
                checked={settings.Design.BadgePosition.right}
                name="right"
                onChange={(e) => {
                  console.log(e);
                  updateRadio("BadgePosition", "right", e);
                }}
              />
            </div>
            <div className="col-6">
              <RadioButton
                label="Top Left"
                checked={settings.Design.BadgePosition.left}
                name="left"
                onChange={(e) => {
                  console.log(e);
                  updateRadio("BadgePosition", "left", e);  
                }}
              />
            </div>
          </div>

          <p className="mt-4 fs-6 fw-semibold">Style</p>
          <div className="mt-2 row">
            <div className="col-6">
              <RadioButton
                label="Round"
                checked={settings.Design.Style.round}
                name="round"
                onChange={(e) => {
                  settings.Design.Width = 35
                  settings.Design.Height = 78
                  settings.Design.Radius = 100
                  updateRadio("Style", "round", e);
                }}
              />
            </div>
            <div className="col-6">
              <RadioButton
                label="Rectangle"
                checked={settings.Design.Style.rectangle}
                name="rectangle"
                onChange={(e) => {
                  console.log(e);
                  settings.Design.Width = 55
                  settings.Design.Height = 47
                  settings.Design.Radius = 0
                  updateRadio("Style", "rectangle", e);
                }}
              />
            </div>
          </div>

          <p className="mt-4 fs-6 fw-semibold">Color</p>
          <div className="mt-2">
            <Colorpicker
              colors={settings.Design.Color}
              state={{ settings, settingState }}
              value={"Color"}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Border Color</p>
          <div className="mt-2">
            <Colorpicker
              colors={settings.Design.Border}
              state={{ settings, settingState }}
              value={"Border"}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Width</p>
          <div className="mt-2">
            <RangeSlider
              value={settings.Design.Width}
              onChange={(e) => {
                updateRange("Width", e);
              }}
              output
              suffix={<p style={suffixStyles}>{settings.Design.Width}%</p>}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Height</p>
          <div className="mt-2">
            <RangeSlider
              value={settings.Design.Height}
              onChange={(e) => {
                updateRange("Height", e);
              }}
              output
              suffix={<p style={suffixStyles}>{settings.Design.Height}</p>}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Radius</p>
          <div className="mt-2">
            <RangeSlider
              value={settings.Design.Radius}
              onChange={(e) => {
                updateRange("Radius", e);
              }}
              output
              suffix={<p style={suffixStyles}>{settings.Design.Radius}</p>}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Font Color</p>
          <div className="mt-2">
            <Colorpicker
              colors={settings.Design.Font}
              state={{ settings, settingState }}
              value={"Font"}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Font Size</p>
          <div className="mt-2">
            <RangeSlider
              value={settings.Design.FontSize}
              onChange={(e) => {
                updateRange("FontSize", e);
              }}
              output
              suffix={
                <p style={suffixStyles}>{settings.Design.FontSize}</p>
              }
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Font Family</p>
          <div
            className="mt-2"
            style={{ fontFamily: settings.Design.FontFamily }}
          >
            <Select
              options={fontFamily}
              onChange={(e) => {
                const data = settings.Design;
                data.FontFamily = e;
                settingState({ ...settings });
              }}
              value={settings.Design.FontFamily}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Font Style</p>
          <div className="mt-2">
            <ButtonGroup segmented>
              <Button
               primary={settings.Design.FontStyle.b} 
               onClick={(e) => {updateFontStyle(e.currentTarget,'b')}}>
                <b>B</b>
              </Button>
              <Button
               primary={settings.Design.FontStyle.i} 
               onClick={(e) => {updateFontStyle(e.currentTarget,'i')}}>
                <i>Italic</i>
              </Button>
              <Button 
              primary={settings.Design.FontStyle.u} 
              onClick={(e) => {updateFontStyle(e.currentTarget,'u')}}>
                <u>Underline</u>
              </Button>
            </ButtonGroup>
          </div>

          <p className="mt-4 fs-6 fw-semibold">Desktop Alignment</p>
          <div className="mt-2">
            <ButtonGroup segmented>
              <Button
                icon={TextAlignmentLeftMajor}
                primary={settings.Design.Desktop == "left"}
                onClick={() => {
                  updateRange("Desktop", "left");
                }}
              />
              <Button
                icon={TextAlignmentCenterMajor}
                primary={settings.Design.Desktop == "center"}
                onClick={() => {
                  updateRange("Desktop", "center");
                }}
              />
              <Button
                icon={TextAlignmentRightMajor}
                primary={settings.Design.Desktop == "right"}
                onClick={() => {
                  updateRange("Desktop", "right");
                }}
              />
            </ButtonGroup>
          </div>

          <p className="mt-4 fs-6 fw-semibold">Mobile Alignment</p>
          <div className="mt-2">
            <ButtonGroup segmented>
              <Button
                icon={TextAlignmentLeftMajor}
                primary={settings.Design.Mobile == "left"}
                onClick={() => {
                  updateRange("Mobile", "left");
                }}
              />
              <Button
                icon={TextAlignmentCenterMajor}
                primary={settings.Design.Mobile == "center"}
                onClick={() => {
                  updateRange("Mobile", "center");
                }}
              />
              <Button
                icon={TextAlignmentRightMajor}
                primary={settings.Design.Mobile == "right"}
                onClick={() => {
                  updateRange("Mobile", "right");
                }}
              />
            </ButtonGroup>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProductBadgeSettings;
