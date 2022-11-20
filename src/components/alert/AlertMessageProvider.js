import { Alert, AlertTitle, Snackbar } from "@mui/material"
import { createContext, useContext, useMemo, useState } from "react"

const AlertMessageContext = createContext()

export default function AlertMessageProvider({ children }) {

    const [dataAlert, setDataAlert] = useState({})
    const [open, setOpen] = useState(false)

    const showAlert = (title, message, type, duration = 0) => {
        setDataAlert({
            title: title,
            message: message,
            type: type,
            duration: duration
        })

        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setDataAlert({})
        setOpen(false);
    }

    const value = useMemo(
        () => ({ showAlert }),
        [showAlert]
    )

    return (
        <AlertMessageContext.Provider value={value}>
            {!!dataAlert.message && (

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert sx={{ width: '100%' }} variant="filled" severity={dataAlert.type} onClose={handleClose}>
                        <AlertTitle>{dataAlert.title}</AlertTitle>
                        {dataAlert.message}
                    </Alert>
                </Snackbar>
            )}
            {children}
        </AlertMessageContext.Provider>
    )
}

export const useAlertMessage = () => useContext(AlertMessageContext)
