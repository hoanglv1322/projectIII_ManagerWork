import { React, useState } from 'react'
import styled from 'styled-components'
import { Modal, Button } from 'react-bootstrap'
import { PhotoCamera } from '@material-ui/icons'
import axios from 'axios'

const ModalCustomer = styled(Modal)`
	.modal-content.modal-customer {
		background-color: #f4f5f7;
	}
	.dialog-customer {
		max-width: 770px;
	}
	.modal-body {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	color: #4c627a;
	label {
		cursor: pointer;
		input[type='date'] {
			background-color: transparent;
			border: none;
			outline: none;
			width: 100%;
			color: #3387ab;
			padding: 5px;
		}
		.filetype {
			display: none;
		}
	}
`

const AvatarUser = styled.img`
	border-radius: 50%;
	width: 100px;
	height: 100px;
	cursor: pointer;
	display: flex;
	align-items: center;
	object-fit: cover;
	border: 1px solid #2d23b5;
`
const Input = styled.input`
	margin-top: 16px;
	border: none;
	outline: none;
	height: 32px;
	line-height: 32px;
	padding: 5px 10px;
	min-width: 100px;
	background-color: transparent;
	color: #138e81;
	text-align: center;
	border-radius: 3px;
	:focus {
		outline: 1px solid #181dab;
	}
`

const UserInformation = (props) => {
	const PF = 'http://localhost:5000/images/'
	const { show, handleClose, user, updateUser } = props
	const [file, setFile] = useState('')
	const [userName, setUserName] = useState(user.username)

	const handleUpdate = async () => {
		let userData = {
			username: userName,
		}
		if (file) {
			const data = new FormData()
			const filename = Date.now() + file.name.replace(/ +/g, '')
			data.append('name', filename)
			data.append('file', file)
			userData.avatar = PF + filename
			try {
				await axios.post('http://localhost:5000/api/upload', data)
			} catch (err) {}
		}
		try {
			const res = await updateUser(userData)
			if (res.success) {
			}
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<ModalCustomer
			show={show}
			onHide={handleClose}
			contentClassName="modal-customer"
			dialogClassName="dialog-customer"
		>
			<Modal.Header closeButton>Hồ sơ và hiển thị</Modal.Header>
			<Modal.Body>
				<AvatarUser
					src={
						file
							? URL.createObjectURL(file)
							: user.avatar
							? user.avatar
							: 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/a0/6a/c2/a06ac2f9-7f88-c1b1-11f2-fc9497f364c5/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'
					}
				/>
				<label>
					<PhotoCamera className="icon-option" />
					<input
						type="file"
						onChange={(e) => setFile(e.target.files[0])}
						className="filetype"
					/>
				</label>
				<Input
					type="text"
					value={userName}
					name="username"
					onChange={(e) => setUserName(e.target.value)}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Đóng
				</Button>
				<Button variant="primary" onClick={handleUpdate}>
					Lưu thay đổi
				</Button>
			</Modal.Footer>
		</ModalCustomer>
	)
}

export default UserInformation
