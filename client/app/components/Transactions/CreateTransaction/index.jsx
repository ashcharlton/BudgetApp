import React from 'react';
import {
	Drawer,
	Form,
	Button,
	Input,
	InputNumber,
	Select,
	DatePicker,
} from 'antd';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function CreateTransaction({ visible, closeDrawer }) {
	const { data, isFetching } = useQuery('getCategory', async () => {
		return await axios
			.get('/api/category', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})
			.then((res) => {
				console.log(res);
				const options = res.data.data.map((c) => {
					return {
						label: c.name,
						value: c._id,
					};
				});
				return options;
			});
	});
	const [form] = Form.useForm();
	return (
		<Drawer
			title='Add Transaction'
			placement='right'
			closable={true}
			onClose={() => {
				closeDrawer();
				form.resetFields();
				console.log('Closing');
			}}
			visible={visible}
			width='20%'
			footer={
				<div
					style={{
						textAlign: 'right',
					}}
				>
					<Button onClick={() => closeDrawer()} style={{ marginRight: 8 }}>
						Cancel
					</Button>
					<Button type='primary'>Submit</Button>
				</div>
			}
		>
			<Form form={form} layout='vertical'>
				<Form.Item name='name' label='Transaction Name'>
					<Input />
				</Form.Item>

				<Form.Item name='amount' label='Amount'>
					<InputNumber
						formatter={(value) =>
							`£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}
						parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
					/>
				</Form.Item>
				<Form.Item name='category' label='Category'>
					<Select loading={isFetching} options={data} />
				</Form.Item>
				<Form.Item name='transactionDate' label='Date of Transaction'>
					<DatePicker />
				</Form.Item>
			</Form>
		</Drawer>
	);
}
