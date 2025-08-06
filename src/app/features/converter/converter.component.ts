import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { TextInputOutputAreaComponent } from '@shared/text-input-output-area/text-input-output-area.component';
import { InputTypes } from '@shared/dictionaries/input-types.dictionary';
import { OutputTypes } from '@shared/dictionaries/output-types.dictionary';
import { EnumUtilsService } from './services/enum-utils.service';
import { JsonConverterService } from '@shared/services/json-converter/json-converter.service';

@Component({
  selector: 'app-converter',
  imports: [TextInputOutputAreaComponent],
  template: `
    <div
      class="card flex flex-col items-center justify-center h-full w-full pl-10 pr-10"
    >
      <h1 class="text-7xl font-bold mb-4">JSON Object Converter</h1>
      <p class="mb-4 text-3xl">Convert your objects easily!</p>
      <app-text-input-output-area 
        class="w-full h-full" 
        [inputTypes]="availableInputTypes" 
        [outputTypes]="availableOutputTypes"
        [outputText]="convertedOutput()"
        (inputTypeChanged)="onInputTypeChanged($event)"
        (outputTypeChanged)="onOutputTypeChanged($event)"
        (inputTextChanged)="onInputTextChanged($event)"
      ></app-text-input-output-area>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterComponent {
  enumService = inject(EnumUtilsService);
  jsonConverterService = inject(JsonConverterService);

  availableInputTypes = this.enumService.enumToArray(InputTypes);
  availableOutputTypes = this.enumService.enumToArray(OutputTypes);

  selectedInputType = signal<string>('JSON');
  selectedOutputType = signal<string>('TypeScript');
  inputText = signal<string>('{"name": "John", "age": 30, "active": true}');

  convertedOutput = computed(() => {
    const input = this.inputText();
    const inputType = this.selectedInputType();
    const outputType = this.selectedOutputType();

    console.log('Converting:', { input, inputType, outputType });

    if (!input || !inputType || !outputType) {
      return '';
    }

    try {
      if (inputType === 'JSON') {
        const parsed = this.jsonConverterService.convert(input);
        
        switch (outputType) {
          case 'TypeScript':
            return this.jsonConverterService.toTypeScript(parsed);
          case 'JSON':
            return this.jsonConverterService.toFormattedJson(parsed);
          case 'C#':
            return `// C# conversion not implemented yet\n${JSON.stringify(parsed, null, 2)}`;
          default:
            return `Conversion to ${outputType} not implemented yet.`;
        }
      }

      return `Conversion from ${inputType} to ${outputType} not implemented yet.`;
    } catch (error) {
      return `Error: ${error}`;
    }
  });

  onInputTypeChanged(type: string) {
    this.selectedInputType.set(type);
  }

  onOutputTypeChanged(type: string) {
    this.selectedOutputType.set(type);
  }

  onInputTextChanged(text: string) {
    console.log('Input text changed:', text);
    this.inputText.set(text);
  }
}
