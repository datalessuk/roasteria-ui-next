"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { FlavorFilter } from "./searchitems/Flavour";
import { ProcessingFilter } from "./searchitems/ProcessingMethod";
import { FormSchema, FormData } from "@/types/form";
import { RoastFilter } from "./searchitems/Roast";
import { SingleOriginFilter } from "./searchitems/SingleOrigin";

export default function SearchComponent() {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      flavour: [],
      processing: "",
      name: "",
      roast: "",
      origin: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const query = new URLSearchParams();

    if (data.name) {
      query.set("name", data.name);
    }
    if (data.processing) {
      query.set("proccessing", data.processing);
    }
    if (data.roast) {
      query.set("roast", data.roast);
    }
    if (data.origin) {
      query.set("origin", data.origin.toString());
    }

    (data.flavour || []).forEach((flavor) => query.append("flavour", flavor));

    const searchUrl = `/search?${query.toString()}`;
    router.push(searchUrl);
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="mb-1 text-lg font-semibold">Coffee Search</h1>
      <h2 className="text-xs mb-4">Filter coffees by various criteria</h2>

      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search</FormLabel>
                  <FormControl>
                    <Input placeholder="Search Coffee..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FlavorFilter
              control={form.control}
              selectedFlavors={form.watch("flavour")}
            />
            <ProcessingFilter
              control={form.control}
              method={form.watch("processing")}
            />
            <RoastFilter control={form.control} roast={form.watch("roast")} />
            <SingleOriginFilter
              control={form.control}
              origin={form.watch("origin")}
            />

            <div className="flex justify-center pt-4 gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  form.reset();
                }}
              >
                Reset
              </Button>
              <Button
                variant="custom"
                type="submit"
                onClick={() => console.log("🔍 SEARCH BUTTON CLICKED")}
              >
                Search
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
