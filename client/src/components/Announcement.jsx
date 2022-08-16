import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ListAnnouncements } from './../data'
import { mobile } from './../responsive'

const Container = styled.div`
	height: 40px;
	width: 100wh;
	background-color: teal;
	color: white;
	overflow: hidden;
	position: relative;
	position: fixed;
	top: 0;
	z-index: 1000;
`

const Wrapper = styled.div`
	transform: translateY(-${(props) => props.index * 40}px);
`

const Content = styled.div`
	flex: 1;
	width: 100vw;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	background-color: ${(props) => props.color};
	${mobile({
		fontSize: '16px',
		textAlign: 'center',
	})};
`

const Announcement = () => {
	const [indexAnnouncement, setIndexAnnouncement] = useState(0)
	useEffect(() => {
		const interval = setInterval(() => {
			setIndexAnnouncement((indexAnnouncement) =>
				indexAnnouncement < 3 ? indexAnnouncement + 1 : 0
			)
		}, 3000)
		return () => clearInterval(interval)
	}, [])

	return (
		<Container>
			<Wrapper index={indexAnnouncement}>
				{ListAnnouncements.map((announcement) => (
					<Content key={announcement.id} color={announcement.color}>
						{announcement.content}
					</Content>
				))}
			</Wrapper>
		</Container>
	)
}

export default Announcement
