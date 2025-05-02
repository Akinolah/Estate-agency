'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { calculateMortgage } from '@/services/mortgage-calculator'; // Keep service if needed, but calculation is complex now
import { useToast } from '@/hooks/use-toast';
import { Loader2, Calculator, Percent, CalendarDays, Landmark, Home, ShieldCheck, Users } from 'lucide-react'; // Added Home import
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define Zod schema with more fields
const formSchema = z.object({
  homePrice: z.coerce.number().min(10000, "Home price must be at least $10,000").max(50000000, "Home price seems too high"),
  downPayment: z.coerce.number().min(0, "Down payment cannot be negative"),
  loanTermYears: z.coerce.number().min(1, "Loan term must be at least 1 year").max(50, "Loan term cannot exceed 50 years"),
  interestRate: z.coerce.number().min(0.1, "Interest rate must be positive").max(25, "Interest rate seems too high"),
  propertyTax: z.coerce.number().min(0, "Property tax cannot be negative").max(100000, "Annual property tax seems high").optional().default(0), // Annual tax
  homeInsurance: z.coerce.number().min(0, "Home insurance cannot be negative").max(50000, "Annual home insurance seems high").optional().default(0), // Annual insurance
  hoaDues: z.coerce.number().min(0, "HOA dues cannot be negative").max(10000, "Monthly HOA dues seem high").optional().default(0), // Monthly HOA
}).refine(data => data.downPayment < data.homePrice, {
    message: "Down payment must be less than the home price.",
    path: ["downPayment"], // Attach error to downPayment field
});

type FormData = z.infer<typeof formSchema>;

interface AmortizationEntry {
  month: number;
  principalPayment: number;
  interestPayment: number;
  totalPayment: number; // P+I only for amortization table
  remainingBalance: number;
}

export function MortgageCalculatorSection() {
  const [monthlyPITI, setMonthlyPITI] = useState<number | null>(null); // Principal, Interest, Taxes, Insurance (+HOA)
  const [monthlyPrincipalInterest, setMonthlyPrincipalInterest] = useState<number | null>(null);
  const [totalInterestPaid, setTotalInterestPaid] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homePrice: 350000,
      downPayment: 70000, // 20% example
      loanTermYears: 30,
      interestRate: 6.5,
      propertyTax: 4200, // Example annual tax ($350/month)
      homeInsurance: 1200, // Example annual insurance ($100/month)
      hoaDues: 50, // Example monthly HOA
    },
  });

  function calculateAmortization(principal: number, monthlyInterestRate: number, numberOfPayments: number, monthlyPI: number): AmortizationEntry[] {
    const schedule: AmortizationEntry[] = [];
    let remainingBalance = principal;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      let principalPayment = monthlyPI - interestPayment;

      // Ensure principal payment doesn't exceed remaining balance on the last payment
      if (month === numberOfPayments) {
         principalPayment = remainingBalance;
         monthlyPI = principalPayment + interestPayment; // Adjust final total P+I payment
      }

      remainingBalance -= principalPayment;

      // Prevent negative balance due to floating point issues
      if (remainingBalance < 0) {
         principalPayment += remainingBalance; // Add the negative remainder back to principal
          remainingBalance = 0;
      }


      schedule.push({
        month,
        principalPayment,
        interestPayment,
        totalPayment: monthlyPI, // P+I for the schedule table
        remainingBalance,
      });
    }
    return schedule;
  }

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setMonthlyPITI(null);
    setMonthlyPrincipalInterest(null);
    setTotalInterestPaid(null);
    setTotalPayment(null);
    setAmortizationSchedule([]);

    try {
       const principal = values.homePrice - values.downPayment;
      if (principal <= 0) {
        toast({ title: "Loan Amount Error", description: "Home price must be greater than down payment.", variant: "destructive" });
        setIsLoading(false);
        return;
      }

       const monthlyInterestRate = (values.interestRate / 100) / 12;
       const numberOfPayments = values.loanTermYears * 12;

       // Calculate Principal & Interest (P&I)
       let monthlyPI = 0;
      if (monthlyInterestRate > 0) {
           const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
           monthlyPI = principal * (monthlyInterestRate * factor) / (factor - 1);
       } else if (principal > 0 && numberOfPayments > 0) {
           monthlyPI = principal / numberOfPayments; // 0% interest
       }

       const monthlyTax = (values.propertyTax || 0) / 12;
       const monthlyInsurance = (values.homeInsurance || 0) / 12;
       const monthlyHOA = values.hoaDues || 0;

       const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyInsurance + monthlyHOA;
       const calculatedAmortization = calculateAmortization(principal, monthlyInterestRate, numberOfPayments, monthlyPI);
       const calculatedTotalInterest = calculatedAmortization.reduce((sum, entry) => sum + entry.interestPayment, 0);
       const calculatedTotalPayment = principal + calculatedTotalInterest; // Total P+I over life of loan

       setMonthlyPrincipalInterest(monthlyPI);
       setMonthlyPITI(totalMonthlyPayment);
       setTotalInterestPaid(calculatedTotalInterest);
       setTotalPayment(calculatedTotalPayment);
       setAmortizationSchedule(calculatedAmortization);

    } catch (error) {
        console.error('Mortgage calculation error:', error);
        toast({
            title: "Calculation Error",
            description: "Could not calculate mortgage details. Please check inputs.",
            variant: "destructive",
          });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    // Container div without the section ID
    <div className="container py-12 md:py-16">
       <Card className="max-w-4xl mx-auto shadow-lg border border-border/60 rounded-xl overflow-hidden">
         <CardHeader className="bg-muted/50 p-6 border-b border-border/60">
             <div className="flex items-center gap-4">
                 <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                     <Calculator className="w-7 h-7" />
                 </div>
                 <div>
                     <CardTitle className="text-2xl md:text-3xl font-bold">Advanced Mortgage Calculator</CardTitle>
                     <CardDescription>Estimate your complete monthly payment and see the breakdown.</CardDescription>
                 </div>
            </div>
         </CardHeader>
        <CardContent className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Input Form Column */}
           <div>
             <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Row 1: Home Price & Down Payment */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="homePrice" render={({ field }) => (
                             <FormItem>
                                 <FormLabel>Home Price ($)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                         <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                         <Input type="number" placeholder="e.g., 350000" {...field} className="pl-10" />
                                     </div>
                                 </FormControl>
                                <FormMessage />
                             </FormItem>
                         )} />
                         <FormField control={form.control} name="downPayment" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Down Payment ($)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                         <Landmark className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                         <Input type="number" placeholder="e.g., 70000" {...field} className="pl-10" />
                                     </div>
                                 </FormControl>
                                 <FormMessage />
                             </FormItem>
                         )} />
                     </div>

                    {/* Row 2: Term & Rate */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="loanTermYears" render={({ field }) => (
                             <FormItem>
                                 <FormLabel>Loan Term (Years)</FormLabel>
                                 <FormControl>
                                     <div className="relative">
                                         <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                         <Input type="number" placeholder="e.g., 30" {...field} className="pl-10" />
                                     </div>
                                 </FormControl>
                                 <FormMessage />
                             </FormItem>
                         )} />
                         <FormField control={form.control} name="interestRate" render={({ field }) => (
                             <FormItem>
                                 <FormLabel>Annual Interest Rate (%)</FormLabel>
                                <FormControl>
                                     <div className="relative">
                                         <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                         <Input type="number" step="0.01" placeholder="e.g., 6.5" {...field} className="pl-10" />
                                     </div>
                                 </FormControl>
                                 <FormMessage />
                             </FormItem>
                         )} />
                     </div>

                    {/* Row 3: Taxes, Insurance, HOA */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <FormField control={form.control} name="propertyTax" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Property Tax ($/yr)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                         {/* Use Landmark icon here instead of Home */}
                                         <Landmark className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                                         <Input type="number" placeholder="e.g., 4200" {...field} className="pl-10" />
                                     </div>
                                 </FormControl>
                                 <FormMessage />
                             </FormItem>
                         )} />
                         <FormField control={form.control} name="homeInsurance" render={({ field }) => (
                             <FormItem>
                                 <FormLabel>Insurance ($/yr)</FormLabel>
                                <FormControl>
                                     <div className="relative">
                                         <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                                         <Input type="number" placeholder="e.g., 1200" {...field} className="pl-10" />
                                     </div>
                                 </FormControl>
                                 <FormMessage />
                             </FormItem>
                         )} />
                          <FormField control={form.control} name="hoaDues" render={({ field }) => (
                             <FormItem>
                                 <FormLabel>HOA Dues ($/mo)</FormLabel>
                                <FormControl>
                                     <div className="relative">
                                         <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                                         <Input type="number" placeholder="e.g., 50" {...field} className="pl-10" />
                                     </div>
                                 </FormControl>
                                 <FormMessage />
                             </FormItem>
                         )} />
                     </div>


                   <Button type="submit" className="w-full py-3 text-lg font-semibold" disabled={isLoading}>
                     {isLoading ? (
                        <>
                         <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Calculating...
                        </>
                     ) : (
                         <>
                          <Calculator className="mr-2 h-5 w-5" /> Calculate Payment
                         </>
                     )}
                   </Button>
                 </form>
             </Form>
           </div>

            {/* Results & Amortization Column */}
            <div className="space-y-6">
                <Card className="bg-background shadow-inner">
                    <CardHeader>
                        <CardTitle className="text-xl">Payment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {monthlyPITI !== null ? (
                            <>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-muted-foreground">Total Monthly Payment (PITI + HOA):</span>
                                    <span className="text-2xl font-bold text-primary">
                                         ${monthlyPITI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className="text-sm text-muted-foreground space-y-1 pl-4 border-l-2 border-primary/50 ml-1">
                                     <p>Principal & Interest: ${monthlyPrincipalInterest?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                     <p>Property Tax: ${((form.getValues().propertyTax || 0) / 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                     <p>Home Insurance: ${((form.getValues().homeInsurance || 0) / 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                     <p>HOA Dues: ${(form.getValues().hoaDues || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                                <div className="flex justify-between items-baseline pt-2 border-t">
                                     <span className="text-muted-foreground">Total Interest Paid:</span>
                                     <span className="font-semibold">${totalInterestPaid?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                     <span className="text-muted-foreground">Total Loan Payment (P+I):</span>
                                    <span className="font-semibold">${totalPayment?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                 </div>
                            </>
                         ) : (
                             <p className="text-muted-foreground text-center">Enter details and click Calculate to see your estimated payment.</p>
                         )}
                    </CardContent>
                </Card>

                {amortizationSchedule.length > 0 && (
                  <Tabs defaultValue="schedule" className="w-full">
                    <TabsList className="grid w-full grid-cols-1"> {/* Only one tab for now */}
                      <TabsTrigger value="schedule">Amortization Schedule</TabsTrigger>
                      {/* Add other tabs like 'Payment Breakdown Chart' later */}
                    </TabsList>
                    <TabsContent value="schedule">
                         <Card>
                            <CardHeader>
                                <CardTitle>Amortization Details</CardTitle>
                                <CardDescription>Monthly breakdown of principal and interest payments.</CardDescription>
                             </CardHeader>
                            <CardContent>
                                 <ScrollArea className="h-[300px] w-full"> {/* Make schedule scrollable */}
                                     <Table>
                                         <TableHeader className="sticky top-0 bg-muted">
                                             <TableRow>
                                                 <TableHead className="w-[60px]">Month</TableHead>
                                                 <TableHead className="text-right">Principal</TableHead>
                                                 <TableHead className="text-right">Interest</TableHead>
                                                <TableHead className="text-right">P+I Payment</TableHead>
                                                <TableHead className="text-right">Balance</TableHead>
                                             </TableRow>
                                         </TableHeader>
                                         <TableBody>
                                             {amortizationSchedule.map((entry) => (
                                                <TableRow key={entry.month}>
                                                     <TableCell>{entry.month}</TableCell>
                                                     <TableCell className="text-right">${entry.principalPayment.toFixed(2)}</TableCell>
                                                     <TableCell className="text-right">${entry.interestPayment.toFixed(2)}</TableCell>
                                                     <TableCell className="text-right">${entry.totalPayment.toFixed(2)}</TableCell>
                                                    <TableCell className="text-right">${entry.remainingBalance.toFixed(2)}</TableCell>
                                                </TableRow>
                                             ))}
                                         </TableBody>
                                    </Table>
                                 </ScrollArea>
                             </CardContent>
                        </Card>
                     </TabsContent>
                  </Tabs>
                 )}
            </div>
        </CardContent>
         <CardFooter className="p-4 bg-muted/30 border-t border-border/60">
            <p className="text-xs text-muted-foreground text-center w-full">
                 Disclaimer: This calculator provides estimates for informational purposes only and does not constitute financial advice. Actual payments may vary. Consult with a financial professional.
             </p>
         </CardFooter>
      </Card>
    </div>
  );
}
