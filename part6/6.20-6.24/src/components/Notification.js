import { useEffect, useState, useContext } from 'react'
import NotifContext from '../NotifContext'

const Notification = ({ type }) => {
  const [visible, setVisible] = useState(true)
  const [notif, dispatch] = useContext(NotifContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  } 

  useEffect(() => {
    if(notif) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        dispatch({type: type})
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notif, dispatch, type])

  if (!notif) return null

  return (
    <div style={style}>
      {notif[0]}
    </div>
  )
}

export default Notification
