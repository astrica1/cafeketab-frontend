import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../styles/sign.css";
import Cookies from "js-cookie";
import { BrowserRouter, Link, Route, Router, Switch, useHistory, Redirect } from "react-router-dom";
import config from "../config.json";
import Hashing from "../scripts/Hashing"

let apiurl = 'http://' + config.UserAPI.url.toString() + ':' + config.UserAPI.port.toString();

class Signin extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: null,
            hashedPassword: null,
        };
    }

    Submit () {
        if (this.validationChecker()) {
            let url = apiurl + '/users';

            let header = {
                'Content-Type': 'application/json'
            }

            let query = url + '/' + this.state.username.toLowerCase();

            

            axios.post(query)
                .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        console.log(response);
                        if(!response.data) {
                            return alert("نام کاربری یا رمز عبور نادرست است");
                        }
                        else if (response.data.HashedPassword.replace(/\s/g, '') == this.state.hashedPassword) {
                            Cookies.set('username', this.state.username);
                            this.setState({
                                isSignedIn: true
                            });
                            return (<Redirect to="/home" />);
                        }
                        else {
                            alert("نام کاربری یا رمز عبور نادرست است");
                        }
                    }
                }, (error) => {
                    console.log(error);
                });
        }
    }

    validationChecker () {
        if (this.usernameValidator() && this.passwordValidator()) {
            return true;
        }
        else {
            alert("ورودی ها معتبر نمی باشند");
            return false;
        }
    }

    usernameValidator () {
        let usernameInput = document.getElementById("username");
        let regex = /^[a-zA-Z]{1}[a-zA-Z0-9]{4,49}$/;
        if (regex.test(usernameInput.value)) {
            usernameInput.style.border = "none";
            this.setState({
                username: usernameInput.value
            });
            return true;
        }
        else {
            usernameInput.style.border = "1px solid red";
            return false;
        }
    }

    passwordValidator () {
        let passwordInput = document.getElementById("password");
        let regex = /^[a-zA-Z0-9!-=_@^~<>?]{8,50}$/;
        if (regex.test(passwordInput.value)) {
            passwordInput.style.border = "none";
            this.setState({
                hashedPassword: Hashing.String2MD5(passwordInput.value)
            });
            return true;
        }
        else {
            passwordInput.style.border = "1px solid red";
            return false;
        }
    }

    render () {
        if (Cookies.get('username') != undefined || this.state.isSignedUp) {
            return (<Redirect to="/home" />);
        }
        return (
            <div className="App-body">
                <div className="Signin-container">
                    <div className="login-logo">کافه کتاب</div>
                    <form>
                        <label for="username">نام کاربری: <input type="text" name="username" id="username" onChange={ () => this.usernameValidator() } /></label>
                        <label for="password">رمز عبور: <input type="password" name="password" id="password" onChange={ () => this.passwordValidator() } /></label>
                        <label for="submit"><input type="button" name="submit" value="تایید" onClick={ () => this.Submit() } /></label>
                        <div>حساب کاربری ندارید؟ <Link to="/signup">کلیک کنید</Link></div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signin;