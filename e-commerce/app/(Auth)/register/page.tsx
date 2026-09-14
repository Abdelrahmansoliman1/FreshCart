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

export default function Register() {

  const [errorMsg , setErrorMsg] = useState<null | string>(null);
  const [isLoading , setIsLoading] = useState(false);
  const router = useRouter()

 const schema = z.object({
  name: z.string().nonempty("Name is Required"),
  email: z.email().nonempty("Email is Required"),
  password: z.string().nonempty("Password is Required"),
  rePassword: z.string().nonempty("Confirm Password is Required"),
  phone: z.string().nonempty("Phone is Required"),
  

 }).refine(function(values){
  return values.password === values.rePassword;
 },{
  error: "Not Match",
  path:['rePassword']
 })

  const {register, handleSubmit, formState:{errors}} = useForm({
    defaultValues: {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },
    resolver: zodResolver(schema),
    mode: 'all'
  });
async function handleRegister(values: IRegisterBody){

  setIsLoading(true);
  setErrorMsg('')
const data = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
    method: "POST",
    body: JSON.stringify(values),
    headers:{
      "content-type": "application/json"
    },
  }
);

 const response = await data.json();
  if (response.statusMsg === "fail") {
    setErrorMsg(response.message)
  }

router.push('/login');
setIsLoading(false);
}



  return (
    <main className='mx-auto w-1/2 shadow p-3 my-4 border border-gray-50 rounded-xl'>
      <h1 className=' font-bold text-2xl'>Register Now</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
       <div>
         <Input 
        type='text'
        placeholder='Enter Your Name'
        className='py-5 mt-3'
        {...register("name")}
        />
        {errors.name?.message&&<small className='text-red-600 m-3'>{errors.name.message}</small>}
       </div>

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


        <div>
         <Input 
        type='password'
        placeholder='Confirm Password'
        className='py-5 mt-3'
        {...register("rePassword")}
        />
        {errors.rePassword?.message&&<small className='text-red-600 m-3'>{errors.rePassword.message}</small>}
       </div>

       <div>
         <Input 
        type='tel'
        placeholder='Enter Your Phone'
        className='py-5 mt-3'
        {...register("phone")}
        />
        {errors.phone?.message&&<small className='text-red-600 m-3'>{errors.phone.message}</small>}
       </div>
        

        {errorMsg&&<p className='text-center my-3 text-red-600'>{errorMsg}</p>}

        <Button disabled ={isLoading} type='submit' className='w-full my-3' variant={"default"}>
          {isLoading?"loading...":"Register"}
        </Button>
        <p className='text-center text-gray-700'>Already Have Account.. <Link href={"/login"} className='font-semibold border-b-2 '>Login</Link></p>
      </form>
    </main>
  )
}
