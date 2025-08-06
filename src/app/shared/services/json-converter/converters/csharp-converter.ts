import { Node } from '../types/node.type';
import { BaseConverter } from './base-converter';

export class CSharpConverter extends BaseConverter {
  static convert(node: Node): string {
    const converter = new CSharpConverter();
    return converter.convert(node);
  }

  convert(node: Node): string {
    const classes: string[] = [];
    const mainClass = this.generateClass(node, 'RootClass', classes);
    
    return [...classes, mainClass].join('\n\n');
  }

  private generateClass(node: Node, name: string, classes: string[]): string {
    if (node.kind === 'array' && node.children?.[0]) {
      const childType = this.getCSharpType(node.children[0], name, classes);
      return `public class ${name} : List<${childType}> { }`;
    }

    if (node.kind === 'object' && node.props) {
      const properties = Object.entries(node.props).map(([key, prop]) => {
        const propType = this.getCSharpType(prop, this.capitalize(key), classes);
        const propName = this.capitalize(key);
        return `    public ${propType} ${propName} { get; set; }`;
      });

      return `public class ${name}\n{\n${properties.join('\n')}\n}`;
    }

    return `public class ${name} { }`;
  }

  private getCSharpType(node: Node, suggestedName: string, classes: string[]): string {
    switch (node.kind) {
      case 'string':
        return 'string';
      case 'number':
        return 'double';
      case 'boolean':
        return 'bool';
      case 'array':
        if (node.children?.[0]) {
          const childType = this.getCSharpType(
            node.children[0], 
            suggestedName + 'Item', 
            classes
          );
          return `List<${childType}>`;
        }
        return 'List<object>';
      case 'object':
        if (node.props && Object.keys(node.props).length > 0) {
          const className = this.generateUniqueClassName(suggestedName, classes);
          const classDeclaration = this.generateClass(node, className, classes);
          classes.push(classDeclaration);
          return className;
        }
        return 'Dictionary<string, object>';
      default:
        return 'object';
    }
  }

  private generateUniqueClassName(baseName: string, existingClasses: string[]): string {
    return this.generateUniqueName(baseName, existingClasses, 'class');
  }
}
