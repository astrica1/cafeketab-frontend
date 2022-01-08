import React from "react";
import ReactDOM from "react-dom";
import "./styles/sign.css";
import { BrowserRouter, Link, Route, Router, Switch, useHistory, Redirect } from "react-router-dom";

class Sign extends React.Component {

    Signin () {
        return (
            <div className="App-body">
                <div className="Signin-container">
                    <form>
                        <label for="username">نام کاربری: <input type="text" name="username" /></label>
                        <label for="password">رمز عبور: <input type="password" name="password" /></label>
                        <label for="submit"><input type="submit" name="submit" value="تایید" /></label>
                        <div>حساب کاربری ندارید؟ <Link to="/signup">کلیک کنید</Link></div>
                    </form>
                </div>
            </div>
        );
    }

    Signup () {
        return (
            <div className="App-body">
                <div className="Signup-container">
                    <form>
                        <label for="fullName">نام و نام خانوادگی: <input type="text" name="fullName" /></label>
                        <label for="username">نام کاربری: <input type="text" name="username" /></label>
                        <label for="password">رمز عبور: <input type="password" name="password" /></label>
                        <label for="repassword">تکرار رمز عبور: <input type="password" name="repassword" /></label>
                        <label for="mailAddress">پست الکترونیک:<input type="text" name="mailAddress" /></label>
                        <label for="submit"><input type="submit" name="submit" value="تایید" /></label>
                        <div>ثبت نام کرده اید؟ <Link to="/signin">کلیک کنید</Link></div>
                    </form>
                </div>
            </div>
        );
    }

    Default () {
        return (<Redirect to="/signin" />);
    }

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/signin" component={ () => this.Signin() } />
                    <Route path="/signup" component={ () => this.Signup() } />
                    <Route path="/" children={ () => this.Default() } />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Sign;