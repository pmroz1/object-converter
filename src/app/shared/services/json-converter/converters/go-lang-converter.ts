import { BaseConverter } from './base-converter';
import { Node } from '../types/node.type';

export class GoLangConverter extends BaseConverter {
  static convert(node: Node): string {
    const converter = new GoLangConverter();
    return converter.convert(node);
  }

  convert(node: Node): string {
    const structs: string[] = [];
    const mainStruct = this.generateStruct(node, 'RootStruct', structs);

    return [...structs, mainStruct].join('\n\n');
  }

  private generateStruct(node: Node, name: string, structs: string[]): string {
    if (node.kind === 'array' && node.children?.[0]) {
      const childType = this.getGoType(node.children[0], name, structs);
      return `type ${name} []${childType}`;
    }

    if (node.kind === 'object' && node.props) {
      const properties = Object.entries(node.props).map(([key, prop]) => {
        const propType = this.getGoType(prop, this.capitalize(key), structs);
        const propName = this.capitalize(key);
        return `    ${propName} ${propType} \`json:"${key}"\``;
      });

      return `type ${name} struct {\n${properties.join('\n')}\n}`;
    }

    return `type ${name} struct { }`;
  }

  private getGoType(
    node: Node,
    suggestedName: string,
    structs: string[]
  ): string {
    switch (node.kind) {
      case 'string':
        return 'string';
      case 'number':
        return 'float64';
      case 'boolean':
        return 'bool';
      case 'array':
        if (node.children?.[0]) {
          const childType = this.getGoType(
            node.children[0],
            suggestedName + 'Item',
            structs
          );
          return `[]${childType}`;
        }
        return '[]interface{}';
      case 'object':
        if (node.props && Object.keys(node.props).length > 0) {
          const structName = this.generateUniqueStructName(
            suggestedName,
            structs
          );
          const structDeclaration = this.generateStruct(
            node,
            structName,
            structs
          );
          structs.push(structDeclaration);
          return structName;
        }
        return 'map[string]interface{}';
      default:
        throw new Error(`Unsupported node kind: ${node.kind}`);
    }
  }
  generateUniqueStructName(suggestedName: string, structs: string[]) {
    let name = this.capitalize(suggestedName);
    let counter = 1;
    while (structs.includes(name)) {
      name = `${this.capitalize(suggestedName)}${counter++}`;
    }
    return name;
  }
}
