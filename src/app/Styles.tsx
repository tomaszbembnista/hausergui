import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
    createStyles({
        cardroot: {
            minWidth: 355
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '95%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    });

export default styles;
