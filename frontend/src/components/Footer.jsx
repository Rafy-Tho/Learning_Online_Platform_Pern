import { Heart } from "lucide-react";

import { footerLinks } from "../constants/footerLinks";
import { socialLinks } from "../constants/socialLinks";
import Logo from "./navbar/Logo";
import { CURRENT_YEAR } from "../constants/constants";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 text-gray-700 dark:text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-gray-900 dark:text-white font-semibold text-lg relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-500">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo/Brand */}
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                © {CURRENT_YEAR}
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-full flex items-center justify-center text-lg text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center md:text-right">
              Empowering minds through online education
            </p>
          </div>
        </div>

        {/* Bottom Bar with Additional Info */}
        <div className="mt-8 pt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center justify-center gap-2">
            Built with <Heart className="w-4 h-4" fill="currentColor" /> for
            learners worldwide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
