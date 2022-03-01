import { m } from 'framer-motion';
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Logo from './Logo';
import screenStore from '@/store/screen';
import { useSnapshot } from 'valtio';
import { useEffect, useState } from 'react';
import { sample as _sample } from 'lodash';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000',
}));

const quotes = [
  'Putting on our Sunday best...',
  '“Life without dreaming is a life without meaning.” -Wale',
  "“Chewie, we're home.” — Han Solo",
  'Just keep swimming, just keep swimming....',
  '“Reality is wrong. Dreams are for real.” -Tupac Shakur',
  "“You can't stop the change, any more than you can stop the suns from setting.” — Shmi Skywalker",
  'Ensuring Everything Works Perfektly',
  "“You know the type: loud as a motorbike but wouldn't bust a grape in a fruit fight.”― Jay-Z",
  "“Well, if droids could think, there'd be none of us here, would there?” — Obi-Wan Kenobi",
];

const quote_time = 7; // seconds

// ----------------------------------------------------------------------

export default function LoadingPureWeb() {
  const screenState = useSnapshot(screenStore);
  const [time, setTime] = useState(Date.now());

  const escFunction = (event: any) => {
    if (event.key === 'Escape') {
      screenStore.loading = false;
      screenStore.loading_msg = '';
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escFunction);
    const interval = setInterval(() => setTime(Date.now()), quote_time * 1000);

    return () => {
      document.removeEventListener('keydown', escFunction);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    //@ts-ignore
    screenStore.loading_msg = _sample(quotes);
  }, [time]);

  return (
    <>
      <RootStyle>
        <Logo disabledLink sx={{ width: 64, height: 64 }} />

        <Box
          component={m.div}
          animate={{
            scale: [1.2, 1, 1, 1.2, 1.2],
            rotate: [270, 0, 0, 270, 270],
            opacity: [0.25, 1, 1, 1, 0.25],
            borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          }}
          transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
          sx={{
            width: 100,
            height: 100,
            borderRadius: '25%',
            position: 'absolute',
            border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
          }}
        />

        <Box
          component={m.div}
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          }}
          transition={{
            ease: 'linear',
            duration: 3.2,
            repeat: Infinity,
          }}
          sx={{
            width: 120,
            height: 120,
            borderRadius: '25%',
            position: 'absolute',
            border: (theme) => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
          }}
        />

        <Box
          sx={{
            textAlign: 'center',
            width: '50vw',
            height: '150px',
            position: 'absolute',
          }}
        >
          <Box
            sx={{
              fontSize: '14px',
              paddingTop: '160px',
              color: '#364759',
              whiteSpace: 'pre-line',
            }}
          >
            {screenState.loading_msg || ''}
          </Box>
        </Box>
      </RootStyle>
    </>
  );
}
