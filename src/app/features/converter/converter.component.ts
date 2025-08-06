import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextInputOutputAreaComponent } from '../../shared/text-input-output-area/text-input-output-area.component';

@Component({
  selector: 'app-converter',
  imports: [TextInputOutputAreaComponent],
  template: ` <app-text-input-output-area></app-text-input-output-area>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterComponent {}
