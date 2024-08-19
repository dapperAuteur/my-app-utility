import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "your-password",
        }
      },
      async authorize(credentials) {
        try {
          console.log("check");
          
          let userRole = "Credential User";
          const foundUser = await User.findOne({email: credentials.email})
            .lean()
            .exec();
            if (foundUser) {
              console.log('foundUser :>> ', foundUser);
              console.log("User Exists");
              const match = await bcrypt.compare(credentials.password, foundUser.password);
              if (match) {
                console.log("Good Password");
                delete foundUser.password;
                if (foundUser?.email === "a@awews.com") {
                  console.log('37 asign userRole foundUser :>> ', foundUser);
                  userRole = "admin";
                }
                return {
                  ...foundUser,
                  role: userRole,
                };
              }
            }
        } catch (err) {
          console.log('auth options.js err :>> ', err);
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      console.log('55 asign token user :>> ', user);
      if (user) {
        token.role = user.role;
      }
      console.log('59 return token token :>> ', token);
      return token;
    },
    async session({session, token}){
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    }
  }
}