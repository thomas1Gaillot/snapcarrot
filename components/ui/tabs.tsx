"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import {cn} from "@/lib/utils"
import {cva, VariantProps} from "class-variance-authority";

const tabsListVariants = cva(
    "inline-flex  items-center justify-center p-1 text-muted-foreground",
    {
        variants: {
            variant: {
                default: "h-16",
                mobile: "h-16",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const tabsTriggerVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap px-3 py-2  ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "text-sm font-medium  data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:text-foreground",
                mobile: "text-xs data-[state=active]:border-foreground data-[state=active]:text-primary",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const tabsContentVariants = cva(
    "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    {
        variants: {
            variant: {
                default: "",
                mobile: "",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export {tabsListVariants, tabsTriggerVariants, tabsContentVariants};


const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>
>(({className, variant, ...props}, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants({variant, className}))}
        {...props}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerVariants>
>(({className, variant, ...props}, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(tabsTriggerVariants({variant, className}))}
        {...props}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & VariantProps<typeof tabsContentVariants>
>(({className, variant, ...props}, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(tabsContentVariants({variant, className}))}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {Tabs, TabsList, TabsTrigger, TabsContent};


