import React from 'react'

const NestedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>{children}</main>
    )
}

export default NestedLayout