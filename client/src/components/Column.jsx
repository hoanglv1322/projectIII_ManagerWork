import { React, useState, useContext, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { Add, Clear, Send } from '@material-ui/icons'
import { Dropdown } from 'react-bootstrap'
import Card from './Card'
import { Container, Draggable } from 'react-smooth-dnd'
import ConfirmModal from './ConfirmModal'
import { CardContext } from '../context/cardContext'
import { ColumnContext } from '../context/columnContext'
import { TableContext } from '../context/tableContext'
import { applyDrag } from '../utils/dragDrop'

const gap = 10

const ContainerColumn = styled.div`
	flex: 0 0 auto;
	width: 350px;
	height: calc(100% - ${gap}px);
	> * {
		background-color: #ebecf0;
		color: #333;
		padding: 0 8px;
	}
	margin-left: ${gap}px;
`
const Header = styled.header`
	padding-left: 15px;
	height: 36px;
	line-height: 36px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;

	h1 {
		font-size: 16px;
		color: #131f32;
		cursor: pointer;
	}

	button.btn-customer {
		cursor: pointer;
		background-color: transparent;
		height: 25px;
		line-height: 25px;
		border: none;
		display: flex;
		align-items: center;
		font-size: 25px;
		color: #131f32;
		font-weight: bold;
		padding-bottom: 15px;
		outline: none;
		&:after {
			content: '...';
			border: none;
		}
		&:hover {
			background-color: #ccc;
		}
	}
	.btn-check:active + .btn-primary,
	.btn-check:checked + .btn-primary,
	.btn-primary.active,
	.btn-primary:active,
	.show > .btn-primary.dropdown-toggle {
		color: #131f32;
		background-color: #ccc;
		border-color: transparent;
	}

	.item-customer {
		font-weight: 400;
		width: 250px;
		padding: 5px 16px;
		:hover {
			background-color: #e9ecef;
		}
		cursor: pointer;
	}

	.box-input-change-name {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		.input-change-name-column {
			height: 36px;
			border: 1px solid #5c85d7;
			line-height: 36px;
			border-radius: 3px;
			outline: none;
			width: 90%;
			margin: auto;
			padding: 5px 10px;
		}
		.btn-update-change {
			cursor: pointer;
		}
	}
`

const Cards = styled.div`
	font-size: 14px;
	max-height: calc(100% - 8 * ${gap}px);
	overflow-y: auto;
	&::-webkit-scrollbar {
		-webkit-appearance: none;
	}
	&::-webkit-scrollbar:vertical {
		width: 10px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #565555;
		border-radius: 3px;
	}
	.card-ghost {
		transition: transform 0.18s ease;
		transform: rotateZ(5deg);
	}

	.card-ghost-drop {
		transition: transform 0.18s ease-in-out;
		transform: rotateZ(0deg);
		font-weight: bold;
	}
	.card-drop-preview {
		background-color: rgba(150, 150, 200, 0.1);
		border: 1px dashed #abc;
		margin: 5px;
	}
`
const Footer = styled.footer`
	padding-left: 15px;
	padding-bottom: 10px;
	font-size: 16px;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	display: flex;
	align-items: center;
	color: #acbfbe;
	.title-add-card {
		cursor: pointer;
		color: #90a3a5;
		display: flex;
		align-items: center;
		font-size: 16px;
		:hover {
			cursor: pointer;
			color: #0b736e;
		}
	}
	.input-add-card {
		width: 100%;
		margin-left: -5px;
	}
`

const Input = styled.textarea`
	border: none;
	outline: none;
	height: 65px;
	padding-left: 10px;
	padding-top: 10px;
	width: calc(100% - 5px);
	background-color: #ffff;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
	color: #acbfbe;
	border-radius: 5px;
`
const ButtonAdd = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
	button {
		outline: none;
		border: none;
		font-size: 16px;
		padding: 0 5px;
		background-color: #434fcf;
		color: #fff;
		margin-right: 10px;
		height: 35px;
		line-height: 35px;
		border-radius: 5px;
	}
	cursor: pointer;
`

const Column = ({ column, listMemeber, columns }) => {
	const [isOpenAdd, setIsOpenAdd] = useState(false)
	const [show, setShow] = useState(false)
	const [cards, setCards] = useState([])
	const [cardName, setCardName] = useState('')
	const [columnName, setColumnName] = useState(column.columnName)
	const [showBoxChangeName, setShowBoxChangeName] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const {
		createCard,
		cardState: { allCards },
	} = useContext(CardContext)
	const { getAllTables } = useContext(TableContext)

	const {
		getAllColumns,
		deleteColumn,
		updateColumn,
		updateDropCard,
		columnState: { allColumns },
	} = useContext(ColumnContext)

	useLayoutEffect(() => {
		let columnCurrent = allColumns.find((c) => c._id === column._id)
		columnCurrent.cards && setCards(columnCurrent.cards)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allColumns])

	const handleClick = (e) => {
		if (e.target.className === 'title-add-card') {
			setIsOpenAdd(true)
		} else {
			setIsOpenAdd(false)
		}
	}

	const onCardDrop = async (columnId, dropResult) => {
		if (
			dropResult.removedIndex !== null ||
			dropResult.addedIndex !== null
		) {
			let newColumns = [...columns]
			let newColumn = newColumns.find((c) => c._id === columnId)
			newColumn.cards = applyDrag(newColumn.cards, dropResult)
			let cardIds = newColumn.cards.map((c) => {
				return c._id ? c._id : c
			})
			let columnData = {
				id: newColumn._id,
				columnInfor: {
					cards: cardIds,
				},
			}
			try {
				const res = await updateDropCard(columnData)
				if (res.success) {
					setCards(
						allCards.filter((c) => res.column.cards.includes(c))
					)
				}
			} catch (error) {
				console.error(error)
			}
		}
	}

	const removeColumn = async () => {
		try {
			const res = await deleteColumn(column._id)
			if (res.success) {
				getAllTables()
			}
		} catch (error) {
			console.error(error)
		}
	}

	const addCard = async (e) => {
		e.preventDefault()
		let cardData = {
			columnId: column._id,
			cardName: cardName,
		}
		try {
			const res = await createCard(cardData)
			if (res.success) {
				getAllColumns()
				setIsOpenAdd(false)
				setCardName('')
			}
		} catch (error) {}
	}

	const updateColumnName = async () => {
		let columnDate = {
			id: column._id,
			columnName: columnName,
		}
		try {
			const res = await updateColumn(columnDate)
			if (res.success) {
				getAllColumns()
			}
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<ContainerColumn>
			<Header className="header-title">
				<h1>{columnName}</h1>
				<Dropdown>
					<Dropdown.Toggle
						id="dropdown-basic"
						size="sm"
						className="btn-customer"
					/>
					<Dropdown.Menu>
						<div
							className="item-customer"
							onClick={(e) => {
								e.preventDefault()
								setShowBoxChangeName((pre) => {
									return !pre
								})
							}}
						>
							Thay đổi tiêu dề danh sách...
						</div>
						{showBoxChangeName && (
							<div className="box-input-change-name">
								<input
									type="text"
									className="input-change-name-column"
									placeholder="Nhập tiêu đề..."
									name="columnName"
									value={columnName}
									onChange={(e) =>
										setColumnName(e.target.value)
									}
								/>
								<Send
									onClick={updateColumnName}
									className="btn-update-change"
								/>
							</div>
						)}

						<Dropdown.Item as="button" onClick={handleShow}>
							Xóa danh sách thẻ...
						</Dropdown.Item>
						<Dropdown.Item href="#/action-3">
							Sao chép danh sách...
						</Dropdown.Item>
						<Dropdown.Item href="#/action-4">
							Di chuyển danh sách...
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Header>
			<Cards>
				<Container
					groupName="col"
					onDrop={(e) => onCardDrop(column._id, e)}
					getChildPayload={(index) => cards[index]}
					dragClass="card-ghost"
					dropClass="card-ghost-drop"
					dropPlaceholder={{
						animationDuration: 150,
						showOnTop: true,
						className: 'card-drop-preview',
					}}
					dropPlaceholderAnimationDuration={200}
				>
					{cards &&
						cards.map((card, index) => (
							<Draggable key={index}>
								<Card card={card} listMemeber={listMemeber} />
							</Draggable>
						))}
				</Container>
			</Cards>
			<Footer>
				{!isOpenAdd && (
					<div
						className="title-add-card"
						onClick={(e) => handleClick(e)}
					>
						<Add />
						Thêm thẻ
					</div>
				)}
				{isOpenAdd && (
					<form className="input-add-card" onSubmit={addCard}>
						<Input
							placeholder="Nhập tiêu đề cho thẻ này..."
							value={cardName}
							name="cardName"
							onChange={(e) => setCardName(e.target.value)}
						/>
						<ButtonAdd>
							<button type="submit">Thêm thẻ</button>
							<Clear onClick={(e) => handleClick(e)} />
						</ButtonAdd>
					</form>
				)}
			</Footer>
			<ConfirmModal
				show={show}
				handleClose={handleClose}
				title={'Xóa danh sách công việc'}
				content={`Bạn có chắc chắn muốn xóa danh sách ${column.columnName}. Tất cả các thẻ trong danh sách cũng bị xóa.`}
				deleteHandler={removeColumn}
			/>
		</ContainerColumn>
	)
}

export default Column
