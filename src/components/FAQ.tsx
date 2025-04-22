import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How do I report a lost item?",
    answer: "You can report a lost item by logging into your account and filling out the form. Be sure to include a detailed description, location, date, and an optional photo to help others identify it.",
    value: "item-1",
  },
  {
    question: "What should I do if I find someone else’s item?",
    answer:
      "If you find a lost item, please report it through the section. Add as many details as possible, including where you found it and any identifying features. Your report could help reunite the item with its rightful owner.",
    value: "item-2",
  },
  {
    question:
      "Do I need to create an account to use the website?",
    answer:
      "Yes, you need to create an account to report or claim items. This helps ensure trust and allows users to track their submissions.",
    value: "item-3",
  },
  {
    question: "How do I know if someone has found my lost item?",
    answer: "You'll receive a notification if someone reports an item that matches your lost item description. You can also regularly check the Found Items section for updates.",
    value: "item-4",
  },
  {
    question:
      "Is my personal information safe on this website?",
    answer:
      "Absolutely. We take your privacy seriously. Your personal information is only used for account management and communication regarding lost and found items. It will never be shared publicly without your permission.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
