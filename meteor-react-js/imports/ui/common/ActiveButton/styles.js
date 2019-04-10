import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  button: {
    width: '100%',
  },
  progress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

export default withStyles(styles);
