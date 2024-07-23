import { Box, Button, Stack, TextField } from "@mui/material";
import { Component } from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { styles } from "./styles";
import { deleteTodoItem, updateTodoItem } from "../redux/reducers/TodoSlice";

interface Iprops {
  Todos: {
    id: number;
    text: string;
  }[];
  deleteTodo: (todoId: number) => void;
  updateTodo: (todoItem: { textId: number; editText: string }) => void;
}

interface Istate {
  isEditing: boolean;
  editText: string;
  textId: number;
}

class TodoItem extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      isEditing: false,
      editText: "",
      textId: -1,
    };
  }
  handlerDelete = (todoId: number) => {
    const { deleteTodo } = this.props;
    deleteTodo(todoId);
  };
  startEditing = (itemId: number) => {
    const { Todos } = this.props;
    const indexData = Todos.filter((todoItem) => todoItem.id === itemId);

    indexData &&
      this.setState({
        isEditing: true,
        textId: itemId,
        editText: indexData[0].text,
      });
  };

  handlerUpdate = () => {
    const { editText, textId } = this.state;
    const { updateTodo } = this.props;

    updateTodo({ textId, editText });
    this.setState({ isEditing: false, editText: "", textId: -1 });
  };
  render() {
    const { Todos } = this.props;
    const { isEditing, textId, editText } = this.state;
    return (
      <Box sx={styles.todosContainer} data-testid="Todos">
        {Todos.length > 0 ? (
          Todos.map((item) => (
            <Stack
              data-testid="listItems"
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              key={item.id}
            >
              {isEditing && item.id === textId ? (
                <TextField
                  sx={styles.editInput}
                  defaultValue={editText}
                  onChange={(event) =>
                    this.setState({ editText: event.target.value })
                  }
                  inputProps={{ "data-testid": "editField" }}
                />
              ) : (
                <Box sx={{ width: "70%" }}>{item.text}</Box>
              )}
              <Button
                onClick={() => {
                  this.handlerDelete(item.id);
                }}
              >
                Delete
              </Button>
              {isEditing && item.id === textId ? (
                <Button onClick={this.handlerUpdate} data-testid="Update">
                  update
                </Button>
              ) : (
                <Button
                  onClick={() => this.startEditing(item.id)}
                  data-testid="Edit"
                >
                  Edit
                </Button>
              )}
            </Stack>
          ))
        ) : (
          <Box>No Data found!</Box>
        )}
      </Box>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  Todos: state.TodoList.Todos,
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  deleteTodo: (todoId: number) => dispatch(deleteTodoItem(todoId)),
  updateTodo: (todoItem: { textId: number; editText: string }) =>
    dispatch(updateTodoItem(todoItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
