import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { PATHS } from '@pages/paths';
import { MainPage } from '@pages/main-page';
import { FriendsPage } from '@pages/friends-page';
import { BoostPage } from '@pages/boost-page';
import { EarnPage } from '@pages/earn-page';
import { CompaniesPage } from '@pages/companies-page';
import { CreateCompanyPage } from '@pages/create-company-page';
import { CompanyPage } from '@pages/company-page';
import { EditCompanyPage } from '@pages/edit-company-page';

const routes = createBrowserRouter(
  [
    {
      path: PATHS.root,
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: PATHS.friends,
          element: <FriendsPage />,
        },
        {
          path: PATHS.boost,
          element: <BoostPage />,
        },
        {
          path: PATHS.earn,
          element: <EarnPage />,
        },
        {
          path: PATHS.companies,
          element: <CompaniesPage />,
        },
        {
          path: `${PATHS.companies}/create`,
          element: <CreateCompanyPage />,
        },
        {
          path: `${PATHS.companies}/:id`,
          element: <CompanyPage />,
        },
        {
          path: `${PATHS.companies}/:id/edit`,
          element: <EditCompanyPage />,
        },
      ],
    },

    { path: '*', element: <div>NOT FOUND</div> },
  ],
  { basename: env.__BASE_APP_URL__ },
);

export const Router = () => {
  return <RouterProvider router={routes} />;
};
