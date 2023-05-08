// Styling for Listing Item component

const itemStyles = {
  container: {
    marginRight: '65px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 5,
  },
  backIcon: {
    cursor: 'pointer',
  },
  title: {
    cursor: 'pointer',
  },
  propertyDetailsTitle: {
    mb: 5,
    variant: 'h2',
  },
  propertyDetailsContainer: {
    display: 'flex',
    gap: 5,
    '@media (max-width: 1279px)': {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  imageContainer: {
    flex: '0 0 40%',
    '@media (max-width: 1279px)': {
      flex: '0 0 100%',
    },
  },
  listingDetailsContainer: {
    flex: '0 0 60%',
    '@media (max-width: 1279px)': {
      flex: '0 0 100%',
    },
    '& > div': {
      display: 'flex',
      pb: 1.3,
      pt: 1.3,
      '& > *': {
        flex: '0 0 50%',
      },
    },
  },
  moreInfoTitle: {
    mb: 5,
    mt: 5,
  },
  moreInfoContainer: {
    width: {
      md: '100%',
      lg: '50%',
    },
  },
}

export default itemStyles
