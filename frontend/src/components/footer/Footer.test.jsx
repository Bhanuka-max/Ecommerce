import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer'; 

describe('Footer Component', () => {
  // Test if the footer renders
  it('renders the footer component', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo'); // Assuming <footer> is used
    expect(footerElement).toBeInTheDocument();
  });

  // Test brand section
  it('displays the brand name and tagline', () => {
    render(<Footer />);
    expect(screen.getByText('RosaLovers')).toBeInTheDocument();
    expect(screen.getByText("More than just a game. It's a lifestyle.")).toBeInTheDocument();
  });

  // Test navigation links
  it('renders clickable navigation links', () => {
    render(<Footer />);
    
    // Define the links and their expected href values
    const links = [
      { text: 'Home', href: '/home' },
      { text: 'Shop', href: '/shop' },
      { text: 'Product', href: '/product' },
      { text: 'Articles', href: '/articles' },
      { text: 'Contact Us', href: '/contact' },
    ];
  
    // Assert each link is present and has the correct href
    links.forEach(({ text, href }) => {
      const linkElement = screen.getByText(text); // Find link by text
      expect(linkElement).toBeInTheDocument(); // Verify it's rendered
      expect(linkElement.tagName).toBe('A'); // Verify it's an <a> element
      expect(linkElement).toHaveAttribute('href', href); // Verify href attribute
    });
  });
  

  // Test info section
  it('renders clickable info section links', () => {
    render(<Footer />);
    
    // Define the links and their expected href values
    const infoLinks = [
      { text: 'Shipping Policy', href: '/shipping-policy' },
      { text: 'Return & Refund', href: '/return-refund' },
      { text: 'Support', href: '/support' },
      { text: 'FAQs', href: '/faqs' },
    ];
  
    // Assert each link is present and has the correct href
    infoLinks.forEach(({ text, href }) => {
      const linkElement = screen.getByText(text); // Find link by text
      expect(linkElement).toBeInTheDocument(); // Verify it's rendered
      expect(linkElement.tagName).toBe('A'); // Verify it's an <a> element
      expect(linkElement).toHaveAttribute('href', href); // Verify href attribute
    });
  });
  

  // Test office section
  it('displays office information', () => {
    render(<Footer />);
    expect(screen.getByText('Kelaniya')).toBeInTheDocument();
    expect(screen.getByText('Tree Junction')).toBeInTheDocument();
    expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
    expect(screen.getByText('0769897452')).toBeInTheDocument();
  });

  // Test copyright and legal links
  it('renders copyright and legal links', () => {
    render(<Footer />);
    expect(screen.getByText('Copyright © 2023 Rosalovers. All rights reserved.')).toBeInTheDocument();
    const legalLinks = ['Privacy Policy', 'Terms & Conditions'];
    legalLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  // Test payment methods
  it('renders payment method icons', () => {
    render(<Footer />);
    const paymentMethods = ['Visa', 'MasterCard', 'Stripe', 'PayPal', 'ApplePay'];
    paymentMethods.forEach((method) => {
      expect(screen.getByAltText(method)).toBeInTheDocument();
    });
  });
});
