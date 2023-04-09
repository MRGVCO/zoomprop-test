import { getAllListings, Listing } from '@/services';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ListingsProviderProps {
  children: React.ReactNode;
}

interface ListingsContextType {
  listings: Listing[] | null;
  listingsLoaded: boolean;
}

const ListingsContext = createContext<ListingsContextType>({
  listings: null,
  listingsLoaded: false,
});

export const ListingsContextProvider = ({
  children,
}: ListingsProviderProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingsLoaded, setListingsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const listingsData = await getAllListings();
      if (listingsData) {
        setListings(listingsData);
        setListingsLoaded(true);
      }
    })();
  }, []);

  return (
    <ListingsContext.Provider value={{ listings, listingsLoaded }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListingsContext = () => useContext(ListingsContext);
