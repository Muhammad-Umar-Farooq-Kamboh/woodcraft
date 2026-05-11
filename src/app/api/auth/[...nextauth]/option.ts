import prisma from "@/lib/db";
import { decrypt } from "@/lib/encryption_decryption";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role?: string | null;
    };
  }
  interface User {
    id: string;
    email?: string | null; // allow username on User
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string | null;
    role?: string | null;
  }
}

export const authOption: NextAuthOptions = {
  // Provider
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          placeholder: "Enter your email",
          type: "email",
        },
        password: {
          label: "password",
          placeholder: "Enter your password",
          type: "password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          const isUserExist = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (!isUserExist) {
            throw new Error("User cannot exist");
          }
          const isPasswordCorrect = await decrypt(
            credentials.password,
            isUserExist.password,
          );
          if (!isPasswordCorrect) {
            throw new Error("Password not correct");
          }
          return isUserExist;
        } catch (error: any) {
          throw new Error(error?.message || "Authentication failed");
        }
      },
    }),
  ],

  // Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },

  // Pages
  pages: {
    signIn: "/signin",
  },

  // Session
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },

  jwt: {
    maxAge: 60 * 60 * 24,
  },
  // secret
  secret: process.env.NEXTAUTH_SECRET ?? process.env.Next_Secreat_Key,
};
