import { Button } from "@shopify/polaris";
import "../../css/cancodeapp.css";
const ShowApps = ({ src, title, description, rating, link }) => {
  return (
    <>
      <div className="overflow-hidden showappsCard">
        <div>
          <div>
            <img src={src} className="appImage" />
          </div>
          <div className="apptitle my-3">
            <p>{title}</p>
          </div>
          <div className="appdescription">
            <p>{description}</p>
          </div>
          <div className="my-3 apprating">
            <p><span className={rating == undefined || rating == "" && 'opacity-0'}>{rating} ⭐</span></p>
          </div>
          <div>
            <Button
              fullWidth
              onClick={() => {
                window.open(link);
              }}
            >
              {" "}
              View on shopify app store{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowApps;
