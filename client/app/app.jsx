import React from 'react';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Layout from './components/Layout';
import DashboardPage from './pages/dashboard';
import TransactionsPage from './pages/transactions';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'antd/dist/antd.css';
import { AccountProvider } from './context/AccountContext';
import { UserProvider } from './context/UserContext';

const queryClient = new QueryClient();

const app = () => (
	<div>
		<UserProvider>
			<AccountProvider>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<Switch>
							<ProtectedRoute exact path='/' component={DashboardPage} />
							<ProtectedRoute
								exact
								path='/transactions'
								component={TransactionsPage}
							/>
							<Route exact path='/register' component={RegisterPage} />
							<Route exact path='/login' component={LoginPage} />
							<Route path='*' component={() => '404 NOT FOUND'} />
						</Switch>
					</BrowserRouter>
				</QueryClientProvider>
			</AccountProvider>
		</UserProvider>
	</div>
);

export default app;
