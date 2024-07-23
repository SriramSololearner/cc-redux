import { Component } from "react";
import { RootState } from "./redux/Store";
import { increment, decrement } from "./redux/reducers/CounterSlice";
import { connect } from "react-redux";
import { AppDispatch } from "./redux/Store";
interface Iprops {
  value: number;
  increment: (value: number) => void;
  decrement: (value: number) => void;
}

class App extends Component<Iprops> {
  render() {
    const { value, increment, decrement } = this.props;

    return (
      <div data-testid={"app"}>
        <h1 data-testid={"count"}> count:{value}</h1>
        <button data-testid={"increment+2"} onClick={() => increment(2)}>
          increment +2!
        </button>
        <button data-testid={"increment+1"} onClick={() => increment(1)}>
          increment +1!
        </button>
        <button data-testid={"decrement-1"} onClick={() => decrement(1)}>
          decrement -1!
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  value: state.counter.value,
  arr: state.counter.value,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  increment: (prop: number) => dispatch(increment(prop)),
  decrement: () => dispatch(decrement(1)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
