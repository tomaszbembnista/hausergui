import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
    createStyles({
        toolbarTitle: {
            flexGrow: 1
        },
        toolbarButton: {
            marginRight: theme.spacing(2)
        },
        cardRoot: {
            minWidth: 355
        },
        spaceCard: {
            padding: 10,
            margin: 10
        },
        accordionHeading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '95%',
            flexShrink: 0,
        },
        accordionSecondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    });

export default styles;
