import React from "react";
import ReactDOM from "react-dom";
import "./styles/fonts.css";
import "./styles/header.css";
import Cookies from "js-cookie";
import { BrowserRouter, Link, Route, Router, Switch, useHistory, Redirect } from "react-router-dom";
import Home from "./components/Home.Component.js";
import Explore from "./components/Explore.Component.js";
import Friends from "./components/Friends.Component.js";
import Profile from "./components/Profile.Component.js";
import Signin from "./components/Signin.Component";
import Signup from "./components/Signup.Component";
import Post from "./components/Post.Component";
import User from "./components/User.Component";

class Controller extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            authentication: this.Authentication()
        };
    }

    Authentication () {
        let status = Cookies.get("username");
        return (status != undefined);
    }

    Default (authentication) {
        if (authentication) {
            return (<Redirect to="/home" />);
        }
        else {
            return (<Redirect to="/signin" />);
        }
    }

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/home" component={ Home } />
                    <Route path="/explore" component={ Explore } />
                    <Route path="/friends" component={ Friends } />
                    <Route path="/profile" component={ Profile } />
                    <Route path="/signin" component={ Signin } />
                    <Route path="/signup" component={ Signup } />
                    <Route path="/user/:username" component={ User } />
                    <Route path="/post/:postID" component={ Post } />
                    <Route path="/" children={ () => this.Default(this.state.authentication) } />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Controller;