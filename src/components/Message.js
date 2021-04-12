import React from 'react'

const Message = ({ message }) => {
	return (
		<div>
			<h2 className={message.success ? 'success' : 'error'}>{message.text}</h2>
		</div>
	)
}

export default Message
