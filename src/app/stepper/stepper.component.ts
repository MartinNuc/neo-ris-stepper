import {
  Component,
  OnInit,
  ContentChildren,
  ViewContainerRef,
  AfterContentInit,
  EventEmitter,
  QueryList,
  Output,
  TemplateRef,
  ViewChild,
  OnDestroy,
  EmbeddedViewRef,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import { StepperController } from './stepper-controller';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements AfterContentInit, OnDestroy {

  stepperController: StepperController;

  @Output()
  finished = new EventEmitter<void>();

  @ContentChildren('step')
  steps: QueryList<TemplateRef<any>>;

  @ViewChild('container', { read: NgTemplateOutlet })
  container: NgTemplateOutlet;

  currentStepSubscription: Subscription;
  onFinishSubscription: Subscription;
  displayedTemplate: TemplateRef<any>;

  constructor(protected cdRef: ChangeDetectorRef) {}

  displayTemplate(step: number) {
    this.displayedTemplate = this.steps.find((_, index) => step === index);
    this.cdRef.detectChanges();
  }

  ngAfterContentInit() {
    const stepsCount = this.steps.length;
    this.stepperController = new StepperController(stepsCount);
    this.currentStepSubscription = this.stepperController.watchCurrentStep().subscribe(
      step => this.displayTemplate(step)
    );
    this.onFinishSubscription = this.stepperController.watchForFinish().subscribe(
      () => this.finished.emit()
    );
  }

  ngOnDestroy(): void {
    if (this.currentStepSubscription) {
      this.currentStepSubscription.unsubscribe();
    }
    if (this.onFinishSubscription) {
      this.onFinishSubscription.unsubscribe();
    }
  }
}
