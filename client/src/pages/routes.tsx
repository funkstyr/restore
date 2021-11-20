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
    path: '/catalog',
    Component: CatalogPage,
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
