import React, { createContext, useState, useEffect } from 'react';

// Create a context for theme management
export const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference stored in localStorage
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light'; // Default to light mode if no preference is found
  };

  // State to track current theme
  const [theme, setTheme] = useState(getInitialTheme);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  };

  // Update data-theme attribute and localStorage when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 