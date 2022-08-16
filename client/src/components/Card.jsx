import { React, useState } from 'react'
import styled from 'styled-components'
import CardInformation from './CardInformation'
const gap = 10

const Container = styled.div`
	div {
		background-color: #ffffff;
		padding: ${gap}px;
		border-radius: 4px;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
		margin-bottom: ${gap}px;
		color: #152233;
	}
	img {
		display: block;
		width: calc(100% + 2 * ${gap}px);
		margin: -10px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		margin-bottom: 10px;
	}
	cursor: pointer;
`

const Card = (props) => {
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const { card, listMemeber } = props

	return (
		<>
			<Container onClick={handleShow}>
				<div>{card.cardName}</div>
				{card.image && <img src={card.image} alt="img" />}
			</Container>
			<CardInformation
				show={show}
				handleClose={handleClose}
				card={card}
				listMemeber={listMemeber}
			/>
		</>
	)
}

export default Card
