// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent, CardProps } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

interface AppWelcomeProps extends CardProps {
  displayName?: string;
}

export default function AppWelcome({ displayName }: AppWelcomeProps) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 5 },
          color: 'grey.800',
        }}
      >
        <Typography gutterBottom variant="h4">
          Welcome to VIRTUALhaus!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          Get started with your first project in VIRTUALdesigner
        </Typography>

        <Button variant="contained">Go Now</Button>
      </CardContent>
    </RootStyle>
  );
}
