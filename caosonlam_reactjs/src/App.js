import RouterFrontend from './router/RouterFrontend';
import RouterBackend from './router/RouterBackend';
import LayoutFrontend from './layouts/frontend';
import LayoutBackend from './layouts/backend'; 
import NotFound from './pages/frontend/NotFound';
import { useRoutes } from 'react-router-dom';

function App() {
  let element = useRoutes([
    {
      path: "/", 
      element: <LayoutFrontend />,
      children: RouterFrontend, 
    },
    {
      path: "/admin", 
      element: <LayoutBackend />,
      children: RouterBackend, 
    },
    { path: "*", element: <NotFound /> }, 
  ]);

  return element;
}

export default App;
