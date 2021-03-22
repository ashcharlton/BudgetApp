import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import {
	Spin,
	Button,
	Drawer,
	Form,
	Input,
	Select,
	Menu,
	Dropdown,
} from 'antd';
import {
	PlusCircleOutlined,
	CreditCardOutlined,
	DownOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';
import {
	AccountContext,
	AccountDispatchContext,
} from '../../context/AccountContext';

const StyledDrowdown = styled(Dropdown)`
	background: #f5f8fb;
	border-radius: 5px;
`;

const StyledCard = styled(Flex)``;

const StyledMenuItem = styled(Menu.Item)`
	:hover {
		background: #f5f8fb;
		border-radius: 5px;
	}
	width: 95%;
`;

const StyledMenu = styled(Menu)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default function AccountList() {
	const [form] = Form.useForm();
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [name, setName] = useState('');
	const [type, setType] = useState();
	const [accounts, setAccounts] = useState([]);
	const account = useContext(AccountContext);
	const setAccount = useContext(AccountDispatchContext);
	const { isLoading, data, refetch: refetchAccounts } = useQuery(
		'accounts',
		async () => {
			return await axios
				.get('/api/account', {
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				})
				.then((res) => {
					setAccounts(res.data.accounts);
					return res;
				});
		},
		{ refetchOnWindowFocus: false }
	);

	const {
		isLoading: isCreatingAccount,
		data: createdAccount,
		refetch,
	} = useQuery(
		['createAccounts', { name, type }],
		async (props) => {
			return await axios
				.post('/api/account', props.queryKey[1], {
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				})
				.then((res) => {
					return res;
				});
		},
		{ refetchOnWindowFocus: false, enabled: false }
	);

	const {
		data: selectedAccountResponse,
		refetch: refetchSelectedAccount,
	} = useQuery(
		['setSelectedAccount', { account }],
		async (props) => {
			return await axios
				.put(
					'/api/account/selected',
					{ account: props.queryKey[1].account },
					{
						headers: {
							Authorization: localStorage.getItem('token'),
						},
					}
				)
				.then((res) => {
					return res;
				});
		},
		{ refetchOnWindowFocus: false, enabled: false }
	);

	useEffect(() => {
		if (createdAccount && createdAccount.status === 200) {
			refetchAccounts();
			toggleDrawer();
			form.resetFields();
		}
	}, [createdAccount]);

	useEffect(() => {
		if (selectedAccountResponse && selectedAccountResponse.status === 200) {
			//refetchAccounts();
			setAccount(selectedAccountResponse.data.account);
		}
	}, [selectedAccountResponse]);

	useEffect(() => {
		if (data && data.status === 200) {
			setAccounts(data.data.accounts);

			if (data.data.accounts.length > 0) {
				var selected = data.data.accounts.find((a) => {
					return a.selected;
				});

				if (!selected) {
					selected = data.data.accounts[0];
				}

				setAccount({ id: selected._id, name: selected.name });
			}
		}
	}, [data]);

	useEffect(() => {
		if (account) {
			refetchSelectedAccount();
		}
	}, [account]);

	const toggleDrawer = () => {
		setDrawerVisible(!drawerVisible);
	};

	if (isLoading) {
		return <Spin tip='Loading accounts' />;
	}

	const renderMenu = () => {
		return (
			<StyledMenu>
				{accounts
					.filter((a) => {
						return account && a._id !== account.id;
					})
					.map((a, i) => {
						return (
							<StyledMenuItem key={`${i}`}>
								<StyledCard
									alignItems='center'
									p={3}
									onClick={(event) => {
										setAccount({ id: a._id, name: a.name });
									}}
								>
									<Box pr={3}>
										<CreditCardOutlined
											style={{ fontSize: '24pt', color: '#bbb' }}
										/>
									</Box>
									<Box>{a.name}</Box>
								</StyledCard>
							</StyledMenuItem>
						);
					})}
				<StyledMenuItem key='NewCardItem'>
					<StyledCard alignItems='center' p={3}>
						<Box>
							<PlusCircleOutlined style={{ fontSize: '24pt', color: '#bbb' }} />
						</Box>
						<Button type='link' size='large' onClick={toggleDrawer}>
							Add Account
						</Button>
					</StyledCard>
				</StyledMenuItem>
			</StyledMenu>
		);
	};

	const getSelectedAccount = () => {
		if (accounts && accounts.length > 0) {
			let selected = accounts[0];

			if (account) {
				selected = accounts.find((a) => a._id === account.id);
			}

			if (!selected) {
				selected = accounts[0];
			}

			return (
				<Flex alignItems='center' p={3}>
					<Box>
						<CreditCardOutlined style={{ fontSize: '24pt', color: '#bbb' }} />
					</Box>
					<Button type='link' size='large'>
						{selected.name}
					</Button>
				</Flex>
			);
		}
	};

	let content = (
		<StyledDrowdown
			overlay={renderMenu}
			trigger={['click']}
			overlayClassName='styledMenu'
		>
			<a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
				<Flex alignItems='center' justifyContent='space-between'>
					{getSelectedAccount()}
					<Box pr={3}>
						<DownOutlined />
					</Box>
				</Flex>
			</a>
		</StyledDrowdown>
	);

	if (accounts && accounts.length === 0) {
		content = (
			<StyledCard alignItems='center' p={3}>
				<Box>
					<PlusCircleOutlined style={{ fontSize: '24pt', color: '#bbb' }} />
				</Box>
				<Button type='link' size='large' onClick={toggleDrawer}>
					Add Account
				</Button>
			</StyledCard>
		);
	}
	return (
		<>
			{content}
			<Drawer
				title='Add Account'
				placement='right'
				closable={true}
				onClose={() => {
					toggleDrawer();
					form.resetFields();
				}}
				visible={drawerVisible}
				width='20%'
			>
				<Form form={form} layout='vertical'>
					<Form.Item label='Account Name' name='name'>
						<Input onChange={(event) => setName(event.target.value)}></Input>
					</Form.Item>
					<Form.Item label='Account Type' name='type'>
						<Select onChange={(value) => setType(value)}>
							<Select.Option value='0'>Current</Select.Option>
							<Select.Option value='1'>Cash</Select.Option>
							<Select.Option value='2'>Childrens</Select.Option>
							<Select.Option value='3'>Savings</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button
							type='link'
							onClick={() => {
								toggleDrawer();
								form.resetFields();
							}}
							disabled={isCreatingAccount}
						>
							Cancel
						</Button>
						<Button
							loading={isCreatingAccount}
							type='primary'
							onClick={refetch}
						>
							Create Account
						</Button>
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
}
