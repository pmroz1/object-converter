export type TypeNode =
  | { kind: 'string' | 'number' | 'boolean' | 'null' }
  | { kind: 'array'; element: TypeNode }
  | { kind: 'object'; props: Record<string, TypeNode> };
