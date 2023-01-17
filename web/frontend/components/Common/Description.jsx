import { Button, Icon } from "@shopify/polaris";
import { PlayCircleMajor } from "@shopify/polaris-icons";
const Description = ({ heading, description, link }) => {
  return (
      <div>
        <div>
          <p className="Polaris-TextStyle--variationStrong">{heading}</p>
        </div>
        <div>
          <p className="Polaris-Text--regular lh-sm mt-2 text-secondary">
            {description}
          </p>
        </div>
        <div className="mt-2">
          <Button plain removeUnderline>
            <p className="d-flex align-items-center Polaris-Text--regular">
              <div>
                <Icon source={PlayCircleMajor} color="base" />
              </div>
              <div className="mx-2">
                <span>Step by Step Guide</span>
              </div>
            </p>
          </Button>
        </div>
      </div>
  );
};

export default Description;
