import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../styles/sign.css";
import Cookies from "js-cookie";
import { BrowserRouter, Link, Route, Router, Switch, useHistory, Redirect } from "react-router-dom";
import config from "../config.json";
import Hashing from "../scripts/Hashing"

let apiurl = 'http://' + config.UserAPI.url.toString() + ':' + config.UserAPI.port.toString();

class Signup extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            fullName: null,
            username: null,
            hashedPassword: null,
            mailAddress: null
        };
    }

    Submit () {
        if (this.validationChecker()) {
            let url = apiurl + '/users';

            let data = {
                fullName: this.state.fullName,
                userName: this.state.username.toLowerCase(),
                hashedPassword: this.state.hashedPassword,
                mailAddress: this.state.mailAddress
            };

            let header = {
                'Content-Type': 'application/json'
            }

            let query = url + '?' + 'fullName=' + this.state.fullName + '&userName=' + this.state.username + '&hashedPassword=' + this.state.hashedPassword + '&mailAddress=' + this.state.mailAddress;

            axios.post(query)
                .then((response) => {
                    console.log(response);
                    if(response.status == 200) {
                        console.log(response);
                        alert("ثبت نام با موفقیت انجام شد");
                        Cookies.set('username', this.state.username);
                        this.setState({
                            isSignedUp: true
                        });
                        return (<Redirect to="/home" />);
                    }
                }, (error) => {
                    console.log(error);
                });
        }
    }

    validationChecker () {
        if (this.nameValidator() && this.usernameValidator() && this.passwordValidator() && this.repasswordValidator() && this.mailAddressValidator()) {
            return true;
        }
        else {
            alert("ورودی ها معتبر نمی باشند");
            return false;
        }
    }

    nameValidator () {
        let nameInput = document.getElementById("fullName");
        if (nameInput.value != null) {
            nameInput.style.border = "none";
            this.setState({
                fullName: nameInput.value
            });
            return true;
        }
        else {
            nameInput.style.border = "1px solid red";
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

    repasswordValidator () {
        let passwordInput = document.getElementById("password");
        let repasswordInput = document.getElementById("repassword");
        if (passwordInput.value == repasswordInput.value) {
            repasswordInput.style.border = "none";
            return true;
        }
        else {
            repasswordInput.style.border = "1px solid red";
            return false;
        }
    }

    mailAddressValidator() {
        let mailAddressInput = document.getElementById("mailAddress");
        if (mailAddressInput.value != null) {
            mailAddressInput.style.border = "none";
            this.setState({
                mailAddress: mailAddressInput.value
            });
            return true;
        }
        else {
            mailAddressInput.style.border = "1px solid red";
            return false;
        }
    }

    render () {
        if ((Cookies.get('username') != undefined) || this.state.isSignedUp) {
            return(<Redirect to="/home" />);
        }
        return (
            <div className="App-body">
                <div className="Signup-container">
                    <div className="signup-logo">کافه کتاب</div>
                    <form>
                        <label for="fullName">نام و نام خانوادگی: <input type="text" name="fullName" id="fullName" onChange={ () => this.nameValidator() } /></label>
                        <label for="username">نام کاربری: <input type="text" name="username" id="username" onChange={ () => this.usernameValidator() } /></label>
                        <label for="password">رمز عبور: <input type="password" name="password" id="password" onChange={ () => this.passwordValidator() } /></label>
                        <label for="repassword">تکرار رمز عبور: <input type="password" name="repassword" id="repassword" onChange={ () => this.repasswordValidator() } /></label>
                        <label for="mailAddress">پست الکترونیک:<input type="text" name="mailAddress" id="mailAddress" onChange={ () => this.mailAddressValidator() } /></label>
                        <label for="submit"><input type="button" name="submit" value="تایید" onClick={ () => this.Submit() } /></label>
                        <div>ثبت نام کرده اید؟ <Link to="/signin">کلیک کنید</Link></div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;