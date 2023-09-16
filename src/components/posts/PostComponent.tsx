import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/storeHooks';
import { addPost, selectAllPosts, selectAllPostsDescByDate } from './postsSlice';
import { selectAllUsers, selectUserById } from '../users/usersSlice';

const PostComponent = () => {
    const titleRef = useRef<HTMLInputElement>(null);
    const postRef = useRef<HTMLTextAreaElement>(null);
    const authorRef = useRef<HTMLSelectElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // use selector
    const posts = useAppSelector(selectAllPostsDescByDate);
    const users = useAppSelector(selectAllUsers);

    const dispach = useAppDispatch();

    function submitHandler(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const title = titleRef?.current?.value;
        const body = postRef?.current?.value;
        const userId = authorRef?.current?.value;
        const isFormFilled = Boolean(title) && Boolean(body) && Boolean(userId);

        if (isFormFilled) {
            dispach(addPost(title, body, userId));
            formRef?.current?.reset();
        }
    }
    const usersOptions = users.map(user => (
        <option value={user.id} key={user.id}>
            {user.name}
        </option>
    ));

    return (
        <div className='flex w-full space-x-[100px]'>
            <div className='w-[50%] '>
                <h1 className='text-4xl font-bold mb-[10px]'>Posts</h1>
                {posts &&
                    posts.map(post => (
                        <RenderedPost key={post.id} post={post} />
                    ))}
            </div>
            <div className='max-w-md'>
                <form
                    ref={formRef}
                    className='flex flex-col'
                    onSubmit={submitHandler}
                >
                    <label htmlFor='title'>Title</label>
                    <input
                        ref={titleRef}
                        type='text'
                        id='title'
                        className='border'
                    />
                    <label htmlFor='body'>Post</label>
                    <textarea
                        ref={postRef}
                        name='body'
                        id='body'
                        className='border min-h-[200px]'
                    ></textarea>
                    <label htmlFor='authorId'>Author</label>
                    <select
                        ref={authorRef}
                        name='authorId'
                        id='authorId'
                        className='mb-4 p-1'
                    >
                        <option value=''></option>
                        {usersOptions}
                    </select>
                    <button className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default PostComponent;

const RenderedPost = ({ post }: { post: { [key: string]: string } }) => {
    const user = useAppSelector(selectUserById(post.userId));
    const { id, name } = user[0];

    return (
        <article className='mb-[30px] border rounded-lg p-4'>
            <h3 className='text-2xl mb-3'>{post.title}</h3>
            <p>
                {post.body.substring(0, 100)}...{' '}
                <span className='font-bold'>by {name}</span>
            </p>
        </article>
    );
};
