import { formatImplementation, MockImplementation } from './utils';

export type Wnd = Window & typeof globalThis;

/**
 * Mocks window getter.
 * @param impl - window getter implementation.
 */
export function mockWindow(impl: MockImplementation<Wnd>) {
  return jest.spyOn(global, 'window', 'get').mockImplementation(formatImplementation(impl));
}
