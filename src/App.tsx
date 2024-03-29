import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { Switch, Route } from 'react-router-dom';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import { Provider } from 'react-redux';
import { GelatoProvider } from '@gelatonetwork/limit-orders-react';
import store from 'state';
import GoogleAnalyticsReporter from './components/GoogleAnalytics/GoogleAnalyticsReporter';
const DragonPage = lazy(() => import('./pages/DragonPage'));
const FarmPage = lazy(() => import('./pages/FarmPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const PoolsPage = lazy(() => import('./pages/PoolsPage'));
const SwapPage = lazy(() => import('./pages/SwapPage'));
const ConvertQUICKPage = lazy(() => import('./pages/ConvertQUICKPage'));
// const LendPage = lazy(() => import('./pages/LendPage'));
// const LendDetailPage = lazy(() => import('./pages/LendPage/LendDetailPage'));
const AnalyticsTokenDetails = lazy(() =>
  import('./pages/AnalyticsTokenDetails'),
);
const AnalyticsPairDetails = lazy(() => import('./pages/AnalyticsPairDetails'));
const AnalyticsOverview = lazy(() =>
  import('./pages/AnalyticsPage/AnalyticsOverview'),
);
const AnalyticsHeader = lazy(() => import('./pages/AnalyticsPage'));
const AnalyticsTokens = lazy(() =>
  import('./pages/AnalyticsPage/AnalyticsTokens'),
);
const AnalyticsPairs = lazy(() =>
  import('./pages/AnalyticsPage/AnalyticsPairs'),
);

import { PageLayout } from 'layouts';
import { getLibrary } from 'utils';
import StyledThemeProvider from 'theme/index';
import { Web3ReactManager, Popups } from 'components';
import { GlobalConst } from 'constants/index';
import { useActiveWeb3React } from 'hooks';
import { useWalletModalToggle } from 'state/application/hooks';
import ApplicationUpdater from 'state/application/updater';
import TransactionUpdater from 'state/transactions/updater';
import ListsUpdater from 'state/lists/updater';
import UserUpdater from 'state/user/updater';
import MulticallUpdater from 'state/multicall/updater';
import FarmUpdater from 'state/farms/updater';
import DualFarmUpdater from 'state/dualfarms/updater';
import SyrupUpdater from 'state/syrups/updater';
import AdsUpdater from 'state/ads/updater';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './i18n';
import { mainTheme } from './theme';
import Background from 'layouts/Background';
import { RedirectExternal } from 'components/RedirectExternal/RedirectExternal';

const Web3ProviderNetwork = createWeb3ReactRoot(
  GlobalConst.utils.NetworkContextName,
);

const ThemeProvider: React.FC = ({ children }) => {
  const theme = mainTheme;

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

const Providers: React.FC = ({ children }) => {
  return (
    <Suspense fallback={<Background fallback={true} />}>
      <ThemeProvider>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Suspense>
  );
};

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <TransactionUpdater />
      <ListsUpdater />
      <MulticallUpdater />
      <UserUpdater />
      <FarmUpdater />
      <DualFarmUpdater />
      <SyrupUpdater />
      <AdsUpdater />
    </>
  );
}

function Gelato({ children }: { children?: React.ReactNode }) {
  const { library, chainId, account } = useActiveWeb3React();
  const toggleWalletModal = useWalletModalToggle();

  return (
    <GelatoProvider
      library={library}
      chainId={chainId}
      account={account ?? undefined}
      handler={'quickswap'}
      toggleWalletModal={toggleWalletModal}
      useDefaultTheme={false}
    >
      {children}
    </GelatoProvider>
  );
}

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Route component={GoogleAnalyticsReporter} />
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Provider store={store}>
            <Updaters />
            <Providers>
              <Popups />
              <StyledThemeProvider>
                <Gelato>
                  <Web3ReactManager>
                    <Switch>
                      <Route exact path='/'>
                        <PageLayout>
                          <LandingPage />
                        </PageLayout>
                      </Route>
                      <Route exact path='/swap'>
                        <PageLayout>
                          <SwapPage />
                        </PageLayout>
                      </Route>
                      {/* <Route exact path='/lend'>
                        <PageLayout>
                          <LendPage />
                        </PageLayout>
                      </Route> */}
                      {/* <Route exact path='/lend/detail'>
                        <PageLayout>
                          <LendDetailPage />
                        </PageLayout>
                      </Route> */}
                      <Route exact path='/pools'>
                        <PageLayout>
                          <PoolsPage />
                        </PageLayout>
                      </Route>
                      <Route exact path='/farm'>
                        <PageLayout>
                          <FarmPage />
                        </PageLayout>
                      </Route>
                      <Route exact path='/yeeldflow'>
                        <PageLayout>
                          <DragonPage />
                        </PageLayout>
                      </Route>
                      {/* <Route exact path='/convert'>
                        <PageLayout>
                          <ConvertQUICKPage />
                        </PageLayout>
                      </Route>
                      <Route exact path='/predictions'>
                        <RedirectExternal
                          to={`${process.env.REACT_APP_PREDICTIONS_URL}`}
                        ></RedirectExternal>
                      </Route> */}
                      <Route exact path='/analytics'>
                        <PageLayout>
                          <AnalyticsHeader />
                          <AnalyticsOverview />
                        </PageLayout>
                      </Route>
                      <Route exact path='/analytics/tokens'>
                        <PageLayout>
                          <AnalyticsHeader />
                          <AnalyticsTokens />
                        </PageLayout>
                      </Route>
                      <Route exact path='/analytics/pairs'>
                        <PageLayout>
                          <AnalyticsHeader />
                          <AnalyticsPairs />
                        </PageLayout>
                      </Route>
                      <Route exact path='/analytics/token/:id'>
                        <PageLayout>
                          <AnalyticsTokenDetails />
                        </PageLayout>
                      </Route>
                      <Route exact path='/analytics/pair/:id'>
                        <PageLayout>
                          <AnalyticsPairDetails />
                        </PageLayout>
                      </Route>
                    </Switch>
                  </Web3ReactManager>
                </Gelato>
              </StyledThemeProvider>
            </Providers>
          </Provider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </QueryClientProvider>
  );
};

export default App;
