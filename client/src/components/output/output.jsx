import React, { Component } from "react";

class Output extends Component {
  constructor(props) {
    super(props);
    this.callBackendAPI.bind(this.callBackendAPI);
  }

  state = {
    data: ""
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ data: res[0].data }))
      .catch((err) => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("http://localhost:5000/output");
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  inputChanged(event) {
    const updatedKeyword = event.target.value;
    this.setState({ data: updatedKeyword });
  }

  render() {
    return (
      <div style={{ width: "30%" }}>
        <input
          className="form-control"
          type="text"
          value={this.state.data}
          onChange={(event) => this.inputChanged(event)}
          placeholder="Default input"
        ></input>
      </div>
    );
  }
}

export default Output;
