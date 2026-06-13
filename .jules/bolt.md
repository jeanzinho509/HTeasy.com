## 2026-06-13 - Refactoring manual pagination/filtering in product.controller.js
**Learning:** The codebase previously computed review aggregations and filter states using Node.js `Promise.all` loops instead of utilizing database `HAVING` capabilities.
**Action:** Replaced manual loops with subqueries in SQL statements, effectively leveraging the database for pagination counts.
