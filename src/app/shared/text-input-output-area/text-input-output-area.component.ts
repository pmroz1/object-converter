import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-text-input-output-area',
  imports: [FormsModule, TextareaModule, FloatLabel],
  template: `
    <div class="card flex flex-wrap justify-center items-stretch gap-4">
      <p-floatlabel>
        <textarea
          pTextarea
          id="over_label2"
          rows="5"
          cols="30"
          style="resize: none"
          class="h-full"
        ></textarea>
        <label for="JSON">JSON</label>
      </p-floatlabel>

      <p-floatlabel>
        <textarea
          pTextarea
          id="over_label"
          rows="5"
          cols="30"
          style="resize: none"
          class="h-full"
        ></textarea>
        <label for="Output">Output</label>
      </p-floatlabel>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputOutputAreaComponent {}
