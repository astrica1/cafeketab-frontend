import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../styles/header.css";
import "../styles/post.css";
import Cookies from "js-cookie";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import config from "../config.json";
import DefaultAvatar from "../images/default-avatar.jpg";
import Like from "../images/like.png";
import UnLike from "../images/unlike.png";
import Comments from "./Post.Comment.Component"

let apiurl = 'http://' + config.UserAPI.url.toString() + ':' + config.UserAPI.port.toString();

class Post extends React.Component {
    constructor (props) {
        super(props);
        const { params } = this.props.match;
        this.state = {
            postId: params.postID,
            username: null,
            name: null,
            userPicture: null,
            caption: null,
            picture: null,
            isLiked: false,
            likesCount: 0,
            commentsCount: 0,
            commentsList: []
        };
    }

    componentDidMount () {
        this.FillPostParameter();
        this.LikeGetter();
        this.GetCommentsCount();
        this.GetLikesCount();
        this.GetCommentsList();
    }

    FillPostParameter () {
        let url = apiurl + '/posts';
        let query = url + '/' + this.state.postId;

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    if (response.data.UserPicture == null) {
                        response.data.UserPicture = DefaultAvatar;
                    }
                    this.setState({
                        userPicture: response.data.UserPicture,
                        username: response.data.UserName,
                        name: response.data.FullName,
                        caption: response.data.Caption,
                        picture: response.data.Picture
                    })
                }
            }, (error) => {
                console.log(error);
            });
    }

    FillContent () {
        if (this.state.picture != null) {
            return (
                <div className="post-content">
                    <div className="image-container">
                        <img src={ this.state.picture } />
                    </div>
                    <div className="post-caption">{ this.state.caption }</div>
                </div>
            );
        }
        else {
            return (
                <div className="post-content">
                    <div className="post-caption">{ this.state.caption }</div>
                </div>
            );
        }
    }

    LikeGetter () {
        let myUserName = Cookies.get('username');
        let url = apiurl + '/users';
        let query = url + '/' + myUserName + '/like' + '?postID=' + this.state.postId;

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        isLiked: response.data.Result
                    })
                }
            }, (error) => {
                console.log(error);
            });
    }

    LikeChecker () {
        let status = this.state.isLiked;
        if (status == true) {
            return (<img src={ Like } onClick={ () => this.LikeInverter() } />);
        }
        else {
            return (<img src={ UnLike } className="invert" onClick={ () => this.LikeInverter() } />);
        }
    }

    LikeInverter () {
        if (this.state.isLiked == false) {
            this.Like();
        }
        else {
            this.UnLike();
        }
        this.GetLikesCount();
    }

    Like () {
        let myUserName = Cookies.get('username');
        let url = apiurl + '/users';
        let query = url + '/' + myUserName + '/like' + '?postID=' + this.state.postId;

        axios.post(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        isLiked: true
                    });
                }
            }, (error) => {
                console.log(error);
            });
    }

    UnLike () {
        let myUserName = Cookies.get('username');
        let url = apiurl + '/users';
        let query = url + '/' + myUserName + '/unlike' + '?postID=' + this.state.postId;

        axios.post(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        isLiked: false
                    });
                }
            }, (error) => {
                console.log(error);
            });
    }

    SendComment () {
        let comment = document.getElementById("comment");
        let message = comment.value;
        if (message == "") {
            alert("متن کامنت را وارد کنید");
        }
        else {
            let myUserName = Cookies.get('username');
            let url = apiurl + '/users';
            let query = url + '/' + myUserName + '/comments' + '?postID=' + this.state.postId + '&content=' + message;

            axios.post(query)
                .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        console.log(response);
                    }
                }, (error) => {
                    console.log(error);
                });
            this.GetCommentsCount();
            comment.value = "";
        }
    }

    GetCommentsCount () {
        let url = apiurl + '/posts';
        let query = url + '/' + this.state.postId + '/comments';

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        commentsCount: response.data.Count
                    });
                }
            }, (error) => {
                console.log(error);
            });

        this.GetCommentsList();
    }

    GetLikesCount () {
        let url = apiurl + '/posts';
        let query = url + '/' + this.state.postId + '/likes';

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        likesCount: response.data.Count
                    });
                }
            }, (error) => {
                console.log(error);
            });
    }

    GetCommentsList () {
        let url = apiurl + '/posts';
        let query = url + '/' + this.state.postId + '/comments' + '/list';

        axios.get(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    this.setState({
                        commentsList: response.data
                    });
                }
            }, (error) => {
                console.log(error);
            });
    }

    CommentsCreater (jsonList) {
        if (jsonList == null) {
            return ("موردی برای نمایش وجود ندارد");
        }
        let commentsList = [];
        for (let i = 0; i < jsonList.length; i++) {
            commentsList.push(<Comments commentID={ jsonList[i].ID } username={ jsonList[i].UserName } content={ jsonList[i].Content } />);
        }
        return commentsList;
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
                <div className="post-body-container">
                    <div className="post-container">
                        <div className="left">
                            <Link to={ '/user/' + this.state.username }>
                                <div className="header">
                                    <div className="avatar-container">
                                        <img src={ this.state.userPicture } />
                                    </div>
                                    <div className="details-container">
                                        <div className="username">{ '@' + this.state.username }</div>
                                        <div className="name">{ this.state.name }</div>
                                    </div>
                                </div>
                            </Link>
                            { this.FillContent() }
                        </div>
                        <div className="right">
                            <div className="header">
                                <div className="top-bar">
                                    <div className="like-container">{ this.LikeChecker() }</div>
                                    <div className="right"><span>تعداد لایک</span><span className="count">{ this.state.likesCount }</span></div>
                                    <div className="right"><span>تعداد کامنت</span><span className="count">{ this.state.commentsCount }</span></div>
                                </div>
                                <div className="send-comment">
                                    <div className="submit-comment" onClick={ () => this.SendComment() }></div>
                                    <input type="text" name="comment" id="comment" />
                                </div>
                            </div>
                            <div className="comments-body-container">
                                { this.CommentsCreater(this.state.commentsList) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Post;