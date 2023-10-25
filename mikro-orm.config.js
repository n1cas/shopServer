module.exports = {
  dbName: "node_gmp",
  user: "node_gmp",
  type: "postgresql",
  password: "password123",
  debug: process.env.NODE_ENV !== "production",
  entities: ["./dist/**/entities/*"],
  entitiesTs: ["./src/**/entities/*"],
  allowGlobalContext: true,
  module: "commonjs",
  seeder: {
    path: "./dist/orm/seeders/", // path to the folder with seeders
    pathTs: "./src/orm/seeders/", // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: "DatabaseSeeder", // default seeder class name
    glob: "!(*.d).{js,ts}", // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: "ts", // seeder generation mode
    fileName: (className) => className, // seeder file naming convention
  },
};
