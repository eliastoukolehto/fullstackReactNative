import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBar: '#24292e',
    appBarText: '#ffffff',
    itemBackground: '#ffffff',
    mainBackground: '#e1e4e8',
    error: '#d73a4a'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    title: 24,
  },
  fonts: {
    main: Platform.select({
      default: 'System',
      android: 'Roboto',
      ios: 'Arial'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  paddings: {
    appBarPaddingTop: 18,
    appBarPaddingBottom: 16,
    appBarPaddingLeft: 14,
  }
};

export default theme;