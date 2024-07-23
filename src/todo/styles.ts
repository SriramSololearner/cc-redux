import { SxProps } from "@mui/material";

export const styles = {
    root: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },
    headerText: {
        fontSize: "25px",
        fontWeight: 600,
        mt: 1,
        mb: 1
    },
    input: {
        "&  input": {
            height: 9
        },
    }, btn: { height: "41px", textTransform: "capitalize", },
    todosContainer: {
        width: "50%",
        background: "#e6f0ec", mt: 5, mb: 5, height: "40vh", p: 5,
        overflow: "auto",
        "&::-webkit-scrollbar": {
            display: "none"
        },
    },
    editInput: {
        width: "71%",

        "&  input": {
            height: 9,
        },
    },
} satisfies Record<string, SxProps>;