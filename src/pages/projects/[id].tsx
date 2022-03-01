/* eslint-disable @typescript-eslint/no-unused-vars */
// @mui
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Button, Container, Grid, Typography, CardContent, Card, Box, Stack } from '@mui/material';
// layouts
import Layout from '../../layouts';
import { useSnackbar } from 'notistack';
// components
import Page from '../../components/Page';
// sections
import devStore, { storeActions as devActions } from '@/store/dev';
import { useSnapshot } from 'valtio';

import dynamic from 'next/dynamic';
import { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
  Projects_Set_Input,
  Projects_Pk_Columns_Input,
} from '@/graphql';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';

import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '@/components/hook-form';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'unset',
  backgroundColor: theme.palette.background.paper,
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

ProjectPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

type FormValuesProps = Projects_Set_Input;

export default function ProjectPage() {
  const router = useRouter();
  const devState = useSnapshot(devStore);
  const { enqueueSnackbar } = useSnackbar();
  const downloadLaunch = useRef();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    data: get_project_data,
    loading: get_project_loading,
    error: get_project_error,
    refetch: get_project_refetch,
  } = useGetProjectQuery({
    fetchPolicy: 'cache-and-network',
    // pollInterval: 30 * 1000,
    variables: {
      id: router.query.id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateProjectMutation, { loading: update_project_loading, error: update_project_error }] =
    useUpdateProjectMutation();

  console.log('[router]', router);

  useEffect(() => {
    devActions.setActiveProject(router.query?.id || null);
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: get_project_data?.projects_by_pk?.id || '',
      title: get_project_data?.projects_by_pk?.title || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [get_project_data]
  );

  useEffect(() => {
    get_project_refetch();
  }, [devState.refetch_project, get_project_refetch]);

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get_project_data]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // const pk_id: Projects_Pk_Columns_Input = data.id;
      console.log('CCCCC', data);
      await updateProjectMutation({ variables: { pk: { id: data.id }, project: data } });
      enqueueSnackbar('Update success!', {
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      await get_project_refetch();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadTakeoff = (event: any) => {
    document?.getElementById('downloadLink')?.click();
    console.log(event);
  };

  return (
    <Page title="Project">
      <Container maxWidth={'lg'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RootStyle>
              <CardContent
                sx={{
                  p: { md: 5 },
                }}
              >
                <Typography gutterBottom variant="h4">
                  {get_project_data?.projects_by_pk?.title || 'Loading...'}
                </Typography>
                {devState.user.pwc && <PureWebClient track_event={'project-page'} />}
              </CardContent>
            </RootStyle>
            {/* <Button onClick={screenActions.open_upload}>PDF</Button> */}
            <PlanUpload project_id={devState.active_project} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ paddingBottom: '20px;' }}>
                      Project Settings
                    </Typography>
                    <Box
                      sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                      }}
                    >
                      <RHFTextField name="title" label="Project Title" />
                    </Box>

                    <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        {'Save Changes'}
                      </LoadingButton>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </FormProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ paddingBottom: '20px;' }}>
                Takeoff Data
              </Typography>
              <Box>
                {get_project_data?.projects_by_pk?.takeoff_file ? (
                  <>
                    <Button
                      id={'test'}
                      variant="contained"
                      download="true"
                      href={get_project_data?.projects_by_pk?.takeoff_file}
                    >
                      Hidden
                    </Button>
                    <Button variant="contained" onClick={handleDownloadTakeoff}>
                      Download
                      <span style={{ fontWeight: 100, textTransform: 'lowercase' }}>
                        &nbsp;XLSX
                      </span>
                    </Button>
                  </>
                ) : (
                  <Typography variant="body2">
                    Takeoff download will be available after saving walls/trim in designer.
                  </Typography>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
