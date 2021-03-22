import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';
import Layout from './components/Layout';
import axios from 'axios';
import { UserContext, UserDispatchContext } from './context/UserContext';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	useEffect(() => {
		if (data && data.status === 200) {
			setAuthorised(true);
		}
	}, [data]);
	const [authorised, setAuthorised] = useState();
	const user = useContext(UserContext);
	const setUser = useContext(UserDispatchContext);

	const { isLoading, error, data } = useQuery('getUser', async () => {
		const res = await axios.get('/api/user', {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		});
		if (res.status === 200) {
			setUser(res.data.user);
			setAuthorised(true);
		}
		return res;
	});

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<Route
			{...rest}
			render={(props) => {
				if (authorised) {
					return (
						<Layout>
							<Component {...props} />
						</Layout>
					);
				} else if (!authorised && !isLoading) {
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};
