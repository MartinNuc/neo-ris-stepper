import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class StepperController {
  currentStep$ = new BehaviorSubject<number>(0);
  get currentStep() {
    return this.currentStep$.getValue();
  }

  onFinish$ = new Subject<void>();

  canGoBack = false;
  canGoForward = true;
  validity = true;

  constructor(public stepsCount: number) {
  }

  watchCurrentStep(): Observable<number> {
    return this.currentStep$.asObservable();
  }

  watchForFinish(): Observable<void> {
    return this.onFinish$.asObservable();
  }

  goForward() {
    this.goToStep(this.currentStep + 1);
  }

  goBack() {
    this.goToStep(this.currentStep - 1);
  }

  goToStep(step: number) {
    if (step > this.stepsCount) { throw new Error(`Trying to access step ${step} out of ${this.stepsCount}`); }
    if (step < 0) { throw new Error(`Trying to access step (${step}) lower than zero.`); }

    this.currentStep$.next(step);
    this.canGoBack = step > 0;
    this.checkIfCanGoForward();
    if (step === this.stepsCount - 1) {
      this.onFinish$.next();
    }
  }

  checkIfCanGoForward() {
    const canProceed = this.currentStep < this.stepsCount - 1 && this.validity;
    this.canGoForward = canProceed;
  }

  changeValidity(validity: boolean) {
    this.validity = validity;
    this.checkIfCanGoForward();
  }
}
