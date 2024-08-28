import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap md:flex-nowrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-2">
              <a href="mailto:info@meetspace.com" className=" hover:underline">
                info@meetspace.com
              </a>
            </p>
            <p className="mb-2">
              <a href="tel:+1234567890" className=" hover:underline">
                +123-456-7890
              </a>
            </p>
            <p>
              Meet-Space <br />
              123 Business Rd, Suite 456
              <br />
              City, State, ZIP Code
              <br />
              Bangladash
            </p>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-400"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <Link to="/" className=" hover:underline">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/rooms" className=" hover:underline">
                  Meeting Rooms
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about-us" className=" hover:underline">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contactus" className=" hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            &copy; 2024 Meet-Space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
