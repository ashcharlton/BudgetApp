import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Card } from 'antd';
import { Flex, Box } from 'reflexbox';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function Login() {
	const [form] = Form.useForm();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { isLoading, error, data, refetch } = useQuery(
		[
			'login',
			{
				email,
				password,
			},
		],
		(props) => {
			return axios
				.post('/api/auth/login', {
					email: props.queryKey[1].email,
					password: props.queryKey[1].password,
				})
				.then(function (res) {
					return res;
				})
				.catch(function (err) {
					throw err;
				});
		},
		{
			enabled: false,
			refetchOnWindowFocus: false,
		}
	);

	const onFinish = (values) => {
		refetch();
	};

	if (data) {
		if (data.status === 200) {
			localStorage.setItem('token', data.data.token);
			return (
				<Redirect
					to={{
						pathname: '/',
						state: {
							from: '/login',
						},
					}}
				/>
			);
		}
	}

	return (
		<Flex justifyContent='center' mt={6}>
			<Box width={1 / 4}>
				<Card>
					<Box>
						<Form name='login' onFinish={onFinish} layout='vertical'>
							<Form.Item label='Email Address' name='email'>
								<Input onChange={(event) => setEmail(event.target.value)} />
							</Form.Item>
							<Form.Item label='Password' name='password'>
								<Input.Password
									onChange={(event) => setPassword(event.target.value)}
								/>
							</Form.Item>
							<Form.Item>
								<Flex justifyContent='space-between'>
									<Button type='link' href='/register' loading={isLoading}>
										Register
									</Button>
									<Button htmlType='submit' loading={isLoading}>
										Login
									</Button>
								</Flex>
							</Form.Item>
						</Form>
					</Box>
				</Card>
			</Box>
		</Flex>
	);
}
