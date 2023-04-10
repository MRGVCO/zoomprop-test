import { Listing } from '@/services';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  const theme = useTheme();
  const router = useRouter();

  const onDetailsClick = () => {
    router.push(`/listing?listingId=${listing.listingId}`);
  };

  return (
    <StyledCard>
      <CardMedia component="img" image={listing.primaryImageUrl as string} />
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Grid
          container
          spacing={2}
          columns={2}
          sx={{
            justifyItems: 'end',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Grid item>
            <Typography>{`$${listing.listPrice?.toLocaleString()}`}</Typography>
          </Grid>
          <Grid item>
            <Typography>{`${listing.beds} bedrooms`}</Typography>
          </Grid>
          <Grid item>
            <Typography>{`${listing.baths} bathrooms`}</Typography>
          </Grid>
          <Grid item>
            <Typography>
              {listing.customTags ? (
                <Chip
                  label={listing.customTags[0]}
                  sx={{ backgroundColor: theme.palette.info.dark }}
                />
              ) : (
                'No tags'
              )}
            </Typography>
          </Grid>
        </Grid>
        <SeeMoreBtn
          color={theme.palette.secondary.main}
          onClick={onDetailsClick}
        >
          <Typography>Details</Typography>
        </SeeMoreBtn>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  background-color: #000;
  display: flex;
  width: 600px;
`;

const SeeMoreBtn = styled.button<{ color: string }>`
  width: 100px;
  padding: 0.5rem;
  background-color: ${(props) => props.color};
  color: #fff;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4f37ed;
    cursor: pointer;
  }
`;
