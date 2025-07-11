import { ApplyGlobalStyles, ThemeProvider, darkTheme } from "@uwucord/ui";
import "@uwucord/ui/styles";

import "./panda.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => (
      <ThemeProvider theme={darkTheme("#FF5733", false)}>
        {story} <ApplyGlobalStyles />
      </ThemeProvider>
    ),
  ],
};

export default preview;
