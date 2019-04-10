import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.text.primary,
  },
  icon: {
    fontSize: 20,
  },
  iconError: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default withStyles(styles);
