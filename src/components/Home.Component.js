import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../styles/fonts.css";
import "../styles/header.css";
import "../styles/home.css";
import Cookies from "js-cookie";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import config from "../config.json";
import Posts from "./Home.Posts.Component"
import DefaultAvatar from "../images/default-avatar.jpg";

let apiurl = 'http://' + config.UserAPI.url.toString() + ':' + config.UserAPI.port.toString();

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: Cookies.get('username'),
            name: null,
            picture: null,
            followersCount: 0,
            followingsCount: 0,
            postsCount: 0,
            likesCount: 0,
            commentsCount: 0,
            data: []
        };
    }

    componentDidMount () {
        this.GetUserFollowersCount();
        this.GetUserFollowingsCount();
        this.GetUserPostsCount();
        this.GetUserCommentsCount();
        this.GetUserLikesCount();

        this.FillUserDetail();
        this.FillPosts();
    }

    GetUserFollowersCount () {
        let url = apiurl + '/users';
        let query = url + '/' + this.state.username + '/followers';

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        followersCount: response.data.Count
                    })
                }
            }, (error) => {
                console.log(error);
            });
    }

    GetUserFollowingsCount () {
        let url = apiurl + '/users';
        let query = url + '/' + this.state.username + '/followings';

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        followingsCount: response.data.Count
                    })
                }
            }, (error) => {
                console.log(error);
            });
    }

    GetUserPostsCount () {
        let url = apiurl + '/users';
        let query = url + '/' + this.state.username + '/posts';

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        postsCount: response.data.Count
                    })
                }
            }, (error) => {
                console.log(error);
            });
    }

    GetUserCommentsCount () {
        let url = apiurl + '/users';
        let query = url + '/' + this.state.username + '/comments';

        axios.put(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        commentsCount: response.data.Count
                    })
                }
            }, (error) => {
                console.log(error);
            });
    }

    GetUserLikesCount () {
        let url = apiurl + '/users';
        let query = url + '/' + this.state.username + '/like';

        axios.put(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        likesCount: response.data.Count
                    })
                }
            }, (error) => {
                console.log(error);
            });
    }

    FillUserDetail () {
        let url = apiurl + '/users';
        let query = url + '/' + this.state.username;

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    let userPicture = response.data.UserPicture;
                    if (response.data.UserPicture == null) {
                        userPicture = DefaultAvatar;
                    }
                    this.setState({
                        name: response.data.FullName,
                        picture: userPicture
                    })
                }
            }, (error) => {
                console.log(error);
            });
    }

    FillPosts () {
        let url = apiurl + '/users';
        let query = url + '/' + this.state.username + '/followings' + '/posts';

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        data: response.data
                    })
                }
            }, (error) => {
                console.log(error);
            });
    }

    PostCreater (jsonList) {
        if (jsonList.length == 0) {
            return ("موردی برای نمایش وجود ندارد");
        }
        else {
            let postsList = [];
            for (let i = 0; i < jsonList.length; i++) {
                if (jsonList[i].UserPicture == null) {
                    jsonList[i].UserPicture = DefaultAvatar;
                }
                postsList.push(<Posts postID={ jsonList[i].ID } username={ jsonList[i].UserName } name={ jsonList[i].FullName } userPicture={ jsonList[i].UserPicture } content={ jsonList[i].Caption } picture={ jsonList[i].Picture } />);
            }
            return postsList;
        }
    }

    render () {
        if (Cookies.get('username') == undefined) {
            return (<Redirect to="/signin" />);
        }
        return (
            <div className="App-body">
                <ul>
                    <li className="selected">خانه</li>
                    <Link to="/explore"><li>گشت و گذار</li></Link>
                    <Link to="/friends"><li>دوستان</li></Link>
                    <Link to="/profile"><li>پروفایل</li></Link>
                </ul>
                <div className="home-body-container">
                    <div className="home-right-panel">
                        <div className="home-sidebar-container">
                            <span className="home-sidebar-title">تعداد دنبال کنندگان</span>
                            <span className="home-sidebar-count" id="userFollowersCount">{ this.state.followersCount }</span>
                        </div>
                        <div className="home-sidebar-container">
                            <span className="home-sidebar-title">تعداد دنبال شدگان</span>
                            <span className="home-sidebar-count" id="userFollowingsCount">{ this.state.followingsCount }</span>
                        </div>
                        <div className="home-sidebar-container">
                            <span className="home-sidebar-title">تعداد پست ها</span>
                            <span className="home-sidebar-count" id="userPostsCount">{ this.state.postsCount }</span>
                        </div>
                        <div className="home-sidebar-container">
                            <span className="home-sidebar-title">تعداد لایک ها</span>
                            <span className="home-sidebar-count" id="userLikesCount">{ this.state.likesCount }</span>
                        </div>
                        <div className="home-sidebar-container">
                            <span className="home-sidebar-title">تعداد کامنت ها</span>
                            <span className="home-sidebar-count" id="userCommentsCount">{ this.state.commentsCount }</span>
                        </div>
                    </div>
                    <div className="home-main">
                        { this.PostCreater(this.state.data) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;