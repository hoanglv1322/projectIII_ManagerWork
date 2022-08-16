import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthContextProvider from './context/authContext'
import TableContextProvider from './context/tableContext'
import ColumnContextProvider from './context/columnContext'
import CardContextProvider from './context/cardContext'
import CommentContextProvider from './context/commentContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<TableContextProvider>
				<ColumnContextProvider>
					<CardContextProvider>
						<CommentContextProvider>
							<App />
						</CommentContextProvider>
					</CardContextProvider>
				</ColumnContextProvider>
			</TableContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
)
