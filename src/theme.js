import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['cursive', 'Comic Sans MS', 'sans-serif'].join(' ,'),
    htmlFontSize: 10,
  },
});

export default theme;
