import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { StepperController } from './stepper-controller';
import { StepperComponent } from './stepper/stepper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(StepperComponent)
  stepper: StepperComponent;

  constructor(protected cdRef: ChangeDetectorRef) {

  }

  onFinished() {
    console.log('finished');
  }

  setStepperValidity(value) {
    this.stepper.stepperController.changeValidity(value);
    this.cdRef.detectChanges();
  }
}
