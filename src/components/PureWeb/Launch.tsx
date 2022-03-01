import Button from '@mui/material/Button';

import styles from './Launch.module.css';
import { Box } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

interface LaunchProps {
  Launch: () => void;
  Version: string | undefined;
  track_event: string | undefined;
}

const LaunchView: React.FC<LaunchProps> = (props: LaunchProps) => {
  const handleTrackEvent = () => {
    const app_version =
      process.env.NEXT_CONFIG_BUILD_ID && process.env.NEXT_CONFIG_BUILD_ID.length >= 40
        ? process.env.NEXT_CONFIG_BUILD_ID?.substring(0, 7)
        : process.env.NEXT_CONFIG_BUILD_ID;

    //@ts-ignore
    window.LOQ = window.LOQ || [];
    //@ts-ignore
    window.LOQ.push([
      'ready',
      (LO: any) => {
        LO.events.track('Launch PureWeb', {
          location: props.track_event || 'undefined',
          pw_version: props.Version,
          app_version: app_version,
          domain: window.location.origin,
        });
      },
    ]);
  };

  const handleOnClick = () => {
    handleTrackEvent();
    props.Launch();
  };

  return (
    <>
      <Button
        variant="contained"
        className={styles.launcher}
        endIcon={<DoubleArrowIcon />}
        onClick={handleOnClick}
      >
        VIRTUAL<span style={{ fontWeight: 100, textTransform: 'lowercase' }}>designer</span>
      </Button>
      <Box sx={{ fontSize: '11px', paddingLeft: '4px', paddingTop: '4px', opacity: '0.75' }}>
        version: <strong>{props.Version}</strong>
      </Box>
    </>
  );
};

export default LaunchView;
