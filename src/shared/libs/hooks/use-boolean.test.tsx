import { useBoolean } from '.';
import { act, renderHook } from '@testing-library/react';

describe('should have right default value', () => {
  it('should be "false" default', () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current[0]).toBe(false);
  });

  it('should be "false" with init value', () => {
    const { result } = renderHook(() => useBoolean(false));

    expect(result.current[0]).toBe(false);
  });

  it('should be "true" with init value', () => {
    const { result } = renderHook(() => useBoolean(true));
    const [value] = result.current;
    expect(value).toBe(true);
  });
});

describe('should toggle', () => {
  it('should toggle value from "false" to "true"', () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].toggle());

    expect(result.current[0]).toBe(true);
  });

  it('should toggle value from "true" to "false"', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].toggle());

    expect(result.current[0]).toBe(false);
  });

  it('should toggle value from "false", "true", "false', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(false);
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);
  });
});

describe('should on value to "true"', () => {
  it('should on value to "true" if else "true"', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].on());

    expect(result.current[0]).toBe(true);
  });

  it('should on value to "true" if "false" ', () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].on());

    expect(result.current[0]).toBe(true);
  });
});
describe('should off value to "false"', () => {
  it('should off value to "false" if else "false"', () => {
    const { result } = renderHook(() => useBoolean(false));
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].off());

    expect(result.current[0]).toBe(false);
  });

  it('should off value to "false" if "true" ', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].off());

    expect(result.current[0]).toBe(false);
  });
});
