
// src/app/faq/page.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "How do I start searching for properties in Nigeria?",
    answer: "You can start by using the search bar on the Listings page, applying filters for state, city, price, property type, bedrooms, and bathrooms. You can also explore properties visually using the interactive map.",
    value: "item-1",
  },
   {
    question: "What currencies are supported?",
    answer: "Property prices can be viewed in US Dollars (USD), Nigerian Naira (NGN), and British Pounds (GBP). Use the currency switcher in the header to change your preference. Please note that displayed exchange rates are placeholders and may not reflect real-time market rates.",
    value: "item-7", // New value
  },
  {
    question: "How does the mortgage calculator work?",
    answer: "The mortgage calculator provides an estimate of your monthly payment based on the property price, down payment, interest rate, and loan term you provide. It can also factor in estimated property taxes and insurance. Remember, this is an estimate and not a formal loan offer.",
    value: "item-3",
  },
  {
    question: "Can I schedule a viewing through the website?",
    answer: "Yes, the best way to schedule a viewing is to use the contact form on the Contact page or the specific property listing page. You can also call or WhatsApp us using the details provided. Our agents will assist you.",
    value: "item-4",
  },
   {
    question: "What services do you offer for sellers?",
    answer: "We offer comprehensive seller representation, including market analysis, property valuation, professional marketing (photos, virtual tours), listing management across various platforms, viewing coordination, negotiation, and closing assistance within the Nigerian context.",
    value: "item-5",
  },
   {
    question: "Is my personal information safe?",
    answer: "Yes, we take data privacy seriously and comply with relevant data protection regulations. Please review our Privacy Policy for detailed information on how we collect, use, and protect your data.",
    value: "item-6",
  },
    {
    question: "Do you operate outside Lagos and Abuja?",
    answer: "While our primary focus is currently on Lagos and Abuja, we have networks and listings in other major Nigerian cities. Please use the search filters or contact us directly for inquiries about properties in other locations.",
    value: "item-8", // New value
  },
];


export default function FaqPage() {
  return (
    <div className="container py-12 md:py-16 max-w-3xl mx-auto">
      <section id="faq-section" className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">
          Find answers to common questions about using Estate Agency and our services in Nigeria.
        </p>
      </section>

      <section>
         <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                    {item.answer}
                 </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </section>

      <section className="mt-16 text-center">
         <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
         <p className="text-muted-foreground">
            Feel free to <a href="/contact" className="text-primary underline hover:no-underline">contact us</a> directly. Our team is happy to help!
         </p>
      </section>
    </div>
  );
}

