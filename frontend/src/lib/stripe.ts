/**
 * Stripe Payment Links (no backend). Each link opens Stripe's hosted checkout.
 * Env vars are set in .env.local and Vercel.
 */

// Membership — NorCal vs Out-of-State
export function getMembershipNorCalMonthlyLink(): string {
  return import.meta.env.VITE_STRIPE_MEMBERSHIP_MONTHLY ?? '';
}

export function getMembershipNorCalYearlyLink(): string {
  return import.meta.env.VITE_STRIPE_MEMBERSHIP_YEARLY ?? '';
}

export function getMembershipOutOfStateYearlyLink(): string {
  // Provided by user; can be overridden by env for production.
  return (
    import.meta.env.VITE_STRIPE_MEMBERSHIP_OUTSTATE_YEARLY ??
    'https://buy.stripe.com/test_9B6bIU7NggPLeVX7pRdQQ08'
  );
}

// Insurance — one option per tier
export type InsuranceOption = { label: string; url: string; price?: string };

/** All insurance tiers with optional display price per tier. */
export function getInsuranceOptions(): InsuranceOption[] {
  const options: InsuranceOption[] = [
    { label: 'Adult only (18–64) In-State', url: import.meta.env.VITE_STRIPE_INSURANCE_ADULT_INSTATE ?? '', price: import.meta.env.VITE_INSURANCE_PRICE_ADULT_INSTATE ?? undefined },
    { label: 'Adult with dependents (18–64) In-State', url: import.meta.env.VITE_STRIPE_INSURANCE_ADULT_DEP_INSTATE ?? '', price: import.meta.env.VITE_INSURANCE_PRICE_ADULT_DEP_INSTATE ?? undefined },
    { label: 'Adult only (18–64) Out-of-State', url: import.meta.env.VITE_STRIPE_INSURANCE_ADULT_OUTSTATE ?? '', price: import.meta.env.VITE_INSURANCE_PRICE_ADULT_OUTSTATE ?? undefined },
    { label: 'Adult with dependents (18–64) Out-of-State', url: import.meta.env.VITE_STRIPE_INSURANCE_ADULT_DEP_OUTSTATE ?? '', price: import.meta.env.VITE_INSURANCE_PRICE_ADULT_DEP_OUTSTATE ?? undefined },
    { label: 'Ages 65–70', url: import.meta.env.VITE_STRIPE_INSURANCE_65_70 ?? '', price: import.meta.env.VITE_INSURANCE_PRICE_65_70 ?? undefined },
    { label: 'Ages 70+', url: import.meta.env.VITE_STRIPE_INSURANCE_70_PLUS ?? '', price: import.meta.env.VITE_INSURANCE_PRICE_70_PLUS ?? undefined },
  ];
  return options.filter((o) => o.url && o.url !== '#');
}
