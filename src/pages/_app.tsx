import '../styles/global.css';
import '@/components/UserOnboarding/dist/index.css';
import { GlobalProvider } from '@/context/GlobalContext';
import { ListingsContextProvider } from '@/context/ListingsContext';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import ThemeCustomization from '@/themes';
import { RouteGuard } from '@/utils/routeGuard';
import CssBaseline from '@mui/material/CssBaseline';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeCustomization>
    <CssBaseline />
    <GlobalProvider>
      <ListingsContextProvider>
        <RouteGuard>
          <SnackbarProvider maxSnack={20}>
            <Main
              meta={
                <Meta
                  title="Zoomprop | Next level real estate data"
                  description="description"
                />
              }
            >
              <Component {...pageProps} />
            </Main>
          </SnackbarProvider>
        </RouteGuard>
      </ListingsContextProvider>
    </GlobalProvider>
  </ThemeCustomization>
);

export default MyApp;
