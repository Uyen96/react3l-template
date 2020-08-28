import AppAside from 'components/AppAside/AppAside';
import AppFooter from 'components/AppFooter/AppFooter';
import AppHeader from 'components/AppHeader/AppHeader';
import { menu } from 'config/menu';
import { routes } from 'config/routes';
import React from 'react';
import { Switch, withRouter, useLocation } from 'react-router';
import { renderRoutes } from 'react-router-config';
import './App.scss';
import { useGlobal, setGlobal } from 'reactn';
import { GlobalState } from 'config/global-state';
import classNames from 'classnames';
import AppAsideCollapse from 'components/AppAsideCollapse/AppAsideCollapse';

function App() {

  const [display] = useGlobal<GlobalState>('display');
  const [toggleMenu] = useGlobal<GlobalState>('toggle');
  const [displayFooter, setDisplayFooter] = React.useState<boolean>(false);

  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname.includes('detail')) {
      setDisplayFooter(true);
    }
    if (pathname.includes('master')) {
      setDisplayFooter(false);
    }
  }, [pathname]);
  const handleOffOverlay = React.useCallback(() => {
    setGlobal<GlobalState>({ display: false });
  }, []);

  return (
    <>
      <div className="app d-flex">

        <AppAsideCollapse className={toggleMenu ? 'slide-in' : 'slide-out'} routes={menu} />
        <AppAside className={!toggleMenu ? 'app_slide-in' : 'app_slide-out'} routes={menu} />

        <div
          className={classNames(
            { "header__overlay header__display-block": display },
          )}
          onClick={handleOffOverlay}
        >
        </div>
        <section className={classNames("flex-item", (!toggleMenu ? 'main content-in' : 'main content-out'))}>
          <div className="header-wrapper">
            <AppHeader />
          </div>
          <main className="body">
            <Switch>{renderRoutes(routes)}</Switch>
          </main>
        </section>
        {
          displayFooter === true ? (<AppFooter />) : (<></>)
        }

      </div>
    </>

  );
}

export default withRouter(App);
