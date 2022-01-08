import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../styles/createpost.css";
import Cookies from "js-cookie";
import { BrowserRouter, Link, Route, Router, Switch, useHistory, Redirect } from "react-router-dom";
import config from "../config.json";

let apiurl = 'http://' + config.UserAPI.url.toString() + ':' + config.UserAPI.port.toString();

class CreatePost extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: null,
            picture: null,
            content: null
        };
    }

    componentDidMount () {
        this.SetUsername();
    }

    SetUsername () {
        let userName = Cookies.get('username');
        this.setState({
            username: userName
        });
    }

    SetPicture () {
        let img = null;
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();

        reader.addEventListener("load", function () {
            img = reader.result;
          }, false);
        this.setState({
            picture: img
        });
        this.Preview();
    }

    Preview() {
        let preview = document.querySelector('img');
        preview.src = this.state.picture;
    }

    SetCaption() {
        let caption = document.getElementById("caption");
        this.setState({
            content: caption.value
        })
    }

    Submit () {
        let url = apiurl + '/users';
        let query = url + '/' + this.state.username + '/posts' + '?caption=' + this.state.content;

        axios.post(query)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    console.log(response);
                    alert("ثبت نام با موفقیت انجام شد");
                    return (<Redirect to="/home" />);
                }
            }, (error) => {
                console.log(error);
            });
    }

    render () {
        return (
            <form className="create-post">
                <img src={ this.state.picture } />
                <div className="row-container">
                    <label for="picture">تصویر پست:</label>
                    <input type="file" accept="image/*" name="picture" id="picture" onChange={ () => this.SetPicture() } />
                </div>
                <div className="row-container">
                    <label for="caption">عنوان پست: </label>
                    <textarea id="caption" name="caption" onChange={ () => this.SetCaption() }></textarea>
                </div>
                <div className="row-container">
                    <input type="button" name="submit" value="تایید" onClick={ () => this.Submit() } />
                </div>
            </form>
        );
    }
}

export default CreatePost;