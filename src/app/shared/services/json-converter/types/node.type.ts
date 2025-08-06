export type Node ={
  kind: 'object' | 'array' | 'string' | 'number' | 'boolean' ;
  props?: Record<string, Node>;
  children?: Node[];
}