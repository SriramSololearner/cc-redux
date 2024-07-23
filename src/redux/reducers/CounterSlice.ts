import { PayloadAction, createSlice } from "@reduxjs/toolkit";



const counterSlice = createSlice({
    name: "counterApp",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        decrement: (state, action) => {
            (state.value > 0) &&
                (state.value -= action.payload);

        }
    }
})

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer