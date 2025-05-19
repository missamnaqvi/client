import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 PG Management System. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-blue-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-300">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-300">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
