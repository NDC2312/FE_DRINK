import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import DefaultLayout from './layout/DefaultLayout';
import DefaultLayoutAdmin from './layout/Admin/DefaultLayout';
import Forbidden from './components/403/forbidden';

import { publicRoute, privateRoute } from './Routes';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    {publicRoute.map((route, index) => {
                        let Layout = DefaultLayout;
                        const Page = route.component;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* private */}
                    {privateRoute.map((route, index) => {
                        let Layout = DefaultLayoutAdmin;
                        const Page = route.component;
                        const ProtectedRoute = route.protected;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <ProtectedRoute permission={route.permission}>
                                            <Page />
                                        </ProtectedRoute>
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route path="/403" element={<Forbidden />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
