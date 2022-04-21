import React, { Component } from "react";
import axios from "axios";
class Codeeditor extends Component {
  constructor(props) {
    super(props);
    this.onHandleChange = this.handleChange.bind(this);
    this.onhandleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: ""
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert("A form was submitted : " + this.state);
    axios
      .post("http://localhost:5000/post-test", this.state)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Code : </label>
        <input
          type="text"
          value={this.state.value}
          name="name"
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Codeeditor;
