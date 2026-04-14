import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
  subject: z.string().min(1, "Please select an option"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        toast.error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data)
      toast.success(data);
      form.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const selectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Support" },
    { value: "sales", label: "Sales" },
    { value: "partnership", label: "Partnership" },
    { value: "other", label: "Other" },
  ];

  const fieldRef = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const elements = fieldRef.current.filter((el) => el !== null);
    if (elements.length === 0) return;

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15, // 150ms delay between each item
        ease: "power3.out",
        scrollTrigger: {
          trigger: elements[0], // Trigger when first element comes into view
          start: "top 80%", // Start when element is 80% down viewport
          end: "bottom 20%",
          toggleActions: "play none none reverse", // play on enter, reverse on leave
          // markers: true, // Uncomment to see trigger points during development
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);
  return (
    <div className="w-full mx-auto lg:px-12 px-4 py-16 bg-primary text-primary-foreground">
      <div className="mb-8">
        <div className="max-w-3xs">
          <h1 className="text-5xl font-bold mb-2 tracking-tight italic instrument">
            Contact Us
          </h1>
          <motion.div
            className="origin-left h-[4px] bg-primary-foreground w-full"
            initial={{ scaleX: 0 }}
            viewport={{ amount: 0.2 }}
            whileInView={{ scaleX: 1 }}
          ></motion.div>
        </div>
        <p className="text-lg text-primary-foreground/80">
          Fill out the form below, and a member of our team will get back to you
          as soon as possible
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      ref={(el) => {
                        fieldRef.current[0] = el;
                      }}
                      className="h-14 text-base placeholder:text-primary-foreground/70 border-primary-foreground border-l-2 border-t-2 border-r-8 border-b-8"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      {...field}
                      ref={(el) => {
                        fieldRef.current[1] = el;
                      }}
                      className="h-14 text-base placeholder:text-primary-foreground/70 border-primary-foreground border-l-2 border-t-2 border-r-8 border-b-8"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      {...field}
                      ref={(el) => {
                        fieldRef.current[2] = el;
                      }}
                      className="h-14 text-base placeholder:text-primary-foreground/70 border-primary-foreground border-l-2 border-t-2 border-r-8 border-b-8"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl
                    ref={(el) => {
                      fieldRef.current[3] = el;
                    }}
                  >
                    <SelectTrigger className="h-14 text-primary-foreground  placeholder:text-primary-foreground/70 border-primary-foreground border-l-2 border-t-2 border-r-8 border-b-8">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectOptions.map((option, index) => (
                      <SelectItem
                        key={index}
                        value={option.value}
                        className="hover:border-primary hover:border-l-2 hover:border-t-2 hover:border-r-8 hover:border-b-8 border-l-0 border-t-0 border-r-0 border-b-0 transition duration-150"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl
                  ref={(el) => {
                    fieldRef.current[4] = el as HTMLElement | null;
                  }}
                >
                  <Textarea
                    placeholder="Type a message..."
                    className="min-h-[200px] text-base resize-none placeholder:text-primary-foreground/70 border-primary-foreground border-l-2 border-t-2 border-r-8 border-b-8"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-16 h-14 text-lg font-medium hover:bg-primary-foreground/60  placeholder:text-primary-foreground/70 border-primary-foreground border-l-2 border-t-2 border-r-8 border-b-8"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
