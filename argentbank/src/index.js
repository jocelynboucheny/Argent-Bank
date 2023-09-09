import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';
import Footer from './containers/Footer';
import store from './redux/store'
import { Provider } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
        <React.StrictMode>
            <Router>
                    <Routes>
                        <Route path="" element={<Home />} exact />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/user" element={<User />} />
                        </Route>
                    </Routes>
                <Footer />
            </Router>
        </React.StrictMode>
    </Provider>
);


