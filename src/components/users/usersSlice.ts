import { RootState } from './../../redux/store';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';

interface UserSliceState {
    [key: string]: string;
}

const initialState: UserSliceState[] = [
    {
        id: '2GNgQAdXr8gL_NjL1R6_O',
        name: 'John Doe',
    },
    {
        id: 'ybEisy5b73rBwfGDZwD7a',
        name: 'Mary Sue',
    },
];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: {
            reducer(state, action: PayloadAction<UserSliceState>) {
                state.push(action.payload);
            },
            prepare(name) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                    },
                };
            },
        },
    },
});

export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (userId: string) => (state: RootState) => state.users.filter(user => user.id === userId);

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
