import { Node } from '../types/node.type';
import { BaseConverter } from './base-converter';

export class JsonConverter extends BaseConverter {
  static convert(node: Node): string {
    const converter = new JsonConverter();
    return converter.convert(node);
  }

  convert(node: Node): string {
    return JSON.stringify(node, null, 2);
  }
}
