"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface Props {
  total?: number
  progress?: number
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & Props
>(({ className, value, total, progress = 0, ...props }, ref) => {
  let valRef = 0

  if (value != void 0) {
    valRef = value
  } else if (total != void 0 && progress > 0) {
    valRef = progress / (total / 100)
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (valRef || 0)}%)` }}
      />
      <p className="absolute top-0 text-center text-[12px] w-full h-full
        text-white mix-blend-difference">
        {total ? `${progress} / ${total}` : valRef + "%"}
      </p>
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
