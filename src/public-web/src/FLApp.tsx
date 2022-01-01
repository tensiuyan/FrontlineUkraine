import React from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { RouteType } from './routes';
import * as Containers from './containers';
import { FLAppShell } from './components/FLAppShell';
import { APIContextProvider } from './contexts/APIContext';

const InnerFLApp: React.FC = () => {
  const Match = useRoutes([
    { path: RouteType.RequestPpe, element: <Containers.RequestPpe /> },
    {
      path: RouteType.RegisterSupplies,
      element: <Containers.RegisterSupplies />,
    },
    { path: RouteType.About, element: <Containers.About /> },
    { path: RouteType.Partners, element: <Containers.Partners /> },
    { path: RouteType.Landing, element: <Containers.Landing /> },
  ]);
  return (
    <APIContextProvider>
      <FLAppShell>{Match}</FLAppShell>
    </APIContextProvider>
  );
};

export const FLApp: React.FC = () => {
  return (
    <MantineProvider
      theme={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
        colors: {
          flGreen: [
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
            '#00966B',
          ],
        },
        primaryColor: 'flGreen',
      }}
    >
      <NotificationsProvider>
        <BrowserRouter>
          <InnerFLApp />
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  );
};