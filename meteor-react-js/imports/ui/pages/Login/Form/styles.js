import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

export default withStyles(styles);
