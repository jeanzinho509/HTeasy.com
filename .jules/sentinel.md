## 2024-05-24 - Logical Vulnerability in Cart Quantity

**Vulnerability:** A logical vulnerability existed in the `addToCart` function within `server/controllers/cart.controller.js`. The `quantity` parameter from the request body was not validated for negative or zero numbers. This allowed users to potentially bypass stock checks or improperly manipulate cart totals (e.g., negative totals) by passing negative values.

**Learning:** This vulnerability existed because only the existence of `productId` was checked during input validation in `addToCart`, while the `quantity` parameter was blindly accepted and passed to the database queries or used in calculations without checking if it was a valid positive integer. The `updateCartItem` function in the same file had the correct check, but `addToCart` lacked it, highlighting inconsistency in input validation across related endpoints.

**Prevention:** Always validate all numeric inputs from untrusted sources, especially when those inputs represent real-world quantities (like items in a cart). Implement consistent validation logic across all endpoints that accept similar parameters (e.g., if `updateCartItem` needs a `quantity > 0` check, `addToCart` almost certainly does too). Using a centralized validation middleware or schema validation library (like Joi or express-validator) can help enforce these rules consistently.
