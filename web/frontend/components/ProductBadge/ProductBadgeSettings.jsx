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
import Colorpicker from "../Common/ColorPicker";

const ProductBadgeSettings = () => {
  const [settings, settingState] = useState({
    bundle_id: "",
    BadgeHeader: "Buy more and save test",
    BadgeDesign: {
      BadgePosition: {
        right: true,
        left: false,
      },
      Style: {
        round: true,
        rectangle: false,
      },
      Color: "#9124d6",
      Border: "#9124d6",
      Font: "#9124d6",
      Width: 40,
      Height: 25,
      Radius: 55,
      FontSize: 20,
      FontFamily: "serif",
      FontStyle: {
        b: true,
        i: false,
        u: false,
      },
      Desktop: "right",
      Mobile: "left",
    },
  });
  const [selected, setSelected] = useState("12323");

  const options = [
    { label: "Today", value: "12323" },
    { label: "Yesterday", value: "66556" },
    { label: "Last 7 days", value: "9999888" },
  ];


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
    const data = settings.BadgeDesign[key];
    Object.keys(data).forEach((x) => {
      data[x] = false;
    });
    data[subkey] = true;
    settingState({ ...settings });
  };

  const updateRange = (key, value) => {
    const data = settings.BadgeDesign;
    data[key] = value;
    settingState({ ...settings });
  };

  const suffixStyles = {
    minWidth: "24px",
    textAlign: "right",
    border: '1px solid #c3c3c3',
    padding: '4px 10px',
    borderRadius:'7px'
  };

  return (
    <>
      <div className="mb-5">
        <Card title="Offer Product Badge Setting" sectioned>
          <Select
            label="Date range"
            options={options}
            onChange={handleSelectChange}
            value={selected}
          />
        </Card>
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
                checked={settings.BadgeDesign.BadgePosition.right}
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
                checked={settings.BadgeDesign.BadgePosition.left}
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
                checked={settings.BadgeDesign.Style.round}
                name="round"
                onChange={(e) => {
                  console.log(e);
                  updateRadio("Style", "round", e);
                }}
              />
            </div>
            <div className="col-6">
              <RadioButton
                label="Rectangle"
                checked={settings.BadgeDesign.Style.rectangle}
                name="rectangle"
                onChange={(e) => {
                  console.log(e);
                  updateRadio("Style", "rectangle", e);
                }}
              />
            </div>
          </div>

          <p className="mt-4 fs-6 fw-semibold">Color</p>
          <div className="mt-2">
            <Colorpicker
              colors={settings.BadgeDesign.Color}
              state={{ settings, settingState }}
              value={"Color"}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Border Color</p>
          <div className="mt-2">
            <Colorpicker
              colors={settings.BadgeDesign.Border}
              state={{ settings, settingState }}
              value={"Border"}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Width</p>
          <div className="mt-2">
            <RangeSlider
              value={settings.BadgeDesign.Width}
              onChange={(e) => {
                updateRange("Width", e);
              }}
              output
              suffix={<p style={suffixStyles}>{settings.BadgeDesign.Width}%</p>}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Height</p>
          <div className="mt-2">
            <RangeSlider
              value={settings.BadgeDesign.Height}
              onChange={(e) => {
                updateRange("Height", e);
              }}
              output
              suffix={<p style={suffixStyles}>{settings.BadgeDesign.Height}</p>}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Radius</p>
          <div className="mt-2">
            <RangeSlider
              value={settings.BadgeDesign.Radius}
              onChange={(e) => {
                updateRange("Radius", e);
              }}
              output
              suffix={<p style={suffixStyles}>{settings.BadgeDesign.Radius}</p>}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Font Color</p>
          <div className="mt-2">
            <Colorpicker
              colors={settings.BadgeDesign.Font}
              state={{ settings, settingState }}
              value={"Font"}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Font Size</p>
          <div className="mt-2">
            <RangeSlider
              value={settings.BadgeDesign.FontSize}
              onChange={(e) => {
                updateRange("FontSize", e);
              }}
              output
              suffix={<p style={suffixStyles}>{settings.BadgeDesign.FontSize}</p>}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Font Family</p>
          <div className="mt-2"  style={{ fontFamily: settings.BadgeDesign.FontFamily }}>
            <Select
              options={fontFamily}
              onChange={(e)=>{
                const data = settings.BadgeDesign
                data.FontFamily = e
                settingState({...settings})
              }}
              value={settings.BadgeDesign.FontFamily}
            />
          </div>

          <p className="mt-4 fs-6 fw-semibold">Font Style</p>
          <div className="mt-2">
            <ButtonGroup segmented>
              <Button>
                <b>B</b>
              </Button>
              <Button>Italic</Button>
              <Button>Underline</Button>
            </ButtonGroup>
          </div>

          <p className="mt-4 fs-6 fw-semibold">Desktop Alignment</p>
          <div className="mt-2">
            <ButtonGroup segmented>
              <Button icon={TextAlignmentLeftMajor} />
              <Button icon={TextAlignmentCenterMajor} />
              <Button icon={TextAlignmentRightMajor} />
            </ButtonGroup>
          </div>

          <p className="mt-4 fs-6 fw-semibold">Mobile Alignment</p>
          <div className="mt-2">
            <ButtonGroup segmented>
              <Button icon={TextAlignmentLeftMajor} />
              <Button icon={TextAlignmentCenterMajor} />
              <Button icon={TextAlignmentRightMajor} />
            </ButtonGroup>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProductBadgeSettings;
