import React from "react";
import "./LoginPopup.css";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
//import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isDoneLogin: false,
      isLoading: false,
      isDisplay: "block",
      token: "",
    };
  }
  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.props.loginAPI(this.state);
  };
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: nextProps.login.isLoading,
      isDoneLogin: nextProps.login.isDoneLogin,
    });
  }
  render() {
    let { email, password, isLoading, isDoneLogin } = this.state;
    if (isDoneLogin) {
      this.props.togglePopup();
    }
    return (
      <div className="login-popup">
        <div className="login-cover-crop">
          <img alt="cover" src={require("../images/signupcover.png")} />
        </div>
        <div className="login-popup_inner">
          <form onSubmit={this.onSubmitHandler} className="form-info">
            <div className="login-popup-header">
              <p>
                <strong>LOGIN</strong>
              </p>
              <button
                className="b-close"
                type="button"
                onClick={this.props.togglePopup}
              >
                <FontAwesomeIcon icon={faTimes} size="1x" color="#ff4d4d" />
              </button>
            </div>
            <div className="login-popup-body">
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="login-popup-footer">
              <div className="form-field">
                <div className="button-group">
                  <button type="submit" className="btn-login">
                    {isLoading ? (
                      <div>
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </div>
                    ) : null}
                    LOGIN
                  </button>
                </div>
              </div>
              <div className="create-new-acc d-flex flex-row justify-content-center mt-2">
                <p>Don't have an account?</p>
                <button className="signup-btn">Sign up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    loginAPI: (state) => {
      dispatch(actions.loginAPI(state));
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
)((LoginPopup));
