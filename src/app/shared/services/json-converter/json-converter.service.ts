import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsonConverterService {
  convert(json: string): any {
    const parsed = JSON.parse(json);
    return parsed;
  }
}
