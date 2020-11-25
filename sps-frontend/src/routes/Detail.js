import React from "react";
import "./Detail.css";

class Detail extends React.Component {
  componentDidMount() {
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    }
  }
  render() {
    const { location: {state} } = this.props;
    if (state) {
      console.log(state);
      return (
        <div className="detail__container">
          <div className="detaill__title">
            <h1>{state.title}</h1>
            <span>{state.year}</span>
          </div>
          <div className="detaill__image">
            <img src={state.poster} alt={state.title} title={state.title} />
          </div>
          <span>
            {state.summary}
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Detail;