import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"
import { useEffect, useState } from "react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const [mounted, setMounted] = useState(false)

  // Ensure component only renders after mount (client-side)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Try to get theme, with fallback
  let theme: ToasterProps["theme"] = "system"

  try {
    const themeData = useTheme()
    theme = (themeData?.theme as ToasterProps["theme"]) || "system"
  } catch (error) {
    // Silently fallback to system theme if context not available
    // This handles React.StrictMode double-rendering and HMR edge cases
  }

  // Don't render until mounted to avoid SSR/hydration issues
  if (!mounted) {
    return null
  }

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
