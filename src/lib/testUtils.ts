import {screen} from '@testing-library/react';
import {setupServer} from 'msw/node';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line node/no-extraneous-import
import {act} from 'react-dom/test-utils';

export * from '@testing-library/react';

export const getEvenlyDistributedTestSample = <T>(data: T[], num = 10) =>
  data.filter(forEvenlyDistributedSampleOf(num)).map(x => [x]);

const forEvenlyDistributedSampleOf =
  (num: number): (<T>(value: T, index: number, array: T[]) => boolean) =>
  (_, i, arr) => {
    if (arr.length <= num) return true;
    if (i === 0 || i === arr.length - 1) return true;
    const interval = Math.floor(arr.length / (num - 2));
    if (i % interval === 0) return true;
    return false;
  };

export const submitFormTemplate = async () =>
  await withMicrotaskFlush(
    async () => await userEvent.click(screen.getByText(/^submit$/i))
  );

export const resetFormTemplate = async () =>
  await userEvent.click(screen.getByText(/^reset$/i));

// some code has callbacks/promises that fire/resolve after our
// original state update wrapped in act(...) finishes
// this ensures that those callbacks/promises occur in the scope
// of a call to act(...) by queueing a promise at the end of the
// event loop that thus resolves after all other tasks are finished (flushed)
// https://github.com/testing-library/react-testing-library/issues/11#issuecomment-375118702
// https://github.com/testing-library/react-testing-library/issues/999#issuecomment-1098053307
const flushMicrotasks = async () =>
  await act(() => new Promise(res => setTimeout(res)));

export const withMicrotaskFlush = async (update: () => unknown) => {
  await update();
  await flushMicrotasks();
};

export const server = setupServer();

export * from './ComponentTestHelper';
