"use client";

import {
  ClockIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Popular search suggestions
const POPULAR_SEARCHES = [
  "dresses",
  "modest dresses",
  "evening wear",
  "casual wear",
  "formal dresses",
  "summer dresses",
  "party dresses",
  "maxi dresses",
];

export default function Search() {
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams?.get("q") || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recent-searches");
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved));
        } catch (error) {
          console.error("Error loading recent searches:", error);
        }
      }
    }
  }, []);

  // Auto-focus when expanded on mobile
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
      setShowSuggestions(true);
    }
  }, [isExpanded]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        if (isExpanded && !searchValue) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded, searchValue]);

  const saveRecentSearch = (query: string) => {
    if (typeof window !== "undefined" && query.trim()) {
      const updated = [
        query,
        ...recentSearches.filter((s) => s !== query),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recent-searches", JSON.stringify(updated));
    }
  };

  const handleClear = () => {
    setSearchValue("");
    setIsExpanded(false);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    saveRecentSearch(suggestion);
    setShowSuggestions(false);
    setIsExpanded(false);
    // Navigate to search results
    window.location.href = `/search?q=${encodeURIComponent(suggestion)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("q") as string;
    if (query.trim()) {
      saveRecentSearch(query.trim());
      setShowSuggestions(false);
      setIsExpanded(false);
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const filteredSuggestions = POPULAR_SEARCHES.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(searchValue.toLowerCase()) &&
      suggestion.toLowerCase() !== searchValue.toLowerCase()
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Mobile/Tablet Search - Expandable */}
      <div className="md:hidden">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center justify-center w-full py-2 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
            <span className="text-sm">Search for products...</span>
          </button>
        ) : (
          <div className="relative">
            <Form action="/search" className="relative" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                key={searchParams?.get("q")}
                type="text"
                name="q"
                placeholder="Search for products..."
                autoComplete="off"
                defaultValue={searchParams?.get("q") || ""}
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 pr-20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-black dark:focus:border-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                {searchValue && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="p-1 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                </button>
              </div>
            </Form>

            {/* Mobile Search Suggestions */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Recent Searches
                    </h4>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="flex items-center w-full text-left px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <ClockIcon className="h-3 w-3 mr-2 text-gray-400" />
                        {search}
                      </button>
                    ))}
                  </div>
                )}

                {/* Popular Suggestions */}
                {filteredSuggestions.length > 0 && (
                  <div className="p-3">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Popular Searches
                    </h4>
                    {filteredSuggestions
                      .slice(0, 5)
                      .map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="flex items-center w-full text-left px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          <MagnifyingGlassIcon className="h-3 w-3 mr-2 text-gray-400" />
                          {suggestion}
                        </button>
                      ))}
                  </div>
                )}

                {/* No suggestions */}
                {filteredSuggestions.length === 0 &&
                  recentSearches.length === 0 && (
                    <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      Start typing to see suggestions
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tablet Search - Always visible */}
      <div className="hidden md:block lg:hidden">
        <div className="relative">
          <Form action="/search" className="relative" onSubmit={handleSubmit}>
            <input
              key={searchParams?.get("q")}
              type="text"
              name="q"
              placeholder="Search for products..."
              autoComplete="off"
              defaultValue={searchParams?.get("q") || ""}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 pr-10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-black dark:focus:border-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </div>
          </Form>

          {/* Tablet Search Suggestions */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                  <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Recent
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.slice(0, 3).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Suggestions */}
              <div className="p-3">
                <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Popular
                </h4>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.slice(0, 6).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Search - Hidden (not needed as per requirement) */}
      <div className="hidden lg:block">
        <Form
          action="/search"
          className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
        >
          <input
            key={searchParams?.get("q")}
            type="text"
            name="q"
            placeholder="Search for products..."
            autoComplete="off"
            defaultValue={searchParams?.get("q") || ""}
            className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
          />
          <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
            <MagnifyingGlassIcon className="h-4" />
          </div>
        </Form>
      </div>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="relative w-full">
      {/* Mobile Skeleton */}
      <div className="md:hidden">
        <div className="flex items-center justify-center w-full py-2 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded mr-2"></div>
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Tablet Skeleton */}
      <div className="hidden md:block lg:hidden">
        <div className="relative">
          <div className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2 pr-10 animate-pulse">
            <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden lg:block">
        <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
          <input
            placeholder="Search for products..."
            className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
            disabled
          />
          <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
            <MagnifyingGlassIcon className="h-4" />
          </div>
        </form>
      </div>
    </div>
  );
}
