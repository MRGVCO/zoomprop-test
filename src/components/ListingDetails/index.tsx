import Hammer from '../../../public/assets/icons/stats-icons/hammer.svg';
import LocationPin from '../../../public/assets/icons/stats-icons/location-pin.svg';
import MoneyBag from '../../../public/assets/icons/stats-icons/money-bag.svg';
import Clock from '../../../public/assets/icons/stats-icons/purple-clock.svg';
import Agent from '../../../public/assets/icons/stats-icons/re-agent.svg';
import Stack from '../../../public/assets/icons/stats-icons/stack.svg';
import ApexLineChart from '../Charts/LineChart';
import { DetailHeading } from './DetailHeading';
import { ListingStat } from './ListingStat';
import { useListingsContext } from '@/context/ListingsContext';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function ListingDetails() {
  const router = useRouter();
  const { listingId } = router.query;

  const { listings } = useListingsContext();

  const selectedListing = useMemo(() => {
    return listings?.find((listing) => listing.listingId === listingId);
  }, [listings]);

  const chartData = useMemo(() => {
    const toReturn = [];
    for (const [key, value] of Object.entries(
      selectedListing?.estimateHistory ?? {},
    )) {
      toReturn.push({
        x: key,
        y: value,
      });
    }
    return toReturn;
  }, [selectedListing]);

  const iconSize = 60;

  return (
    <Container>
      <DetailHeading />
      <ChartContainer>
        <h2 style={{ alignSelf: 'flex-start' }}>Estimate history</h2>
        <Paper
          sx={{ width: '100%', padding: '0.8rem', backgroundColor: '#000' }}
        >
          <ApexLineChart data={chartData} />
        </Paper>
      </ChartContainer>
      <StatsGrid>
        <ListingStat
          isMonetary
          icon={<MoneyBag width={iconSize} height={iconSize} />}
          statTitle="Annual revenue"
          statValue={selectedListing?.annualRevenue ?? 'N/A'}
        />
        <ListingStat
          isMonetary
          icon={<Stack width={iconSize} height={iconSize} />}
          statTitle="Estimated rent"
          statValue={selectedListing?.rentEstimate ?? 'N/A'}
        />
        <ListingStat
          icon={<Clock width={iconSize} height={iconSize} />}
          statTitle="Days listed"
          statValue={selectedListing?.daysListed ?? 'N/A'}
        />
        <ListingStat
          icon={<Agent width={iconSize} height={iconSize} />}
          statValue={selectedListing?.agent ?? 'N/A'}
        />
        <ListingStat
          icon={<LocationPin width={iconSize} height={iconSize} />}
          statValue={`${selectedListing?.city}, ${selectedListing?.state}`}
        />
        <ListingStat
          icon={<Hammer width={iconSize} height={iconSize} />}
          statValue={`Built ${selectedListing?.yearBuilt}`}
        />
      </StatsGrid>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  justify-content: flex-start;
  align-items: center;
`;

const StatsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  grid-gap: 2rem;
  justify-content: center;
`;

const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
