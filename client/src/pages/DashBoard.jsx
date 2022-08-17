import { React, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Table from 'react-bootstrap/Table'
import { AuthContext } from '../context/authContext'
import { Delete, Edit } from '@material-ui/icons'
import ConfirmModal from '../components/ConfirmModal'

const Container = styled.div`
	padding: 50px;
	h1 {
		text-align: center;
		margin-bottom: 16px;
	}

	.option-user {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 16px;
		padding-right: 16px;

		.icon {
			cursor: pointer;
			color: #635c5c;
		}
	}
`

const DashBoard = () => {
	const [allAccounts, setAllAccounts] = useState([])
	const [showDelete, setShowDelete] = useState(false)
	const [showEdit, setShowEdit] = useState(false)
	const handleCloseDelete = () => setShowDelete(false)
	const handleCloseEdit = () => setShowEdit(false)
	const [user, setUser] = useState({})
	const {
		authState: { allUsers },
	} = useContext(AuthContext)

	useEffect(() => {
		setAllAccounts(allUsers.filter((user) => user.isAdmin === false))
	}, [allUsers])

	const deleteUserHandler = async () => {}
	const EditUserHandler = async () => {}

	return (
		<Container>
			<h1>Dashboard</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>User Name</th>
						<th>Email</th>
						<th>Status</th>
						<th>Option</th>
					</tr>
				</thead>
				<tbody>
					{allAccounts &&
						allAccounts.map((account, index) => (
							<tr key={index}>
								<td>{index}</td>
								<td>{account.username}</td>
								<td>{account.email}</td>
								<td>{account.status}</td>
								<td className="option-user">
									<Delete
										onClick={() => {
											setShowDelete(true)
											setUser(account)
										}}
										className="icon"
									/>
									<Edit
										className="icon"
										onClick={() => {
											setShowEdit(true)
											setUser(account)
										}}
									/>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
			<ConfirmModal
				show={showDelete}
				handleClose={handleCloseDelete}
				title={'Xóa tài khoản người dùng '}
				content={`Bạn có chắc chắn muốn xóa tài khoản ${user.username} .Tất cả các thông tin của tài khoản cũng bị xóa.`}
				deleteHandler={deleteUserHandler}
			/>
			<ConfirmModal
				show={showEdit}
				handleClose={handleCloseEdit}
				title={'Khóa tài khoản người dùng '}
				content={`Bạn có chắc chắn muốn khóa tài khoản ${user.username} .
                Người dùng không thể đăng nhập hay truy cập vào các bảng hay thẻ công việc`}
				deleteHandler={EditUserHandler}
			/>
		</Container>
	)
}

export default DashBoard
