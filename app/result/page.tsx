
"use client"
import React, { useEffect, useState } from 'react'
import { optimizeGlassCutting } from '../one'
import { Button } from '@/components/ui/button';


interface Cut {
    width: number;
    height: number;
    x?: number;
    y?: number;
}

export default function page() {
    const [data, setdata] = useState([])
    useEffect(() => {
        const dt = localStorage.getItem("favoriteNumber") 
        const dtparse = JSON.parse(dt)
        const dt2 = localStorage.getItem("favoriteNumber2")
        const dtparse2: Cut[] = JSON.parse(dt2)
        // console.log(dtparse2)
        const cuts : Cut[] = JSON.parse(dt2)
        if (dt && cuts) {
            const optimizedCuts = optimizeGlassCutting(dtparse.sheetWidth, dtparse.sheetHeight, cuts);
            setdata(optimizedCuts)
        }
        // console.log(optimizedCuts)
        
        
    
    }, [])


    const clearlocalStorage = ()=>{
        localStorage.removeItem('favoriteNumber');
        localStorage.removeItem('favoriteNumber2');
        setdata([])

    }
    
  return (
    <div className='px-4'>
        {
            data.length > 0 && data.map((cut, index) => <p className=''>
                {`${index + 1 }. ${cut.width} * ${cut.height}, ${cut.y} , ${cut.x}`}
            </p>)
        }

        <Button onClick={()=>clearlocalStorage()}>clear</Button>
    </div>
  )
}
