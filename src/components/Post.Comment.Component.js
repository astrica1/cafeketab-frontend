import React from "react";
import ReactDOM from "react-dom";
import "../styles/header.css";
import "../styles/post.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import config from "../config.json";

let apiurl = config.UserAPI.url.toString() + ':' + config.UserAPI.port.toString() + '/';

class Comment extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            commentID: props.commentID,
            username: props.username,
            content: props.content
        };
    }

    render () {
        return (
            <div className="comment-container">
                <Link to= { '/user/' + this.state.username }>
                    <span className="comment-username">{ this.state.username + ': ' }</span>
                    <span className="comment-content">{ this.state.content }</span>
                </Link>
            </div>
        );
    }

}

export default Comment;