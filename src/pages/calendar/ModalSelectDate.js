import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputBase, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useAlertMessage } from "../../components/alert/AlertMessageProvider";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalSelectDate({ open, setOpen, dates }) {

    const [date, setDate] = useState('')

    const { showAlert } = useAlertMessage()

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (event) => {
        setDate(event.target.value);
    }

    const filter = () => {
        if (date === ''){
            showAlert('', 'Selecione uma data para filtrar!', 'info', 4000)
            return
        }

        handleClose()
        document.getElementById(date).focus()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="filter-dialog-title"
            aria-describedby="Dialog for filter by date"
        >
            <DialogTitle id="filter-dialog-title">
                Filtrar jogos por data
            </DialogTitle>

            <DialogContent sx={{ overflowY: "visible" }}>
                <FormControl fullWidth sx={{ '& label.Mui-focused': { color: "#984B43" }, '.Mui-focused fieldset': { borderColor: "#984B43 !important" } }}>
                    <InputLabel id="label-filter-select-date">Data</InputLabel>
                    <Select
                        labelId="label-filter-select-date"
                        id="filter-select-date"
                        value={date}
                        label="Date"
                        onChange={handleChange}
                    >
                        {dates.map((date, index) => (
                            <MenuItem key={index} value={moment(date).format("MM-DD")}>{moment(date).format("L")}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button sx={{ color: "#984B43" }} onClick={handleClose}>Fechar</Button>
                <Button sx={{ color: "#984B43" }} onClick={filter} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalSelectDate