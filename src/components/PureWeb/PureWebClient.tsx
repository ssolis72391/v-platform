/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import useAsyncEffect from 'use-async-effect';
import devStore, { storeActions as devActions } from '@/store/dev';
import screenStore, { storeActions as screenActions } from '@/store/screen';
import { useSnapshot, subscribe } from 'valtio';
import * as qs from 'query-string';
import { nanoid } from 'nanoid';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import unrealMqStore, { storeActions as unrealMqActions } from '@/store/unreal_mq';
import LoadingPureWeb from '@/components/LoadingPureWeb';

import {
  LaunchStatusEvent,
  LaunchStatusType,
  ModelDefinition,
  PlatformNext,
  UndefinedModelDefinition,
  InputEmitter,
  DefaultStreamerOptions,
  StreamerStatus,
  LoggerProvider,
} from '@pureweb/platform-sdk';

import {
  useStreamer,
  useLaunchRequest,
  IdleTimeout,
  LaunchRequestOptions,
  VideoStream,
  System,
} from '@pureweb/platform-sdk-react';

import { clientOptions } from './Client';
import LaunchView from './Launch';
import { Box } from '@mui/material';

const logger = LoggerProvider.getLogger('client');

interface LoadingProps {
  LaunchRequestStatus: LaunchStatusEvent;
  StreamerStatus: StreamerStatus;
}

const DownloadExcelFn = async (projectID: string) => {
  const project_data = await fetch(`https://api.vhaus.io/api/rest/projects/${projectID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${devStore.user.token}`,
    },
  });
  const project_json = await project_data.json();
  console.log(project_json);
  const dl_file = window.open(
    project_json.projects_by_pk.takeoff_file,
    '_blank',
    'noopener,noreferrer'
  );
  if (dl_file) dl_file.opener = null;
  return true;
};

const LoadingView: React.FC<LoadingProps> = (props: LoadingProps) => {
  if (
    props.StreamerStatus === StreamerStatus.Connected ||
    props.StreamerStatus === StreamerStatus.Completed
  ) {
    return <div />;
  }

  let content;

  if (props.StreamerStatus === StreamerStatus.NotSupported) {
    content = (
      <div>
        <h3>Your browser does not support the necessary WebRTC capabilities.</h3>
      </div>
    );
  } else if (
    props.LaunchRequestStatus.status === LaunchStatusType.Unavailable ||
    props.LaunchRequestStatus.status === LaunchStatusType.Error ||
    props.StreamerStatus === StreamerStatus.Failed
  ) {
    screenStore.loading = false;
    content = (
      <div>
        <h3>The experience is presently unavailable.</h3>
        <h3>Please refresh to request a new session.</h3>
      </div>
    );
  } else {
    return <LoadingPureWeb />;
  }
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div style={{ textAlign: 'center' }}>{content}</div>
    </div>
  );
};

interface ViewProps {
  LaunchRequestStatus: LaunchStatusEvent;
  StreamerStatus: StreamerStatus;
  VideoStream: MediaStream;
  InputEmitter: InputEmitter;
  UseNativeTouchEvents: boolean;
  UsePointerLock: boolean;
  PointerLockRelease: boolean;
}

const EmbeddedView: React.FC<ViewProps> = (props: ViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // const [isFull, setIsFull] = useState(false);
  const [lightIsOn, toggleLight] = useState(false);

  const devState = useSnapshot(devStore);
  const screenState = useSnapshot(screenStore);
  const mouseType = devState.mouse;
  const handleOpen = () => screenActions.open_upload();

  function sendLightInfoToGame() {
    //flip the state of lightIsOn
    //ie: if the icon was on (TRUE) we'll turn if off (FALSE)
    toggleLight(!lightIsOn);

    const listenObject = {
      ClientType: 'PureWeb',
    };

    const reactType = {
      ReactEvent: {
        client_type: 'react',
      },
    };

    // devActions.toggle();

    //platform.disconnect();

    //send a message to the game about the light
    // console.log(listenObject);
    // console.log(reactType);
    // props.InputEmitter.EmitUIInteraction(listenObject);
    // props.InputEmitter.EmitUIInteraction(reactType);
    // props.InputEmitter.EmitUIInteraction('TEST');
  }

  // props.InputEmitter.EmitUIInteraction({
  // 	ClientType: 'PureWeb'
  // });

  // Fullscreen API presently supported on iPad, but not iPhone or iPod
  const isIPhone = System.Browser().os === 'iOS' && !window.navigator.userAgent.includes('iPad');
  return (
    <div
      className="pwclient"
      style={{
        height: '100%',
        position: 'fixed',
        zIndex: 9000,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000',
        cursor: mouseType,
        overflow: 'hidden',
      }}
    >
      <IdleTimeout
        Status={props.StreamerStatus}
        WarningThreshold={300}
        ExitThreshold={120}
        WarningCallback={() => (screenStore.fullscreen = false)}
        ExitCallback={() => window.location.reload()} // TODO: How to 'close' a contribution?
      />

      <LoadingView
        LaunchRequestStatus={props.LaunchRequestStatus}
        StreamerStatus={props.StreamerStatus}
      />
      <VideoStream
        VideoRef={videoRef}
        Emitter={props.InputEmitter}
        Stream={props.VideoStream}
        UseNativeTouchEvents={props.UseNativeTouchEvents}
        UsePointerLock={props.UsePointerLock}
        PointerLockRelease={props.PointerLockRelease}
      />

      {screenState.fullscreen ? (
        ''
      ) : (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => (screenStore.fullscreen = true)}
          style={{ position: 'absolute', top: 10, right: 10, display: 'none' }}
          className={
            isIPhone || screenState.fullscreen || props.StreamerStatus !== StreamerStatus.Connected
              ? 'hidden'
              : ''
          }
        >
          <FullscreenIcon />
        </Button>
      )}

      <Button
        onClick={() => {
          devActions.setActiveProject('221fed82-c6ea-40af-b1b2-9a41081fa047');
        }}
        style={{ position: 'absolute', top: 50, right: 10, display: 'none' }}
        className={props.StreamerStatus !== StreamerStatus.Connected ? 'hidden' : ''}
      >
        <span>Switch Project</span>
      </Button>

      <Button
        onClick={() => {
          screenStore.upload_modal = true;
        }}
        style={{ position: 'absolute', top: 50, right: 10, display: 'none' }}
        className={props.StreamerStatus !== StreamerStatus.Connected ? 'hidden' : ''}
      >
        <span>PDF</span>
      </Button>

      {props.StreamerStatus !== StreamerStatus.Connected && (
        <img
          alt="VIRTUALhaus Logo"
          src="/images/virtualhaus_300x300.png"
          style={{
            display: 'none',
            position: 'absolute',
            bottom: 50,
            right: 10,
          }}
        />
      )}
    </div>
  );
};

// Initialize audio.
// load() must be called from a user interaction, especially to retain iOS audio
// this can be 'mouseup', 'touchend' or 'keypress'
// Pass the audioStream created from useStreamer as the srcObject to play game audio.
// const audio = new Audio();
// audio.autoplay = true;
// audio.volume = 0.5;

const query = qs.parse(window.location.search);
clientOptions.ProjectId = (query['project'] as string) ?? devStore.user.pwc?.project;
clientOptions.ModelId = (query['model'] as string) ?? devStore.user.pwc?.model;
clientOptions.Version = (query['version'] as string) ?? devStore.user.pwc?.version;

// Initialize platform reference
const platform = new PlatformNext();
platform.initialize({
  endpoint: clientOptions.Endpoint || 'https://api.pureweb.io',
});

interface AppProps {
  reload: () => void;
  track_event: string;
}

const App: React.FC<AppProps> = ({ reload, track_event }) => {
  const [modelDefinitionUnavailable, setModelDefinitionUnavailable] = useState(false);
  const [modelDefinition, setModelDefinition] = useState(new UndefinedModelDefinition());
  const [availableModels, setAvailableModels] = useState<ModelDefinition[]>();
  const [launchRequestError, setLaunchRequestError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const streamerOptions = DefaultStreamerOptions;

  document.body.style.overflow = 'unset';

  devStore.clientConfig = {
    ...clientOptions,
    timestamp: new Date().toJSON().substring(10, 19).replace('T', ' '),
  };

  console.log('CLIENT', clientOptions);

  useAsyncEffect(async () => {
    if (clientOptions.ProjectId) {
      logger.info('Initializing available models: ' + clientOptions.ProjectId);
      try {
        await platform.useAnonymousCredentials(
          clientOptions.ProjectId,
          clientOptions.EnvironmentId
        );
        await platform.connect();
        logger.info('Agent Connected: ' + platform.agent.id);
        // console.log(platform.agent);
        streamerOptions.iceServers = platform.agent.serviceCredentials.iceServers as RTCIceServer[];
        streamerOptions.forceRelay = clientOptions.ForceRelay;
        const models = await platform.getModels();
        setAvailableModels(models);
        logger.debug('Available models', models);
      } catch (err) {
        logger.error(err);
      }
    }
  }, [clientOptions]);

  useEffect(() => {
    if (availableModels?.length) {
      const selectedModels = availableModels.filter(function (model: ModelDefinition): boolean {
        if (clientOptions.ModelId === model.id) {
          // If there is a version specified and we encounter it
          if (clientOptions.Version && clientOptions.Version === model.version) {
            return true;
          }
          // If there is no version specified and we find the primary version
          if (!clientOptions.Version && model.active) {
            return true;
          }
        }
        return false;
      });
      if (selectedModels?.length) {
        setModelDefinition(selectedModels[0]);
      } else {
        setModelDefinitionUnavailable(true);
      }
    }
  }, [availableModels]);

  const launchRequestOptions: LaunchRequestOptions = {
    regionOverride: '',
    virtualizationProviderOverride: '',
  };
  const [status, launchRequest, queueLaunchRequest] = useLaunchRequest(
    platform,
    modelDefinition,
    launchRequestOptions
  );
  const [streamerStatus, emitter, videoStream, audioStream, messageSubject] = useStreamer(
    platform,
    launchRequest,
    streamerOptions
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const updateSize = () => {
      if (streamerStatus === StreamerStatus.Connected) {
        const data = {
          type: 'set_window_dimensions',
          msg: {
            window_width: window.innerWidth,
            window_height: window.innerHeight,
          },
        };

        unrealMqActions.send(data.type, data.msg);
      }
    };
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        updateSize();
      }, 750);
    };

    const keyListener = (event: KeyboardEvent) => {
      if (streamerStatus === StreamerStatus.Connected) {
        if (event.key === 'Escape') {
          const data = {
            type: 'key_press_esc',
            msg: null,
          };

          unrealMqActions.send(data.type, data.msg);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keyup', keyListener, false);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keyup', keyListener, false);
    };
  }, [streamerStatus]);

  useEffect(() => {
    if (streamerStatus === StreamerStatus.Failed) {
      platform.disconnect();
    }
  }, [streamerStatus]);

  // if (audioStream) {
  //   audio.srcObject = audioStream;
  // }

  const launch = async () => {
    setLoading(true);
    screenStore.loading = true;
    // audio.load();

    if (clientOptions.LaunchType !== 'local') {
      try {
        await queueLaunchRequest();
      } catch (err: any) {
        setLaunchRequestError(err);
      }
    }
  };

  // Log status messages
  useEffect(() => {
    logger.info('Status', status, streamerStatus);
  }, [status, streamerStatus]);

  // Subscribe to game messages
  useEffect(() => {
    console.log('XXXXXXXXXXXX--=-=-=--=----------=-=-=-USEEFFECT');

    // Unreal<>React MQ
    logger.info('UMQ', 'MESSAGEQ SUBSCRIBED');
    const unrealmqunscub = subscribe(unrealMqStore, () => {
      // logger.info('UMQ', 'Change Event:');
      // console.log('unrealMqStore.messages has changed to', unrealMqStore.messages);

      const messages = unrealMqStore.messages.filter((message) => message.status === 'pending');
      const toDelete: any[] = [];

      // logger.info('UMQ', messages.length, messages);
      if (messages.length > 0) {
        messages.forEach((item, index, og) => {
          console.log(item);
          const reactmsg = {
            ReactEvent: {
              // @ts-ignore
              action: item.type,
              // @ts-ignore
              ...item.msg,
            },
          };
          console.log(reactmsg);
          emitter.EmitUIInteraction(reactmsg);
          toDelete.push(item.id);
        });

        const queueDelete = new Set(toDelete);
        const newArray = unrealMqStore.messages.filter((obj) => !queueDelete.has(obj.id));
        // logger.info('UMQ', 'OLD:', unrealMqStore.messages);
        // logger.info('UMQ', 'NEW:', newArray);
        unrealMqStore.messages = unrealMqStore.messages.filter((obj) => !queueDelete.has(obj.id));
      } else {
        // console.log('No Messages Pending');
      }
    });

    const subscription = messageSubject.subscribe(
      (value: string) => {
        logger.info('Message: ' + value);
        const message = JSON.parse(value);
        if (message.hasOwnProperty('UnrealEvent')) {
          // alert(message.UnrealEvent);
          devStore.unrealEvents.unshift({
            id: nanoid(),
            ...message.UnrealEvent,
            timestamp: new Date().toJSON().substring(10, 19).replace('T', ' '),
          });

          logger.info(message.UnrealEvent);

          // console.log('XXXXXXX--===============--==================================');

          if (message.UnrealEvent.hasOwnProperty('ui')) {
            if (message.UnrealEvent.ui === 'set_cursor_default') {
              devActions.setMouseAuto();
            }
            if (message.UnrealEvent.ui === 'set_cursor_crosshair') {
              devActions.setMouseCrosshair();
            }
            if (message.UnrealEvent.ui === 'set_cursor_grab') {
              devActions.setMousePointer();
            }
          }

          // console.log('XXXXXXX--===============--==================================');

          if (message.UnrealEvent.action == 'pdf_upload') {
            screenStore.upload_modal = true;
          }

          // console.log('XXXXXXX--===============--==================================');

          if (message.UnrealEvent.action == 'exit_app') {
            devActions.refetch_project();
            platform?.disconnect();
            reload();
          }

          // console.log('XXXXXXX--===============--==================================');

          if (message.UnrealEvent.action == 'start_loading') {
            screenStore.loading = true;
            screenStore.loading_msg = message.UnrealEvent.message || '';
          }

          if (message.UnrealEvent.action == 'stop_loading') {
            screenStore.loading = false;
            screenStore.loading_msg = '';
          }

          // console.log('XXXXXXX--===============--==================================');

          if (message.UnrealEvent.action == 'GetUser') {
            const userProfile = {
              ReactEvent: {
                user_id: devStore.user['https://hasura.io/jwt/claims']['x-hasura-user-uuid'],
                organization_id: devStore.user['https://hasura.io/jwt/claims']['x-hasura-org-id'],
                email: devStore.user.email,
                avatar: devStore.user.picture,
                token: devStore.user.token,
              },
            };
            emitter.EmitUIInteraction(userProfile);
            console.log(userProfile);
          }

          // console.log('XXXXXXX--===============--==================================');

          if (message.UnrealEvent.action == 'GetClientType') {
            const getClientType = {
              ReactEvent: {
                client_type: 'react',
                app: 'designer',
                project: devStore.active_project,
                window_width: window.innerWidth,
                window_height: window.innerHeight,
              },
            };
            emitter.EmitUIInteraction(getClientType);
            console.log(getClientType);
          }

          // console.log('XXXXXXX--===============--==================================');

          if (message.UnrealEvent.action == 'DownloadExcel') {
            console.log('ProjectID: ' + message.UnrealEvent.data);
            const excel_res = DownloadExcelFn(message.UnrealEvent.data);
          }

          // console.log('XXXXXXX--===============--==================================');

          if (message.UnrealEvent.action == 'set_active_project') {
            console.log('Setting Project ID: ' + message.UnrealEvent.data);
            devActions.setActiveProject(message.UnrealEvent.data);
          }

          // console.log('XXXXXXX--===============--==================================');

          if (message.UnrealEvent.action == 'ExcelExport') {
            console.log('EXCELEVENT');
            const datastream =
              'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
              message.UnrealEvent.data;
            console.log('EXCELEVENT2222');
            console.log(datastream);
            fetch(datastream)
              .then((res) => res.blob())
              .then((url) => {
                const excelUrl = window.URL.createObjectURL(url);
                const a = document.createElement('a');
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', excelUrl);
                a.setAttribute('download', 'Project-Takeoff-data.xlsx');
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(excelUrl);
              });
          }

          // console.log('XXXXXXX--===============--==================================');
        }
      },
      (err) => {
        logger.error(err);
      }
    );

    return () => {
      subscription.unsubscribe();
      unrealmqunscub();
    };
  }, [messageSubject, emitter, reload]);

  // Notify user of missing or errors in configuration
  if (!clientOptions.isValid()) {
    return (
      <div>
        <p>
          Your client has one or more configuration errors. Please consult the{' '}
          <a href="https://www.npmjs.com/package/@pureweb/cra-template-pureweb-client"> README </a>{' '}
          for details on how to configure the client template.
        </p>
      </div>
    );
  }

  if (modelDefinitionUnavailable) {
    return (
      <div>
        <span>The model that you have requested does not exist</span>
      </div>
    );
  }

  if (launchRequestError) {
    return (
      <div>
        <span>
          {process.env.NODE_ENV === 'development'
            ? `There was an error with the launch request: ${launchRequestError}`
            : 'It appears the requested model is currently not online as per your set schedule. Please contact support if it should be available.'}
        </span>
      </div>
    );
  }

  // Begin connection
  if (streamerStatus === StreamerStatus.Disconnected) {
    return (
      <div>
        <h6>Disconnected from stream</h6>
      </div>
    );
  }

  if (streamerStatus === StreamerStatus.Failed) {
    return (
      <div>
        {/* <h6>Failure during stream</h6> */}
        <h6>Please refresh to request a new session</h6>
      </div>
    );
  }

  if (streamerStatus === StreamerStatus.Withdrawn) {
    console.log('Streamer contribution withdrawn');
    platform.disconnect();
    reload();
  }

  if (loading) {
    document.body.style.overflow = 'hidden';
    return (
      <EmbeddedView
        VideoStream={videoStream}
        StreamerStatus={streamerStatus as StreamerStatus}
        LaunchRequestStatus={status}
        InputEmitter={emitter}
        UseNativeTouchEvents={clientOptions.UseNativeTouchEvents!}
        UsePointerLock={clientOptions.UsePointerLock!}
        PointerLockRelease={clientOptions.PointerLockRelease!}
      />
    );
  } else if (clientOptions.LaunchType !== 'local' && !availableModels) {
    return (
      <>
        <Button variant="contained" style={{ opacity: '0.65' }}>
          Initializing ..
        </Button>
        <Box sx={{ fontSize: '11px', paddingLeft: '4px', paddingTop: '4px', opacity: '0.75' }}>
          version: <strong>{clientOptions.Version}</strong>
        </Box>
      </>
    );
  } else if (clientOptions.LaunchType !== 'local' && !availableModels?.length) {
    return (
      <div>
        <h2>No models are currently available in this environment.</h2>
      </div>
    );
  } else {
    return <LaunchView Launch={launch} Version={clientOptions.Version} track_event={track_event} />;
  }
};

const PureWebClient: React.FC<{ track_event: string }> = ({ track_event }) => {
  const [reload, setReload] = useState(false);
  const isClientValid = clientOptions.isValid();

  const handleReload = () => {
    setReload(!reload);
  };

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  if (reload) {
    return <div>Reloading</div>;
  }

  return System.IsBrowserSupported() ? (
    <>
      <App track_event={track_event} reload={handleReload} />
    </>
  ) : (
    <div>Not Supported</div>
  );
};

export default PureWebClient;
