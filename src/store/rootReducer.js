import { combineReducers } from 'redux';

import reducer from './reducers/reducer';

const rootReducer = combineReducers({
	pokemon: reducer,
});

export default rootReducer;
