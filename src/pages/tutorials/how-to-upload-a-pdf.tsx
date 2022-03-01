/* eslint-disable @typescript-eslint/no-unused-vars */
import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { Container, Tab, Box, Tabs, Card, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from '@/sections/user/account';
import Link from 'next/link';

// ----------------------------------------------------------------------

UserAccount.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserAccount() {
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    // {
    //   value: 'change_password',
    //   icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
    //   component: <AccountChangePassword />,
    // },
  ];
  return (
    <Page title="Tutorials">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="How to Upload a PDF"
          sx={{ mb: '15px' }}
          links={[{ name: '', href: '' }]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Link passHref href="/tutorials">
              <Card sx={{ boxShadow: 'unset', p: 4, cursor: 'pointer' }}>
                <Box>Back to Tutorials</Box>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
