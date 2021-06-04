import { Component } from "react";
import studentAuth from "../services/studentAuthService";

class Logout extends Component {
  componentDidMount() {
    studentAuth.logout();

    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;