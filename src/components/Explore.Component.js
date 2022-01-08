import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../styles/fonts.css";
import "../styles/header.css";
import "../styles/explore.css";
import Cookies from "js-cookie";
import { BrowserRouter, Link, Route, Router, Switch, useHistory, Redirect } from "react-router-dom";
import config from "../config.json";
import Posts from "./Home.Posts.Component"
import DefaultAvatar from "../images/default-avatar.jpg";

let apiurl = 'http://' + config.UserAPI.url.toString() + ':' + config.UserAPI.port.toString();

class Explore extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: Cookies.get('username'),
            data: null
     };
    }

    componentDidMount () {
        let url = apiurl + '/posts';

        axios.get(url)
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
        if(jsonList == null) {
            return("موردی برای نمایش وجود ندارد");
        }
        let postsList = [];
        for (let i = 0; i < jsonList.length; i++) {
            if(jsonList[i].UserPicture == null) {
                jsonList[i].UserPicture = DefaultAvatar;
            }
            postsList.push(<Posts postID={ jsonList[i].ID } username={ jsonList[i].UserName.toLowerCase() } name={ jsonList[i].FullName } userPicture={ jsonList[i].UserPicture } content={ jsonList[i].Caption } picture={ jsonList[i].Picture } />);
        }
        return postsList;
    }

    Search () {
        let usrnameInput = document.getElementById("searchedUser");
        let query = usrnameInput.value;
        query = query.replace(/\s/g, '').toLowerCase();
        this.setState({
            username: query
        });
    }

    render () {
        if (Cookies.get('username') == undefined) {
            return (<Redirect to="/signin" />);
        }
        return (
            <div className="App-body">
                <ul>
                    <Link to="/home"><li>خانه</li></Link>
                    <li className="selected">گشت و گذار</li>
                    <Link to="/friends"><li>دوستان</li></Link>
                    <Link to="/profile"><li>پروفایل</li></Link>
                </ul>
                <div className="explore-body-container">
                    <div className="search-container">
                        <input type="text" className="search-query" id="searchedUser" placeholder="آی دی کاربر مورد نظر را وارد کنید" onChange={ () => this.Search() } />
                        <Link to={ '/user/' + this.state.username } ><div className="search-submit"></div></Link>
                    </div>
                    <div className="explore-posts-container">
                        { this.PostCreater(this.state.data) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Explore;