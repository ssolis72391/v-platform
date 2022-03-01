import { proxy } from 'valtio';
import { v4 as uuidv4 } from 'uuid';

const sampleMsg = {
	id: '000-000-000',
	type: 'action',
	status: 'pending',
	msg: { id: 'test' }
};

interface stateType {
	messages: any;
}

const state: stateType = proxy({
	messages: []
});

const storeActions = {
	sendccccc: (type: string, msg: any) => {
		console.log('Adding to mq');
		state.messages = [
			{
				id: '7',
				type: '7',
				status: 'pending',
				msg: 'test'
			}
		];
	},
	send: (type: string, msg: any) => {
		console.log('Adding to mq');
		state.messages = [];
	}
};

export default state;
export { storeActions };
