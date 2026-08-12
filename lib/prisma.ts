import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
};
// const adapter = new PrismaMariaDb({
//   host: "gateway01.eu-central-1.prod.aws.tidbcloud.com",
//   port: 4000,
//   user: "2MWctRK3DnwzTpk.root",
//   password: "gpPXYNzHCEYYbB5H",
//   database: "test",
//   ssl: {},
// });

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "11471347Fa@",
  database: "expense_tracker",
  allowPublicKeyRetrieval: true,
  //   database: process.env.DATABASE_NAME,
});
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
