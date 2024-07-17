import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"
import {LoaderCircleIcon} from "lucide-react";

const buttonVariants = cva(
    "transition-transform duration-300 transform hover:scale-105 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            loading: {
                true: "cursor-not-allowed",
            },
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-12 rounded-md px-8",
                icon: "h-9 w-9",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },

    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const LoadingButton = ({children, ...props}: ButtonProps) => {
    return (
        <Button {...props} disabled>
            Chargement
            <LoaderCircleIcon className="animate-spin size-4 ml-2"/>
        </Button>
    )
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, loading, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button"
        if (loading) return <LoadingButton {...props} asChild={asChild}
                                           className={cn(buttonVariants({variant, size, className}))}/>
        return (
            <Comp
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export {Button, buttonVariants}
