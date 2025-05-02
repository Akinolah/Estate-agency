'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { calculateMortgage } from '@/services/mortgage-calculator'; // Assuming service exists
import { useToast } from '@/hooks/use-toast';
import { Loader2, Calculator } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';


const formSchema = z.object({
  principal: z.coerce.number().min(1000, "Principal must be at least $1,000").max(10000000, "Principal cannot exceed $10,000,000"),
  interestRate: z.coerce.number().min(0.1, "Interest rate must be positive").max(25, "Interest rate seems too high"),
  loanTermYears: z.coerce.number().min(1, "Loan term must be at least 1 year").max(50, "Loan term cannot exceed 50 years"),
});

type FormData = z.infer<typeof formSchema>;

export function MortgageCalculatorSection() {
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
   const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      principal: 250000,
      interestRate: 6.5,
      loanTermYears: 30,
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setMonthlyPayment(null); // Clear previous result

    try {
      // Convert annual rate percentage to decimal monthly rate
      const monthlyInterestRate = (values.interestRate / 100) / 12;
      const numberOfPayments = values.loanTermYears * 12;
      const principal = values.principal;

        // Basic Mortgage Calculation Formula (M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1])
        let payment = 0;
        if (monthlyInterestRate > 0) {
           payment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        } else if (principal > 0 && numberOfPayments > 0) {
            // Handle 0% interest rate case
             payment = principal / numberOfPayments;
        } else {
             payment = 0; // Handle edge cases like 0 principal or 0 term
        }


      // Simulate API call if needed, otherwise use direct calculation
      // const result = await calculateMortgage(values.principal, values.interestRate / 100, values.loanTermYears);
      // setMonthlyPayment(result.monthlyPayment);

      setMonthlyPayment(payment);

    } catch (error) {
        console.error('Mortgage calculation error:', error);
        toast({
            title: "Calculation Error",
            description: "Could not calculate mortgage payment. Please check inputs or try again.",
            variant: "destructive",
          });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    // Container div without the section ID
    <div className="container py-12 md:py-16">
       <Card className="max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold">Mortgage Calculator</CardTitle>
          <CardDescription>Estimate your monthly mortgage payment.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                   <FormField
                    control={form.control}
                    name="principal"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="principal">Loan Amount ($)</Label>
                        <FormControl>
                         <Input id="principal" type="number" placeholder="e.g., 250000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                         <FormControl>
                         <Input id="interestRate" type="number" step="0.01" placeholder="e.g., 6.5" {...field} />
                         </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loanTermYears"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="loanTermYears">Loan Term (Years)</Label>
                         <FormControl>
                         <Input id="loanTermYears" type="number" placeholder="e.g., 30" {...field} />
                         </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <Button type="submit" className="w-full" disabled={isLoading}>
                     {isLoading ? (
                        <>
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...
                        </>
                     ) : (
                         <>
                          <Calculator className="mr-2 h-4 w-4" /> Calculate Payment
                         </>
                     )}
                  </Button>
                </form>
            </Form>
        </CardContent>
         {monthlyPayment !== null && (
            <CardFooter className="flex flex-col items-center pt-4 border-t mt-4">
                 <p className="text-lg font-medium">Estimated Monthly Payment:</p>
                 <p className="text-3xl font-bold text-primary mt-1">
                    ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                 <p className="text-xs text-muted-foreground mt-2">(Principal & Interest only. Does not include taxes, insurance, or HOA fees.)</p>
            </CardFooter>
         )}
      </Card>
    </div>
  );
}
