import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={130}
      height={130}
    />
  )
}

export default Logo