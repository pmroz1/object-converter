import { Injectable } from '@angular/core';
import { Node } from './types/node.type';
import { ConverterRegistry } from './converters';

@Injectable({
  providedIn: 'root',
})
export class JsonConverterService {
  convert(json: string, outputType: string): string {
    try {
      const value = JSON.parse(json);
      const typeTree = this.buildTypeTree(value);
      
      if (!typeTree) {
        return 'export interface RootInterface {}';
      }

      const converter = ConverterRegistry.getConverter(outputType);
      if (!converter) {
        throw new Error(`Unsupported output type: ${outputType}`);
      }

      return converter(typeTree);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  getAvailableOutputTypes(): string[] {
    return ConverterRegistry.getAvailableOutputTypes();
  }

  private buildTypeTree(value: any): Node | undefined {
    if (value === null || value === undefined) {
      return undefined;
    }

    if (Array.isArray(value)) {
      return this.buildArrayNode(value);
    }

    if (typeof value === 'object') {
      return this.buildObjectNode(value);
    }

    return this.buildPrimitiveNode(value);
  }

  private buildArrayNode(array: any[]): Node {
    if (array.length === 0) {
      return { kind: 'array', children: [{ kind: 'string' }] };
    }
    
    const childNodes = array.map(item => this.buildTypeTree(item)).filter(Boolean) as Node[];
    const mergedChild = this.mergeTypes(childNodes);
    
    return {
      kind: 'array',
      children: [mergedChild],
    };
  }

  private buildObjectNode(obj: Record<string, any>): Node {
    const props: Record<string, Node> = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const childNode = this.buildTypeTree(value);
      if (childNode) {
        props[key] = childNode;
      }
    }
    
    return { kind: 'object', props };
  }

  private buildPrimitiveNode(value: any): Node {
    const type = typeof value;
    if (['string', 'number', 'boolean'].includes(type)) {
      return { kind: type as 'string' | 'number' | 'boolean' };
    }
    return { kind: 'string' };
  }

  private mergeTypes(types: Node[]): Node {
    if (types.length === 0) return { kind: 'string' };
    if (types.length === 1) return types[0];

    const firstType = types[0];

    if (this.allSamePrimitiveType(types, firstType)) {
      return firstType;
    }

    if (types.every(type => type.kind === 'object')) {
      return this.mergeObjectTypes(types);
    }

    if (types.every(type => type.kind === 'array')) {
      return this.mergeArrayTypes(types);
    }

    return { kind: 'string' };
  }

  private allSamePrimitiveType(types: Node[], firstType: Node): boolean {
    return types.every(
      type => type.kind === firstType.kind && 
      ['string', 'number', 'boolean'].includes(type.kind)
    );
  }

  private mergeObjectTypes(types: Node[]): Node {
    const mergedProps: Record<string, Node> = {};

    for (const type of types) {
      if (type.props) {
        for (const [key, prop] of Object.entries(type.props)) {
          mergedProps[key] = mergedProps[key] 
            ? this.mergeTypes([mergedProps[key], prop])
            : prop;
        }
      }
    }

    return { kind: 'object', props: mergedProps };
  }

  private mergeArrayTypes(types: Node[]): Node {
    const allChildren = types.flatMap(type => type.children || []);
    
    if (allChildren.length === 0) {
      return { kind: 'array', children: [{ kind: 'string' }] };
    }

    return { 
      kind: 'array', 
      children: [this.mergeTypes(allChildren)] 
    };
  }
}
