"use client";
import RichTextEditor from "@/components/RichTextEditor";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

function extractTextFromHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  post: z
    .string()
    .refine((value) => extractTextFromHTML(value).trim().length >= 5, {
      message: "The text must be at least 5 characters long",
    }),
});

export default function Home() {
  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      post: "",
    },
  });

  // Submit function
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        alert("Post saved successfully!");
        form.reset(); // Clear form after successful submission
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Title Input Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    className="border rounded p-2 w-full"
                    placeholder="Enter post title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Post Content Field */}
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
