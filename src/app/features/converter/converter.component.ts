import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextInputOutputAreaComponent } from '../../shared/text-input-output-area/text-input-output-area.component';

@Component({
  selector: 'app-converter',
  imports: [TextInputOutputAreaComponent],
  template: `
    <div class="card flex flex-col items-center justify-center h-full w-full m-10">
      <h1 class="text-7xl font-bold mb-4">JSON Object Converter</h1>
      <p class="mb-4 text-3xl">Convert your objects easily!</p>  
      <app-text-input-output-area></app-text-input-output-area>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterComponent {}
