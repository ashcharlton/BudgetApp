import React, { useState } from 'react';
import { Button } from 'antd';
import CreateTransaction from './CreateTransaction';

export default function Transactions() {
	const [visible, setVisible] = useState(false);
	return (
		<>
			<h1>Transactons</h1>
			<Button onClick={() => setVisible(true)}>Add Transaction</Button>
			<CreateTransaction
				visible={visible}
				closeDrawer={() => setVisible(false)}
			/>
		</>
	);
}
