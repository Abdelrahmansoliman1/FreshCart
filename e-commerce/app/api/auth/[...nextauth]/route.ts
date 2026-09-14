import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

 export const options : AuthOptions = {
      providers: [
    CredentialsProvider({
        name: 'Credentials',
        
        credentials:{
            email: {type:"email" , label:"email"},
            password: {type:"password" , label:"password"}
        },
      async  authorize(credentials){
             const data = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
              method: "POST",
              body: JSON.stringify(credentials),
              headers:{
              "content-type": "application/json"
                    },
                   }
                  );
            const response = await data.json()
            if (data.ok) {
                return response
            }
            return null;
        }
    }),
  ],
  session: {
    strategy: "jwt"
  },

  secret:process.env.AUTH_SECRET,
  pages:{
    signIn:'/login',
  },
  callbacks:{
      async session({ session, token, user }) {
          return {...session,...token,...user}
  },
  async jwt({ token, user }) {
    return {...token,...user}
  }
  }

};


const handler = NextAuth(options)

export { handler as GET, handler as POST }