import React from 'react'
import { useState, useEffect, useContext, useLayoutEffect } from 'react'
import styled from 'styled-components'
import Column from './Column'
import ConfirmModal from './ConfirmModal'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from '../utils/dragDrop'
import { useLocation, useNavigate } from 'react-router-dom'
import { TableContext } from '../context/tableContext'
import { ColumnContext } from '../context/columnContext'
import { AuthContext } from '../context/authContext'
import axios from 'axios'
import {
	Add,
	Clear,
	ViewWeek,
	Lock,
	Group,
	Delete,
	Settings,
	Image,
	ExitToApp,
	Send,
} from '@material-ui/icons'

const ContinerBorardWeb = styled.div`
	margin-top: 45px;
	height: calc(100vh - 45px);
`

const AppBarBoard = styled.div`
	height: 45px;
	margin-top: 5px;
	display: flex;
	align-items: center;
`
const NavItem = styled.div`
	position: relative;
	.btn-customer {
		color: #fff;
		background-color: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		border: none;
		height: 32px;
		margin-left: 10px;
		line-height: 32px;
		padding: 5px 10px 5px 15px;
		border-radius: 5px;
		cursor: pointer;
		text-decoration: none;
		width: fit-content;
		&:hover {
			background-color: rgba(255, 255, 255, 0.5);
		}
	}
	.title {
		font-size: 20px;
		font-weight: bold;
		line-height: 36px;
		height: 36px;
		margin-left: 10px;
		color: #fff;
		background-color: rgba(255, 255, 255, 0.2);
		padding: 0 10px;
		border-radius: 5px;
	}
	.list-option-table,
	.list-member {
		position: absolute;
		top: 36px;
		left: 0;
		width: 300px;
		height: fit-content;
		padding: 10px;
		background: #fff;
		z-index: 10;
		border-radius: 5px;
		.title-add-member {
			cursor: pointer;
			color: #90a3a5;
			display: flex;
			align-items: center;
			font-size: 16px;
			:hover {
				cursor: pointer;
				color: #0b736e;
			}
			margin-top: 10px;
		}
		.input-add-member {
			width: 100%;
			margin-left: -5px;
			margin-top: 10px;
			Input {
				width: 100%;
			}
			.list-member-add {
				margin-left: 10px;
				overflow-y: auto;
				max-height: 400px;
				.list-member-infor-add {
					box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
					padding-left: 5px;
					border-radius: 5px;
				}
			}
		}
		.clear-box-member {
			position: absolute;
			top: 5px;
			right: 5px;
			cursor: pointer;
		}
		.title-list {
			font-size: 18px;
			font-weight: 300;
			color: #2a7ea5;
			text-align: center;
			border-bottom: 1px solid #6f4da2;
			padding-bottom: 5px;
		}
	}

	.list-option-table {
		.box-change-name-table {
			display: flex;
			align-items: center;
			padding: 10px;
			.input-change-name-table {
				outline: none;
				height: 36px;
				line-height: 36px;
				padding: 5px 10px;
				border-radius: 3px;
				border: 1px solid #3e65c1;
				margin-right: 10px;
			}
			.btn-update-name {
				cursor: pointer;
			}
		}
	}
`
const InforMemner = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #6c7ec0;
	min-height: 60px;
	position: relative;
	margin-top: 10px;
	cursor: pointer;
	.user-infor {
		margin-top: 10px;
		margin-left: 10px;
		h5 {
			margin-bottom: 0px;
			font-size: 16px;
			font-weight: bold;
		}
		p {
			font-size: 13px;
		}
	}
	.clear-member {
		position: absolute;
		top: 20px;
		right: 0;
		cursor: pointer;
	}
`
const OptionTable = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	border-radius: 5px;
	margin-top: 10px;
	:hover {
		background-color: #e2dbdb;
		cursor: pointer;
	}
	.icon-option-table {
		font-size: 18px;
		margin-right: 10px;
	}
	h1 {
		font-size: 16px;
		font-weight: 300;
		color: #174251;
		margin-bottom: 0px;
	}
`
const InputImage = styled.form`
	margin-top: 10px;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
		rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-top: 10px;
	align-items: center;
	img {
		width: 200px;
		height: 150px;
		border-radius: 5px;
		border: 1px solid #2b9a95;
		margin-bottom: 10px;
	}
	input {
		width: 80%;
	}
	.btn-save-background {
		outline: none;
		border: none;
		font-size: 16px;
		margin-top: 10px;
		width: 25%;
		text-align: center;
		font-weight: bold;
		color: #fff;
		padding: 5px 10px;
		border-radius: 5px;
		background-color: #25bd25;
		:hover {
			background-color: #30e52a;
			cursor: pointer;
		}
	}
`

const AvatarUser = styled.img`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	cursor: pointer;
	object-fit: cover;
	background-color: #50b895;
`

const ContainerBoard = styled.div`
	height: calc(100vh - 100px);
	overflow-x: auto;
	display: flex;
	&::-webkit-scrollbar {
		-webkit-appearance: none;
	}
	&::-webkit-scrollbar:horizontal {
		height: 10px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #565555;
		border-radius: 3px;
	}
	.column-drop-preview {
		background-color: rgba(150, 150, 200, 0.1);
		border: 1px dashed #abc;
		margin: 5px 45px 5px 5px;
	}
`

const AddNewColumn = styled.div`
	margin-left: 10px;
	height: fit-content;
	.title-add-column {
		width: 250px;
		height: 35px;
		line-height: 35px;
		cursor: pointer;
		color: #fff;
		font-size: 16px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		background-color: rgb(179, 177, 172);
		:hover {
			background-color: rgb(187, 185, 181);
		}
	}
	.input-add-column {
		background-color: #ebecf0;
		padding: 10px;
		border-radius: 5px;
	}
`
const Input = styled.input`
	border: none;
	outline: 2px solid #2541e5;
	height: 35px;
	line-height: 35px;
	width: 250px;
	background-color: #ffff;
	color: #242626;
	border-radius: 5px;
	padding-left: 5px;
`
const ButtonAdd = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
	button {
		border: none;
		outline: none;
		font-size: 16px;
		padding: 0 5px;
		background-color: #434fcf;
		color: #fff;
		margin-right: 10px;
		height: 35px;
		line-height: 35px;
		border-radius: 5px;
		:hover {
			background-color: #0114e5;
		}
	}
	cursor: pointer;
`

const BoardColumns = () => {
	const PF = 'http://localhost:5000/images/'
	const [board, setBoard] = useState({})
	const [columns, setColumns] = useState([])
	const [isOpenAdd, setIsOpenAdd] = useState(false)
	const [isOpenAddMember, setIsOpenAddMember] = useState(false)
	const [isOpenBoxAddMember, setIsOpenBoxAddMember] = useState(false)
	const [isOpenBoxOptionTable, setIsOpenBoxOption] = useState(false)
	const [isOpenInputImage, setIsOpenInputImage] = useState(false)
	const [columnName, setColumnName] = useState('')
	const [backgroundImage, setBackgroundImage] = useState(null)
	const [imageDisplay, setImageDisplay] = useState(null)
	const [showDeleteMember, setShowDeleteMember] = useState(false)
	const [showDeleteBoard, setShowDeleteBoard] = useState(false)
	const [emailMember, setEmailMember] = useState('')
	const [idMemberAdd, setIdMemberAdd] = useState('')
	const [listMember, setListMember] = useState([])
	const [tableName, setTableName] = useState('')
	const [showBoxChangeNameTable, setShowBoxChangeNameTable] = useState(false)

	const handleCloseDeleteMember = () => setShowDeleteMember(false)
	const handleCloseDeleteBoard = () => setShowDeleteBoard(false)

	const location = useLocation()
	const navigation = useNavigate()
	const tableId = location.pathname.split('/')[2]
	const {
		tableState: { tables },
		updateTable,
		updateDropColumn,
		getAllTables,
		deleteTable,
	} = useContext(TableContext)
	const {
		createColumn,
		columnState: { allColumns },
	} = useContext(ColumnContext)
	const {
		authState: { allUsers, user },
	} = useContext(AuthContext)

	useLayoutEffect(() => {
		const boardCurrent = tables.find((board) => board._id === tableId)
		if (boardCurrent) {
			setBoard(boardCurrent)
			setBackgroundImage(boardCurrent.background)
			boardCurrent.columns && setColumns(boardCurrent.columns)
			setTableName(boardCurrent.tableName)
		}
	}, [tableId, tables])

	useEffect(() => {
		emailMember &&
			setListMember(
				allUsers.filter((user) => user.email.includes(emailMember))
			)
	}, [allUsers, emailMember])

	if (isEmpty(board)) {
		return <div>Not data to display</div>
	}

	const onColumnDrop = async (dropResult) => {
		let newColumns = [...columns]
		newColumns = applyDrag(newColumns, dropResult)
		let columnIds = newColumns.map((c) => c._id)
		let tableData = {
			id: board._id,
			tableInfor: {
				columns: columnIds,
			},
		}
		try {
			const res = await updateDropColumn(tableData)
			if (res.success) {
				setColumns(
					allColumns.filter((column) =>
						res.table.columns.includes(column)
					)
				)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleClick = (e) => {
		if (e.target.className === 'title-add-column') {
			setIsOpenAdd(true)
		} else {
			setIsOpenAdd(false)
		}

		if (e.target.className === 'title-add-member') {
			setIsOpenAddMember(true)
		} else {
			setIsOpenAddMember(false)
		}
	}

	const addColumn = async (e) => {
		e.preventDefault()
		let columnData = {
			tableId: board._id,
			columnName: columnName,
		}
		try {
			const res = await createColumn(columnData)
			if (res.success) {
				getAllTables()
				setIsOpenAdd(false)
				setColumnName('')
			}
		} catch (error) {
			console.error(error)
		}
	}

	const saveBackground = async (e) => {
		e.preventDefault()
		let tableData = {
			id: board._id,
			isAddMember: false,
			tableInfor: {},
		}
		if (imageDisplay) {
			const data = new FormData()
			const filename = Date.now() + imageDisplay.name.replace(/ +/g, '')
			data.append('name', filename)
			data.append('file', imageDisplay)
			tableData.tableInfor.background = PF + filename
			try {
				await axios.post('http://localhost:5000/api/upload', data)
			} catch (err) {}
		}
		try {
			const res = await updateTable(tableData)
			if (res.success) {
				setBackgroundImage(res.table.background)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const addMember = async () => {
		let tableData = {
			id: board._id,
			isAddMember: true,
			tableInfor: {
				member: idMemberAdd,
			},
		}
		try {
			const res = await updateTable(tableData)
			if (res.success) {
				getAllTables()
			}
		} catch (error) {
			console.error(error)
		}
	}

	const removeMember = async () => {
		let tableData = {
			id: board._id,
			isAddMember: false,
			tableInfor: {
				member: idMemberAdd,
			},
		}
		try {
			const res = await updateTable(tableData)
			if (res.success) {
				getAllTables()
			}
		} catch (error) {
			console.error(error)
		}
	}

	const updateTableName = async () => {
		let tableData = {
			id: board._id,
			isAddMember: false,
			tableInfor: {
				tableName: tableName,
			},
		}
		try {
			const res = await updateTable(tableData)
			if (res.success) {
			}
		} catch (error) {
			console.error(error)
		}
	}

	const removeTable = async () => {
		let tableId = board._id
		try {
			const res = await deleteTable(tableId)
			console.log(res)
			if (res.success) {
				getAllTables()
				navigation('/boardpage')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<ContinerBorardWeb
			style={{
				backgroundImage:
					backgroundImage !== null
						? 'url(' + backgroundImage + ')'
						: 'url("https://i.pinimg.com/originals/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg")',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}}
		>
			<AppBarBoard>
				<NavItem>
					<div
						className="btn-customer "
						onClick={() =>
							setIsOpenBoxOption((pre) => {
								return !pre
							})
						}
					>
						<ViewWeek />
						Bảng
					</div>
					{isOpenBoxOptionTable && (
						<div className="list-option-table">
							<h1 className="title-list">Bảng</h1>
							<OptionTable
								onClick={() =>
									setShowBoxChangeNameTable((pre) => {
										return !pre
									})
								}
							>
								<Group className="icon-option-table" />
								<h1>Thay đổi tên bảng</h1>
							</OptionTable>
							{showBoxChangeNameTable && (
								<div className="box-change-name-table">
									<input
										className="input-change-name-table"
										placeholder="Nhập tên bảng..."
										name="tableName"
										value={tableName}
										onChange={(e) =>
											setTableName(e.target.value)
										}
									/>
									<Send
										className="btn-update-name"
										onClick={updateTableName}
									/>
								</div>
							)}

							<OptionTable
								onClick={() =>
									setIsOpenInputImage((pre) => {
										return !pre
									})
								}
							>
								<Image className="icon-option-table" />
								<h1>Thay đổi ảnh nền</h1>
							</OptionTable>
							{isOpenInputImage && (
								<InputImage onSubmit={saveBackground}>
									{imageDisplay && (
										<img
											src={URL.createObjectURL(
												imageDisplay
											)}
											alt="background-img"
										/>
									)}
									<input
										type="file"
										onChange={(e) =>
											setImageDisplay(e.target.files[0])
										}
										className="filetype"
									/>
									<button
										className="btn-save-background"
										type="submit"
									>
										Lưu
									</button>
								</InputImage>
							)}
							<OptionTable>
								<Settings className="icon-option-table" />
								<h1>Cài đặt</h1>
							</OptionTable>
							<OptionTable
								onClick={() => setShowDeleteBoard(true)}
							>
								<Delete className="icon-option-table" />
								<h1>Xóa bảng</h1>
							</OptionTable>
							<div
								className="clear-box-member"
								onClick={() =>
									setIsOpenBoxOption((pre) => {
										return !pre
									})
								}
							>
								<Clear />
							</div>
						</div>
					)}
				</NavItem>
				<NavItem>
					<div className="title">{tableName}</div>
				</NavItem>
				<NavItem>
					<div className="btn-customer">
						<Lock />
						{board.scope}
					</div>
				</NavItem>
				<NavItem>
					<div
						className="btn-customer "
						id="title-open-member"
						onClick={() =>
							setIsOpenBoxAddMember((pre) => {
								return !pre
							})
						}
					>
						<Group />
						Thành viên
					</div>
					{isOpenBoxAddMember && (
						<div className="list-member">
							<h1 className="title-list">Thành viên</h1>
							<InforMemner>
								<AvatarUser
									src={
										board.admin.avatar
											? board.admin.avatar
											: 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/a0/6a/c2/a06ac2f9-7f88-c1b1-11f2-fc9497f364c5/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'
									}
								></AvatarUser>
								<div className="user-infor">
									<h5>{board.admin.username}(admin)</h5>
									<p>{board.admin.email}</p>
								</div>
							</InforMemner>
							{board.members &&
								board.members.map((member, index) => (
									<InforMemner key={index}>
										<AvatarUser
											src={
												member.avatar
													? member.avatar
													: 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/a0/6a/c2/a06ac2f9-7f88-c1b1-11f2-fc9497f364c5/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'
											}
										></AvatarUser>
										<div className="user-infor">
											<h5>{member.username}</h5>
											<p>{member.email}</p>
										</div>
										{board.admin._id === user._id && (
											<Delete
												className="clear-member"
												onClick={() => {
													setIdMemberAdd(member._id)
													setShowDeleteMember(true)
												}}
											/>
										)}
										{member._id === user._id && (
											<ExitToApp
												className="clear-member"
												onClick={() => {
													setIdMemberAdd(member._id)
													setShowDeleteMember(true)
												}}
											/>
										)}
									</InforMemner>
								))}
							{!isOpenAddMember && (
								<div
									className="title-add-member"
									onClick={(e) => handleClick(e)}
								>
									<Add />
									Thêm thành viên
								</div>
							)}
							{isOpenAddMember && (
								<div className="input-add-member">
									<Input
										placeholder="Nhập email thành viên..."
										name="email"
										value={emailMember}
										onChange={(e) =>
											setEmailMember(e.target.value)
										}
									/>
									<ButtonAdd>
										<button onClick={addMember}>
											Thêm thành viên
										</button>
										<Clear
											onClick={(e) => handleClick(e)}
										/>
									</ButtonAdd>
									<div className="list-member-add">
										{listMember &&
											listMember.map((member, index) => (
												<InforMemner
													key={index}
													onClick={(e) => {
														setEmailMember(
															member.email
														)
														setIdMemberAdd(
															member._id
														)
													}}
													className="list-member-infor-add"
												>
													<AvatarUser
														src={
															member.avatar
																? member.avatar
																: 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/a0/6a/c2/a06ac2f9-7f88-c1b1-11f2-fc9497f364c5/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'
														}
													></AvatarUser>
													<div className="user-infor">
														<h5>
															{member.username}
														</h5>
														<p>{member.email}</p>
													</div>
												</InforMemner>
											))}
									</div>
								</div>
							)}
							<div
								className="clear-box-member"
								onClick={() =>
									setIsOpenBoxAddMember((pre) => {
										return !pre
									})
								}
							>
								<Clear />
							</div>
						</div>
					)}
				</NavItem>
			</AppBarBoard>
			<ContainerBoard>
				<Container
					orientation="horizontal"
					onDrop={onColumnDrop}
					dragHandleSelector=".header-title"
					getChildPayload={(index) => columns[index]}
					dropPlaceholder={{
						animationDuration: 150,
						showOnTop: true,
						className: 'column-drop-preview',
					}}
				>
					{columns &&
						columns.map((column, index) => (
							<Draggable key={index}>
								<Column
									column={column}
									columns={columns}
									listMemeber={[
										...board.members,
										board.admin,
									]}
								/>
							</Draggable>
						))}
				</Container>
				<AddNewColumn>
					{!isOpenAdd && (
						<div
							className="title-add-column"
							onClick={(e) => handleClick(e)}
						>
							<Add />
							Thêm danh sách khác
						</div>
					)}
					{isOpenAdd && (
						<form className="input-add-column" onSubmit={addColumn}>
							<Input
								placeholder="Nhập tiêu đề danh sách..."
								value={columnName}
								onChange={(e) => setColumnName(e.target.value)}
							/>
							<ButtonAdd>
								<button type="submit">Thêm danh sách</button>
								<Clear onClick={(e) => handleClick(e)} />
							</ButtonAdd>
						</form>
					)}
				</AddNewColumn>
				<ConfirmModal
					show={showDeleteMember}
					handleClose={handleCloseDeleteMember}
					title={'Xóa Thành viên'}
					content={
						'Bạn muốn xóa thành viên này. Người này sẽ không có quyền truy cập danh sách cũng như các thẻ công việc!'
					}
					deleteHandler={removeMember}
				/>
				<ConfirmModal
					show={showDeleteBoard}
					handleClose={handleCloseDeleteBoard}
					title={'Xóa bảng công việc'}
					content={`Bạn muốn xóa bảng ${board.tableName}. Các danh sách công việc và các thẻ cũng bị xóa!`}
					deleteHandler={removeTable}
				/>
			</ContainerBoard>
		</ContinerBorardWeb>
	)
}

export default BoardColumns
