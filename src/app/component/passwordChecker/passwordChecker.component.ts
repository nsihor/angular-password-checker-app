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
      const hasLetters = /[a-zA-Zа-яА-Я]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSymbols = /[.,_"'-;:=+!`~@#$%^&*()?{}[\]]/.test(password);

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

  get indicatorOne() {
    return {
      'bg-slate-400': this.passLevel === 'empty',
      'bg-red-600':
        this.passLevel === 'easy' || this.passLevel === 'lessThanMin',
      'bg-yellow-300': this.passLevel === 'medium',
      'bg-green-600': this.passLevel === 'strong',
    };
  }

  get indicatorTwo() {
    return {
      'bg-slate-400': this.passLevel === 'empty' || this.passLevel === 'easy',
      'bg-red-600': this.passLevel === 'lessThanMin',
      'bg-yellow-300': this.passLevel === 'medium',
      'bg-green-600': this.passLevel === 'strong',
    };
  }

  get indicatorThree() {
    return {
      'bg-slate-400':
        this.passLevel === 'empty' ||
        this.passLevel === 'easy' ||
        this.passLevel === 'medium',
      'bg-red-600': this.passLevel === 'lessThanMin',
      'bg-green-600': this.passLevel === 'strong',
    };
  }
}
