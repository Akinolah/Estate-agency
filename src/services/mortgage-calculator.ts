/**
 * Represents the result of a mortgage calculation.
 */
export interface MortgageCalculationResult {
  /**
   * The estimated monthly payment (Principal & Interest).
   */
  monthlyPayment: number;
}

/**
 * Calculates the estimated monthly mortgage payment using the standard formula.
 * M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
 * where:
 * P = Principal loan amount
 * i = Monthly interest rate (annual rate / 12)
 * n = Total number of payments (loan term years * 12)
 *
 * @param principal The principal amount of the mortgage.
 * @param annualInterestRate The annual interest rate (as a percentage, e.g., 6.5 for 6.5%).
 * @param loanTermYears The loan term in years.
 * @returns A promise that resolves to a MortgageCalculationResult object containing the estimated monthly payment.
 */
export async function calculateMortgage(principal: number, annualInterestRate: number, loanTermYears: number): Promise<MortgageCalculationResult> {
  // Input validation (basic)
  if (principal <= 0 || annualInterestRate < 0 || loanTermYears <= 0) {
     // In a real app, you might throw an error or return a specific result indicating invalid input
    return { monthlyPayment: 0 };
  }

  const monthlyInterestRate = (annualInterestRate / 100) / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyPayment = 0;

  // Handle 0% interest rate separately to avoid division by zero or NaN issues
  if (monthlyInterestRate === 0) {
    monthlyPayment = principal / numberOfPayments;
  } else {
     const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
     monthlyPayment = principal * (monthlyInterestRate * factor) / (factor - 1);
  }


  // Simulate async operation if this were calling an external API
  // await new Promise(resolve => setTimeout(resolve, 50)); // Optional delay simulation

  // Ensure the result is a valid number, default to 0 if calculation fails
  const finalPayment = isNaN(monthlyPayment) || !isFinite(monthlyPayment) ? 0 : monthlyPayment;


  return {
    // Round to 2 decimal places for currency
    monthlyPayment: Math.round(finalPayment * 100) / 100,
  };
}
