import React from "react";
import ReactDOM from "react-dom";
import "../styles/fonts.css";
import "../styles/header.css";
import "../styles/friends.css";
import VideoURL from "../videos/connection.mp4";
import DefaultAvatar from "../images/default-avatar.jpg";
import Grid from "./Friends.Grid.Component";
import Cookies from "js-cookie";
import { BrowserRouter, Link, Route, Router, Switch, useHistory, Redirect } from "react-router-dom";

class Friends extends React.Component {
    constructor (props) {
        super(props);
        this.state = { selected: props.selected };
    }

    FillFollowingList () {
        let followings = []
        for (var i = 1; i <= 10; i++) {
            followings.push(<Grid userPicture={ DefaultAvatar } userName="@astrica" name="Alireza Matani" />);
        }
        return (followings);
    }

    FillFollowerList () {

    }

    FillBussinessFollowingList () {

    }

    FillBooksList () {

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
                    <li className="selected">دوستان</li>
                    <Link to="/profile"><li>پروفایل</li></Link>
                </ul>
                <div className="friends-background-image"></div>
                <div className="friends-body-container">
                    <div className="friends-field-container">
                        <span className="friends-field-title">کاربران دنبال کننده</span>
                        <div>
                            موردی برای نمایش وجود ندارد
                        </div>
                    </div>
                    <div className="friends-field-container">
                        <span className="friends-field-title">کاربران دنبال شده</span>
                        <div>
                            موردی برای نمایش وجود ندارد
                        </div>
                    </div>
                    <div className="friends-field-container">
                        <span className="friends-field-title">کاربران ویژه دنبال شده</span>
                        <div>
                            موردی برای نمایش وجود ندارد
                        </div>
                    </div>
                    <div className="friends-field-container">
                        <span className="friends-field-title">کتاب های دنبال شده</span>
                        <div>
                            موردی برای نمایش وجود ندارد
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Friends;