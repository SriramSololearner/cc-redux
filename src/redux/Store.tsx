import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./reducers/CounterSlice";
import TodoSlice from "./reducers/TodoSlice";

export const Store = configureStore({
  reducer: {
    counter: CounterSlice,
    TodoList: TodoSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
