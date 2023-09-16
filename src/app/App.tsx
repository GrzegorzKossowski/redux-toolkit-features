import { Suspense, lazy } from 'react';

const TestComponent = lazy(() => import('../components/TestComponent'));
const PostComponent = lazy(() => import('../components/posts/PostComponent'));

function App() {
    return (
        <div className='w-full h-screen'>
            <Suspense fallback={<>Loading...</>}>
                <PostComponent />
            </Suspense>
        </div>
    );
}

export default App;
