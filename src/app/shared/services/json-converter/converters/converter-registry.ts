import { Node } from '../types/node.type';
import { TypeScriptConverter } from './typescript-converter';
import { CSharpConverter } from './csharp-converter';
import { GoLangConverter } from './go-lang-converter';

export type ConverterFunction = (node: Node) => string;

export class ConverterRegistry {
  private static converters: Record<string, ConverterFunction> = {
    TypeScript: (node) => TypeScriptConverter.convert(node),
    // 'JSON': (node) => JsonConverter.convert(node), // disabe as it is not used ;) and generates trash non user friendlyu content
    CSharp: (node) => CSharpConverter.convert(node),
    Go: (node) => GoLangConverter.convert(node),
  };

  static getConverter(outputType: string): ConverterFunction | undefined {
    return this.converters[outputType];
  }

  static registerConverter(
    outputType: string,
    converter: ConverterFunction
  ): void {
    this.converters[outputType] = converter;
  }

  static getAvailableOutputTypes(): string[] {
    return Object.keys(this.converters);
  }

  static hasConverter(outputType: string): boolean {
    return outputType in this.converters;
  }
}
