import React from "react";
import axios from "axios";
import NavBar from "./navbar";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <NavBar />;
    }
}
