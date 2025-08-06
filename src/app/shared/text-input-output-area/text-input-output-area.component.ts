import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
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
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 w-full">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <p-select
            [options]="inputTypes()"
            [(ngModel)]="selectedInputType"
            optionLabel="name"
            optionValue="name"
            [placeholder]="defaultInputType()"
            class="w-80"
          />
          <h3 class="text-lg font-semibold">Input</h3>
        </div>

        <p-floatlabel class="justify-space-between align-items-space-between">
          <textarea
            pTextarea
            id="input-textarea"
            [(ngModel)]="inputText"
            class="w-full min-h-80 resize-none font-mono text-sm"
          ></textarea>
          <label for="input-textarea">{{
            selectedInputType() || defaultInputType()
          }}</label>
        </p-floatlabel>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Output</h3>
          <p-select
            [options]="outputTypes()"
            [(ngModel)]="selectedOutputType"
            optionLabel="name"
            optionValue="name"
            [placeholder]="defaultOutputType()"
            class="w-80"
          />
        </div>

        <p-floatlabel class="justify-space-between align-items-space-between">
          <textarea
            pTextarea
            id="output-textarea"
            readonly
            class="w-full min-h-80 resize-none font-mono text-sm bg-gray-50"
          ></textarea>
          <label for="output-textarea">{{
            selectedOutputType() || defaultOutputType()
          }}</label>
        </p-floatlabel>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputOutputAreaComponent {
  inputTypes = input<EnumOption[]>([]);
  outputTypes = input<EnumOption[]>([]);

  selectedInputType = signal<string>('');
  selectedOutputType = signal<string>('');
  inputText = signal<string>('');

  inputTypesChange = output<EnumOption[]>();
  outputTypesChange = output<EnumOption[]>();
  textChanged = output<string>();

  defaultInputType = computed(
    () => this.inputTypes()[0]?.name ?? 'Select Input Type'
  );
  defaultOutputType = computed(
    () => this.outputTypes()[0]?.name ?? 'Select Output Type'
  );
}
