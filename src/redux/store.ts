import { configureStore } from '@reduxjs/toolkit';
import testReducer from './testSlice';
import postsReducer from '../components/posts/postsSlice';
import usersReducer from '../components/users/usersSlice';

export const store = configureStore({
    reducer: {
        test: testReducer,
        posts: postsReducer,
        users: usersReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
