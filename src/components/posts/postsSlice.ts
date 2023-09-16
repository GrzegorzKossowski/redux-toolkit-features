import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { generateUuid } from '../../utils/generateUuid';
import { RootState } from '../../redux/store';

interface PostSliceState {
    [key: string]: string;
}

const initialState: PostSliceState[] = [
    {
        id: nanoid(),
        userId: '2GNgQAdXr8gL_NjL1R6_O',
        title: 'sunt aut facere repellat provident',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        createdAt: new Date('2023-09-01').toISOString(),
    },
    {
        id: nanoid(),
        userId: 'ybEisy5b73rBwfGDZwD7a',
        title: 'qui est esse tempore o mores',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
        createdAt: new Date('2023-09-04').toISOString(),
    },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action: PayloadAction<PostSliceState>) {
                state.push(action.payload);
            },
            prepare(title, body, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        userId,
                        title,
                        body,
                        createdAt: new Date().toISOString(),
                    },
                };
            },
        },
    },
});

export const selectAllPosts = (state: RootState) => state.posts;
export const selectAllPostsDescByDate = (state: RootState) => {
    return state.posts.slice().sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
    );
};

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
