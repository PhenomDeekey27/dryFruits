-- =============================================
-- Bulk Insert 40+ Dry Fruits Products
-- Run this directly in Supabase SQL Editor
-- =============================================

-- Helper function to insert product with variants and images
DO $$
DECLARE
  product_id UUID;
BEGIN

-- === DATES SECTION ===

-- 1. 200gm Seeded Dates
INSERT INTO public.products (name, category, description)
VALUES ('200gm Seeded Dates', 'Dates', 'Premium quality seeded dates, 200gm pack. Rich in natural sugars and nutrients.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock)
VALUES (product_id, '200gm', 199, 50);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 2. 200gm Seedless Dates
INSERT INTO public.products (name, category, description)
VALUES ('200gm Seedless Dates', 'Dates', 'Soft and sweet seedless dates without the pit. Perfect for snacking, 200gm.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock)
VALUES (product_id, '200gm', 229, 45);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 3. 200gm Muscat Dates
INSERT INTO public.products (name, category, description)
VALUES ('200gm Muscat Dates', 'Dates', 'Golden Muscat dates with unique flavor, 200gm pack.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock)
VALUES (product_id, '200gm', 249, 40);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 4. 500gm Seeded Dates
INSERT INTO public.products (name, category, description)
VALUES ('500gm Seeded Dates', 'Dates', 'Bulk pack of premium seeded dates, 500gm. Value for money.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock)
VALUES (product_id, '500gm', 449, 35);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 5. 500gm Seeded (1+1) Free
INSERT INTO public.products (name, category, description)
VALUES ('500gm Seeded (1+1) Free', 'Dates', 'Buy one 500gm pack, get one free! Limited time offer on seeded dates.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock)
VALUES (product_id, '500gm x2', 449, 30);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 6. 500gm Seedless Dates
INSERT INTO public.products (name, category, description)
VALUES ('500gm Seedless Dates', 'Dates', 'Convenient seedless dates in 500gm bulk pack.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock)
VALUES (product_id, '500gm', 499, 40);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 7. 500gm Muscat Dates
INSERT INTO public.products (name, category, description)
VALUES ('500gm Muscat Dates', 'Dates', 'Golden Muscat dates bulk pack, 500gm. Premium quality.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock)
VALUES (product_id, '500gm', 549, 35);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 8. 500gm Seedless Box
INSERT INTO public.products (name, category, description)
VALUES ('500gm Seedless Box', 'Dates', 'Premium gift-boxed seedless dates, 500gm. Perfect for gifting.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock)
VALUES (product_id, '500gm', 599, 25);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 9. 250gm Seedless Box
INSERT INTO public.products (name, category, description)
VALUES ('250gm Seedless Box', 'Dates', 'Elegant gift box of seedless dates, 250gm. Premium packaging.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock)
VALUES (product_id, '250gm', 349, 30);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 10. 500gm Muscat Box
INSERT INTO public.products (name, category, description)
VALUES ('500gm Muscat Box', 'Dates', 'Luxury gift box of golden Muscat dates, 500gm.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock)
VALUES (product_id, '500gm', 649, 20);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 11. 250gm Muscat Box
INSERT INTO public.products (name, category, description)
VALUES ('250gm Muscat Box', 'Dates', 'Compact luxury box of Muscat dates, 250gm. Premium gift.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock)
VALUES (product_id, '250gm', 399, 25);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 12. Khenaizi Dates
INSERT INTO public.products (name, category, description)
VALUES ('Khenaizi Dates', 'Dates', 'Traditional Khenaizi dates with rich heritage flavor. Premium quality.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '250gm', 299, 30),
(product_id, '500gm', 549, 25);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 13. Safawi Dates
INSERT INTO public.products (name, category, description)
VALUES ('Safawi Dates', 'Dates', 'Premium Safawi dates, dark and delicious. Rich in minerals.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '250gm', 319, 28),
(product_id, '500gm', 579, 24);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 14. Mabroom Dates
INSERT INTO public.products (name, category, description)
VALUES ('Mabroom Dates', 'Dates', 'Chewy Mabroom dates with natural sweetness. Premium texture.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '250gm', 289, 32),
(product_id, '500gm', 529, 28);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 15. Ajwa Dates
INSERT INTO public.products (name, category, description)
VALUES ('Ajwa Dates', 'Dates', 'Sacred Ajwa dates from Medina. Premium quality with unique taste.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '250gm', 399, 20),
(product_id, '500gm', 749, 15);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 16. Dry Dates (Khajoor)
INSERT INTO public.products (name, category, description)
VALUES ('Dry Dates (Khajoor)', 'Dates', 'Traditional dry dates with concentrated flavor. Energy-packed snack.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '250gm', 199, 40),
(product_id, '500gm', 379, 35);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- === NUTS SECTION ===

-- 17. Almond Regular
INSERT INTO public.products (name, category, description)
VALUES ('Almond Regular', 'Nuts', 'Regular almonds, natural and raw. High in protein and healthy fats.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 279, 45),
(product_id, '500gm', 649, 35),
(product_id, '1kg', 1199, 25);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 18. Almond Bold
INSERT INTO public.products (name, category, description)
VALUES ('Almond Bold', 'Nuts', 'Bold and premium quality almonds. Extra fresh and crunchy.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 319, 40),
(product_id, '500gm', 749, 30),
(product_id, '1kg', 1399, 20);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 19. Cashew W240
INSERT INTO public.products (name, category, description)
VALUES ('Cashew W240', 'Nuts', 'Premium cashew W240 grade. Whole pieces, excellent quality.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 399, 35),
(product_id, '500gm', 899, 25);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 20. Cashew W320
INSERT INTO public.products (name, category, description)
VALUES ('Cashew W320', 'Nuts', 'Medium cashew W320 grade. Perfect for all uses.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 349, 40),
(product_id, '500gm', 799, 30);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 21. Cashew SW320
INSERT INTO public.products (name, category, description)
VALUES ('Cashew SW320', 'Nuts', 'Split White Cashew SW320. Premium grade with excellent taste.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 329, 38),
(product_id, '500gm', 749, 28);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 22. Cashew 1/2 Split
INSERT INTO public.products (name, category, description)
VALUES ('Cashew 1/2 Split', 'Nuts', 'Cashew halves, perfect for cooking and snacking.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 299, 42),
(product_id, '500gm', 699, 32);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 23. Cashew 1/4 LWP
INSERT INTO public.products (name, category, description)
VALUES ('Cashew 1/4 LWP', 'Nuts', 'Cashew quarter pieces, Large White Pieces. Great for recipes.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 279, 44),
(product_id, '500gm', 649, 34);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 24. Cashew SP
INSERT INTO public.products (name, category, description)
VALUES ('Cashew SP', 'Nuts', 'Cashew Special grade. Finest quality pieces.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 429, 30),
(product_id, '500gm', 999, 20);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- === RAISINS SECTION ===

-- 25. Black Seeded Raisins
INSERT INTO public.products (name, category, description)
VALUES ('Black Seeded Raisins', 'Raisins', 'Traditional black raisins with seeds. Rich and sweet flavor.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 149, 50),
(product_id, '500gm', 349, 40),
(product_id, '1kg', 649, 30);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 26. Kishmish 1
INSERT INTO public.products (name, category, description)
VALUES ('Kishmish 1', 'Raisins', 'Premium Kishmish Grade 1 raisins. Seedless and soft.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 179, 48),
(product_id, '500gm', 399, 38),
(product_id, '1kg', 749, 28);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 27. Kishmish 2
INSERT INTO public.products (name, category, description)
VALUES ('Kishmish 2', 'Raisins', 'Quality Kishmish Grade 2 raisins. Good taste and value.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 159, 50),
(product_id, '500gm', 369, 40),
(product_id, '1kg', 699, 30);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 28. Walnut
INSERT INTO public.products (name, category, description)
VALUES ('Walnut', 'Nuts', 'Premium whole walnuts. Rich in Omega-3, fresh and crunchy.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 299, 40),
(product_id, '500gm', 699, 30),
(product_id, '1kg', 1299, 20);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 29. Chilli Walnut
INSERT INTO public.products (name, category, description)
VALUES ('Chilli Walnut', 'Nuts', 'Spicy roasted walnuts with chilli flavor. Tasty snack.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 249, 35),
(product_id, '500gm', 579, 28);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 30. Green Pistachios
INSERT INTO public.products (name, category, description)
VALUES ('Green Pistachios', 'Nuts', 'Fresh green pistachios, natural and raw. Premium quality.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 399, 30),
(product_id, '500gm', 899, 20),
(product_id, '1kg', 1699, 15);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- 31. Salted Pistachios
INSERT INTO public.products (name, category, description)
VALUES ('Salted Pistachios', 'Nuts', 'Roasted and salted pistachios. Perfect party snack.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 379, 32),
(product_id, '500gm', 849, 22);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- === SEEDS SECTION ===

-- 32. Pumpkin Seed
INSERT INTO public.products (name, category, description)
VALUES ('Pumpkin Seed', 'Seeds', 'Nutritious pumpkin seeds. Rich in minerals and antioxidants.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 149, 50),
(product_id, '500gm', 349, 40);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 33. Flax Seed
INSERT INTO public.products (name, category, description)
VALUES ('Flax Seed', 'Seeds', 'Premium flax seeds. Great for health and nutrition.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 129, 55),
(product_id, '500gm', 299, 45);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 34. Sunflower Seeds
INSERT INTO public.products (name, category, description)
VALUES ('Sunflower Seeds', 'Seeds', 'Natural sunflower seeds. Full of healthy fats and vitamins.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 139, 52),
(product_id, '500gm', 319, 42);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 35. Watermelon Seeds
INSERT INTO public.products (name, category, description)
VALUES ('Watermelon Seeds', 'Seeds', 'Dried watermelon seeds. Crunchy and nutritious.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 119, 50),
(product_id, '500gm', 279, 40);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 36. Cucumber Seeds
INSERT INTO public.products (name, category, description)
VALUES ('Cucumber Seeds', 'Seeds', 'Premium cucumber seeds. Healthy and fresh.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 139, 48),
(product_id, '500gm', 329, 38);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 37. Sabja Seeds
INSERT INTO public.products (name, category, description)
VALUES ('Sabja Seeds', 'Seeds', 'Sabja seeds for beverages and desserts. Hydrating and cool.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '100gm', 99, 60),
(product_id, '250gm', 229, 50);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 38. Chia Seeds
INSERT INTO public.products (name, category, description)
VALUES ('Chia Seeds', 'Seeds', 'Organic chia seeds. Superfood with complete proteins.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '200gm', 199, 45),
(product_id, '500gm', 449, 35);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop');

-- 39. Badam Pisin
INSERT INTO public.products (name, category, description)
VALUES ('Badam Pisin (Gum)', 'Specialty', 'Badam Pisin - Almond gum. Traditional ingredient for dishes.')
RETURNING id INTO product_id;

INSERT INTO public.product_variants (product_id, weight, price, stock) VALUES
(product_id, '50gm', 149, 30),
(product_id, '100gm', 279, 25);

INSERT INTO public.product_images (product_id, image_url)
VALUES (product_id, 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop');

-- =============================================
-- END OF BULK INSERT
-- =============================================
-- Total: 39 products inserted with variants and images
-- Verify with: SELECT count(*) FROM public.products;

RAISE NOTICE 'Bulk insert completed successfully!';
END $$;

-- Verify insertion
SELECT count(*) as total_products FROM public.products;
SELECT count(*) as total_variants FROM public.product_variants;
SELECT count(*) as total_images FROM public.product_images;
