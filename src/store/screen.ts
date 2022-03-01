import { proxy } from 'valtio';

interface stateType {
  fullscreen: boolean;
  upload_modal: boolean;
  loading: boolean;
  loading_msg: string;
}

const state: stateType = proxy({
  fullscreen: false,
  upload_modal: false,
  loading: false,
  loading_msg: 'Something something something',
});

const storeActions = {
  toggle: () => {
    state.fullscreen = !state.fullscreen;
  },
  expand: () => {
    state.fullscreen = true;
  },
  close: () => {
    state.fullscreen = false;
  },
  set: (e: boolean) => {
    state.fullscreen = e;
  },
  open_upload: () => {
    console.log('screen', 'open_upload');
    state.upload_modal = true;
  },
  close_upload: () => {
    state.upload_modal = false;
  },
};

export default state;
export { storeActions };
