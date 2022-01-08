import React from "react";
import ReactDOM from "react-dom";
import "../styles/fonts.css";
import "../styles/header.css";
import "../styles/home.css";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";

class Posts extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            postID: this.props.postID,
            username: this.props.username,
            name: this.props.name,
            userpicture: this.props.userPicture,
            content: this.props.content,
            picture: this.props.picture

        };
    }

    RedirectToPostPage () {
        return (<Link to={ '/post/' + this.state.postID } />);
    }

    RedirectToUserPage () {
        return (<Link to={ '/user/' + this.state.username } />);
    }

    render () {
        if (this.state.picture == (undefined || null)) {
            return (
                <Link to={ '/post/' + this.state.postID }>
                    <div className="home-post-container">
                        <Link to={ '/user/' + this.state.username } >
                            <div className="home-post-header">
                                <div className="home-post-avatar-container">
                                    <img src={ this.state.userpicture } />
                                </div>
                                <span className="home-post-username-container">{ "@" + this.state.username }</span>
                                <span className="home-post-name-container">{ this.state.name }</span>
                            </div>
                        </Link>
                        <div className="home-post-content">{ this.state.content }</div>
                    </div>
                </Link>
            );
        }
        else if (this.state.content == (undefined || null)) {
            return (
                <Link to={ '/post/' + this.state.postID }>
                    <div className="home-post-container">
                        <Link to={ '/user/' + this.state.username } >
                            <div className="home-post-header">
                                <div className="home-post-avatar-container">
                                    <img src={ this.state.userpicture } />
                                </div>
                                <span className="home-post-username-container">{ "@" + this.state.username }</span>
                                <span className="home-post-name-container">{ this.state.name }</span>
                            </div>
                        </Link>
                        <div className="home-post-image">
                            <img src={ this.state.picture } />
                        </div>
                    </div>
                </Link>
            );
        }
        else {
            return (
                <Link to={ '/post/' + this.state.postID }>
                    <div className="home-post-container">
                        <div className="home-post-right">
                            <Link to={ '/user/' + this.state.username } >
                                <div className="home-post-header">
                                    <div className="home-post-avatar-container">
                                        <img src={ this.state.userpicture } />
                                    </div>
                                    <div className="home-post-header-left" >
                                        <span className="home-post-username-container">{ "@" + this.state.username }</span>
                                        <span className="home-post-name-container">{ this.state.name }</span>
                                    </div>
                                </div>
                            </Link>
                            <div className="home-post-content-container">{ this.state.content }</div>
                        </div>
                        <div className="home-post-left">
                            <img src={ this.state.picture } />
                        </div>
                    </div>
                </Link>
            );
        }
    }
}

export default Posts;