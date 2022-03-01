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
import Head from 'next/head';

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
    <>
      <Head>
        <script src="https://fast.wistia.com/embed/medias/20r76t1yno.jsonp" async />
        <script src="https://fast.wistia.com/assets/external/E-v1.js" async />
      </Head>
      <Page title="Tutorials">
        <Container maxWidth={'lg'}>
          <HeaderBreadcrumbs
            heading="How to Create a Room"
            sx={{ mb: '10px' }}
            links={[{ name: 'Back to Tutorials', href: '/tutorials' }]}
            activeLast={true}
          />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ boxShadow: 'unset', p: 2, mt: 2 }}>
                <Box>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        "<div class='wistia_responsive_padding' style='padding:56.25% 0 0 0;position:relative;'><div class='wistia_responsive_wrapper' style='height:100%;left:0;position:absolute;top:0;width:100%;'><div class='wistia_embed wistia_async_20r76t1yno seo=false videoFoam=true' style='height:100%;position:relative;width:100%'><div class='wistia_swatch' style='height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;'><img src='https://fast.wistia.com/embed/medias/20r76t1yno/swatch' style='filter:blur(5px);height:100%;object-fit:contain;width:100%;' alt='' aria-hidden='true' onload='this.parentNode.style.opacity=1;' /></div></div></div></div>",
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
}
