import { registerScreens, openHomeScreen } from './src/screens';

registerScreens();
async function bootsrap() {
  openHomeScreen();
}

bootsrap();
