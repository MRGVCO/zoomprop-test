import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ListingStatProps {
  icon: JSX.Element;
  statTitle?: string;
  statValue: string | number;
  isMonetary?: boolean;
}

const statStyle = {
  fontSize: '24px',
};

export const ListingStat = (props: ListingStatProps) => {
  const { icon, statTitle, statValue, isMonetary } = props;
  const theme = useTheme();
  return (
    <StatContainer>
      {icon}
      <Typography sx={statStyle}>
        {isMonetary ? (
          <>
            {statTitle ? `${statTitle}: ` : null}
            <span
              style={{
                color:
                  statValue === 'N/A' ? '#fff' : theme.palette.success.main,
              }}
            >
              {statValue
                ? `${
                    statValue !== 'N/A' ? '$' : ''
                  }${statValue.toLocaleString()}`
                : 'N/A'}
            </span>
          </>
        ) : (
          <>
            {statTitle ? `${statTitle}: ` : null}
            {statValue}
          </>
        )}
      </Typography>
    </StatContainer>
  );
};

const StatContainer = styled(Paper)`
  padding: 0.8rem;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
