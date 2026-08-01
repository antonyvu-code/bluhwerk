'use client';
import { SeasonProvider } from './SeasonContext';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import SmoothScroll from './SmoothScroll';

export default function Providers({ children }) {
  return (
    <SeasonProvider>
      <AuthProvider>
        <CartProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </CartProvider>
      </AuthProvider>
    </SeasonProvider>
  );
}
