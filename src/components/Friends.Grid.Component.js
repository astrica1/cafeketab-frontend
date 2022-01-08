import React from "react";
import ReactDOM from "react-dom";
import "../styles/fonts.css";
import "../styles/header.css";
import "../styles/friends.css";

class Grids extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            userPicture: props.userPicture,
            name: props.name,
            userName: props.userName
        };
    }

    render () {
        return (
            <div className="friends-grid-container">
                <div className="friends-grid-image-container">
                    <img src= { this.state.userPicture } />
                </div>
                <span className="friends-grid-username">{ this.props.userName }</span>
                <span className="friends-grid-name">{ this.props.name }</span>
            </div>
        );
    }
}

export default Grids;