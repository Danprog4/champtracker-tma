import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("bg-yellow-400", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between rounded-3xl bg-black p-2 py-4 text-left text-sm font-medium text-white transition-all",
        "[&[data-state=open]>svg]:rotate-180", // Ротация стрелки при открытии
        "[&[data-state=open]]:rounded-b-none", // Убираем скругление снизу при открытии
        "[&[data-state=open]]:bg-white", // Смена фона на белый при открытии
        "[&[data-state=open]]:text-black",
        "transition-colors duration-300", // Смена цвета текста на черный при открытии
        className
      )}
      {...props}>
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 dark:text-neutral-400" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm text-black transition-opacity duration-300 data-[state=closed]:opacity-0 data-[state=open]:opacity-100"
    {...props}>
    <div className={cn("rounded-b-3xl bg-white p-2 pb-4 pt-0", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
