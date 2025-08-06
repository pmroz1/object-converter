import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsonConverterService {
  convert(json: string): any {
    try {
      return JSON.parse(json);
    } catch (error) {
      throw new Error(`Invalid JSON: ${error}`);
    }
  }

  toTypeScript(obj: any): string {
    return ''
  }

  toFormattedJson(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }
}
