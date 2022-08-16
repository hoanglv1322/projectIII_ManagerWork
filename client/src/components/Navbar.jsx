import { React, useState, useContext } from 'react'
import styled from 'styled-components'
import { mobile } from './../responsive'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import {
	Search,
	ViewCompact,
	ErrorOutline,
	Notifications,
	Clear,
} from '@material-ui/icons'
import UserInformation from './UserInformation'

const Container = styled.div`
	height: 45px;
	position: fixed;
	z-index: 999;
	top: 0px;
	width: 100vw;
	box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
		rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
	background-color: #4f5e69;
	color: #fff;
`

const Wrapper = styled.div`
	padding: 0 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	${mobile({ padding: '0', alignItems: 'center', height: '100%' })};
`
const Left = styled.div`
	flex: 1;
	display: flex;
	justify-content: left;
	align-items: center;
	${mobile({ justifyContent: 'center', alignItems: 'center', flex: '0.5' })};
`

const NavItem = styled.div`
	.btn-customer {
		color: #fff;
		background-color: transparent;
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

		&:hover {
			background-color: #9c9a9a;
		}
		&.last {
			background-color: #727e87;
			margin-left: 10px;
			:hover {
				background-color: #9c9a9a;
			}
			::after {
				border-top: 0px;
			}
		}

		&.avatar {
			background-color: transparent;
			::after {
				border-top: 0px;
			}
		}
	}
`

const DropdownMenuCustomer = styled(Dropdown.Menu)`
	width: 300px;
	background-color: #fff;
	padding: 10px;
	border-radius: 5px;
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		h1 {
			font-size: 16px;
			color: #63acbc;
			font-weight: 300;
		}
		border-bottom: 1px solid #3559a4;
	}
`

const MenuItem = styled.div`
	display: block;
	align-items: center;
	margin: 0 5px;
	cursor: pointer;

	.btn-link-nav {
		color: #fff;
		:hover {
			color: #eee1e1;
		}
	}
`

const SearchContainer = styled.div`
	border: none;
	width: 30%;
	border-radius: 5px;
	display: flex;
	padding: 3px;
	height: 32px;
	align-items: center;
	background-color: #727e87;
	:hover {
		background-color: #9c9a9a;
	}
`
const Input = styled.input`
	border: none;
	outline: none;
	padding: 5px;
	width: 90%;
	${mobile({ fontSize: '12px' })};
	background-color: transparent;

	:placeholder {
		color: #fff;
	}
`

const Right = styled.div`
	flex: 1;
	display: flex;
	justify-content: right;
	align-items: center;
	${mobile({ justifyContent: 'left' })};
`

const Infor = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #6c7ec0;
	min-height: 60px;
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
`

const Avatar = styled.img`
	border-radius: 50%;
	width: 36px;
	height: 36px;
	cursor: pointer;
	object-fit: cover;
`

const AvatarUser = styled.img`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	cursor: pointer;
	display: flex;
	align-items: center;
	object-fit: cover;
`

const Navbar = () => {
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const {
		authState: { user },
		updateUser,
		logoutUser,
	} = useContext(AuthContext)

	const logOut = async () => {
		try {
			const res = await logoutUser()
			if (res.success) {
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Container>
			<Wrapper>
				<Left>
					<MenuItem>
						<Link to="/boardpage" className="btn-link-nav">
							<ViewCompact />
						</Link>
					</MenuItem>
					<NavItem>
						<Dropdown>
							<Dropdown.Toggle
								id="dropdown-basic"
								className="btn-customer"
								as="a"
							>
								Các không gian làm việc gần đây
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item href="#/action-1">
									Action
								</Dropdown.Item>
								<Dropdown.Item href="#/action-2">
									Another action
								</Dropdown.Item>
								<Dropdown.Item href="#/action-3">
									Something else
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</NavItem>
					<NavItem>
						<Dropdown>
							<Dropdown.Toggle
								id="dropdown-basic"
								className="btn-customer"
								as="a"
							>
								Gần đây
							</Dropdown.Toggle>
						</Dropdown>
					</NavItem>
					<NavItem>
						<Dropdown>
							<Dropdown.Toggle
								id="dropdown-basic"
								className="btn-customer"
								as="a"
							>
								Đã đánh dấu sao
							</Dropdown.Toggle>
						</Dropdown>
					</NavItem>
					<NavItem>
						<Dropdown>
							<Dropdown.Toggle
								id="dropdown-basic"
								className="btn-customer"
								as="a"
							>
								Mẫu
							</Dropdown.Toggle>
						</Dropdown>
					</NavItem>
					<NavItem>
						<Dropdown>
							<Dropdown.Toggle
								id="dropdown-basic"
								className="btn-customer last"
								as="a"
							>
								Tạo bảng
							</Dropdown.Toggle>
						</Dropdown>
					</NavItem>
				</Left>
				<Right>
					<SearchContainer>
						<Search />
						<Input placeholder="Search..." />
					</SearchContainer>
					<MenuItem>
						<ErrorOutline />
					</MenuItem>
					<MenuItem>
						<Notifications />
					</MenuItem>
					<NavItem>
						<Dropdown>
							<Dropdown.Toggle
								id="dropdown-basic"
								className="btn-customer avatar"
								as="a"
							>
								<Avatar
									src={
										user.avatar
											? user.avatar
											: 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/a0/6a/c2/a06ac2f9-7f88-c1b1-11f2-fc9497f364c5/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'
									}
								></Avatar>
							</Dropdown.Toggle>
							<DropdownMenuCustomer>
								<div className="title">
									<h1>Tài khoản</h1>
									<Clear />
								</div>
								<Infor>
									<AvatarUser
										src={
											user.avatar
												? user.avatar
												: 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/a0/6a/c2/a06ac2f9-7f88-c1b1-11f2-fc9497f364c5/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'
										}
									></AvatarUser>
									<div className="user-infor">
										<h5>{user.username}</h5>
										<p>{user.email}</p>
									</div>
								</Infor>
								<Dropdown.Item as="button" onClick={handleShow}>
									Hồ sơ và hiển thị
								</Dropdown.Item>
								<Dropdown.Item href="#/action-2">
									Hoạt động
								</Dropdown.Item>
								<Dropdown.Item href="#/action-2">
									Trợ giúp
								</Dropdown.Item>
								<Dropdown.Item href="#/action-3">
									Cài đặt
								</Dropdown.Item>
								<Dropdown.Item as="button" onClick={logOut}>
									Đăng xuất
								</Dropdown.Item>
							</DropdownMenuCustomer>
						</Dropdown>
					</NavItem>
				</Right>
			</Wrapper>
			<UserInformation
				show={show}
				handleClose={handleClose}
				user={user}
				updateUser={updateUser}
			/>
		</Container>
	)
}

export default Navbar
