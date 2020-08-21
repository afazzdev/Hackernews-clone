# Migration `20200821022415-initial`

This migration has been generated at 8/21/2020, 9:24:15 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200821022415-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,15 @@
+datasource db {
+    provider = "sqlite"
+    url = "***"
+}
+
+generator client {
+    provider = "prisma-client-js"
+}
+
+model Link {
+    id          Int      @id @default(autoincrement())
+    createdAt   DateTime @default(now())
+    description String
+    url         String
+}
```


