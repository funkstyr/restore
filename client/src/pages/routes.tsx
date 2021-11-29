import { ComponentType, FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const AboutPage = lazy(
  () =>
    import(
      /* webpackChunkName: "about", webpackPrefetch: true */ 'pages/AboutPage'
    )
);

const CatalogPage = lazy(
  () =>
    import(
      /* webpackChunkName: "catalog", webpackPrefetch: true */ 'pages/CatalogPage'
    )
);

const ContactPage = lazy(
  () =>
    import(
      /* webpackChunkName: "contact", webpackPrefetch: true */ 'pages/ContactPage'
    )
);

const ProductDetailsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "productDetails", webpackPrefetch: true */ 'pages/ProductDetailsPage'
    )
);

const BasketPage = lazy(
  () =>
    import(
      /* webpackChunkName: "basket", webpackPrefetch: true */ 'pages/BasketPage'
    )
);

const CheckoutPage = lazy(
  () =>
    import(
      /* webpackChunkName: "checkout", webpackPrefetch: true */ 'pages/CheckoutPage'
    )
);

const AccountPage = lazy(
  () =>
    import(
      /* webpackChunkName: "account", webpackPrefetch: true */ 'pages/AccountPage'
    )
);

interface RouteData {
  exact?: boolean;
  path: string;
  Component: ComponentType<any>;
}

const _routes: RouteData[] = [
  {
    exact: true,
    path: '/about',
    Component: AboutPage,
  },
  {
    exact: true,
    path: '/contact',
    Component: ContactPage,
  },
  {
    exact: true,
    path: '/product/:productId',
    Component: ProductDetailsPage,
  },
  {
    exact: true,
    path: '/catalog',
    Component: CatalogPage,
  },
  {
    exact: true,
    path: '/basket',
    Component: BasketPage,
  },
  {
    exact: true,
    path: '/checkout',
    Component: CheckoutPage,
  },
  {
    exact: true,
    path: '/account',
    Component: AccountPage,
  },
];

const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        {_routes.map((routerProps: RouteData) => {
          const { path = '', Component = CatalogPage } = routerProps;

          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
