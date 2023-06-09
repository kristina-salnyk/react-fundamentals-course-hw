import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Loader } from '../../common/Loader';
import { fetchUser } from '../../store/user/thunk';
import { LOCAL_STORAGE_KEY } from '../../constants';

const AuthMiddleware = ({ children }) => {
	const dispatch = useDispatch();
	const initDataFetched = useRef(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (initDataFetched.current) return;
		initDataFetched.current = true;

		const serializedToken = window.localStorage.getItem(LOCAL_STORAGE_KEY);

		if (!serializedToken) {
			setIsLoading(false);
			return;
		}

		const { token } = JSON.parse(serializedToken);

		dispatch(fetchUser(token, setIsLoading));
	}, [dispatch]);

	if (isLoading) return <Loader />;

	return children;
};

export default AuthMiddleware;

AuthMiddleware.propTypes = {
	children: PropTypes.element.isRequired,
};
