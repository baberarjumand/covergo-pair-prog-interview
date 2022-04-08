import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

interface CountryPaymentInfo {
  country: string;
  currencyCode: string;
  baseRate: number;
}

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent implements OnInit, OnDestroy {
  countries = [
    {
      country: 'hong-kong',
      label: 'Hong Kong',
    },
    {
      country: 'usa',
      label: 'USA',
    },
    {
      country: 'aus',
      label: 'Australia',
    },
  ];
  paymentCalcArr: CountryPaymentInfo[] = [
    {
      country: 'hong-kong',
      currencyCode: 'HKD',
      baseRate: 1,
    },
    {
      country: 'usa',
      currencyCode: 'USD',
      baseRate: 2,
    },
    {
      country: 'aus',
      currencyCode: 'AUD',
      baseRate: 3,
    },
  ];
  packages = [
    {
      packageName: 'Standard',
      multiplier: 1,
    },
    {
      packageName: 'Safe',
      multiplier: 1.5,
    },
    {
      packageName: 'Super safe',
      multiplier: 1.75,
    },
  ];
  premium: number | null = 0;

  inputFormGroup: FormGroup;
  inputFormSub: Subscription;

  baseRate = 100;

  constructor(private router: Router) {
    this.inputFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      age: new FormControl(50, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      country: new FormControl('hong-kong', [Validators.required]),
      package: new FormControl('standard', [Validators.required]),
    });

    this.inputFormSub = this.inputFormGroup.valueChanges.subscribe(() => {
      this.calcPremiumRate();
    });
  }

  ngOnDestroy(): void {
    this.inputFormSub.unsubscribe();
  }

  ngOnInit(): void {}

  getLabelValue(p: any) {
    if (p['multiplier'] === 1) {
      return '';
    }

    const age = this.inputFormGroup.get('age')?.value;
    const selectedCountry = this.inputFormGroup.get('country')?.value;
    let baseRate = 0;

    for (let c of this.paymentCalcArr) {
      if (c.country === selectedCountry) {
        baseRate = c.baseRate;
      }
    }

    let currencyLabel = '';
    for (let l of this.paymentCalcArr) {
      if (l.country === selectedCountry) {
        currencyLabel = l.currencyCode;
      }
    }

    const basePrice = 10 * age * baseRate;

    const diff = basePrice * p['multiplier'] - basePrice;
    return '+' + diff + currencyLabel;
  }

  calcPremiumRate() {
    const age = this.inputFormGroup.get('age')?.value;
    const selectedCountry = this.inputFormGroup.get('country')?.value;
    const selectedPackage = this.inputFormGroup.get('package')?.value;

    if (!age || !selectedCountry || !selectedPackage) {
      this.premium = null;
      return;
    }

    let baseRate = 0;

    for (let c of this.paymentCalcArr) {
      if (c.country === selectedCountry) {
        baseRate = c.baseRate;
      }
    }

    this.premium = 10 * age * baseRate * selectedPackage;
  }

  onSubmit() {
    const age = this.inputFormGroup.get('age')?.value;

    if (age && age > 100) {
      this.router.navigate(['/error-page']);
      return;
    }

    this.router.navigate(['/summary'], {
      state: {
        name: this.inputFormGroup.get('name')?.value,
        age: this.inputFormGroup.get('age')?.value,
        country: this.inputFormGroup.get('country')?.value,
        package: this.inputFormGroup.get('package')?.value,
        premium: this.premium,
      },
    });
  }
}
