import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * IdEinstein Standardized Button System
 * 
 * === USAGE GUIDELINES ===
 * 
 * FOR LIGHT BACKGROUNDS (white, light gray):
 * - primary: Main CTA buttons (blue background)
 * - secondary: Secondary actions (blue outline)
 * - accelerator: Startup services (gold gradient)
 * - accelerator-outline: Startup services outline (gold outline)
 * 
 * FOR DARK BACKGROUNDS (blue gradients, dark sections):
 * - primary-light: Main CTA buttons (white background, blue text)
 * - secondary-light: Secondary actions (white outline)
 * - accelerator: Startup services (gold gradient - works on any background)
 * 
 * FOR NAVIGATION/HEADER:
 * - header: Navigation buttons (white background, blue text)
 * 
 * FOR UTILITY ACTIONS:
 * - ghost: Subtle actions
 * - link: Text links
 * - destructive: Delete/remove actions
 * - success: Confirm/save actions
 * 
 * === COLOR SCHEME ===
 * - Primary: Blue (#1E40AF / blue-600)
 * - Accelerator: Gold gradient (yellow-500 to orange-500)
 * - Text: High contrast for accessibility
 * - Shadows: Enhanced for depth and premium feel
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // === PRIMARY BUTTONS (IdEinstein Brand Blue #1E40AF) ===
        // For light backgrounds - main CTA buttons
        primary: "bg-[#1E40AF] text-white hover:bg-[#1E3A8A] active:bg-[#1E3A8A] shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300",
        
        // For dark backgrounds - white button with brand blue text
        "primary-light": "bg-white text-[#1E40AF] hover:bg-blue-50 hover:text-[#1E3A8A] active:bg-blue-100 shadow-xl hover:shadow-2xl border-2 border-white/20 backdrop-blur-sm",
        
        // === SECONDARY BUTTONS (Outline Style) ===
        // For light backgrounds - brand blue outline
        secondary: "bg-transparent text-[#1E40AF] border-2 border-[#1E40AF] hover:bg-[#1E40AF] hover:text-white active:bg-[#1E3A8A] shadow-md hover:shadow-lg",
        
        // For dark backgrounds - white outline  
        "secondary-light": "bg-transparent text-white border-2 border-white/60 hover:bg-white hover:text-gray-900 active:bg-gray-100 active:text-gray-900 shadow-lg hover:shadow-xl backdrop-blur-sm",
        
        // === STARTUP ACCELERATOR (Einstein Gold #F59E0B) ===
        // Special gold button for startup services - using exact brand gold
        accelerator: "bg-[#F59E0B] text-white hover:bg-[#D97706] active:bg-[#B45309] shadow-xl hover:shadow-2xl hover:shadow-[#F59E0B]/25 transform hover:scale-[1.02] font-bold",
        
        // Gold outline version with brand gold
        "accelerator-outline": "bg-transparent text-[#F59E0B] border-2 border-[#F59E0B] hover:bg-[#F59E0B] hover:text-white active:bg-[#D97706] shadow-lg hover:shadow-xl hover:shadow-[#F59E0B]/25",
        
        // === UTILITY BUTTONS ===
        // Subtle actions - using brand blue
        ghost: "text-[#1E40AF] hover:bg-blue-50 hover:text-[#1E3A8A] active:bg-blue-100",
        
        // Links - using brand blue
        link: "text-[#1E40AF] underline-offset-4 hover:underline hover:text-[#1E3A8A]",
        
        // Destructive actions
        destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg",
        
        // Success actions
        success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-md hover:shadow-lg",
        
        // Header specific (for navigation) - using brand blue
        header: "bg-white text-[#1E40AF] hover:bg-blue-50 hover:text-[#1E3A8A] active:bg-[#1E40AF] active:text-white shadow-md hover:shadow-lg font-medium rounded-lg",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-base",
        xl: "h-12 px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
