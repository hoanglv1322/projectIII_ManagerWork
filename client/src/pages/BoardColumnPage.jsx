import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import BoardColumns from '../components/BoardColumns'

const Container = styled.div`
	height: 100%;
`

const BoardColumnPage = () => {
	return (
		<Container>
			<Navbar />
			<BoardColumns />
		</Container>
	)
}

export default BoardColumnPage
