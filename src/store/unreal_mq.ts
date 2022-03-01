import { proxy } from 'valtio';
import { v4 as uuidv4 } from 'uuid';

const sampleMsg = {
  id: '000-000-000',
  type: 'action',
  status: 'pending',
  msg: { id: 'test' },
};

interface messageProps {
  id: string;
  type: string;
  status: string;
  msg: any;
}

interface stateType {
  messages: messageProps[];
}

const state: stateType = proxy({
  messages: [],
});

const storeActions = {
  send: (type: string, msg: any) => {
    // console.log('Adding to mq');
    state.messages.push({
      id: uuidv4(),
      type: type,
      status: 'pending',
      msg: msg,
    });
  },
};

export default state;
export { storeActions };
