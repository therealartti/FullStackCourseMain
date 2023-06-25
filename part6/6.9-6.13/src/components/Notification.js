import { useSelector, useDispatch  } from 'react-redux'
import { useEffect, useState } from 'react'
import { notificationDelete } from '../reducers/notificationReducer'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(true)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  useEffect(() => {
    if(notification) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        dispatch(notificationDelete())
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  return (notification && ( 
    <div style={style}>
      {notification.split('/')[0]}
    </div>
  ))
}

export default Notification