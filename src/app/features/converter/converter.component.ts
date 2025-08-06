import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TextInputOutputAreaComponent } from '@shared/text-input-output-area/text-input-output-area.component';
import { InputTypes } from '@shared/dictionaries/input-types.dictionary';
import { OutputTypes } from '@shared/dictionaries/output-types.dictionary';
import { EnumUtilsService } from './services/enum-utils.service';

@Component({
  selector: 'app-converter',
  imports: [TextInputOutputAreaComponent],
  template: `
    <div
      class="card flex flex-col items-center justify-center h-full w-full pl-10 pr-10"
    >
      <h1 class="text-7xl font-bold mb-4">JSON Object Converter</h1>
      <p class="mb-4 text-3xl">Convert your objects easily!</p>
      <app-text-input-output-area class="w-full h-full" [inputTypes]="availableInputTypes" [outputTypes]="availableOutputTypes"></app-text-input-output-area>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterComponent {
  enumService = inject(EnumUtilsService);

  availableInputTypes = this.enumService.enumToArray(InputTypes);
  availableOutputTypes = this.enumService.enumToArray(OutputTypes);
}
