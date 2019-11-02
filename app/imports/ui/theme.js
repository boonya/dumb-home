// A theme with custom primary and secondary color.
// It's optional.
// https://material.io/tools/color/#!/?view.left=1&view.right=0&primary.color=1A237E&secondary.color=D84315&primary.text.color=FAFAFA&secondary.text.color=FAFAFA
import { deepOrange, indigo } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: deepOrange,
    type: 'dark',
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 300,
    h1: {
      fontSize: '3.5rem',
    },
    h2: {
      fontSize: '3rem',
    },
    h3: {
      fontSize: '2.5rem',
    },
    h4: {
      fontSize: '2rem',
    },
    h5: {
      fontSize: '1.5rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
});

export default theme;
