/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
// import { fData } from '../../../utils/formatNumber';
// _mock
// import { countries } from '../../../_mock';
// components
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import devStore from '@/store/dev';
import { useSnapshot } from 'valtio';
import { useGetUserQuery, useUpdateUserMutation, Users_Set_Input } from '@/graphql';

// ----------------------------------------------------------------------

type FormValuesProps = Users_Set_Input;

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();
  //@ts-ignore
  const vh_user_id = user['https://hasura.io/jwt/claims']['x-hasura-user-uuid'];

  const {
    data: get_user_data,
    loading: get_user_loading,
    error: get_user_error,
    refetch: get_user_refetch,
  } = useGetUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      //@ts-ignore
      id: vh_user_id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateUserMutation, { loading: update_user_loading, error: update_user_error }] =
    useUpdateUserMutation();

  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
  });

  const handleDeleteAvatar = () => {
    updateUserMutation({
      variables: {
        pk: { id: vh_user_id },
        user: {
          avatar: null,
        },
      },
      onCompleted: () => {
        get_user_refetch();
      },
    });
  };

  const defaultValues = useMemo(
    () => ({
      first_name: get_user_data?.users_by_pk?.first_name || '',
      last_name: get_user_data?.users_by_pk?.last_name || '',
      avatar: get_user_data?.users_by_pk?.avatar || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [get_user_data]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
    devStore.user.first_name = defaultValues.first_name;
    devStore.user.last_name = defaultValues.last_name;
    devStore.user.avatar = defaultValues.avatar;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get_user_data]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await updateUserMutation({ variables: { pk: { id: vh_user_id }, user: data } });
      enqueueSnackbar('Update success!', {
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      await get_user_refetch();
      // reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      console.log(file);

      try {
        const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '_');
        const presign_avatar = await fetch(
          'https://hl7uh8lrxe.execute-api.us-east-1.amazonaws.com/staging/fn/avatar/presign',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: vh_user_id,
              filename: `${timestamp}_avatar.${file.type.split('/')[1]}`,
            }),
          }
        );
        const presign_avatar_data = await presign_avatar.json();

        const upload_avatar = await fetch(presign_avatar_data.url, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        });

        const avatar_url = presign_avatar_data.url.split('?')[0];

        setValue('avatar', avatar_url);

        updateUserMutation({
          variables: {
            pk: { id: vh_user_id },
            user: {
              avatar: avatar_url,
            },
          },
          onCompleted: () => {
            get_user_refetch();
          },
        });

        console.log(avatar_url);
      } catch (error) {
        console.log(error);
      }

      if (file) {
        // test
      }
    },
    [get_user_refetch, setValue, updateUserMutation, vh_user_id]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 5, pb: 6, px: 3, textAlign: 'center' }}>
            <Box sx={{ pb: '2px', fontSize: '16px' }}>
              {get_user_data?.users_by_pk?.first_name} {get_user_data?.users_by_pk?.last_name}
            </Box>
            <Box sx={{ pb: '20px', fontSize: '14px', opacity: 0.65 }}>
              {get_user_data?.users_by_pk?.email}
            </Box>
            <RHFUploadAvatar
              name="avatar"
              accept={['image/jpg', 'image/jpeg', 'image/png']}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  <Box sx={{ pb: 2 }}>Allowed image types: jpg or png</Box>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: 'unset', fontWeight: 300, fontSize: '12px' }}
                    onClick={handleDeleteAvatar}
                  >
                    delete avatar image
                  </Button>
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <RHFTextField name="first_name" label="First Name" />
              <RHFTextField name="last_name" label="Last Name" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              {/* <RHFTextField name="about" multiline rows={4} label="About" /> */}

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
