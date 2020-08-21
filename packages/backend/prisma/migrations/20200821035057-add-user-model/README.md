# Migration `20200821035057-add-user-model`

This migration has been generated at 8/21/2020, 10:50:57 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Link" ADD COLUMN     "postedById" INTEGER

CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200821022415-initial..20200821035057-add-user-model
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
     provider = "sqlite"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -11,5 +11,15 @@
     id          Int      @id @default(autoincrement())
     createdAt   DateTime @default(now())
     description String
     url         String
+    postedBy    User?    @relation(fields: [postedById], references: [id])
+    postedById  Int?
 }
+
+model User {
+    id       Int    @id @default(autoincrement())
+    name     String
+    email    String @unique
+    password String
+    links    Link[]
+}
```


