"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    width: z.coerce.number(),
    height: z.coerce.number(),
  })

  interface Foo {sheetWidth: number , sheetHeight: number} ;

export default function page() {
  const route = useRouter()
    const [sheet, setsheet] = useState({})
    // const [sheet, setsheet] = useState({})
    const [cuts, setcuts] = useState<Foo[]>([]);
    // console.log(cuts)


    // useEffect(() => {
    // try {
    //     const dt = localStorage.getItem("favoriteNumber") 
    //     // console.log(JSON.parse(dt))
    //     setsheet(JSON.parse(dt))
    // } catch (error) {
    //     console.log(error)
    // }
    // }, [])



    
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
   
    setcuts([...cuts , values ])
    
  }


  const calculate = ()=>{
    // console.log(cuts)
    localStorage.setItem("favoriteNumber2", JSON.stringify(cuts))
    route.push('/result')

    
  }
    
  return (
    <div className="">
      {
        cuts.length > 0 ? <ul className='list-none'>
          {
            cuts.map(e => <li >
                {e.width} & {e.height}
            </li>)
          }
        </ul>:""
      }
        <Form  {...form}>
    <form className="px-4" onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem>
              <FormLabel>cut width</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>cut height</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">add</Button>
    </form>
  </Form>
  <Button onClick={()=> calculate()} >calculate</Button>
    </div>
  )
  
}
