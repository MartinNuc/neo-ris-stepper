import { StepperController } from "./stepper-controller";

describe('StepperController', () => {
  it('should allow only go forward from the first step', () => {
    const stepperController = new StepperController(3);
    expect(stepperController.canGoForward).toBeTruthy();
    expect(stepperController.canGoBack).toBeFalsy();
  });

  it('should allow only go back from the last step', () => {
    const stepperController = new StepperController(3);
    stepperController.goForward();
    stepperController.goForward();
    expect(stepperController.canGoForward).toBeFalsy();
    expect(stepperController.canGoBack).toBeTruthy();
  });

  it('should not allow going forward when validation is falsy', () => {
    const stepperController = new StepperController(3);
    stepperController.changeValidity(false);
    expect(stepperController.canGoForward).toBeFalsy();
  });

  it('should not allow going to step -1', () => {
    const stepperController = new StepperController(3);
    expect(() => stepperController.goToStep(-1)).toThrowError();
  });

  it('should not allow going to step higher than total steps count', () => {
    const stepperController = new StepperController(3);
    expect(() => stepperController.goToStep(4)).toThrowError();
  });

  it('should emit currentStep$ when going to new step', () => {
    const stepperController = new StepperController(3);
    let emittedStep;
    stepperController.currentStep$.subscribe(step => emittedStep = step);
    stepperController.goToStep(2);
    expect(stepperController.currentStep).toBe(2);
    expect(emittedStep).toBe(2);
  });

  it('should emit onFinish$ when going the last step', () => {
    const stepperController = new StepperController(3);
    let emitted = false;
    stepperController.onFinish$.subscribe(() => emitted = true);
    stepperController.goToStep(2);
    expect(emitted).toBeTruthy();
  });
});
