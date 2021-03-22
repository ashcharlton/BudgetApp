import React, { useContext, useState } from 'react';
import { Typography, Dropdown, Menu } from 'antd';
import { Flex, Box } from 'reflexbox';
import '../../../public/style/style.css';
import AccountList from './AccountList';
import { UserContext, UserDispatchContext } from '../../context/UserContext';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const StyledNameCard = styled(Flex)`
	border-radius: 5px;
	background: #fff;
	border: 2px solid #eff2f6;
	color: #2d3b66;
	font-size: 12pt;
	a {
		color: #2d3b66;
		padding-bottom: 2px;
	}
`;

const StyledNav = styled(Flex)`
	box-sizing: border-box;
	border-radius: 5px;
	background: #fff;
	border: 2px solid #eff2f6;
	color: #2d3b66;
	font-size: 12pt;
`;
const { Title } = Typography;

export default function Layout(props) {
	const user = useContext(UserContext);
	const [activeMenu, setActiveMenu] = useState();
	return (
		<>
			<div id='page'>
				<div id='sideBar'>
					<Flex flexDirection='column'>
						<Title>Budget Tracker</Title>
						<Flex flexDirection='column'>
							<Title level={5}>Accounts</Title>
							<AccountList />
						</Flex>
					</Flex>
				</div>
				<Flex id='content' flexDirection='column'>
					<Box pt={3} px={4} mb={4} id='header'>
						<Flex
							id='headerContent'
							alignItems='center'
							justifyContent='space-between'
						>
							<StyledNav flexGrow={2} mr={2}>
								<NavLink
									exact
									activeClassName='navbar__link--active'
									className='navbar__link'
									to='/'
								>
									<Flex
										py={3}
										px={3}
										alignItems='center'
										justifyContent='space-between'
									>
										Dashboard
									</Flex>
								</NavLink>
								<NavLink
									exact
									activeClassName='navbar__link--active'
									className='navbar__link'
									to='/transactions'
								>
									<Flex
										py={3}
										px={3}
										alignItems='center'
										justifyContent='space-between'
									>
										Transactions
									</Flex>
								</NavLink>
							</StyledNav>
							<Flex>
								<StyledNameCard>
									<Dropdown
										overlay={
											<Menu>
												<Menu.Item>Settings</Menu.Item>
											</Menu>
										}
										trigger={['click']}
									>
										<a
											className='ant-dropdown-link'
											onClick={(e) => e.preventDefault()}
										>
											<Flex
												py={3}
												px={4}
												alignItems='center'
												justifyContent='space-between'
											>
												Hi, {user.firstName} {user.lastName}
												<Box pl={3}>
													<DownOutlined
														style={{ fontSize: '10pt', color: '#9aadca' }}
													/>
												</Box>
											</Flex>
										</a>
									</Dropdown>
								</StyledNameCard>
							</Flex>
						</Flex>
					</Box>
					<Box px={4}>{props.children}</Box>
				</Flex>
			</div>
		</>
	);
}
