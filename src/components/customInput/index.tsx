import { TextField, InputAdornment, IconButton } from "@mui/material";

interface InputProps {
    label: string;
    type?: string;
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    className?: string;
    onEndIconCliclk?: () => void;
}

export function CustomInput({ label, type, icon, endIcon, onEndIconCliclk, className }: InputProps) {
    return (
        <TextField
            fullWidth
            variant="outlined"
            className={className}
            label={label}
            type={type}
            InputProps={{
                startAdornment: icon ?
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                    : null,

                endAdornment: endIcon ?
                    <InputAdornment position="end">
                        <IconButton onClick={onEndIconCliclk}>
                            {endIcon}
                        </IconButton>
                    </InputAdornment>
                    : null
            }}
        />
    )

}