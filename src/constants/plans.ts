export type PlanFrequency = 1 | 2 | 3;
export type PlanVisitHours = 2 | 3 | 4;

export type MonthlyPlan = {
  frequency: PlanFrequency;
  visitHours: PlanVisitHours;
  hoursPerMonth: number;
  priceEuros: number;
  wasEuros: number;
  saveEuros: number;
  perHour: number;
  bestValue?: boolean;
};

/** Monthly cleaning packages — prices match the Cleanovox plans card. */
export const MONTHLY_PLANS: MonthlyPlan[] = [
  { frequency: 1, visitHours: 2, hoursPerMonth: 8, priceEuros: 95, wasEuros: 104, saveEuros: 9, perHour: 11.88 },
  { frequency: 1, visitHours: 3, hoursPerMonth: 12, priceEuros: 145, wasEuros: 156, saveEuros: 11, perHour: 12.08 },
  { frequency: 1, visitHours: 4, hoursPerMonth: 16, priceEuros: 190, wasEuros: 208, saveEuros: 18, perHour: 11.88 },
  { frequency: 2, visitHours: 2, hoursPerMonth: 16, priceEuros: 190, wasEuros: 208, saveEuros: 18, perHour: 11.88 },
  { frequency: 2, visitHours: 3, hoursPerMonth: 24, priceEuros: 285, wasEuros: 312, saveEuros: 27, perHour: 11.88 },
  { frequency: 2, visitHours: 4, hoursPerMonth: 32, priceEuros: 375, wasEuros: 416, saveEuros: 41, perHour: 11.72 },
  { frequency: 3, visitHours: 2, hoursPerMonth: 24, priceEuros: 285, wasEuros: 312, saveEuros: 27, perHour: 11.88 },
  {
    frequency: 3,
    visitHours: 3,
    hoursPerMonth: 36,
    priceEuros: 405,
    wasEuros: 468,
    saveEuros: 63,
    perHour: 11.25,
    bestValue: true,
  },
  { frequency: 3, visitHours: 4, hoursPerMonth: 48, priceEuros: 525, wasEuros: 624, saveEuros: 99, perHour: 10.94 },
];

export const PLAN_FREQUENCIES: PlanFrequency[] = [1, 2, 3];
export const PLAN_VISIT_HOURS: PlanVisitHours[] = [2, 3, 4];

export type PlanBooking = {
  frequency: PlanFrequency;
  visitHours: PlanVisitHours;
};

export function findMonthlyPlan(
  frequency: PlanFrequency,
  visitHours: PlanVisitHours
): MonthlyPlan {
  return MONTHLY_PLANS.find(
    (plan) => plan.frequency === frequency && plan.visitHours === visitHours
  ) as MonthlyPlan;
}

/** Billed month is 4 weeks, so 1×/week = 4 visits, 2× = 8, 3× = 12. */
export function visitsPerMonth(frequency: PlanFrequency): number {
  return frequency * 4;
}

export function monthlyPlanPriceCents(
  frequency: PlanFrequency,
  visitHours: PlanVisitHours
): number {
  return findMonthlyPlan(frequency, visitHours).priceEuros * 100;
}

/** Upcoming dates in a month that fall on the given JS weekdays (0=Sun). */
export function datesInMonthForWeekdays(
  year: number,
  month: number,
  weekdays: number[],
  needed: number,
  minDate: Date
): Date[] {
  if (weekdays.length === 0 || needed <= 0) {
    return [];
  }
  const last = new Date(year, month + 1, 0).getDate();
  const out: Date[] = [];
  for (let day = 1; day <= last && out.length < needed; day += 1) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    if (date < minDate) {
      continue;
    }
    if (weekdays.includes(date.getDay())) {
      out.push(date);
    }
  }
  return out;
}

export function countBookableDaysInMonth(year: number, month: number, minDate: Date): number {
  const last = new Date(year, month + 1, 0).getDate();
  let count = 0;
  for (let day = 1; day <= last; day += 1) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    if (date >= minDate) {
      count += 1;
    }
  }
  return count;
}
