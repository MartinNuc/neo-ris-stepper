import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createHostComponentFactory, SpectatorWithHost, createTestComponentFactory, Spectator } from '@netbasal/spectator';
import { StepperComponent } from './stepper.component';

describe('StepperComponent', () => {
  let host: SpectatorWithHost<StepperComponent>;
  const createHost = createHostComponentFactory(StepperComponent);

  it('should create a controller for 3 steps for 3 templates', () => {
    host = createHost(`
      <app-stepper #stepper>
        <ng-template #step>one</ng-template>
        <ng-template #step>two</ng-template>
        <ng-template #step>three</ng-template>
      </app-stepper>
    `);
    expect(host.component.stepperController.stepsCount).toBe(3);
  });

  it('should display the first step at beginning', () => {
    host = createHost(`
      <app-stepper #stepper>
        <ng-template #step>one</ng-template>
        <ng-template #step>two</ng-template>
        <ng-template #step>three</ng-template>
      </app-stepper>
    `);
    expect(host.query('.outlet')).toHaveText('one');
    const steps = host.queryAll('.step');
    expect(steps[0]).toHaveText('1');
    expect(steps[0]).toHaveClass('active');
    expect(steps[2]).toHaveText('3');
    expect(steps[2]).not.toHaveClass('active');
  });

  it('should display the second step after calling goForward() on controller', () => {
    host = createHost(`
      <app-stepper #stepper>
        <ng-template #step>one</ng-template>
        <ng-template #step>two</ng-template>
        <ng-template #step>three</ng-template>
      </app-stepper>
    `);
    host.component.stepperController.goForward();
    host.detectChanges();
    expect(host.query('.outlet')).toHaveText('two');
    const steps = host.queryAll('.step');
    expect(steps[0]).toHaveText('1');
    expect(steps[0]).not.toHaveClass('active');
    expect(steps[1]).toHaveText('2');
    expect(steps[1]).toHaveClass('active');
  });

  it('should emit finished when coming to the last step', () => {
    host = createHost(`
      <app-stepper #stepper>
        <ng-template #step>one</ng-template>
        <ng-template #step>two</ng-template>
        <ng-template #step>three</ng-template>
      </app-stepper>
    `);
    let hasEmitted = false;
    host.output<void>('finished').subscribe(() => hasEmitted = true);
    host.component.stepperController.goForward();
    host.component.stepperController.goForward();
    host.detectChanges();
    expect(hasEmitted).toBeTruthy();
  });
});
