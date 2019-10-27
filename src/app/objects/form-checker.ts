export interface FormChecker {
  value: any;
  isValid: boolean;
  checker(): void;
}
