import React, { Component } from "react";
import { connect } from "react-redux";
import { increment } from "../redux/actions";
import { Button } from "semantic-ui-react";

class StressCounter extends Component {
  handleItemClick = (e, { name }) => this.props.onIncrement();

  render() {
    return (
      <div>
        <Button
          color="red"
          content="Hit Me >>>"
          icon="heart"
          label={{
            basic: true,
            color: "red",
            pointing: "left",
            content: this.props.state.count,
            onClick: this.handleItemClick
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: id => dispatch(increment(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StressCounter);
