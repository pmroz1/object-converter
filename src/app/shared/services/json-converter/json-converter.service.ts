import { Injectable } from '@angular/core';
import { TypeNode } from './types/node.type';

@Injectable({
  providedIn: 'root',
})
export class JsonConverterService {
  convert(json: string): any {
    try {
      return JSON.parse(json);
      //       const value = JSON.parse(json);
      // const root = buildTypeTree(value);
      // return emit(root, 'Root');
    } catch (error) {
      throw new Error(`Invalid JSON: ${error}`);
    }
  }

  buildTypeTree(value: string): TypeNode {
    // Implementation for building the type tree from the JSON value

    return {
      kind: 'object',
      props: {},
    };
  }

  toTypeScript(obj: any): string {
    return '';
  }

  toFormattedJson(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }
}
