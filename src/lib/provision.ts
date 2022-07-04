import { act } from 'react-dom/test-utils';
export * from '@testing-library/react';

/**
 * some code has callbacks/promises that fire/resolve after our
 * original state update wrapped in `act(...)` finishes
 * this ensures that those callbacks/promises occur in the scope
 * of a call to `act(...)` by queueing a promise at the end of the
 * event loop that thus resolves after all other tasks are finished (flushed)
 * - https://github.com/testing-library/react-testing-library/issues/11#issuecomment-375118702
 * - https://github.com/testing-library/react-testing-library/issues/999#issuecomment-1098053307
 * @returns Promise<void>
 */
const flushMicrotasks = async () =>
  await act(() => new Promise(res => setTimeout(res)));

/**
 * Calls the function passed that requires a flush of the ui to be testable
 * @param update The callback thats intended to be run with a UI update
 * ---
 * example
 * ```
 * await withMicroTaskFlush(async () => await someFunctionCall())
 * ```
 */
export const withMicrotaskFlush = async (update: () => unknown) => {
  await update();
  await flushMicrotasks();
};

export * from './ComponentTestHelper';
