import { proxy, subscribe } from 'valtio';

const localState = localStorage.getItem('localState');
const initialState = localState ? JSON.parse(localState) : { count: 0 };

const state = proxy(initialState);

subscribe(state, () => {
	localStorage.setItem('localState', JSON.stringify(state));
});

const storeActions = {
	increase: () => {
		++state.count;
	},
	decrease: () => {
		--state.count;
	},
	reset: () => {
		state.count = 0;
	},
	clearLocalStorage: () => {
		localStorage.removeItem('localState');
	}
};

export default state;
export { storeActions };
