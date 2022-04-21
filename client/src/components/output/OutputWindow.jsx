import React, { Component } from "react";
import "../../styles/outputWindow.css";
class OutputWindow extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: this.props.value
  };

  useEffect() {
    if (this.props.onChange) {
      this.props.onChange(this.setState({ value: this.props.value }));
    }
  }
  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.setState({ value: this.props.value }));
    }
  }

  handleChange = (event) => {
    console.log(this.props);
    this.props.onChange(event.target.value);
  };

  checkProps = () => {
    this.setState({ value: this.props });
  };

  render() {
    console.log("hello");
    return "hello";
  }
}

export default OutputWindow;
