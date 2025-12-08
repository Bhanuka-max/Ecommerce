import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext'; // Adjust path as necessary
import CartIndicatorCard from '../components/CartIndicatorCard'; // Adjust path as necessary
import { BrowserRouter as Router } from 'react-router-dom';

// Mock CartPage redirection for CartIndicatorCard
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()), // Mock useNavigate
  };
});

// Test Component for CartContext
const TestCartComponent = () => {
  const { cartItems, setCartItems } = useCart();

  return (
    <div>
      <p data-testid="cart-count">Cart Count: {cartItems.length}</p>
      <button
        onClick={() =>
          setCartItems((prev) => [...prev, { id: 1, name: 'Test Item' }])
        }
      >
        Add Item
      </button>
    </div>
  );
};

describe('CartContext', () => {
  it('should show initial cart count as 0', () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    const cartCount = screen.getByTestId('cart-count');
    expect(cartCount).toHaveTextContent('Cart Count: 0');
  });

  it('should update cart count when an item is added', () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    const addItemButton = screen.getByText('Add Item');
    const cartCount = screen.getByTestId('cart-count');

    // Initially, the cart count should be 0
    expect(cartCount).toHaveTextContent('Cart Count: 0');

    // Simulate adding an item
    fireEvent.click(addItemButton);

    // Cart count should now be 1
    expect(cartCount).toHaveTextContent('Cart Count: 1');
  });

  it('should show correct cart count in CartIndicatorCard', () => {
    render(
      <Router>
        <CartProvider>
          <CartIndicatorCard />
        </CartProvider>
      </Router>
    );

    const cartCount = screen.getByText('0'); // Initially should be 0
    expect(cartCount).toBeInTheDocument();
  });

  it('should redirect to cart page when CartIndicatorCard is clicked', () => {
    const navigateMock = vi.fn(); // Mock navigation

    render(
      <Router>
        <CartProvider>
          <CartIndicatorCard />
        </CartProvider>
      </Router>
    );

    const cartIndicator = screen.getByRole('button', { name: /cart/i });
    fireEvent.click(cartIndicator);

    // Check if navigation was called (assuming mock is linked correctly)
    expect(navigateMock).toHaveBeenCalled();
  });
});
