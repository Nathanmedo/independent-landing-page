"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PHONE_NUMBER } from "@/lib/wix-api/constants";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
  subject: z.string().min(1, "Please select an option"),
  message: z.string().min(10, "Please enter your message"),
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
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();

      toast.success(data);

      form.reset();
    } catch {
      toast.error("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputStyle =
    "h-12  border border-white/10 rounded-none bg-white/[0.03] text-white placeholder:text-neutral-500 transition-all duration-300 focus:border-white/30 focus:bg-white/[0.05] focus-visible:ring-0";

  const textareaStyle =
    "min-h-[180px]  border border-white/10 rounded-none bg-white/[0.03] resize-none text-white placeholder:text-neutral-500 transition-all duration-300 focus:border-white/30 focus:bg-white/[0.05] focus-visible:ring-0";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">
                  Full Name
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="Mr Emeka"
                    className={inputStyle}
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
                <FormLabel className="text-neutral-300">
                  Email Address
                </FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="john@example.com"
                    className={inputStyle}
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
                <FormLabel className="text-neutral-300">
                  Phone Number
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="+234..."
                    className={inputStyle}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-300">
                  Inquiry Type
                </FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={inputStyle}>
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className=" border-white/10 bg-[#111] text-white">
                    <SelectItem value="sales">
                      Product Purchase
                    </SelectItem>

                    <SelectItem value="quotation">
                      Request a Quotation
                    </SelectItem>

                    <SelectItem value="support">
                      Product Support
                    </SelectItem>

                    <SelectItem value="partnership">
                      Partnership
                    </SelectItem>

                    <SelectItem value="general">
                      General Inquiry
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-300">
                Tell us about your project
              </FormLabel>

              <FormControl>
                <Textarea
                  {...field}
                  className={textareaStyle}
                  placeholder="Tell us what products you're looking for or how we can help..."
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="
            h-12
            w-full
            
            bg-white
            text-black
            text-base
            font-medium
            transition-all
            duration-300
            hover:bg-neutral-200
            hover:scale-[1.01]
            active:scale-[0.99]
          "
        >
          {isSubmitting ? "Sending..." : "Send Message →"}
        </Button>
      </form>
    </Form>
  );
}