import { proxy } from 'valtio';
import type { DrawerProps } from '@mui/material';
import Router from 'next/router';

interface stateType {
  open: boolean;
  mouse: string;
  unrealEvents: any[];
  devPanel: DrawerProps['anchor'];
  clientConfig: any;
  user: any;
  active_project: any;
  refetch_project: boolean;
}

const state: stateType = proxy({
  open: false,
  mouse: 'auto',
  unrealEvents: [],
  devPanel: 'left',
  clientConfig: null,
  user: {},
  active_project: null,
  refetch_project: false,
});

const storeActions = {
  toggle: () => {
    state.open = !state.open;
  },
  refetch_project: () => {
    state.refetch_project = !state.refetch_project;
  },
  setMouseAuto: () => {
    state.mouse = 'auto';
  },
  setMousePointer: () => {
    state.mouse = 'pointer';
  },
  setMouseCrosshair: () => {
    state.mouse = `url('/cursor_40x40.png') 20 20, auto`;
  },
  setActiveProject: (id: any) => {
    state.active_project = id;
    console.log('ACTIVE PROJECT--', id);
    if (Router.router?.pathname === '/projects/[id]' && Router.router?.query?.id != id) {
      // Router.push(`/projects/${id}`, undefined, { shallow: true });
      console.log('[router-push]', `/projects/${id}`);
      Router.push('/projects/[id]', `/projects/${id}`, { shallow: true });
    }
  },
};

export default state;
export { storeActions };
