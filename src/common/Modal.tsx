import React, { useEffect, useState } from 'react'

type Props = {
    children: React.ReactNode
    isOpen: boolean
    onClose: () => void
}

const Modal = ({ children, isOpen, onClose }: Props) => {
    const [show, setShow] = useState(isOpen)

    useEffect(() => {
        if (isOpen) setShow(true)
    }, [isOpen])

    const handleClose = () => {
        setShow(false)
        setTimeout(onClose, 200) // chờ animation xong mới unmount
    }

    if (!isOpen && !show) return null

    return (
        <div
            onClick={handleClose}
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-200 bg-bg
                ${show ? 'bg-black/30 backdrop-blur-sm opacity-100' : 'opacity-0'}
            `}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative  bg-bg p-5 rounded-md w-[400px] transition-all duration-200
                    ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
                `}
            >
                <button
                    onClick={handleClose}
                    className='absolute top-2 right-2 text-gray-500 hover:text-black'
                >
                    ✕
                </button>

                {children}
            </div>
        </div>
    )
}

export default Modal