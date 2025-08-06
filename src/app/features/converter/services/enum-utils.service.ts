import { Injectable } from '@angular/core';
import { EnumOption } from '../models/enum-option.model';

@Injectable({
  providedIn: 'root',
})
export class EnumUtilsService {
  enumToArray(enumObj: any) : EnumOption[] {
    return Object.keys(enumObj)
      .filter((key) => isNaN(Number(key)))
      .map((key) => ({ name: key, value: enumObj[key] }));
  }
}
