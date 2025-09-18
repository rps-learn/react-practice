// src/context/UIContext.tsx
import React, { createContext, useContext, useState } from "react";

type Filter = "all" | "active" | "completed";
type SortOption = "newest" | "oldest" | "az" | "za";

type UIContextType = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  search: string;
  setSearch: (s: string) => void;
  sort: SortOption;
  setSort: (s: SortOption) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: React.PropsWithChildren) {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  return (
    <UIContext.Provider value={{ filter, setFilter, search, setSearch, sort, setSort }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}
