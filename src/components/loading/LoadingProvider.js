import { Backdrop, CircularProgress } from '@mui/material'
import React, { createContext, useContext, useMemo, useRef, useState } from 'react'

const LoadingContext = createContext();

export default function LoadingProvider({ children }) {

    const [loading, setLoading] = useState(false)
    const startLoader = () => setLoading(true)
    const stopLoader = () => setLoading(false)
    const value = useMemo(
        () => ({ startLoader, stopLoader }),
        [startLoader, stopLoader]
    )

    return (
        <LoadingContext.Provider value={value}>
            {children}
            {loading ?
                <Backdrop
                    sx={{ color: '#fff', zIndex: '999' }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                : null
            }
        </LoadingContext.Provider>
    )
}

export const useLoader = () => useContext(LoadingContext)
