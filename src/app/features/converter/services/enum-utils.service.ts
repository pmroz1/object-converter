import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnumUtilsService {
  enumToArray(enumObj: any) {
    return Object.keys(enumObj)
      .filter((key) => isNaN(Number(key))) // Filter out numeric keys
      .map((key) => ({ name: key, value: enumObj[key] }));
  }
}
