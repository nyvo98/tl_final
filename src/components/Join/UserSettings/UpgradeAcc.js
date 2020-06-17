import React from "react";

class UpgradeAcc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenPricing: false,
            isOpenHR: false,
            isOpenSenior: false,
        }
    }


    chooseRoleHandler = (type) => {
        this.setState({
            isOpenPricing: true,
        })

        switch (type) {
            case "HR": {
                this.setState({
                    isOpenHR: true,
                    isOpenSenior: false,
                })
                break;
            }

            case "Senior": {
                this.setState({
                    isOpenSenior: true,
                    isOpenHR: false,
                })
                break;
            }
            default:
                return
        }
    }
    render() {
        let { isOpenPricing, isOpenHR, isOpenSenior } = this.state;
        return (
            <div className="upgrade-acc-container">
                <div className="upgrade-acc-title">Upgrade your new role</div>
                <div className="ua-role-img-container">
                    <div className="role-symbol pr-3 pt-4 pb-2"
                        onClick={() => this.chooseRoleHandler("HR")}
                        style={isOpenHR ? {
                            background: 'linear-gradient(90deg, rgba(107,90,220,1) 0%, rgba(143,84,233,1) 52%, rgba(190,75,249,1) 100%)'
                        } : {}}
                    >
                        <img
                            style={{ width: '80%' }}
                            alt="HR" src={require("./images/HRstaff.png")}
                        />
                        <p className="text-center"><strong>as a Human Resources Staff</strong></p>
                    </div>
                    <div className="role-symbol pr-3 pt-4 pb-2"
                        onClick={() => this.chooseRoleHandler("Senior")}
                        style={isOpenSenior ? {
                            background: 'linear-gradient(90deg, rgba(107,90,220,1) 0%, rgba(143,84,233,1) 52%, rgba(190,75,249,1) 100%)'
                        } : {}}
                    >
                        <img
                            style={{ width: '80%' }}
                            alt="HR" src={require("./images/Senior.png")}
                        />
                        <p className="text-center"><strong>as a Senior Engineer Interviewer</strong></p>
                    </div>
                </div>

                <div className="ua-pricing-container"
                    style={isOpenPricing ? { display: 'block' } : { display: 'none' }}
                >
                    <div className="ua-choose-company mb-4">
                        <p className="ua-section-title">Choose your company</p>
                        {/* <div class="dropdown">
                            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown link
                            </a>

                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div> */}
                    </div>
                    <div className="ua-choose-plan">
                        <p className="ua-section-title">Choose your plan</p>
                        <div className="plan-choices d-flex flex-row">
                            <div className="plan-container">
                                <div className="plan-type">
                                    Advanced
                            </div>
                                <img alt="plan"
                                    src={require("./images/Advanced.png")}
                                />
                                <div className="plan-price">
                                    <strong>$3.99</strong>
                                </div>
                                <div className="plan-unit">
                                    <p>per month</p>
                                </div>
                            </div>
                            <div className="plan-container mx-2" >
                                <div className="plan-type">
                                    Business
                            </div>
                                <img alt="plan"
                                    src={require("./images/Business.png")} />
                                <div className="plan-price">
                                    <strong>$5.99</strong>
                                </div>
                                <div className="plan-unit">
                                    <p>per month</p>
                                </div>
                            </div>
                            <div className="plan-container">
                                <div className="plan-type">
                                    Professional
                            </div>
                                <img alt="plan"
                                    src={require("./images/Professional.png")}
                                />
                                <div className="plan-price">
                                    <strong>$9.99</strong>
                                </div>
                                <div className="plan-unit">
                                    <p>per month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ua-confirm-container text-center"
                    style={isOpenPricing ? { display: 'block' } : { display: 'none' }}
                >
                    <button className="ua-confirm-btn">Confirm</button>
                </div>
            </div >
        );
    }
}

export default UpgradeAcc;