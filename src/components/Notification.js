import React from 'react'

const Notification = ({notification}) => {

  // if there is no notification, don't return anything
  if (notification === null) {
    return null
  }

  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  }

  const green = {
    color: 'green'
  }

  const red = {
    color: 'red'
  }

  // otherwise return the message in its own div
  return (
    <div>
      {notification.includes('added') ||
        notification.includes('updated') ? 
        <p style={{...notificationStyle, ...green}}>
          {notification}
        </p>
        :
        <p style={{...notificationStyle, ...red}}>
          {notification}
        </p>
      }
    </div>
  )
}

export default Notification
