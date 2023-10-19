import { Component } from '@angular/core';

@Component({
  selector: 'app-passwordChecker',
  templateUrl: './passwordChecker.component.html',
})
export class PasswordCheckerComponent {
  passLevel: string = 'empty';
  passIsHidden = true;

  checkPasswordStrength(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const password = inputElement.value;

    if (password.length === 0) {
      this.passLevel = 'empty';
    } else if (password.length < 8) {
      this.passLevel = 'lessThanMin';
    } else {
      const hasLetters = /[a-zA-Z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSymbols = /[!@#$%^&*]/.test(password);

      if (hasLetters && hasNumbers && hasSymbols) {
        this.passLevel = 'strong';
      } else if (
        (hasLetters && hasSymbols) ||
        (hasLetters && hasNumbers) ||
        (hasNumbers && hasSymbols)
      ) {
        this.passLevel = 'medium';
      } else {
        this.passLevel = 'easy';
      }
    }
  }
}
