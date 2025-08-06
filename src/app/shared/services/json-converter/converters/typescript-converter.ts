import { Node } from '../types/node.type';
import { BaseConverter } from './base-converter';

export class TypeScriptConverter extends BaseConverter {
  static convert(node: Node): string {
    const converter = new TypeScriptConverter();
    return converter.convert(node);
  }

  convert(node: Node): string {
    const interfaces: string[] = [];
    const mainInterface = this.generateInterface(node, 'RootInterface', interfaces);
    
    return [...interfaces, mainInterface].join('\n\n');
  }

  private generateInterface(node: Node, name: string, interfaces: string[]): string {
    if (node.kind === 'array' && node.children?.[0]) {
      const childType = this.getTypeScriptType(node.children[0], name, interfaces);
      return `export type ${name} = ${childType}[];`;
    }

    if (node.kind === 'object' && node.props) {
      const properties = Object.entries(node.props).map(([key, prop]) => {
        const propType = this.getTypeScriptType(prop, this.capitalize(key), interfaces);
        const safeKey = this.isValidIdentifier(key) ? key : `"${key}"`;
        return `  ${safeKey}: ${propType};`;
      });

      return `export interface ${name} {\n${properties.join('\n')}\n}`;
    }

    return `export type ${name} = ${this.getTypeScriptType(node, name, interfaces)};`;
  }

  private getTypeScriptType(node: Node, suggestedName: string, interfaces: string[]): string {
    switch (node.kind) {
      case 'string':
      case 'number':
      case 'boolean':
        return node.kind;
        
      case 'array':
        if (node.children?.[0]) {
          const childType = this.getTypeScriptType(
            node.children[0], 
            suggestedName + 'Item', 
            interfaces
          );
          return `${childType}[]`;
        }
        return 'unknown[]';
        
      case 'object':
        if (node.props && Object.keys(node.props).length > 0) {
          const interfaceName = this.generateUniqueInterfaceName(suggestedName, interfaces);
          const interfaceDeclaration = this.generateInterface(
            node, 
            interfaceName, 
            interfaces
          );
          interfaces.push(interfaceDeclaration);
          return interfaceName;
        }
        return 'Record<string, unknown>';
        
      default:
        return 'unknown';
    }
  }

  private generateUniqueInterfaceName(baseName: string, existingInterfaces: string[]): string {
    return this.generateUniqueName(baseName, existingInterfaces, 'interface');
  }
}
