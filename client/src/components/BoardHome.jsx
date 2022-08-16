import { React, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../context/authContext'
import { TableContext } from '../context/tableContext'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
	TableChart,
	Add,
	Clear,
	Group,
	Favorite,
	Settings,
	StarOutline,
	AccessTime,
	Widgets,
	BlurLinear,
} from '@material-ui/icons'

const ContainerHome = styled.div`
	margin-top: 50px;
	height: calc(100vh - 50px);
	display: flex;
	background-color: #fafbfc;
	position: relative;
`

const LeftHome = styled.div`
	margin-top: 40px;
	flex: 3;
	padding-left: 15%;
`
const LeftItem = styled.div`
	display: flex;
	height: 36px;
	line-height: 36px;
	align-items: center;
	padding: 10px;
	margin-bottom: 10px;
	color: #398282;
	margin-right: 20px;
	position: relative;
	.options-user {
		display: flex;
		align-items: center;
	}
	.icon-left {
		font-size: 15px;
	}
	:hover {
		background-color: #e4f0f6;
		cursor: pointer;
		border-radius: 5px;
	}
	h1 {
		font-size: 15px;
		font-weight: bold;
		margin-left: 10px;
		margin-bottom: 0;
	}
	.list-option-user {
		position: absolute;
		top: 46px;
		left: 0;
		width: 100%;
		height: fit-content;
		background: transparent;
		z-index: 10;
		border-radius: 5px;
		.input-add-member {
			position: absolute;
			height: 200px;
			padding: 10px;
			background-color: #fefefe;
			top: 118px;
			left: 0;
			z-index: 10;
			width: 100%;
			margin-left: 0px;
			margin-top: 10px;
			Input {
				width: 100%;
			}
			box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		}
	}
`

const Avatar = styled.img`
	border-radius: 50%;
	width: 36px;
	height: 36px;
	cursor: pointer;
	object-fit: cover;
`

const OptionUser = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	margin-bottom: 10px;
	padding: 5px;
	height: 36px;
	line-height: 36px;
	.icon-left {
		font-size: 12px;
		margin-left: 20px;
	}
	:hover {
		background-color: #e4f0f6;
		cursor: pointer;
		border-radius: 5px;
	}
	h1 {
		font-size: 13px;
		font-weight: bold;
		margin-left: 10px;
		margin-bottom: 0;
	}
`

const ButtonAdd = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
	h1 {
		font-size: 13px;
		padding: 0 5px;
		background-color: #434fcf;
		color: #fff;
		margin-right: 10px;
		height: 35px;
		line-height: 35px;
		border-radius: 5px;
		margin-left: 0;
	}
	cursor: pointer;
`

const Input = styled.input`
	border: 1px solid teal;
	outline: none;
	height: 36px;
	line-height: 36px;
	padding-left: 5px;
	padding-top: 5px;
	width: 100%;
	background-color: transparent;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
	color: #000;
	border-radius: 5px;
	font-size: 12px;
`

const RightHome = styled.div`
	flex: 9;
	margin-top: 40px;
`

const FavouriteTables = styled.div``

const RecentlyTables = styled.div`
	margin-top: 32px;
`

const MyTables = styled.div`
	margin-top: 32px;
`

const ListTables = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const Table = styled.div`
	width: 200px;
	height: 100px;
	border-radius: 5px;
	position: relative;
	margin-right: 16px;
	background-repeat: no-repeat;
	background-size: cover;

	:hover {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.2);
	}

	:hover .icon-star {
		display: block;
	}

	h1 {
		position: absolute;
		top: 10px;
		left: 10px;
		font-size: 16px;
		color: #fff;
		font-weight: bold;
	}

	.icon-star {
		position: absolute;
		bottom: 10px;
		right: 10px;
		font-size: 16px;
		color: #fff;
		display: none;
	}
`

const Title = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;
	color: #2b7277;
	font-weight: bold;
	.icon-title {
		margin-right: 10px;
	}
`

const NavBarMyTable = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;
`

const OptionNav = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px;
	height: 40px;
	line-height: 40px;
	margin-right: 10px;
	.icon-left {
		font-size: 16px;
	}
	:hover {
		background-color: #e4f0f6;
		cursor: pointer;
		border-radius: 5px;
	}
	h1 {
		font-size: 15px;
		font-weight: 300;
		margin-left: 10px;
		margin-bottom: 0;
	}
`

const CreateTable = styled.form`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 350px;
	z-index: 12;
	padding: 10px;
	right: 20%;
	background: #fefefe;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	img {
		width: 300px;
		height: 200px;
		border-radius: 5px;
		margin-top: 10px;
		margin: auto;
	}

	.head-create-table {
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #6c7ec0;
		margin-bottom: 10px;
		h1 {
			font-size: 16px;
			font-weight: 300;
			color: #3b8dbd;
		}
		.clear-box-create {
			cursor: pointer;
		}
	}
	.filetype {
		margin: 10px;
		margin-bottom: 16px;
	}

	.input-create {
		margin-top: 16px;
		h2 {
			font-size: 16px;
			font-weight: bold;
			color: #209070;
		}
		span {
			font-size: 12px;
			margin-left: 16px;
		}
	}

	button {
		width: 40%;
		border: none;
		outline: none;
		height: 40px;
		margin: auto;
		margin-top: 16px;
		line-height: 40px;
		background-color: #49c11e;
		border-radius: 5px;
		color: white;
		font-weight: bold;
		:hover {
			background: #32d918;
		}
	}
`

const BoardHome = () => {
	const PF = 'http://localhost:5000/images/'
	const [isOpenAddMember, setIsOpenAddMember] = useState(false)
	const [isOpenBoxOption, setIsOpenBoxOption] = useState(false)
	const [file, setFile] = useState(null)
	const [isOpenCreate, setIsOpenCreate] = useState(false)
	const [tableForm, setTableForm] = useState({
		tableName: '',
		scope: '',
	})
	//use context data
	const {
		tableState: { tables },
		createTable,
		getAllTables,
	} = useContext(TableContext)
	const {
		authState: { user },
		updateTableUser,
	} = useContext(AuthContext)

	const [tableFavourites, setTableFavourites] = useState([])
	const [tableRecentlys, setTableRecentlys] = useState([])
	const [myTables, setMyTable] = useState([])

	//check user is of array member of table
	const checkIsOfMember = (members, userMember) => {
		let check = false
		members.forEach((member) => {
			if (member._id === userMember._id) check = true
		})
		return check
	}

	useEffect(() => {
		user.favoriteTable &&
			setTableFavourites(
				tables.filter((t) => user.favoriteTable.includes(t._id))
			)
		user.recentlyTable &&
			setTableRecentlys(
				tables.filter((t) => user.recentlyTable.includes(t._id))
			)
		setMyTable(
			tables.filter(
				(t) =>
					t.admin._id === user._id || checkIsOfMember(t.members, user)
			)
		)
	}, [tables, user])

	const handleClick = (e) => {
		if (e.target.id === 'title-add-member') {
			setIsOpenAddMember(true)
		} else {
			setIsOpenAddMember(false)
		}
	}

	const onChaneFormTable = (e) => {
		setTableForm({ ...tableForm, [e.target.name]: e.target.value })
	}

	const createNewTable = async (e) => {
		e.preventDefault()
		if (file) {
			const data = new FormData()
			const filename = Date.now() + file.name.replace(/ +/g, '')
			data.append('name', filename)
			data.append('file', file)
			tableForm.background = PF + filename
			try {
				await axios.post('http://localhost:5000/api/upload', data)
			} catch (err) {}
		}
		try {
			const res = await createTable(tableForm)
			if (res.success) {
				getAllTables()
				setIsOpenCreate((pre) => {
					return !pre
				})
			}
		} catch (error) {
			console.error(error)
		}
	}

	const updateStatusTable = async (e) => {
		let updateData = {
			tableId: e.target.id,
			isFavourite: true,
			isRecently: false,
		}
		try {
			const res = await updateTableUser(updateData)
			if (res.success) {
			}
		} catch (error) {
			console.error(error)
		}
	}

	const updateStatusDisLikeTable = async (e) => {
		let updateData = {
			tableId: e.target.id,
			isFavourite: false,
			isRecently: false,
		}
		try {
			const res = await updateTableUser(updateData)
			if (res.success) {
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<ContainerHome>
			<LeftHome>
				<LeftItem>
					<TableChart className="icon-left" />
					<h1> Bảng </h1>
				</LeftItem>
				<LeftItem>
					<Widgets className="icon-left" />
					<h1> Mẫu </h1>
				</LeftItem>
				<LeftItem>
					<BlurLinear className="icon-left" />
					<h1> Trang chủ </h1>
				</LeftItem>
				<LeftItem>
					<Add className="icon-left" />
					<h1> Thêm không gian làm việc </h1>
				</LeftItem>
				<LeftItem>
					<div
						className="options-user"
						onClick={() =>
							setIsOpenBoxOption((pre) => {
								return !pre
							})
						}
					>
						<Avatar src="https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/a0/6a/c2/a06ac2f9-7f88-c1b1-11f2-fc9497f364c5/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png"></Avatar>
						<h1> Không gian làm việc</h1>
					</div>
					{isOpenBoxOption && (
						<div className="list-option-user">
							<OptionUser>
								<TableChart className="icon-left" />
								<h1> Bảng </h1>
							</OptionUser>
							<OptionUser>
								<Favorite className="icon-left" />
								<h1> Điểm nổi bật </h1>
							</OptionUser>

							<OptionUser
								id="title-add-member"
								onClick={(e) => handleClick(e)}
							>
								<Group className="icon-left" />
								<h1>Thành viên</h1>
							</OptionUser>
							{isOpenAddMember && (
								<div className="input-add-member">
									<Input
										placeholder="Nhập email thanh vien..."
										className="input-member"
									/>
									<ButtonAdd>
										<h1>Thêm thành viên</h1>
										<Clear
											onClick={(e) => handleClick(e)}
										/>
									</ButtonAdd>
								</div>
							)}
							<OptionUser>
								<Settings className="icon-left" />
								<h1> Cài đặt </h1>
							</OptionUser>
						</div>
					)}
				</LeftItem>
			</LeftHome>
			<RightHome>
				<FavouriteTables>
					<Title>
						<StarOutline className="icon-title" />
						Bảng đã đánh dấu sao
					</Title>
					<ListTables>
						{tableFavourites &&
							tableFavourites.map((table, index) => (
								<Table
									key={index}
									style={{
										backgroundImage: table.background
											? 'url(' + table.background + ')'
											: 'url("https://i.pinimg.com/originals/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg")',
									}}
								>
									<Link to={`/table/${table._id}`}>
										<h1>{table.tableName}</h1>
									</Link>
									<StarOutline
										className="icon-star"
										id={table._id}
										onClick={updateStatusDisLikeTable}
										style={{
											display: 'block',
											color: 'rgb(255,255,0)',
										}}
									/>
								</Table>
							))}
					</ListTables>
				</FavouriteTables>
				<RecentlyTables>
					<Title>
						<AccessTime className="icon-title" />
						Bảng đã xem gần đây
					</Title>
					<ListTables>
						{tableRecentlys &&
							tableRecentlys.map((table, index) => (
								<Table
									key={index}
									style={{
										backgroundImage: table.background
											? 'url(' + table.background + ')'
											: 'url("https://i.pinimg.com/originals/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg")',
									}}
								>
									<Link to={`/table/${table._id}`}>
										<h1>{table.tableName}</h1>
									</Link>
									<StarOutline
										className="icon-star"
										id={table._id}
										onClick={updateStatusTable}
									/>
								</Table>
							))}
					</ListTables>
				</RecentlyTables>
				<MyTables>
					<Title>Không gian làm việc của bạn</Title>
					<NavBarMyTable>
						<OptionNav>
							<TableChart className="icon-left" />
							<h1> Bảng </h1>
						</OptionNav>
						<OptionNav>
							<Favorite className="icon-left" />
							<h1> Điểm nổi bật </h1>
						</OptionNav>

						<OptionNav
							id="title-add-member"
							onClick={(e) => handleClick(e)}
						>
							<Group className="icon-left" />
							<h1>Thành viên</h1>
						</OptionNav>
						{/* {isOpenAddMember && (
							<div className="input-add-member">
								<Input
									placeholder="Nhập email thanh vien..."
									className="input-member"
								/>
								<ButtonAdd>
									<h1>Thêm thành viên</h1>
									<Clear onClick={(e) => handleClick(e)} />
								</ButtonAdd>
							</div>
						)} */}
						<OptionNav>
							<Settings className="icon-left" />
							<h1> Cài đặt </h1>
						</OptionNav>
						<OptionNav
							onClick={() =>
								setIsOpenCreate((pre) => {
									return !pre
								})
							}
						>
							<Add className="icon-left" />
							<h1> Tạo bảng mới </h1>
						</OptionNav>
					</NavBarMyTable>
					<ListTables>
						{myTables &&
							myTables.map((table, index) => (
								<Table
									key={index}
									style={{
										backgroundImage: table.background
											? 'url(' + table.background + ')'
											: 'url("https://i.pinimg.com/originals/eb/e4/a3/ebe4a37984a8745e78555906765df486.jpg")',
									}}
								>
									<Link to={`/table/${table._id}`}>
										<h1>{table.tableName}</h1>
									</Link>
									<StarOutline
										className="icon-star"
										onClick={updateStatusTable}
										id={table._id}
									/>
								</Table>
							))}
					</ListTables>
				</MyTables>
			</RightHome>
			{isOpenCreate && (
				<CreateTable onSubmit={createNewTable}>
					<div className="head-create-table">
						<h1>Tao bang</h1>
						<Clear
							className="clear-box-create"
							onClick={() =>
								setIsOpenCreate((pre) => {
									return !pre
								})
							}
						/>
					</div>
					{file && (
						<img
							src={URL.createObjectURL(file)}
							alt="background-img"
						/>
					)}
					<input
						type="file"
						onChange={(e) => setFile(e.target.files[0])}
						className="filetype"
					/>
					<div className="input-create">
						<h2>Tiêu đề bảng</h2>
						<Input
							placeholder="Nhap tieu de bang"
							name="tableName"
							value={tableForm.tableName}
							onChange={onChaneFormTable}
						/>
						<span>Tiêu đề bảng là bắt buộc</span>
					</div>
					<div className="input-create">
						<h2>Quyền xem</h2>
						<Form.Select
							aria-label="Default select example"
							name="scope"
							value={tableForm.scope}
							onChange={onChaneFormTable}
						>
							<option value="Private">Private</option>
							<option value="Default">Default</option>
							<option value="Public">Public</option>
						</Form.Select>
					</div>
					<button type="submit">Tao bang moi</button>
				</CreateTable>
			)}
		</ContainerHome>
	)
}

export default BoardHome
