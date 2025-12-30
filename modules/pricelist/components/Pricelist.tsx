"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FiPlus, FiShoppingCart } from "react-icons/fi";

import Container from "@/common/components/elements/Container";
import Button from "@/common/components/elements/Button";
import Card from "@/common/components/elements/Card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  discount: number;
  discount_type: 'percentage' | 'fixed';
}

interface CartItem {
  productId: string;
  quantity: number;
}

const Pricelist = () => {
  const { data: session } = useSession();
  const t = useTranslations("PricelistPage");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchProducts();
    if (session?.user) {
      fetchCart();
    }
  }, [session]);

  const fetchProducts = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/products');
      // const data = await response.json();

      // Mock data for now
      setProducts([
        {
          id: "1",
          name: "Sample Product 1",
          description: "This is a sample product description",
          price: 100000,
          image_url: "/images/product1.jpg",
          stock: 10,
          discount: 0,
          discount_type: 'percentage'
        },
        {
          id: "2",
          name: "Sample Product 2",
          description: "Another sample product",
          price: 150000,
          image_url: "/images/product2.jpg",
          stock: 5,
          discount: 10,
          discount_type: 'percentage'
        }
      ]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/cart');
      // const data = await response.json();
      // setCart(data);

      // Mock cart data
      setCart([]);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId: string) => {
    if (!session?.user?.id) {
      alert("Please login to add items to cart");
      return;
    }

    if (cart.length >= 5) {
      alert("Cart is full! Maximum 5 items allowed.");
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await fetch('/api/cart', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ productId, quantity: 1 })
      // });

      // Mock add to cart
      setCart([...cart, { productId, quantity: 1 }]);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const getCartQuantity = (productId: string) => {
    const item = cart.find(item => item.productId === productId);
    return item?.quantity || 0;
  };

  const getDiscountedPrice = (product: Product) => {
    if (product.discount === 0) return product.price;

    if (product.discount_type === 'percentage') {
      return product.price * (1 - product.discount / 100);
    } else {
      return product.price - product.discount;
    }
  };

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("description")}
          </p>
        </div>

        {isAdmin && (
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2"
          >
            <FiPlus size={20} />
            <span>Add Product</span>
          </Button>
        )}
      </div>

      {/* Add Product Form (Admin Only) */}
      {showAddForm && isAdmin && (
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Add New Product</h3>
          {/* TODO: Add product form */}
          <p className="text-gray-600 dark:text-gray-400">Product form coming soon...</p>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="p-6">
            <div className="aspect-square mb-4 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div>
                {product.discount > 0 ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-600">
                      Rp {getDiscountedPrice(product).toLocaleString('id-ID')}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                )}
              </div>

              <span className={`text-sm px-2 py-1 rounded ${
                product.stock > 0
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                Stock: {product.stock}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                In Cart: {getCartQuantity(product.id)}
              </span>

              <Button
                onClick={() => addToCart(product.id)}
                disabled={product.stock === 0 || cart.length >= 5}
                className="flex items-center space-x-2"
              >
                <FiShoppingCart size={16} />
                <span>Add to Cart</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">No products available</p>
            <p className="text-sm">Products will be added soon</p>
          </div>
        </Card>
      )}

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="p-6 mt-8">
          <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
          <div className="space-y-2">
            {cart.map((item) => {
              const product = products.find(p => p.id === item.productId);
              return product ? (
                <div key={item.productId} className="flex justify-between">
                  <span>{product.name} (x{item.quantity})</span>
                  <span>Rp {(getDiscountedPrice(product) * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ) : null;
            })}
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>
                Rp {cart.reduce((total, item) => {
                  const product = products.find(p => p.id === item.productId);
                  return total + (product ? getDiscountedPrice(product) * item.quantity : 0);
                }, 0).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          <Button className="w-full mt-4">
            Checkout ({cart.length}/5 items)
          </Button>
        </Card>
      )}
    </Container>
  );
};

export default Pricelist;
