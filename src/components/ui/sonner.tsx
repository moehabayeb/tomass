import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"
import { useEffect, useRef, useState } from "react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const [mounted, setMounted] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Ensure component only renders after mount (client-side)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fix Sonner a11y: <li role="status"> inside <ol> violates ARIA-in-HTML rules.
  // Strip role="status" from <li> — aria-live="polite" (also set by Sonner) still
  // ensures screen-reader announcements without breaking list semantics.
  useEffect(() => {
    if (!mounted || !wrapperRef.current) return
    const container = wrapperRef.current

    const fix = () => {
      container.querySelectorAll("li[data-sonner-toast][role='status']").forEach(li => {
        li.removeAttribute("role")
      })
    }

    fix()
    const observer = new MutationObserver(fix)
    observer.observe(container, { childList: true, subtree: true, attributes: true })
    return () => observer.disconnect()
  }, [mounted])

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
    <div ref={wrapperRef}>
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
    </div>
  )
}

export { Toaster, toast }
