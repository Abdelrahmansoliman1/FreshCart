"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CartContext } from '@/context/CartContext';
import React, { FormEvent, useContext, useState } from 'react'
import { cashPayment, onlinePayment } from '@/lib/servcies/payment.service';
import { useRouter } from 'next/router';
export default function Payment() {
    
    const [paymentMethod, setPaymentMethod] = useState<"cash"| "online">("cash");
    const {cartId ,setNumOfCartItems,setCartItems,setTotalPrice,setCartId} = useContext(CartContext)
    const [form , setForm]= useState({
       details: "",
        phone: "",
        city: ""
    })

  //  const router = useRouter()

    async function handleSubmit(e:FormEvent){
        e.preventDefault();
        console.log(form);
        
        if(paymentMethod === "cash"){
        const response = await cashPayment(cartId, form);
         if (response.status === "success") {
           setNumOfCartItems(0);
        setCartItems([]);
        setTotalPrice(0);
        setCartId(null);
       // router.push("/")
         }
        } else{
          const response = await onlinePayment(cartId, form);
          console.log(response);
          if (response.status === "success") {
            location.href= response.session.url
            
          }
        }
    }
  return (
    <main className='m-4'>
    <h3>Payment</h3>
    <div className='shadow p-4 my-4'>

      <div>
        <label htmlFor="" className='mx-2'>Cash</label>
        <input type='radio' name='payment' value={paymentMethod} onChange={()=>setPaymentMethod("cash")}/>

         <label htmlFor="" className='mx-2'>Online</label>
        <input type='radio' name='payment' value={paymentMethod} onChange={()=>setPaymentMethod("online")}/>
        </div>  

    </div>

    <form onSubmit={handleSubmit}>
             <div>
                  <Input 
                 type='text'
                 placeholder='Enter Your Details'
                 className='py-5 mt-3'
                 onChange={(e)=>{
                  setForm({...form, details:e.target.value});
                 }}
                 />
                 
                </div>
         
                 <div>
                  <Input 
                 type='tel'
                 placeholder='Enter Your Phone Number '
                 className='py-5 mt-3'
                 onChange={(e)=>{
                  setForm({ ...form, phone:e.target.value});
                 }}
                 />
                 
                </div>
               
                <div>
                  <Input 
                 type='text'
                 placeholder='Enter Your City'
                 className='py-5 mt-3'
                 onChange={(e)=>{
                  setForm({ ...form,city:e.target.value});
                 }}
                 />
                 <Button type='submit' variant={'default'} className='mt-4 '>Submit</Button>
                </div>
         
    </form>
  </main>
  )
}
