import React from 'react'
import { DuLichProvider } from './context'

export default function TH06Layout({ children }: any) {
    return (
        <DuLichProvider>
            {children}
        </DuLichProvider>
    )
}
