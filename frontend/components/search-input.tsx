import React, { useState, useCallback, useEffect } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  minLength?: number;
  debounceMs?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
                                                   onSearch,
                                                   placeholder = "Search airports by name, city, country, or IATA code...",
                                                   minLength = 3,
                                                   debounceMs = 300,
                                                 }) => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = inputValue.trim();

      if (trimmed.length === 0) {
        // Empty search - show all
        setIsValid(true);
        onSearch('');
      } else if (trimmed.length >= minLength) {
        // Valid search
        setIsValid(true);
        onSearch(trimmed);
      } else {
        // Too short
        setIsValid(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [inputValue, onSearch, minLength, debounceMs]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setInputValue('');
  }, []);

  return (
    <div className="relative mb-6">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            !isValid && inputValue.length > 0
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
          }`}
        />

        {inputValue.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {!isValid && inputValue.length > 0 && (
        <p className="mt-2 text-sm text-red-600">
          Please enter at least {minLength} characters to search
        </p>
      )}
    </div>
  );
};

export default SearchInput;