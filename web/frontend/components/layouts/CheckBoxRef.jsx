import React from "react";

export const CheckBoxRef = (props) => {
    return (
        <div className="col-md-4">
            <div className="Polaris-Stack__Item m-2">
                <div className="Polaris-Card">
                    <div className="Polaris-Card__Section">
                        <img src={props.src} style={{ width: '100%' }} />
                        <div className="Polaris-TextContainer buttonContainer">
                            <div className="cartdataclass">
                                <h2 className="Polaris-Heading" style={{ marginTop: '10px' }}>{props.title}</h2>
                                <p style={{ marginTop: '10px' }}>{props.description}</p>
                                {props.rating !== "" ? <p style={{ marginTop: '10px' }}>
                                    <b>{props.rating} ⭐</b>
                                </p > : ''}
                            </div>
                            <div className="Addnavtobottom">
                                <a
                                    style={props.style}
                                    className="Polaris-Button Polaris-Button--fullWidth"
                                    target="_blank"
                                    href={props.link}
                                >
                                    <span className="Polaris-Button__Content">
                                        <span className="Polaris-Button__Text">
                                            {props.btnText}
                                        </span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};