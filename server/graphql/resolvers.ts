import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { generateToken } from "../utils/jwt";

function checkAuth(user: any) {
  if (!user) {
    throw new Error("Unauthorized");
  }
}

export const resolvers = {
  Query: {
    students: async (_: any, __: any, context: any) => {
      checkAuth(context.user);

      return prisma.student.findMany({
        orderBy: { createdAt: "desc" },
      });
    },

    student: async (_: any, args: any, context: any) => {
      checkAuth(context.user);

      return prisma.student.findUnique({
        where: { id: args.id },
      });
    },

    me: async (_: any, __: any, context: any) => {
      checkAuth(context.user);

      return prisma.user.findUnique({
        where: { id: context.user.id },
      });
    },
  },

  Mutation: {
    register: async (_: any, args: any) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: args.email },
      });

      if (existingUser) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(args.password, 10);

      const user = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      const token = generateToken(user);

      return { token, user };
    },

    login: async (_: any, args: any) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isMatch = await bcrypt.compare(args.password, user.password);

      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      const token = generateToken(user);

      return { token, user };
    },

    addStudent: async (_: any, args: any, context: any) => {
      checkAuth(context.user);

      return prisma.student.create({
        data: args,
      });
    },

    updateStudent: async (_: any, args: any, context: any) => {
      checkAuth(context.user);

      const { id, ...data } = args;

      return prisma.student.update({
        where: { id },
        data,
      });
    },

    deleteStudent: async (_: any, args: any, context: any) => {
      checkAuth(context.user);

      await prisma.student.delete({
        where: { id: args.id },
      });

      return "Student deleted successfully";
    },
  },
};