import React from "react";
import "./SignupPopup.css";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
//import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faSignature,
  faLock,
  faClipboardCheck,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import GoogleLogin from "react-google-login";
import Swal from "sweetalert2";

class SignupPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSignup: false,
      isResponseGG: false,
      isWrongConfirmPass: false,
      isDoneSignUp: false,
      isLoading: false,
      data: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        avatar: "",
        phone: "",
      },
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: nextProps.login.isLoading,
      isDoneSignUp: nextProps.login.isDoneSignUp,
    });
  }
  onChangeInputHandler = (event) => {
    let { name, value } = event.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      },
    });
  };
  onClickSignUp = () => {
    let { data } = this.state;
    let { password, confirm_password } = data;
    this.setState({
      isLoading: true,
    });
    if (confirm_password !== password) {
      Swal.fire({
        position: "top",
        type: "error",
        title: "Oops...",
        text: "Your code is not right!",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      this.setState({
        isWrongConfirmPass: true,
        isLoading: false,

        data: {
          ...data,
          password: "",
          confirm_password: "",
        },
      });
    }
    this.props.signUpAPI(this.state.data);
  };
  responseGoogle = (response) => {
    let { data } = this.state;
    let res = response.profileObj;

    this.setState({
      data: {
        ...data,
        name: res.name,
        email: res.email,
        avatar: res.imageUrl,
      },
      isResponseGG: true,
      isShowSignup: true,
    });
  };
  render() {
    let {
      isShowSignup,
      data,
      isResponseGG,
      isWrongConfirmPass,
      isDoneSignUp,
    } = this.state;
    console.log(data)
    if (isDoneSignUp) {
      this.props.togglePopup();
      return <div></div>;
    } else
      return (
        <div className="signup-pop-container">
          <div className="signup-pop-inner-container">
            <div className="row" style={{ height: "100%", width: "100%" }}>
              <div className="col-sm-4"></div>
              <div className="col-md-4 d-flex flex-column justify-content-center">
                <div
                  className="signup-pop-inner-crop"
                  style={isShowSignup ? { height: "20%" } : {}}
                >
                  <img
                    className="signup-pop-inner-img"
                    alt="cover"
                    src={require("../images/signupcover.png")}
                  ></img>
                </div>
                <div
                  className="signup-pop-inner"
                  style={isShowSignup ? { height: "fit-content" } : {}}
                >
                  <div className="signup-header">
                    <div className="signup-header-text text-center">
                      <p>Don't lose your vocation-</p>
                      <p>Create a free account</p>
                    </div>
                    <button
                      className="signup-close-btn"
                      onClick={this.props.togglePopup}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        size="1x"
                        color="#ff4d4d"
                      />
                    </button>
                    <div className="some-dash"></div>
                  </div>
                  <div className="signup-body text-center">
                    <p>Sign up with Google:</p>
                    <GoogleLogin
                      clientId="72432990177-9d1ivvugg4v5hgk03m18g8fableckntd.apps.googleusercontent.com"
                      disabled={false}
                      buttonText="Sign up with Google"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      className="custom-signup-btn"
                    ></GoogleLogin>

                    <div className="divide-or">
                      <p>-or-</p>
                    </div>

                    <div className="signup-email text-center">
                      <p>Sign up: </p>
                      <div className="signup-email-input-group">
                        <span className="signup-email-icon">
                          <FontAwesomeIcon icon={faEnvelope} color="#808080" />
                        </span>
                        <input
                          type="text"
                          name="email"
                          value={data.email}
                          disabled={isResponseGG}
                          className="signup-email-ipt"
                          placeholder="Example@gmail.com"
                          onChange={this.onChangeInputHandler}
                          onClick={() => {
                            this.setState({
                              isShowSignup: true,
                            });
                          }}
                          autoComplete="off"
                        />
                      </div>
                      <div
                        className={
                          isShowSignup
                            ? "signup-via-email-group"
                            : "signup-via-email-group d-none"
                        }
                      >
                        <div className="signup-group ">
                          {/**name */}
                          <span className="signup-email-icon">
                            <FontAwesomeIcon
                              icon={faSignature}
                              color="#808080"
                            />
                          </span>
                          <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={this.onChangeInputHandler}
                            disabled={isResponseGG}
                            placeholder="Enter your name ..."
                          />
                        </div>
                        {isWrongConfirmPass ? (
                          <h5 style={{ color: "red" }}>
                            Confirm Password do not match the Password
                          </h5>
                        ) : null}

                        <div className="signup-group">
                          {/**pass */}
                          <span className="signup-email-icon">
                            <FontAwesomeIcon icon={faLock} color="#808080" />
                          </span>
                          <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={this.onChangeInputHandler}
                            placeholder="Enter your password ..."
                          />
                        </div>
                        <div className="signup-group">
                          {/**confirm pass */}
                          <span className="signup-email-icon">
                            <FontAwesomeIcon
                              icon={faClipboardCheck}
                              color="#808080"
                            />
                          </span>
                          <input
                            type="password"
                            name="confirm_password"
                            value={data.confirm_password}
                            onChange={this.onChangeInputHandler}
                            placeholder="Confirm your password ..."
                          />
                        </div>
                        {/* <div className="signup-ant-group">
                        <span className="signup-email-icon">
                          <FontAwesomeIcon icon={faBuilding} color="#808080" />
                        </span>
                        <Select
                          mode="tags"
                          placeholder="Select company"
                          style={{ width: "50%", marginBottom: "5px" }}
                          onChange={this.handleChange}
                          tokenSeparators={[","]}
                        >
                          {children}
                        </Select>
                      </div>
                      <div className="signup-ant-group">
                        <span className="signup-email-icon">
                          <FontAwesomeIcon icon={faRandom} color="#808080" />
                        </span>
                        <Select
                          mode="multiple"
                          placeholder="Select role"
                          style={{ width: "50%", marginBottom: "5px" }}
                          onChange={this.handleChange}
                          tokenSeparators={[","]}
                        >
                          {children}
                        </Select>
                      </div> */}
                        <div className="signup-group">
                          {" "}
                          {/**phone */}
                          <span className="signup-email-icon">
                            <FontAwesomeIcon icon={faPhone} color="#808080" />
                          </span>
                          <input
                            type="text"
                            name="phone"
                            value={data.phone}
                            onChange={this.onChangeInputHandler}
                            placeholder="Enter your phone number ..."
                          />
                        </div>
                        <div className="signup-btn">
                          <button onClick={this.onClickSignUp}>Sign up</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="signup-footer d-flex flex-row justify-content-center">
                    <p>Already have an account</p>
                    <button className="login-btn">Login</button>
                  </div>
                </div>
              </div>
              <div className="col-sm-4"></div>
            </div>
          </div>
        </div>
      );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    signUpAPI: (state) => {
      dispatch(actions.signUpAPI(state));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((SignupPopup));
