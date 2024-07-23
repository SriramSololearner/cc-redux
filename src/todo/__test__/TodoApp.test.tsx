import Todo from "../Todo";
import TodoItem from "../TodoItem";
import { fireEvent, render, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { Store } from "../../redux/Store";

// Mock the redux store and its actions

describe("unit tests for Todo Application", () => {
  test("tetsing the app  renders without crashing", () => {
    const { getByTestId } = render(
      <Provider store={Store}>
        <Todo />
      </Provider>
    );
    expect(getByTestId("todo-app")).toBeInTheDocument();
  });

  test("testing  input field  and button is present and working as expected", () => {
    const { getByTestId } = render(
      <Provider store={Store}>
        <Todo />
      </Provider>
    );
    const inputField = getByTestId("inputField");
    const button = getByTestId("add-button");
    expect(inputField).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("adds new item to todo list", () => {
    const { getByTestId, getByText } = render(
      <Provider store={Store}>
        <Todo />
      </Provider>
    );

    const inputField = getByTestId("inputField");
    fireEvent.change(inputField, { target: { value: "Test todo item" } });
    const addButton = getByText("Add");
    fireEvent.submit(addButton);
  });

  test("displays alert when input field is empty", () => {
    window.alert = jest.fn();
    const { getByTestId, getByText } = render(
      <Provider store={Store}>
        <Todo />
      </Provider>
    );

    const inputField = getByTestId("inputField");
    fireEvent.change(inputField, { target: { value: "" } });

    const addButton = getByText("Add");
    fireEvent.click(addButton);
    expect(alert).toHaveBeenCalledWith("add something!");
  });

  test("renders TodoItem component with todos", () => {
    const { getByText } = render(
      <Provider store={Store}>
        <TodoItem />
      </Provider>
    );
    expect(getByText("Todo 1")).toBeInTheDocument();
  });

  test("deletes a todo item", () => {
    const { getAllByText } = render(
      <Provider store={Store}>
        <TodoItem />
      </Provider>
    );
    const deleteButton = getAllByText("Delete")[0];
    fireEvent.click(deleteButton);
  });

  test("edit todo", () => {
    const { getByTestId, getAllByTestId, getByRole } = render(
      <Provider store={Store}>
        <Todo />
        <TodoItem />
      </Provider>
    );

    const inputField = getByTestId("inputField");
    const addButton = getByTestId("add-button");

    fireEvent.change(inputField, { target: { value: "Todo 2" } });
    fireEvent.submit(addButton);
    const editBtn = getAllByTestId("Edit")[0];
    fireEvent.click(editBtn);
    const editField = getByTestId("editField");
    fireEvent.change(editField, { target: { value: "Edited Todo" } });
    const updateBtn = getByTestId("Update");
    fireEvent.click(updateBtn);
  });
  test("no data found", () => {
    const { getByTestId, getByText, getAllByText } = render(
      <Provider store={Store}>
        <Todo />
      </Provider>
    );

    const inputField = getByTestId("inputField");
    fireEvent.change(inputField, { target: { value: "Test todo item" } });
    const addButton = getByText("Add");
    fireEvent.submit(addButton);
    const deleteButton = getAllByText("Delete")[0];
    fireEvent.click(deleteButton);
    const todoList = getByTestId("Todos");
    expect(within(todoList).getByText(/No Data found!/i)).toBeInTheDocument();
  });
});
