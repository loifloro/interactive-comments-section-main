import React from 'react'

export default function MinusButton({ onClick }) {
  return (
    <img
        src='./images/icon-minus.svg'
        alt='Minus Icon'
        onClick={onClick}
    />
  )
}
