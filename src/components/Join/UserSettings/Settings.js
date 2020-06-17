import React from 'react';
import './Settings.css';
import JoinNav from '../Nav/Nav';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight, faUser, faCogs
} from "@fortawesome/free-solid-svg-icons";

import UserNameEdit from './UserNameEdit'
import NameEdit from './NameEdit'
import GradeEdit from './GradeEdit'
import PasswordEdit from './PasswordEdit'
import PopUp from '../../../utils/PopUp/PopUp'
import UpgradeAcc from './UpgradeAcc'
class UserSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowAvaEdit: false,
            isShowUserNameEdit: false,
            isShowNameEdit: false,
            isShowGradeEdit: false,
            isShowPasswordEdit: false,
            isShowDeleteAcc: false,
            isShowUpgradeAcc: false,
        }
    }

    togglePopups = (type) => {
        switch (type) {
            case "ava": {
                this.setState({
                    isShowAvaEdit: !this.state.isShowAvaEdit
                });

                break;
            }

            case "username": {
                this.setState({
                    isShowUserNameEdit: !this.state.isShowUserNameEdit
                });

                break;
            }

            case "name": {
                this.setState({
                    isShowNameEdit: !this.state.isShowNameEdit
                });

                break;
            }

            case "grade": {
                this.setState({
                    isShowGradeEdit: !this.state.isShowGradeEdit
                });

                break;
            }

            case "password": {
                this.setState({
                    isShowPasswordEdit: !this.state.isShowPasswordEdit
                });

                break

                ;
            }

            case "upgradeAcc": {
                this.setState({
                    isShowUpgradeAcc: !this.state.isShowUpgradeAcc
                });

                break

                ;
            }
            default:
                return;
        }

    };
    render() {
        return (
            <div className="settings-wrapper">
                <JoinNav />
                <div className="settings-container">
                    <h3 className="page-title">Settings</h3>
                    <div className="profile-settings">
                        <div className="set-section-name">
                            <span style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faUser} color="#FD7E14" /></span>
                            Profile
                        </div>
                        <div className="set-ava" onClick={() => this.togglePopups("ava")}>
                            <div className="settings-section">
                                <div className="set-section-title">
                                    Ava
                                </div>
                                <div className="set-section-content">
                                    Nox
                                </div>
                            </div>
                            <span className="set-icon"><FontAwesomeIcon icon={faChevronRight} /></span>
                        </div>
                        <div className="set-user-name" onClick={() => this.togglePopups("username")}>
                            <div className="settings-section">
                                <div className="set-section-title">
                                    Username
                                </div>
                                <div className="set-section-content">
                                    Nox
                                </div>
                            </div>
                            <span className="set-icon"><FontAwesomeIcon icon={faChevronRight} /></span>
                        </div>
                        <div className="set-name" onClick={() => { this.togglePopups("name") }}>
                            <div className="settings-section">
                                <div className="set-section-title">
                                    Name
                                </div>
                                <div className="set-section-content">
                                    Nox
                                </div>
                            </div>
                            <span className="set-icon"><FontAwesomeIcon icon={faChevronRight} /></span>
                        </div>
                        <div className="set-grade" onClick={() => { this.togglePopups("grade") }}>
                            <div className="settings-section">
                                <div className="set-section-title">
                                    Grade
                                </div>
                                <div className="set-section-content">
                                    Nox
                                </div>
                            </div>
                            <span className="set-icon"><FontAwesomeIcon icon={faChevronRight} /></span>
                        </div>
                    </div>

                    <div className="account-settings" style={{ marginTop: '30px' }}>
                        <div className="set-section-name">
                            <span style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faCogs} color="#FD7E14" /></span>
                            Account settings
                        </div>

                        <div className="set-upgrade-role-section" onClick={() => { this.togglePopups("upgradeAcc") }}>
                            <div className="sec-title">Update role</div>
                            <span><FontAwesomeIcon icon={faChevronRight} /></span>
                        </div>

                        <div className="set-update-pass-section" onClick={() => { this.togglePopups("password") }}>
                            <div className="sec-title">Update password</div>
                            <span><FontAwesomeIcon icon={faChevronRight} /></span>
                        </div>

                        <div className="set-delete-section">
                            <div className="sec-title">Delete account</div>
                            <span><FontAwesomeIcon icon={faChevronRight} /></span>
                        </div>

                        <div className="set-logout-section">
                            <div className="sec-title">Log out</div>
                            <span><FontAwesomeIcon icon={faChevronRight} /></span>
                        </div>
                    </div>
                </div>

                {this.state.isShowUserNameEdit ? (
                    <UserNameEdit
                        togglePopUp={() => this.togglePopups("username")}
                    />
                ) : null}

                {this.state.isShowNameEdit ? (
                    <NameEdit
                        togglePopUp={() => this.togglePopups("name")}
                    />
                ) : null}

                {this.state.isShowGradeEdit ? (
                    <GradeEdit
                        togglePopUp={() => this.togglePopups("grade")}
                    />
                ) : null}

                {this.state.isShowPasswordEdit ? (
                    <PasswordEdit
                        togglePopUp={() => this.togglePopups("password")}
                    >

                    </PasswordEdit>
                ) : null}
                {this.state.isShowUpgradeAcc ? (
                    <PopUp
                        openPop={(open) => {
                            this.setState({
                                isShowUpgradeAcc: !open
                            })
                        }}
                    >
                        <UpgradeAcc />
                    </PopUp>
                ) : null}

            </div>
        );
    }
}

export default UserSettings;