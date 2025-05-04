
/**
 * Calculates the estimated monthly mortgage payment using the standard formula.
 * M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
 * where:
 * P = Principal loan amount
 * i = Monthly interest rate (annual rate / 12)
 * n = Total number of payments (loan term years * 12)
 *
 * @param {number} principal The principal amount of the mortgage.
 * @param {number} annualInterestRate The annual interest rate (as a percentage, e.g., 6.5 for 6.5%).
 * @param {number} loanTermYears The loan term in years.
 * @returns {Promise<{monthlyPayment: number}>} A promise that resolves to an object containing the estimated monthly payment.
 */
export async function calculateMortgage(principal, annualInterestRate, loanTermYears) { // Removed types and interface
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
