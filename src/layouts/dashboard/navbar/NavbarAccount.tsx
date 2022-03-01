// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// components
import MyAvatar from '../../../components/MyAvatar';
import devStore from '@/store/dev';
import { useSnapshot } from 'valtio';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined;
};

export default function NavbarAccount({ isCollapse }: Props) {
  const devState = useSnapshot(devStore);

  return (
    <NextLink href="/settings" passHref>
      <Link underline="none" color="inherit">
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: 'transparent',
            }),
          }}
        >
          <MyAvatar />

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap sx={{ fontSize: '13px' }}>
              {devState?.user?.first_name} {devState?.user?.last_name}
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: 'text.secondary', fontSize: '12px' }}>
              {devState?.user?.organization?.name}
            </Typography>
          </Box>
        </RootStyle>
      </Link>
    </NextLink>
  );
}
