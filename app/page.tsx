"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod"
 
const formSchema = z.object({
  sheetWidth: z.coerce.number(),
  sheetHeight: z.coerce.number(),
})

export default function Home() {

  const route = useRouter()
  const [sheet, setsheet] = useState({})
  console.log(Object.keys(sheet).length)

  
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setsheet(values)
    localStorage.setItem("favoriteNumber", JSON.stringify(values))
    route.push('/cutes')

  }

  return (
  <>
  
  
  <h3 className="text-3xl text-center">
    vioo opt
  </h3>
  <Form  {...form}>
    <form className="px-4" onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
          control={form.control}
          name="sheetWidth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>sheet width</FormLabel>
              <FormControl>
                <Input type="number" placeholder="shadcn" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="sheetHeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>sheet height</FormLabel>
              <FormControl>
                <Input type="number" placeholder="shadcn" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
    </form>
  </Form>
  </>
  );
}
