import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = () => {
    setValue("")
  }

  return {
    type,
    value,
    onChange,
    resetValue
  }
}

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}