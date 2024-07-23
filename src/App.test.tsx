import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { Store } from "./redux/Store";

describe("unit tests for React App", () => {
  test("renders React App correctly", () => {
    render(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByTestId("app");
    expect(linkElement).toBeInTheDocument();
  });

  test("Initial count is displayed  with 0", () => {
    render(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    const displayValue = screen.getByTestId("count");
    expect(displayValue).toHaveTextContent("count:0");
  });

  test("increment button invokes and count value to be 2", () => {
    render(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    const incrementBtn = screen.getByTestId("increment+2");
    expect(incrementBtn).toBeDefined();
    fireEvent.click(incrementBtn);
    expect(screen.getByTestId("count")).toHaveTextContent("2");
  });
  test("decrement button invokes and count value to be 1", () => {
    render(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    const decrementBtn = screen.getByTestId("decrement-1");
    expect(decrementBtn).toBeDefined();
    fireEvent.click(decrementBtn);
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  test("increment button invokes and count value to be 1", () => {
    render(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    const incrementBtn1 = screen.getByTestId("increment+1");
    expect(incrementBtn1).toBeDefined();
    fireEvent.click(incrementBtn1);
    expect(screen.getByTestId("count")).toHaveTextContent("2");
  });
});
