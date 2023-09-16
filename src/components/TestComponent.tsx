import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/storeHooks';
import {
    decrement,
    increment,
    incrementByAmount,
    reset,
} from '../redux/testSlice';

const TestComponent = () => {
    const ref = useRef<HTMLInputElement>(null);

    const value = useAppSelector(state => state.test.value);
    const dispach = useAppDispatch();

    function addValue() {
        const valueToAdd = Number(ref?.current?.value) || 0;
        dispach(incrementByAmount(valueToAdd));
    }

    return (
        <div className='border max-w-md p-4 flex flex-col items-center bg-slate-400 space-y-4'>
            <div className='flex w-full'>
                <button
                    className='btn btn-primary font-bold w-full'
                    onClick={() => dispach(increment())}
                >
                    +
                </button>
                <span className='px-4 text-2xl'>{value}</span>
                <button
                    className='btn btn-secondary font-bold w-full'
                    onClick={() => dispach(decrement())}
                >
                    -
                </button>
            </div>
            <div className='flex space-x-4 w-full'>
                <input
                    ref={ref}
                    type='number'
                    className='border bold w-full px-2'
                    placeholder='add amount'
                    defaultValue={0}
                />
                <button className='btn' onClick={addValue}>
                    Add
                </button>
            </div>
            <div className='w-full'>
                <button
                    className='btn w-full mb-4'
                    onClick={() => dispach(reset())}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default TestComponent;
