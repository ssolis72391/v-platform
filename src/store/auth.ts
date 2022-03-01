import { proxy, subscribe } from 'valtio';

const LSKEY = 'vh-app-auth';

const defaultState = {
	name: '',
	email: '',
	username: '',
	token: null
};

const localState = localStorage.getItem(LSKEY);
const initialState = localState ? JSON.parse(localState) : defaultState;

const state = proxy(initialState);

subscribe(state, () => {
	localStorage.setItem(LSKEY, JSON.stringify(state));
});

const storeActions = {
	isLoggedIn: () => {
		if (state.token) return true;
		return false;
	},
	logout: () => {
		localStorage.removeItem(LSKEY);
	}
};

export default state;
export { storeActions };
