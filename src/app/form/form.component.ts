import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { tap, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements AfterViewInit {
  form = this.fb.group({
    name: ['', Validators.required]
  });

  @Output()
  isValid = this.form.statusChanges.pipe(
    map(state => state === 'VALID' ? true : false),
  );

  constructor(protected fb: FormBuilder) {}

  ngAfterViewInit(): void {
    this.form.updateValueAndValidity();
  }
}
