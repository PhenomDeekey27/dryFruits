-- =============================================
-- FIX MISSING PRODUCT NAMES
-- Run this in Supabase SQL Editor to populate
-- empty product names with their category
-- =============================================

-- Check how many products have missing names
SELECT COUNT(*) as products_with_missing_names
FROM public.products
WHERE name IS NULL OR name = '';

-- Update products with missing names to use their category
UPDATE public.products
SET name = category
WHERE name IS NULL OR name = '';

-- Verify the update
SELECT id, name, category, created_at
FROM public.products
ORDER BY created_at DESC;
