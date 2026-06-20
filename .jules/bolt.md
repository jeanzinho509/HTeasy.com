## 2023-10-24 - [Shifted manual application-level aggregation to Database to avoid N+1 queries]
**Learning:** Found N+1 query problem manually filtering products by rating in an async loop inside `product.controller.js`'s counting mechanisms.
**Action:** Shift the logic to the database by using `HAVING` clause subquery within the SQL aggregation functions for improved efficiency and speed, rather than `Promise.all` inside Node.js.
