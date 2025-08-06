import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-text-input-output-area',
  imports: [FormsModule, TextareaModule, FloatLabel],
  template: `
    <p-floatlabel>
      <textarea
        pTextarea
        id="over_label"
        rows="5"
        cols="30"
        style="resize: none"
        class="h-full"
      ></textarea>
      <label for="over_label">Over Label</label>
    </p-floatlabel>

    <p-floatlabel variant="in">
      <textarea
        pTextarea
        id="over_label"
        rows="5"
        cols="30"
        style="resize: none"
        class="h-full"
      ></textarea>
      <label for="in_label">In Label</label>
    </p-floatlabel>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputOutputAreaComponent {}
