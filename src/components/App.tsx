import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import * as React from 'react';
import {Root} from './routes/Root';
import {ErrorPage} from "./pages/ErrorPage";
import './App.css';

const App: React.FC = () => {
    const router = createBrowserRouter([{
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
            },
            {
                path: '/originaldata',
            }
        ]
    }]);
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
};

export default App;