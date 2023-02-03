import {
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  hsbToHex,
  RangeSlider,
  Select,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import Colorpicker from "../Common/ColorPicker";
import Headings from "../Common/Heading";
import {
  TextAlignmentRightMajor,
  TextAlignmentCenterMajor,
  TextAlignmentLeftMajor,
} from "@shopify/polaris-icons";
import BundlePreview from "./BundlePreview";

const Design = ({ states }) => {
  const { designSettings, bundle, designSatte, currency } = states;
  const [open, setOpen] = useState(true);

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
    { label: "Add To Cart", value: "add to cart" },
    { label: "Checkout", value: "checkout" },
  ];

  const updateColorPicker = (key, subkey, e, type) => {
    const data = designSettings[key];
    if (type == "color") {
      data[subkey] = hsbToHex(e);
    } else {
      data[subkey] = e;
    }

    designSatte({ ...designSettings });
  };

  const updateText = (obj, key, e) => {
    obj[key] = e;
    designSatte({ ...designSettings });
  };

  return (
    <>
      <div className="row mb-5">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="customCard">
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
                    <p style={suffixStyles}>
                      {designSettings.settings.FontSize}
                    </p>
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
                <Headings text={"Offer header text alignment"} />
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
                      UpdateState(
                        designSettings.settings,
                        "Alignment",
                        "center"
                      );
                    }}
                  />
                  <Button
                    icon={TextAlignmentRightMajor}
                    primary={designSettings.settings.Alignment == "right"}
                    onClick={() => {
                      UpdateState(
                        designSettings.settings,
                        "Alignment",
                        "right"
                      );
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
                    <p style={suffixStyles}>
                      {designSettings.button.borderRadius}
                    </p>
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
                  onChange={(e) => {
                    updateText(designSettings.button, "text", e);
                  }}
                />
              </div>

              <div className="mt-4">
                <Headings text="More options text" />
                <TextField
                  value={designSettings.button.Moreoptions}
                  onChange={(e) => {
                    updateText(designSettings.button, "Moreoptions", e);
                  }}
                />
              </div>

              <div className="mt-4">
                <Headings text="Unavailable button text" />
                <TextField
                  value={designSettings.button.Unavailablebtn}
                  onChange={(e) => {
                    updateText(designSettings.button, "Unavailablebtn", e);
                  }}
                />
              </div>

              <div className="mt-4">
                <Headings text="Unavailable notice text" />
                <TextField
                  value={designSettings.button.UnavailableNotice}
                  onChange={(e) => {
                    updateText(designSettings.button, "UnavailableNotice", e);
                  }}
                />
              </div>

              <div className="mt-4">
                <Headings text="Choose an option" />
                <TextField
                  value={designSettings.button.ChooseOption}
                  onChange={(e) => {
                    updateText(designSettings.button, "ChooseOption", e);
                  }}
                />
              </div>
            </Card>

            <Card title="Prices And Savings" sectioned>
              <div>
                <Headings
                  text="Free gift"
                  subtext={
                    "This text will show in the cart in case the bundle incluses free gift"
                  }
                />
                <TextField
                  value={designSettings.priceSavings.freeGift}
                  onChange={(e) => {
                    updateText(designSettings.priceSavings, "freeGift", e);
                  }}
                />
              </div>

              <div className="mt-4">
                <Headings
                  text="Free shipping tag"
                  subtext={
                    "This text will show in case the bundle includes free shipping"
                  }
                />
                <TextField
                  value={designSettings.priceSavings.FreeShippingTag}
                  onChange={(e) => {
                    updateText(
                      designSettings.priceSavings,
                      "FreeShippingTag",
                      e
                    );
                  }}
                />
              </div>

              <div className="mt-4">
                <Headings
                  text="Free gift tag"
                  subtext={
                    "This tag will show in case the bundle includes a free gift next to the price"
                  }
                />
                <TextField
                  value={designSettings.priceSavings.FreeGiftTag}
                  onChange={(e) => {
                    updateText(designSettings.priceSavings, "FreeGiftTag", e);
                  }}
                />
              </div>

              <div className="mt-4">
                <Headings
                  text="Save tag"
                  subtext={
                    "This tag will show in case the bundle includes a free gift next to the price"
                  }
                />
                <TextField
                  value={designSettings.priceSavings.SaveTag}
                  onChange={(e) => {
                    updateText(designSettings.priceSavings, "SaveTag", e);
                  }}
                />
              </div>

              <div className="mt-4">
                <Headings text="Total" />
                <TextField
                  value={designSettings.priceSavings.Total}
                  onChange={(e) => {
                    updateText(designSettings.priceSavings, "Total", e);
                  }}
                />
              </div>

              <div className="mt-4">
                <Headings text="Tag Color" />
                <Colorpicker
                  colors={designSettings.priceSavings.tagColor}
                  state={{ designSettings, designSatte }}
                  value={"color"}
                  pickerChanges={(e) => {
                    updateColorPicker("priceSavings", "tagColor", e, "color");
                  }}
                  textChange={(e) => {
                    updateColorPicker("priceSavings", "tagColor", e, "text");
                  }}
                />
              </div>

              <div className="mt-4">
                <Headings text="Button Text Color" />
                <Colorpicker
                  colors={designSettings.priceSavings.priceColor}
                  state={{ designSettings, designSatte }}
                  value={"color"}
                  pickerChanges={(e) => {
                    updateColorPicker("priceSavings", "priceColor", e, "color");
                  }}
                  textChange={(e) => {
                    updateColorPicker("priceSavings", "priceColor", e, "text");
                  }}
                />
              </div>

              <div className="mt-4">
                <Headings text="Button Text Color" />
                <Colorpicker
                  colors={designSettings.priceSavings.ComparePriceColor}
                  state={{ designSettings, designSatte }}
                  value={"color"}
                  pickerChanges={(e) => {
                    updateColorPicker(
                      "priceSavings",
                      "ComparePriceColor",
                      e,
                      "color"
                    );
                  }}
                  textChange={(e) => {
                    updateColorPicker(
                      "priceSavings",
                      "ComparePriceColor",
                      e,
                      "text"
                    );
                  }}
                />
              </div>

              <div className="mt-4">
                <Checkbox
                  label="Show total"
                  checked={designSettings.priceSavings.showTotal}
                  onChange={(e) => {
                    designSettings.priceSavings.showTotal = e;
                    designSatte({ ...designSettings });
                  }}
                />
              </div>

              <div className="mt-4">
                <Checkbox
                  label="Show price per unit"
                  checked={designSettings.priceSavings.ShowPriceUnit}
                  onChange={(e) => {
                    designSettings.priceSavings.ShowPriceUnit = e;
                    designSatte({ ...designSettings });
                  }}
                />
              </div>

              <div className="mt-4">
                <Checkbox
                  label="Show compare price"
                  checked={designSettings.priceSavings.ShowComparePrice}
                  onChange={(e) => {
                    designSettings.priceSavings.ShowComparePrice = e;
                    designSatte({ ...designSettings });
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <BundlePreview bundle={bundle} design={designSettings} currency={currency} />
        </div>
      </div>
    </>
  );
};

export default Design;
