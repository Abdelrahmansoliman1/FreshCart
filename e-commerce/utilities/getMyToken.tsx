'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  
  const session = (await cookies()).get("next-auth.session-token")?.value;
 const data  = await decode({secret: process.env.AUTH_SECRET!,
    token: session
 });
 return data?.token;
 
}
