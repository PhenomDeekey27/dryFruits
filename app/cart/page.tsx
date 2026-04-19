"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { createClient } from "@/lib/supabase";

interface CartItemType {
  id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    category: string;
    product_images: Array<{ image_url: string }>;
  };
  product_variants: {
    id: string;
    weight: string;
    price: number;
  };
}

interface CartItemQueryRow {
  id: string;
  quantity: number;
  products: Array<{
    id: string;
    name: string;
    category: string;
    product_images: Array<{ image_url: string }>;
  }>;
  product_variants: Array<{
    id: string;
    weight: string;
    price: number;
  }>;
}

interface SuggestedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<
    SuggestedProduct[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        setIsLoggedIn(!!user);

        if (!user) {
          setLoading(false);
          return;
        }

        // Fetch cart items
        const { data } = await supabase
          .from("cart_items")
          .select(
            `
            id,
            quantity,
            products:product_id (
              id,
              name,
              category,
              product_images (image_url)
            ),
            product_variants:variant_id (
              id,
              weight,
              price
            )
          `,
          )
          .eq("user_id", user.id);

        if (data) {
          const normalizedCartItems = (data as CartItemQueryRow[]).map(
            (item) => ({
              id: item.id,
              quantity: item.quantity,
              products: item.products[0],
              product_variants: item.product_variants[0],
            }),
          );

          setCartItems(normalizedCartItems);
        }

        // Fetch suggested products
        const { data: products } = await supabase
          .from("products")
          .select(
            `
            id,
            name,
            category,
            product_variants (price),
            product_images (image_url)
          `,
          )
          .limit(4);

        if (products) {
          const suggested = products.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            price: p.product_variants?.[0]?.price || 0,
            image: p.product_images?.[0]?.image_url || "",
          }));
          setSuggestedProducts(suggested);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_variants.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const isEmpty = cartItems.length === 0;

  if (!isLoggedIn && !loading) {
    return (
      <div
        style={{ background: "#fcf9f8" }}
        className="min-h-screen flex flex-col"
      >
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-32">
          <div className="text-center max-w-md">
            <h1
              className="text-3xl font-bold text-[#1b1c1c] mb-4"
              style={{ fontFamily: "Epilogue, sans-serif" }}
            >
              Your Cart
            </h1>
            <p className="text-[#504441] mb-8">
              Sign in to view and manage your shopping cart.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      style={{ background: "#fcf9f8" }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="mb-12 sm:mb-14 md:mb-16">
          <span className="text-[#775a19] font-semibold uppercase tracking-widest text-[11px] mb-2 block">
            Your Curation
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1c1c]"
            style={{ fontFamily: "Epilogue, sans-serif" }}
          >
            Shopping Bag
          </h1>
        </header>

        {isEmpty ? (
          <div className="text-center py-20">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d4c3be"
              strokeWidth="1"
              className="mx-auto mb-6"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <h2 className="text-2xl font-bold text-[#1b1c1c] mb-2">
              Your cart is empty
            </h2>
            <p className="text-[#504441] mb-8">
              Explore our collection and add some items to your cart.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Cart Items */}
            <div className="flex-grow">
              <div className="space-y-8 divide-y divide-[#d4c3be]/20">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    product={item.products}
                    variant={item.product_variants}
                    quantity={item.quantity}
                  />
                ))}
              </div>

              {/* Complete Your Curation */}
              {suggestedProducts.length > 0 && (
                <div className="mt-16 pt-16 border-t border-[#d4c3be]/20">
                  <h3
                    className="text-lg font-bold text-[#1b1c1c] mb-6"
                    style={{ fontFamily: "Epilogue, sans-serif" }}
                  >
                    Complete Your Curation
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {suggestedProducts.slice(0, 2).map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="p-6 bg-[#f6f3f2] rounded-xl flex items-center gap-6 hover:shadow-lg hover:bg-[#eae7e7] transition-all group"
                      >
                        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#d4c3be]/10" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="font-bold text-sm text-[#1b1c1c]">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#827470] mt-1">
                            ₹{product.price.toFixed(2)}
                          </p>
                        </div>
                        <button className="text-[#775a19] hover:scale-110 transition-transform flex-shrink-0">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line
                              x1="12"
                              y1="8"
                              x2="12"
                              y2="16"
                              stroke="white"
                              strokeWidth="2"
                            />
                            <line
                              x1="8"
                              y1="12"
                              x2="16"
                              y2="12"
                              stroke="white"
                              strokeWidth="2"
                            />
                          </svg>
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Summary */}
            <CartSummary subtotal={subtotal} tax={tax} items={cartItems} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
