'use client'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { IRegisterBody } from '@/lib/interfaces/auth';
import * as z  from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Login() {

  const [errorMsg , setErrorMsg] = useState<null | string>(null);
  const [isLoading , setIsLoading] = useState(false);
  const router = useRouter()

 const schema = z.object({
  email: z.email().nonempty("Email is Required"),
  password: z.string().nonempty("Password is Required"),
  
  

 })

  const {register, handleSubmit, formState:{errors}} = useForm({
    defaultValues: { 
    email:"",
    password:"",
    },
    resolver: zodResolver(schema),
    mode: 'all'
  });
async function handleLogin(values:{email:string; password:string}){

  setIsLoading(true);
  setErrorMsg('')

 const x = await signIn('credentials',{redirect:false,
   email:values.email,
   password:values.password,

 });
 if(x?.ok){
  router.push("/")
 }else{
  setErrorMsg('Something Wrong')
 }
 
setIsLoading(false);
}



  return (
    <main className='mx-auto w-1/2 shadow p-3 my-4 border border-gray-50 rounded-xl'>
      <h1 className=' font-bold text-2xl'>Login Now</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
     
        <div>
         <Input 
        type='email'
        placeholder='Enter Your Email'
        className='py-5 mt-3'
        {...register("email")}
        />
        {errors.email?.message&&<small className='text-red-600 m-3'>{errors.email.message}</small>}
       </div>
      
       <div>
         <Input 
        type='password'
        placeholder='Enter Your Password'
        className='py-5 mt-3'
        {...register("password")}
        />
        {errors.password?.message&&<small className='text-red-600 m-3'>{errors.password.message}</small>}
       </div>


      
     

        {errorMsg&&<p className='text-center my-3 text-red-600'>{errorMsg}</p>}

        <Button disabled ={isLoading} type='submit' className='w-full my-3' variant={"default"}>
          {isLoading?"loading...":"Login"}
        </Button>
        <p className='text-center text-gray-700'>Create New Account.. <Link href={"/register"} className='font-semibold border-b-2 '>Register</Link></p>
      </form>
    </main>
  )
}

