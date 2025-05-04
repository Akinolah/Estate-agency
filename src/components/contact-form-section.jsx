
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2, Send, User, Mail, Phone, MessageCircle, Building, HelpCircle, Home } from 'lucide-react'; // Added Home import

const inquiryTypes = ["Buying a Property", "Selling a Property", "General Inquiry", "Feedback", "Other"];
const contactMethods = ["Email", "Phone"];

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
   phone: z.string().optional(),
  inquiryType: z.enum(inquiryTypes, {
        required_error: "Please select an inquiry type.",
     }),
  preferredContactMethod: z.enum(contactMethods, { // Removed explicit type casting
      required_error: "Please select a preferred contact method.",
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }).max(1000, { // Add a max length
    message: 'Message cannot exceed 1000 characters.',
  }),
});

// Removed FormData type alias

// Mock function to simulate form submission - logs data to console
// Sending email directly from the client-side is insecure and generally not feasible.
// You would typically send the data to a backend API or serverless function.
const submitContactForm = async (data) => { // Removed FormData type
  console.log("--- Contact Form Submission ---");
  console.log("Name:", data.name);
  console.log("Email:", data.email);
  console.log("Phone:", data.phone || 'Not Provided');
  console.log("Inquiry Type:", data.inquiryType);
  console.log("Preferred Contact:", data.preferredContactMethod);
  console.log("Subject:", data.subject);
  console.log("Message:", data.message);
  console.log("-----------------------------");
  console.log("INFO: To send email, integrate with a backend service (e.g., Node.js + Nodemailer, SendGrid API, Resend API via Server Action).");

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Assume success for demonstration purposes
  const success = true;

  if (success) {
    return { success: true, message: `Thank you, ${data.name}! Your message regarding '${data.inquiryType}' has been received. We'll contact you via ${data.preferredContactMethod} soon.` };
  } else {
    // This part is less likely to be reached in the mock scenario
    return { success: false, message: "Something went wrong while processing your message." };
  }
};


export function ContactFormSection() {
   const { toast } = useToast();
   const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({ // Removed FormData type
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      inquiryType: undefined, // Set initial undefined for Select placeholder
      preferredContactMethod: undefined, // Set initial undefined for RadioGroup
      subject: '',
      message: '',
    },
  });

 async function onSubmit(values) { // Removed FormData type
     setIsSubmitting(true);
    try {
        const result = await submitContactForm(values);

         if (result.success) {
           toast({
             title: "Message Received!", // Changed title
             description: result.message,
             duration: 5000, // Keep toast longer
           });
           form.reset(); // Reset form fields on success
         } else {
            toast({
             title: "Submission Failed",
             description: result.message,
             variant: "destructive",
           });
         }

    } catch (error) {
        console.error("Form submission error:", error);
         toast({
            title: "Error",
            description: "An unexpected error occurred during submission. Please try again.",
            variant: "destructive",
          });
    } finally {
        setIsSubmitting(false);
    }
  }


  return (
    // Container div without the section ID
    <div className="container py-12 md:py-16">
      <Card className="max-w-2xl mx-auto shadow-lg border border-border/60 rounded-xl overflow-hidden">
         <CardHeader className="bg-muted/50 p-6 border-b border-border/60">
            <div className="flex items-center gap-3">
                 <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                    <Mail className="w-6 h-6" />
                 </div>
                 <div>
                    <CardTitle className="text-2xl font-semibold">Get In Touch</CardTitle>
                     <CardDescription>Fill out the form below, and we'll get back to you promptly.</CardDescription>
                 </div>
            </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                         <FormControl>
                             <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="John Doe" {...field} className="pl-10" />
                             </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                       <FormItem>
                        <FormLabel>Email Address</FormLabel>
                         <FormControl>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="email" placeholder="you@example.com" {...field} className="pl-10" />
                            </div>
                         </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
               </div>

                 <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                       <FormItem>
                         <FormLabel>Phone Number <span className="text-muted-foreground text-xs">(Optional)</span></FormLabel>
                         <FormControl>
                             <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="tel" placeholder="+234 801 234 5678" {...field} className="pl-10" />
                             </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Contact</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select inquiry type..." />
                               </SelectTrigger>
                            </FormControl>
                             <SelectContent>
                                {inquiryTypes.map((type) => (
                                     <SelectItem key={type} value={type}>
                                        <span className="flex items-center">
                                            {type === "Buying a Property" && <Building className="mr-2 h-4 w-4 opacity-70" />}
                                             {type === "Selling a Property" && <Home className="mr-2 h-4 w-4 opacity-70" />}
                                             {type === "General Inquiry" && <HelpCircle className="mr-2 h-4 w-4 opacity-70" />}
                                             {type === "Feedback" && <MessageCircle className="mr-2 h-4 w-4 opacity-70" />}
                                             {type === "Other" && <HelpCircle className="mr-2 h-4 w-4 opacity-70" />}
                                             {type}
                                         </span>
                                    </SelectItem>
                                ))}
                             </SelectContent>
                          </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                   <FormField
                      control={form.control}
                      name="preferredContactMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Preferred Contact Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-4 pt-1" // Adjust spacing/layout
                            >
                               {contactMethods.map(method => (
                                <FormItem key={method} className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                     <RadioGroupItem value={method} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {method}
                                    </FormLabel>
                                </FormItem>
                               ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Regarding Property ID 123..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide details about your inquiry..."
                        className="min-h-[150px] resize-y"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription className="text-xs text-right">
                       {field.value?.length || 0} / 1000 characters
                     </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                 type="submit"
                 className="w-full py-3 text-base font-semibold transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]" // Enhanced button style
                 disabled={isSubmitting}
                >
                 {isSubmitting ? (
                    <>
                     <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                    </>
                 ) : (
                    <>
                     <Send className="mr-2 h-5 w-5" /> Send Your Message
                    </>
                 )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
