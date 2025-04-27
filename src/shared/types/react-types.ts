import { ReactNode } from 'react';

export interface ComponentWithChildren<T = ReactNode> {
  children: T;
}
