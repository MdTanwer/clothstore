"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { ListItem } from ".";
import { FilterItem } from "./item";

export default function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ("path" in listItem && pathname === listItem.path) ||
        ("slug" in listItem && searchParams.get("sort") === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative" ref={ref}>
      {/* Tablet/Mobile Dropdown Button */}
      <div
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
      >
        <div>{active || "Sort by"}</div>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-200 ${
            openSelect ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {openSelect && (
        <div className="absolute z-50 mt-2 w-full rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 py-2">
          {list.map((item: ListItem, i) => (
            <div
              key={i}
              onClick={() => {
                setOpenSelect(false);
              }}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FilterItem item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
