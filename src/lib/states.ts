// State filing fee add-ons (USD) on top of the $298 LLC + EIN + Address service.
// Figures reflect the market-standard add-ons used by comparable providers and
// can be adjusted as state fees change. `days` is a typical filing turnaround.

export interface StateFee {
  name: string;
  fee: number;
  days: number;
  popular?: boolean;
}

export const STATE_FEES: StateFee[] = [
  { name: "New Mexico", fee: 0, days: 2, popular: true },
  { name: "Colorado", fee: 0, days: 1, popular: true },
  { name: "Wyoming", fee: 50, days: 3, popular: true },
  { name: "Delaware", fee: 100, days: 7, popular: true },
  { name: "Florida", fee: 100, days: 10 },
  { name: "Texas", fee: 265, days: 2 },
  { name: "New York", fee: 150, days: 1 },
  { name: "California", fee: 50, days: 6 },
  { name: "Alaska", fee: 200, days: 1 },
  { name: "Alabama", fee: 200, days: 2 },
  { name: "Arkansas", fee: 50, days: 7 },
  { name: "Arizona", fee: 50, days: 1 },
  { name: "Connecticut", fee: 100, days: 7 },
  { name: "District of Columbia", fee: 50, days: 15 },
  { name: "Georgia", fee: 50, days: 12 },
  { name: "Hawaii", fee: 50, days: 10 },
  { name: "Iowa", fee: 50, days: 1 },
  { name: "Idaho", fee: 50, days: 15 },
  { name: "Illinois", fee: 100, days: 10 },
  { name: "Indiana", fee: 50, days: 1 },
  { name: "Kansas", fee: 150, days: 1 },
  { name: "Kentucky", fee: 50, days: 1 },
  { name: "Louisiana", fee: 50, days: 2 },
  { name: "Massachusetts", fee: 470, days: 1 },
  { name: "Maryland", fee: 100, days: 10 },
  { name: "Maine", fee: 200, days: 3 },
  { name: "Michigan", fee: 50, days: 10 },
  { name: "Minnesota", fee: 100, days: 2 },
  { name: "Missouri", fee: 50, days: 1 },
  { name: "Mississippi", fee: 50, days: 1 },
  { name: "Montana", fee: 50, days: 8 },
  { name: "North Carolina", fee: 100, days: 12 },
  { name: "North Dakota", fee: 100, days: 10 },
  { name: "Nebraska", fee: 50, days: 10 },
  { name: "New Hampshire", fee: 50, days: 15 },
  { name: "New Jersey", fee: 100, days: 1 },
  { name: "Nevada", fee: 400, days: 1 },
  { name: "Ohio", fee: 50, days: 7 },
  { name: "Oklahoma", fee: 50, days: 2 },
  { name: "Oregon", fee: 50, days: 1 },
  { name: "Pennsylvania", fee: 100, days: 5 },
  { name: "Rhode Island", fee: 100, days: 2 },
  { name: "South Carolina", fee: 100, days: 2 },
  { name: "South Dakota", fee: 100, days: 1 },
  { name: "Tennessee", fee: 250, days: 1 },
  { name: "Utah", fee: 50, days: 10 },
  { name: "Virginia", fee: 50, days: 1 },
  { name: "Vermont", fee: 100, days: 3 },
  { name: "Washington", fee: 150, days: 10 },
  { name: "Wisconsin", fee: 100, days: 1 },
  { name: "West Virginia", fee: 50, days: 9 },
  { name: "Puerto Rico", fee: 200, days: 1 },
];
