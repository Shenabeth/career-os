import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-right"
      expand={true}
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        style: {
          background: "white",
          color: "hsl(222.2 84% 4.9%)",
          border: "1px solid hsl(214.3 31.8% 91.4%)",
        },
        className: "toast",
      }}
      {...props}
    />
  );
};

export { Toaster };
