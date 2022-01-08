import React from "react";
import ReactDOM from "react-dom";
import "../styles/header.css";
import "../styles/profile.css"
import Cookies from "js-cookie";
import { BrowserRouter, Link, Route, Router, Switch, useHistory, Redirect } from "react-router-dom";
import CreatePost from "./Profile.CreatePost.Component"

class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selected: 1
        };
    }

    SignOut () {
        Cookies.remove('username');
        this.setState({
            signout: true
        });
    }

    Switcher (select) {
        switch (select) {
            case 1:
                return (this.PostManagement());
                break;
            case 2:
                return (this.CreatePost());
                break;
            case 3:
                return (this.CommentManagement());
                break;
            case 4:
                return (this.LikedPost());
                break;
            case 5:
                return (this.LikedBook());
                break;
            case 6:
                return (this.LikedPublisher());
                break;
            default:
                return (this.PostManagement());
                break
        }
    }

    PostManagement () {
        return (
            <div>
                <div className="profile-menubar">
                    <div className="profile-menu-item selected">مدیریت پست ها</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 2 }) }>ارسال پست جدید</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 3 }) }>مدیریت نظرات</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 4 }) }>پست های پسندیده</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 5 }) }>کتاب های مورد علاقه</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 6 }) }>ناشران مورد علاقه</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 7 }) }>تغییر مشخصات</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 8 }) }>تغییر رمز عبور</div>
                    <div className="profile-menu-item" onClick={ () => this.SignOut() }>خروج از سایت</div>
                </div>
                <div className="profile-body-container">
                    <div className="profile-container" id="macbook">موردی برای نمایش وجود ندارد</div>
                </div>
            </div>
        );
    }

    CreatePost () {
        return (
            <div>
                <div className="profile-menubar">
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 1 }) }>مدیریت پست ها</div>
                    <div className="profile-menu-item selected">ارسال پست جدید</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 3 }) }>مدیریت نظرات</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 4 }) }>پست های پسندیده</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 5 }) }>کتاب های مورد علاقه</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 6 }) }>ناشران مورد علاقه</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 7 }) }>تغییر مشخصات</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 8 }) }>تغییر رمز عبور</div>
                    <div className="profile-menu-item" onClick={ () => this.SignOut() }>خروج از سایت</div>
                </div>
                <div className="profile-body-container">
                    <div className="profile-container" id="macbook">
                        <CreatePost />
                    </div>
                </div>
            </div>
        );
    }

    CommentManagement () {
        return (
            <div>
                <div className="profile-menubar">
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 1 }) }>مدیریت پست ها</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 2 }) }>ارسال پست جدید</div>
                    <div className="profile-menu-item selected">مدیریت نظرات</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 4 }) }>پست های پسندیده</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 5 }) }>کتاب های مورد علاقه</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 6 }) }>ناشران مورد علاقه</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 7 }) }>تغییر مشخصات</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 8 }) }>تغییر رمز عبور</div>
                    <div className="profile-menu-item" onClick={ () => this.SignOut() }>خروج از سایت</div>
                </div>
                <div className="profile-body-container">
                    <div className="profile-container" id="macbook">موردی برای نمایش وجود ندارد</div>
                </div>
            </div>
        );
    }

    LikedPost () {
        return (
            <div>
                <div className="profile-menubar">
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 1 }) }>مدیریت پست ها</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 2 }) }>ارسال پست جدید</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 3 }) }>مدیریت نظرات</div>
                    <div className="profile-menu-item selected">پست های پسندیده</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 5 }) }>کتاب های مورد علاقه</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 6 }) }>ناشران مورد علاقه</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 7 }) }>تغییر مشخصات</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 8 }) }>تغییر رمز عبور</div>
                    <div className="profile-menu-item" onClick={ () => this.SignOut() }>خروج از سایت</div>
                </div>
                <div className="profile-body-container">
                    <div className="profile-container" id="macbook">موردی برای نمایش وجود ندارد</div>
                </div>
            </div>
        );
    }

    LikedBook () {
        return (
            <div>
                <div className="profile-menubar">
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 1 }) }>مدیریت پست ها</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 2 }) }>ارسال پست جدید</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 3 }) }>مدیریت نظرات</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 4 }) }>پست های پسندیده</div>
                    <div className="profile-menu-item selected">کتاب های مورد علاقه</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 6 }) }>ناشران مورد علاقه</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 7 }) }>تغییر مشخصات</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 8 }) }>تغییر رمز عبور</div>
                    <div className="profile-menu-item" onClick={ () => this.SignOut() }>خروج از سایت</div>
                </div>
                <div className="profile-body-container">
                    <div className="profile-container" id="macbook">موردی برای نمایش وجود ندارد</div>
                </div>
            </div>
        );
    }

    LikedPublisher () {
        return (
            <div>
                <div className="profile-menubar">
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 1 }) }>مدیریت پست ها</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 2 }) }>ارسال پست جدید</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 3 }) }>مدیریت نظرات</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 4 }) }>پست های پسندیده</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 5 }) }>کتاب های مورد علاقه</div>
                    <div className="profile-menu-item selected">ناشران مورد علاقه</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 7 }) }>تغییر مشخصات</div>
                    <div className="profile-menu-item" onClick={ () => this.setState({ selected: 8 }) }>تغییر رمز عبور</div>
                    <div className="profile-menu-item" onClick={ () => this.SignOut() }>خروج از سایت</div>
                </div>
                <div className="profile-body-container">
                    <div className="profile-container" id="macbook">موردی برای نمایش وجود ندارد</div>
                </div>
            </div>
        );
    }

    render () {
        if (Cookies.get('username') == undefined) {
            return (<Redirect to="/signin" />);
        }
        return (
            <div className="App-body">
                <ul>
                    <Link to="/home"><li>خانه</li></Link>
                    <Link to="/explore"><li>گشت و گذار</li></Link>
                    <Link to="/friends"><li>دوستان</li></Link>
                    <li className="selected">پروفایل</li>
                </ul>
                { this.Switcher(this.state.selected) }
            </div>
        );
    }
}

export default Profile;