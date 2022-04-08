import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  name: string;
  age: number;
  country: string;
  package: string;
  premium: number;
  currencyLabel: string = '';
  packageName: string = '';

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

  paymentCalcArr = [
    {
      country: 'hong-kong',
      currencyCode: 'HKD',
      baseRate: 100,
    },
    {
      country: 'usa',
      currencyCode: 'USD',
      baseRate: 200,
    },
    {
      country: 'aus',
      currencyCode: 'AUD',
      baseRate: 300,
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

  constructor(private router: Router) {
    // console.log(this.router.getCurrentNavigation()?.extras.state);
    const routerStateData = this.router.getCurrentNavigation()?.extras.state;
    this.name = routerStateData?.['name'];
    this.age = routerStateData?.['age'];

    this.country = routerStateData?.['country'];

    for (let a of this.paymentCalcArr) {
      if (a.country === this.country) {
        this.currencyLabel = a.currencyCode;
      }
    }

    for (let c of this.countries) {
      if (c.country === this.country) {
        this.country = c.label;
      }
    }

    this.package = routerStateData?.['package'];

    for (let p of this.packages) {
      if (p.multiplier === +this.package) {
        this.packageName = p.packageName;
      }
    }

    this.premium = routerStateData?.['premium'];
  }

  ngOnInit(): void {}

  onBuy() {
    // paymemnt processing logic goes here, or next steps
  }
}
