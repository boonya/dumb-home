import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
  },
});

export default withStyles(styles);
