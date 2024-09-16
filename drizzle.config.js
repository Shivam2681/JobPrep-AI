/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:GNlgt9peXxM7@ep-shy-cake-a58wzvgd.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
 };