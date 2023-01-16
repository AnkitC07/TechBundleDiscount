import { Card } from "@shopify/polaris";

const Preview = ({ data }) => {
  const { Color, FontFamily, Font, FontSize, Radius, Border, Width, Height,FontStyle } =
    data.Design;
  const style = {
    color: Font,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FontFamily,
    background: Color,
    fontSize: `${FontSize}px`,
    padding: "5px 10px",
    borderRadius: `${Radius}px`,
    border: `1px solid ${Border}`,
    width: `${Width}%`,
    height: `${Height}px`,
    textAlign: "center",
    overflow:'hidden',
    fontStyle:FontStyle.i == true?'italic':'normal',
    fontWeight:FontStyle.b == true?'bold':'400',
    textDecoration:FontStyle.u == true?'underline':''
  };
  console.log(style);
  return (
    <>
      <div className="previewStyle">
        <Card title={"Preview"} sectioned>
          <div id="PreviewHtml">
            <div
              id="PreviewHtml-GEt"
              style={{
                height: "200px",
                width: "auto",
                background: "lightgray",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: `${
                    data.Design.BadgePosition.right == true
                      ? "flex-end"
                      : "flex-start"
                  }`,
                }}
              >
                <div style={style}>{data.BadgeHeader}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Preview;
