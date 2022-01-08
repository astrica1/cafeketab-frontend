import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../styles/header.css";
import "../styles/user.css";
import Cookies from "js-cookie";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import config from "../config.json";
import Posts from "./Home.Posts.Component"
import DefaultAvatar from "../images/default-avatar.jpg";

let apiurl = 'http://' + config.UserAPI.url.toString() + ':' + config.UserAPI.port.toString();

class Explore extends React.Component {
    constructor (props) {
        super(props);
        const { params } = this.props.match;
        this.state = {
            username: params.username.toLowerCase(),
            name: null,
            picture: null,
            followersCount: 0,
            followingsCount: 0,
            postsCount: 0,
            followed: null,
            data: null,
            load: false
        };
    }

    componentDidMount () {
        this.GetUserFollowersCount();
        this.GetUserFollowingsCount();
        this.GetUserPostsCount();
        this.FollowGetter();
        
        this.FillUserDetail();
        setInterval(() => {
        this.FillPosts();
        }, 1000);
    }

    GetUserFollowersCount() {
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

    GetUserFollowingsCount() {
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

    GetUserPostsCount() {
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

    FillUserDetail() {
        let url = apiurl + '/users';
        let query = url + '/' + this.state.username;

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    let userPicture = response.data.UserPicture;
                    if(response.data.UserPicture == null) {
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

    FillPosts() {
        let url = apiurl + '/users';
        let query = url + '/' + this.state.username + '/posts' + '/list';

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        data: response.data,
                        load: true
                    })
                }
            }, (error) => {
                console.log(error);
            });
    }

    PostCreater (jsonList) {
        if(!this.state.load) {
            return("در حال بارگزاری...");
        }
        if(jsonList == null) {
            return("موردی برای نمایش وجود ندارد");
        }
        let postsList = [];
        for (let i = 0; i < jsonList.length; i++) {
            postsList.push(<Posts postID={ jsonList[i].ID } username={ this.state.username } name={ this.state.name } userPicture={ this.state.picture } content={ jsonList[i].Caption } picture={ jsonList[i].Picture } />);
        }
        return postsList;
    }

    FollowGetter() {
        let myUserName = Cookies.get('username');
        let url = apiurl + '/users';
        let query = url + '/' + myUserName + '/follow' + '?userName=' + this.state.username;

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        followed: response.data.Result
                    })
                }
            }, (error) => {
                console.log(error);
            });
    }

    FollowChecker() {
        if(this.state.username == Cookies.get("username")) {
            return;
        }
        let status = this.state.followed;
        if (status == true) {
            return (<div className="user-followed" onClick={ () => this.FollowInverter() }>دنبال شده</div>);
        }
        else {
            return (<div className="user-follow" onClick={ () => this.FollowInverter() }>دنبال کردن</div>);
        }
    }

    FollowInverter() {
        if (this.state.followed == false) {
            this.Follow();
        }
        else {
            this.UnFollow();
        }
        this.GetUserFollowersCount();
    }

    Follow() {
        let myUserName = Cookies.get('username');
        let url = apiurl + '/users';
        let query = url + '/' + myUserName + '/follow' + '?userName=' + this.state.username;

        axios.post(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        followed: true
                    });
                }
            }, (error) => {
                console.log(error);
            });
    }

    UnFollow() {
        let myUserName = Cookies.get('username');
        let url = apiurl + '/users';
        let query = url + '/' + myUserName + '/unfollow' + '?userName=' + this.state.username;

        axios.post(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        followed: false
                    });
                }
            }, (error) => {
                console.log(error);
            });
    }

    render () {
        
        return (
            <div className="App-body">
                <ul>
                    <Link to="/home"><li>خانه</li></Link>
                    <Link to="/explore"><li>گشت و گذار</li></Link>
                    <Link to="/friends"><li>دوستان</li></Link>
                    <Link to="/profile"><li>پروفایل</li></Link>
                </ul>
                <div className="user-body-container">
                    { this.FollowChecker() }
                    <div className="user-right-panel">
                        <div className="user-sidebar-container">
                            <div className="user-avatar-container">
                                <img src={ this.state.picture } />
                            </div>
                        </div>
                        <div className="user-sidebar-container">
                            <span className="user-sidebar-username">{ '@' + this.state.username }</span>
                            <span className="user-sidebar-name">{ this.state.name }</span>
                        </div>
                        <div className="user-sidebar-container">
                            <span className="user-sidebar-title">تعداد دنبال کنندگان</span>
                            <span className="user-sidebar-count" id="followersCount">{ this.state.followersCount }</span>
                        </div>
                        <div className="user-sidebar-container">
                            <span className="user-sidebar-title">تعداد دنبال شدگان</span>
                            <span className="user-sidebar-count" id="followingsCount">{ this.state.followingsCount }</span>
                        </div>
                        <div className="user-sidebar-container">
                            <span className="user-sidebar-title">تعداد پست ها</span>
                            <span className="user-sidebar-count" id="postsCount">{ this.state.postsCount }</span>
                        </div>
                    </div>
                    <div className="user-main">
                        { this.PostCreater(this.state.data) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Explore;