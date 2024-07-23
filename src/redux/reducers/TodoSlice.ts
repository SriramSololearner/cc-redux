import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Istate {
    Todos: {
        id: number,
        text: string
    }[],
}
type TodoItem = {
    id: number,
    text: string
}

const initialState: Istate = {
    Todos: []
}

const todoSlice = createSlice({
    name: "counterApp",
    initialState,
    reducers: {

        addTodoItem: (state, action: PayloadAction<TodoItem>) => {
            const newObj = action.payload;
            state.Todos = [...state.Todos, newObj]
        },
        deleteTodoItem: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.Todos = state.Todos.filter((item) => item.id !== index);
        },
        updateTodoItem: (state, action: PayloadAction<{ textId: number; editText: string }>) => {

            const obj = action.payload;
            const foundIndex = state.Todos.findIndex(val => val.id === obj.textId);
            (foundIndex !== -1) && (state.Todos[foundIndex].text = obj.editText)

        }
    }
})

export const { addTodoItem, deleteTodoItem, updateTodoItem } = todoSlice.actions;
export default todoSlice.reducer