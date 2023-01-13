import { Button, Icon } from "@shopify/polaris";
import { PlayCircleMajor } from "@shopify/polaris-icons";
const Description = ({ heading, description, link }) => {
  return (
      <div>
        <div>
          <p className="fs-6 fw-semibold">{heading}</p>
        </div>
        <div>
          <p className="fst-normal lh-sm mt-2 text-secondary">
            {description}
          </p>
        </div>
        <div className="mt-2">
          <Button plain removeUnderline>
            <p className="d-flex align-items-center">
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
