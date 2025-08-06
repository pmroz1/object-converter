import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { EnumOption } from '@features/converter/models/enum-option.model';

@Component({
  selector: 'app-text-input-output-area',
  imports: [FormsModule, TextareaModule, FloatLabel, SelectModule],
  template: `
    <div class="card flex flex-wrap justify-center items-stretch gap-4">
      <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-4 justify-between items-center">
          <p>Select an Input Type</p>
          <p-select
            [options]="inputTypes()"
            [(ngModel)]="selectedInputType"
            optionLabel="name"
            placeholder="{{ selectedInputType() }}"
            class="w-full md:w-56"
          />
        </div>

        <p-floatlabel>
          <textarea
            pTextarea
            id="over_label2"
            rows="5"
            cols="30"
            style="resize: none"
            class="h-full w-full"
          ></textarea>
          <label for="JSON">JSON</label>
        </p-floatlabel>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-4 justify-between items-center">
          <p>Select an Output Type</p>
          <p-select
            [options]="outputTypes()"
            [(ngModel)]="selectedOutputType"
            optionLabel="name"
            placeholder="{{ selectedOutputType() }}"
            class="w-full md:w-56"
          />
        </div>

        <p-floatlabel>
          <textarea
            pTextarea
            id="over_label2"
            rows="5"
            cols="30"
            style="resize: none"
            class="h-full w-full"
          ></textarea>
          <label for="CSharp">C#</label>
        </p-floatlabel>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputOutputAreaComponent {
  inputTypes = input<EnumOption[]>();
  outputTypes = input<EnumOption[]>();

  selectedInputType = input<string>('JSON');
  selectedOutputType = input<string>('csharp');
}
