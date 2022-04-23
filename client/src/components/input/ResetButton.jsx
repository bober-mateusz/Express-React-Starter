import React, { Component } from "react";
class ResetButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: "reset(data)"
    };
  }
  render() {
    return (
      <div style={{ width: "30%" }}>
        <button type="button" onclick="{this.state.onClick}">
          Blue
        </button>
      </div>
    );
  }
}

export default ResetButton;
