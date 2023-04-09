import { Listing } from '@/services';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/router';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  const router = useRouter();

  const onCardClick = () => {
    router.push(`/listing?listingId=${listing.listingId}`);
  };

  return (
    <StyledCard onClick={onCardClick}>
      <CardMedia component="img" image={listing.primaryImageUrl as string} />
      <CardContent>
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
                <Chip label={listing.customTags[0]} color="secondary" />
              ) : (
                'No tags'
              )}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  background-color: #000;
  display: flex;
  width: 600px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 6px #000;
  }
`;
