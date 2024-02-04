import React from 'react'

export default function AddButton({ onClick }) {
  return (
    <img
        src='/images/icon-plus.svg'
        alt='Add Icon'
        onClick={onClick}
    />
  )
}
