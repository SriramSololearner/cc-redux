import { Box, Button, TextField, Typography } from "@mui/material";
import { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { addTodoItem } from "../redux/reducers/TodoSlice";
import TodoItem from "./TodoItem";
import { styles } from "./styles";

interface Iprops {
  todos: {
    id: number;
    text: string;
  }[];
  addNewItem: (payload: { id: number; text: string }) => void;
}

interface Istate {
  inputText: string;
}
export type todoItem = {
  id: number;
  text: string;
};

class Todo extends Component<Iprops, Istate> {
  state = {
    inputText: "",
  };

  handleSubmitAdd = (event: FormEvent) => {
    event.preventDefault();
    const { inputText } = this.state;
    const { todos, addNewItem } = this.props;
    const obj = {
      id: Date.now(),
      text: inputText,
    };
    if (inputText !== "") {
      // dispatch action to reducer
      addNewItem(obj);
      this.setState({ inputText: "" });
    } else {
      alert("add something!");
    }
  };
  render() {
    const { inputText } = this.state;

    return (
      <Box sx={styles.root} data-testid="todo-app">
        <Typography sx={styles.headerText}>Todo App!</Typography>
        <Box
          component={"form"}
          sx={{ display: "flex", gap: 1 }}
          onSubmit={this.handleSubmitAdd}
        >
          <TextField
            placeholder="enter Notes"
            sx={styles.input}
            value={inputText}
            onChange={(event) =>
              this.setState({ inputText: event.target.value })
            }
            inputProps={{ "data-testid": "inputField" }}
          />
          <Button
            variant="contained"
            sx={styles.btn}
            type="submit"
            data-testid="add-button"
          >
            Add
          </Button>
        </Box>
        <TodoItem />
      </Box>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  todos: state.TodoList.Todos,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addNewItem: (obj: todoItem) => {
    dispatch(addTodoItem(obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
