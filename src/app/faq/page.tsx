// src/app/faq/page.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "How do I start searching for properties?",
    answer: "You can start by using the search bar on the Listings page, applying filters for location, price, property type, bedrooms, and bathrooms. You can also explore properties visually using the interactive map.",
    value: "item-1",
  },
  {
    question: "What are AI recommendations?",
    answer: "Our AI analyzes your search history, saved properties, and stated preferences to suggest listings you might like but haven't discovered yet. You can generate these on the homepage or Services page.",
    value: "item-2",
  },
  {
    question: "How does the mortgage calculator work?",
    answer: "The mortgage calculator provides an estimate of your monthly principal and interest payment based on the loan amount, interest rate, and loan term you provide. It does not include taxes, insurance, or HOA fees.",
    value: "item-3",
  },
  {
    question: "Can I schedule a viewing through the website?",
    answer: "Currently, the best way to schedule a viewing is to use the contact form on the Contact page or the specific property listing page (if available) to connect with one of our agents who will assist you.",
    value: "item-4",
  },
   {
    question: "What services do you offer for sellers?",
    answer: "We offer comprehensive seller representation, including market analysis, property valuation, professional marketing (photos, virtual tours), listing management, showing coordination, negotiation, and closing assistance. Visit our Services page for more details.",
    value: "item-5",
  },
   {
    question: "Is my personal information safe?",
    answer: "Yes, we take data privacy seriously. Please review our Privacy Policy for detailed information on how we collect, use, and protect your data.",
    value: "item-6",
  },
];


export default function FaqPage() {
  return (
    <div className="container py-12 md:py-16 max-w-3xl mx-auto">
      <section id="faq-section" className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">
          Find answers to common questions about using EstateFindr and our services.
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
