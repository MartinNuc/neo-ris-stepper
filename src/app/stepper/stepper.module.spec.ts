import { StepperModule } from './stepper.module';

describe('StepperModule', () => {
  let stepperModule: StepperModule;

  beforeEach(() => {
    stepperModule = new StepperModule();
  });

  it('should create an instance', () => {
    expect(stepperModule).toBeTruthy();
  });
});
