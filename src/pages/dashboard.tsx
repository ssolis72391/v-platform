// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Grid, Typography, CardContent, Card, Box } from '@mui/material';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import { AppFeatured } from '@/sections/general/app';
import devStore, { storeActions as devActions } from '@/store/dev';
import { useSnapshot } from 'valtio';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'unset',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
// -------

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadingScreen = () => (
  <>
    <Button variant="contained" style={{ opacity: '0.5' }}>
      Connecting ..
    </Button>
    <Box sx={{ fontSize: '11px', paddingLeft: '4px', paddingTop: '4px', opacity: '0.65' }}>
      version: <strong>searching</strong>
    </Box>
  </>
);

const PureWebClient = dynamic(() => import('@/components/PureWeb/PureWebClient'), {
  loading: loadingScreen,
  ssr: false,
});

let PlanUpload: any;

if (typeof window !== 'undefined') {
  PlanUpload = dynamic(() => import('@/components/PlanUpload/PlanUpload'), {
    ssr: false,
  });
}

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const devState = useSnapshot(devStore);

  useEffect(() => {
    devActions.setActiveProject(null);
    console.log('active project nulled');
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth={'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
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

                <Typography variant="body1" sx={{ pb: { xs: 3, xl: 4 }, mx: 'auto' }}>
                  Get started in VIRTUALdesigner and launch your first project.
                </Typography>
                {devState.user.pwc && <PureWebClient track_event={'dashboard'} />}
              </CardContent>
            </RootStyle>
            {/* <Button onClick={screenActions.open_upload}>PDF</Button> */}
            <PlanUpload project_id={devState.active_project} />
          </Grid>

          <Grid item xs={12} md={7}>
            <AppFeatured />
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Active Users"
              percent={2.6}
              total={18765}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Installed"
              percent={0.2}
              total={4876}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Downloads"
              percent={-0.1}
              total={678}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget title="Conversion" total={38566} icon={'eva:person-fill'} chartData={48} />
              <AppWidget
                title="Applications"
                total={55566}
                icon={'eva:email-fill'}
                color="warning"
                chartData={75}
              />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
