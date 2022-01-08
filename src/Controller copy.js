import React from "react";
import ReactDOM from "react-dom";
import "./styles/header.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class Controller extends React.Component {
    constructor (props) {
        super(props);
        this.state = { selected: props.selected };
    }

    ClearSelected () {
        let x = document.getElementsByClassName("selected");
        let i;
        for (i = 0; i < x.length; i++) {
            x[i].className -= "selected";
        }
    }

    SelectThis (id) {
        this.ClearSelected();
        this.setState({ selected: id });
    }

    Home () {
        return (
            <div className="App-body">
                <ul>
                    <li className="selected">خانه</li>
                    <li onClick={ () => this.SelectThis("2") }>گشت و گذار</li>
                    <li onClick={ () => this.SelectThis("3") }>دوستان</li>
                    <li onClick={ () => this.SelectThis("4") }>پروفایل</li>
                </ul>
            </div>
        );
    }

    Explore () {
        return (
            <div className="App-body">
                <ul>
                    <li onClick={ () => this.SelectThis("1") }>خانه</li>
                    <li className="selected">گشت و گذار</li>
                    <li onClick={ () => this.SelectThis("3") }>دوستان</li>
                    <li onClick={ () => this.SelectThis("4") }>پروفایل</li>
                </ul>
            </div>
        );
    }

    Friends () {
        return (
            <div className="App-body">
                <ul>
                    <li onClick={ () => this.SelectThis("1") }>خانه</li>
                    <li onClick={ () => this.SelectThis("2") }>گشت و گذار</li>
                    <li className="selected">دوستان</li>
                    <li onClick={ () => this.SelectThis("4") }>پروفایل</li>
                </ul>
            </div>
        );
    }

    Profile () {
        return (
            <div className="App-body">
                <ul>
                    <li onClick={ () => this.SelectThis("1") }>خانه</li>
                    <li onClick={ () => this.SelectThis("2") }>گشت و گذار</li>
                    <li onClick={ () => this.SelectThis("3") }>دوستان</li>
                    <li className="selected">پروفایل</li>
                </ul>
            </div>
        );
    }

    render () {
        // switch (this.state.selected) {
        //     case "1":
        //         return this.Home();
        //         break;

        //     case "2":
        //         return this.Explore();
        //         break;

        //     case "3":
        //         return this.Friends();
        //         break;

        //     case "4":
        //         return this.Profile();
        //         break;

        //     default:
        //         return <div></div>;
        //         break;
        // }

        <Switch>
            <Route path="/home" component="" />
        </Switch>
    }
}

export default Controller;