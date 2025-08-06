import { Node } from '../types/node.type';

export interface Converter {
  convert(node: Node): string;
}

export abstract class BaseConverter implements Converter {
  abstract convert(node: Node): string;

  protected capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  protected isValidIdentifier(str: string): boolean {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(str);
  }

  protected generateUniqueName(
    baseName: string, 
    existingNames: string[], 
    pattern: string
  ): string {
    if (!existingNames.some(name => name.includes(`${pattern} ${baseName}`))) {
      return baseName;
    }

    let counter = 1;
    let name: string;
    
    do {
      name = `${baseName}${counter}`;
      counter++;
    } while (existingNames.some(existing => existing.includes(`${pattern} ${name}`)));

    return name;
  }
}
