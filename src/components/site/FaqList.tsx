import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

/** FAQ stack: the whole row is the control, the chevron is decoration. First item starts open. */
// Collapsed answers stay in the DOM (see forceMount below); `hidden` removes them from view and
// from the accessibility tree until opened.
export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <AccordionPrimitive.Root type="single" collapsible defaultValue="item-0" className="mx-auto mt-12 max-w-[800px] border-t border-hairline">
      {items.map((item, index) => (
        <AccordionPrimitive.Item key={item.q} value={`item-${index}`} className="border-b border-hairline">
          <AccordionPrimitive.Header asChild>
            <h3>
              <AccordionPrimitive.Trigger className="group flex w-full items-center gap-4 rounded-md px-1 py-5 text-left md:px-6 md:py-6">
                <span className="flex-1 text-h5 text-ink">{item.q}</span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-steel transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </h3>
          </AccordionPrimitive.Header>
          {/* forceMount keeps every answer in the HTML, so search and AI crawlers can read the
              collapsed ones; the closed state is hidden rather than removed. */}
          <AccordionPrimitive.Content forceMount className="overflow-hidden data-[state=closed]:hidden">
            <p className="px-1 pb-5 pr-10 text-body-sm text-slate md:px-6 md:pb-6 md:pr-16">{item.a}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
