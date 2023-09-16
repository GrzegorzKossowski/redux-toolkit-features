import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface TestSliceState {
    value: number;
}

const initialState: TestSliceState = {
    value: 0,
};

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        reset: state => {
            state.value = 0;
        },
    },
});

export const selectTestValue = (state: RootState) => state.test.value;

export const { increment, decrement, incrementByAmount, reset } = testSlice.actions;

export default testSlice.reducer;
