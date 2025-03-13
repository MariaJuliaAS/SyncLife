import { TextField, InputAdornment, IconButton } from "@mui/material";

interface UserProps {
    name: string;
    email: string;
    password: string;
}

interface InputProps {
    label: string;
    type?: string;
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    className?: string;
    onEndIconCliclk?: () => void;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CustomInput({ label, type, icon, endIcon, onEndIconCliclk, className, value, onChange }: InputProps) {
    return (
        <TextField
            variant="outlined"
            className={className}
            label={label}
            type={type}
            value={value}
            InputLabelProps={{ shrink: true }}
            onChange={onChange}
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