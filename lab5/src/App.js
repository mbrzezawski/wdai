import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import Hello from './pages/hello'
import ProductList from "./pages/product-list";
import EditProductModal from "./pages/edit-product";
import Login from "./pages/login";

function App() {
    const [token, setToken] = useState('');

    const handleLogin = (newToken) => {
        setToken(newToken);
    };
    return (
          <Router>
              <div>
                  {!token ? (
                      <Login onLogin={handleLogin} />
                  ) : (
                      <>
                          <nav>
                              <ul>
                                  <li>
                                      <Link to="/hello">Panda</Link>
                                  </li>
                                  <li>
                                      <Link to="/ProductList">Produkty</Link>
                                  </li>
                              </ul>
                          </nav>

                          <Routes>
                              <Route
                                  path="/ProductList"
                                  element={token ? <ProductList /> : <Navigate to="/" />}
                              />
                              <Route
                                  path="/edit/:id"
                                  element={token ? <EditProductModal /> : <Navigate to="/" />}
                              />
                              <Route
                                  path="/hello"
                                  element={token ? <Hello /> : <Navigate to="/" />}
                              />
                          </Routes>
                      </>
                  )}
              </div>
          </Router>
  );
}

export default App;
