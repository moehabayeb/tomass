import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

function toast({ title, description, variant }: ToastProps) {
  const id = variant === "destructive"
    ? sonnerToast.error(title, { description })
    : sonnerToast(title, { description })

  return {
    id: String(id),
    dismiss: () => sonnerToast.dismiss(id),
    update: (props: ToastProps) => {
      sonnerToast.dismiss(id)
      toast(props)
    },
  }
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId)
      } else {
        sonnerToast.dismiss()
      }
    },
  }
}

export { useToast, toast }
