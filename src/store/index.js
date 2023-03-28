import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { devToolsEnhancer } from '@redux-devtools/extension';
import storage from 'redux-persist/lib/storage';
import filter from 'redux-persist-transform-filter';

import userReducer from './user/reducer';
import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import { LOCAL_STORAGE_KEY } from '../constants';

const saveSubsetFilter = filter('user', ['token']);

const persistConfig = {
	key: LOCAL_STORAGE_KEY,
	storage,
	transforms: [saveSubsetFilter],
	whitelist: ['user'],
};

const rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
});

const enhancer = devToolsEnhancer();

export const store = createStore(
	persistReducer(persistConfig, rootReducer),
	enhancer
);

export let persistor = persistStore(store);