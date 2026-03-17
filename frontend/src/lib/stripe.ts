/**
 * Stripe Payment Links (no backend). Each link opens Stripe's hosted checkout.
 * Env vars are set in .env.local and Vercel.
 */

// Membership — Monthly vs Yearly
export function getMembershipMonthlyLink(): string {
  return import.meta.env.VITE_STRIPE_MEMBERSHIP_MONTHLY ?? '';
}

export function getMembershipYearlyLink(): string {
  return import.meta.env.VITE_STRIPE_MEMBERSHIP_YEARLY ?? '';
}

// Insurance — one option per tier
export type InsuranceOption = { label: string; url: string };

/** All insurance tiers grouped by category (In-State, Out-of-State, Seniors). */
export function getInsuranceOptions(): InsuranceOption[] {
  const options: InsuranceOption[] = [
    { label: 'Adult only (18–64) In-State', url: import.meta.env.VITE_STRIPE_INSURANCE_ADULT_INSTATE ?? '' },
    { label: 'Adult with dependents (18–64) In-State', url: import.meta.env.VITE_STRIPE_INSURANCE_ADULT_DEP_INSTATE ?? '' },
    { label: 'Adult only (18–64) Out-of-State', url: import.meta.env.VITE_STRIPE_INSURANCE_ADULT_OUTSTATE ?? '' },
    { label: 'Adult with dependents (18–64) Out-of-State', url: import.meta.env.VITE_STRIPE_INSURANCE_ADULT_DEP_OUTSTATE ?? '' },
    { label: 'Ages 65–70', url: import.meta.env.VITE_STRIPE_INSURANCE_65_70 ?? '' },
    { label: 'Ages 70+', url: import.meta.env.VITE_STRIPE_INSURANCE_70_PLUS ?? '' },
  ];
  return options.filter((o) => o.url && o.url !== '#');
}
