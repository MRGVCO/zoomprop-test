import { ListingCard } from './components/ListingCard';
import { useListingsContext } from '@/context/ListingsContext';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import styled from 'styled-components';

export default function Listings() {
  const { listings, listingsLoaded } = useListingsContext();
  const theme = useTheme();

  return (
    <Container>
      {!listingsLoaded ? (
        <ThreeCircles
          height={80}
          width={80}
          color={theme.palette.secondary.main}
        />
      ) : (
        <ListingsContent>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
          >
            Listings
          </motion.h1>
          <ListingItems>
            {listings?.map((listing) => (
              <ListingCard listing={listing} />
            ))}
          </ListingItems>
        </ListingsContent>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListingsContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

const ListingItems = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 600px);
  grid-gap: 2rem;
  justify-content: center;
  align-items: flex-start;
`;
