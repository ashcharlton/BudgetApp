import React, { useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';

export default function Dashboard() {
	const account = React.useContext(AccountContext);
	return <h1>Dashboard - {account ? account.name : ''}</h1>;
}
