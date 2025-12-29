-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  detail TEXT,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  discount DECIMAL(5,2) DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT,
  user_email TEXT NOT NULL,
  products JSONB NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'process', 'completed')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart table
CREATE TABLE cart (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_image TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for products
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for transactions
CREATE POLICY "Users can view their own transactions" ON transactions
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Admins can view all transactions" ON transactions
  FOR SELECT USING (auth.jwt() ->> 'email' = 'admin@example.com'); -- Replace with actual admin email

CREATE POLICY "Admins can update transactions" ON transactions
  FOR UPDATE USING (auth.jwt() ->> 'email' = 'admin@example.com');

-- RLS Policies for cart
CREATE POLICY "Users can view their own cart" ON cart
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert into their own cart" ON cart
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own cart" ON cart
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete from their own cart" ON cart
  FOR DELETE USING (auth.uid()::text = user_id);

-- RLS Policies for testimonials
CREATE POLICY "Testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own testimonials" ON testimonials
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own testimonials" ON testimonials
  FOR DELETE USING (auth.uid()::text = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE cart;
ALTER PUBLICATION supabase_realtime ADD TABLE testimonials;

-- Functions for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
