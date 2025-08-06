import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
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
            [ngModel]="selectedInputType()"
            (ngModelChange)="selectedInputType.set($event)"
            optionLabel="name"
            optionValue="name"
            [placeholder]="defaultInputType()"
            class="w-80"
          />
          <h3 class="text-lg font-semibold">Input</h3>
        </div>
        <textarea
          pTextarea
          id="input-textarea"
          [ngModel]="inputText()"
          (ngModelChange)="inputText.set($event)"
          class="w-full min-h-80 h-220 resize-none font-mono text-sm"
        ></textarea>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Output</h3>
          <p-select
            [options]="outputTypes()"
            [ngModel]="selectedOutputType()"
            (ngModelChange)="selectedOutputType.set($event)"
            optionLabel="name"
            optionValue="name"
            [placeholder]="defaultOutputType()"
            class="w-80"
          />
        </div>

        <textarea
          pTextarea
          id="output-textarea"
          [value]="outputText()"
          readonly
          class="w-full min-h-80 h-220 resize-none font-mono text-sm bg-gray-50"
        ></textarea>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputOutputAreaComponent {
  inputTypes = input<EnumOption[]>([]);
  outputTypes = input<EnumOption[]>([]);
  outputText = input<string>('');

  selectedInputType = signal<string>('');
  selectedOutputType = signal<string>('');
  inputText = signal<string>('');

  inputTypeChanged = output<string>();
  outputTypeChanged = output<string>();
  inputTextChanged = output<string>();

  defaultInputType = computed(
    () => this.inputTypes()[0]?.name ?? 'Select Input Type'
  );
  defaultOutputType = computed(
    () => this.outputTypes()[0]?.name ?? 'Select Output Type'
  );

  constructor() {
    effect(() => {
      if (this.inputTypes().length > 0 && !this.selectedInputType()) {
        this.selectedInputType.set(this.inputTypes()[0].name);
      }
    });

    effect(() => {
      if (this.outputTypes().length > 0 && !this.selectedOutputType()) {
        this.selectedOutputType.set(this.outputTypes()[0].name);
      }
    });

    effect(() => {
      console.log('Input type changed:', this.selectedInputType());
      this.inputTypeChanged.emit(this.selectedInputType());
    });

    effect(() => {
      console.log('Output type changed:', this.selectedOutputType());
      this.outputTypeChanged.emit(this.selectedOutputType());
    });

    effect(() => {
      console.log('Input text changed:', this.inputText());
      this.inputTextChanged.emit(this.inputText());
    });
  }
}
