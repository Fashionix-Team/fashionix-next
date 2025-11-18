import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { bagistoFetch } from "@/lib/bagisto";
import { CustomerLogin } from "@/lib/bagisto/mutations/customer-login";
import { isObject } from "@/lib/type-guards";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "username",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (
        credentials: Record<"password" | "username", string> | undefined
      ): Promise<any> => {
        /* Getting Token from generateCustomerToken */
        const input = {
          email: credentials?.username,
          password: credentials?.password,
        };

        try {
          const res = await bagistoFetch<any>({
            query: CustomerLogin,
            variables: {
              input,
            },
            cache: "no-store",
          });

          if (
            res?.status === 200 &&
            isObject(res?.body?.data) &&
            isObject(res?.body?.data?.customerLogin)
          ) {
            const customerInfo = res?.body?.data?.customerLogin;

            return {
              id: customerInfo.customer.id,
              firstname: customerInfo.customer.firstName,
              lastname: customerInfo.customer.lastName,
              name: customerInfo.customer.name,
              token: customerInfo.accessToken,
              email: customerInfo.customer.email,
              tokenLifeTime: customerInfo.expiresIn,
            };
          } else {
            throw new Error("Something went wrong.");
          }
        } catch (error: any) {
          throw new Error(
            (error?.error?.message as string) || "Something went wrong!"
          );
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // `user` object is only available on the first sign-in.
      if (isObject(user) && user.token) {
        token.accessToken = user.token as string;
        token.id = user.id as string;
        token.role = "customer";
        token.email = user.email as string;
        token.name = user.name as string;
        token.firstName = user.firstname as string;
        token.lastName = user.lastname as string;
      }

      return token;
    },
    async session({ session, token }) {
      // Pass the data from the token to the session object
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          accessToken: token.accessToken as string,
          role: token.role as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
        },
        error: token.error,
      };
    },
  },
  pages: {
    signIn: "/customer/login",
    error: "/login",
  },
};
export const handler = NextAuth(authOptions);
