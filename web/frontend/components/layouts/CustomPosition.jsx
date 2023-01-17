import {TextField} from '@shopify/polaris';
const CustomPosition = ({
    id,
    checked
}) => {
  return (
    <>
      <div className="Polaris-Card__Section">
        <span className="Polaris-TextStyle--variationStrong">Timer ID</span>
        <div className="Polaris-TextContainer" style={{ marginTop: "5px" }}>
          <p>{id == undefined?"Save or Publish to show timer ID":id}</p>
        </div>
        <div
          className="Polaris-Labelled__HelpText  "
          id="insideTopSpacingHelpText"
          style={{ marginTop: "5px" }}
        >
          Countdown timer app block can be added, removed, repositioned, and
          customized through the theme editor using timer ID.
        </div>
      </div>

      <div id="timer-card" className={`Polaris-Card__Section ${checked == true?'':"hide-div"}`}>
        <span className="Polaris-TextStyle--variationStrong">
          Timer code snippet
        </span>
        <div className="Polaris-TextContainer" style={{ marginTop: "5px" }}>
          {id == undefined?<p>Save or Publish to show code snippet</p>
          :
          <TextField 
            value={`<div class="count-down-timer-app" id="${id}"></div>`}
            multiline={5}
          />}
        </div>
        <div
          className="Polaris-Labelled__HelpText  "
          id="insideTopSpacingHelpText"
          style={{ marginTop: "5px" }}
        >
          You can use this code snippet anywhere in your theme.
        </div>
      </div>
    </>
  );
};

export default CustomPosition;
