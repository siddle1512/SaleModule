import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/authen/Login';
import SellerCrud from './components/sellers/SellerCrud';
import QuotationList from './components/quotation/QuotationList';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if the user is already authenticated (e.g., by checking a token in local storage)
    const isAuthenticated = localStorage.getItem('token'); // Replace 'token' with your actual storage key

    if (isAuthenticated) {
      setLoggedIn(true);
      // Fetch user details, set email, etc. as needed
      setEmail("user@example.com");
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}   
          />
          <Route
            path="/quotation"
            element={<QuotationList />}
          />
          <Route
            path="/SellerCrud"
            element={<SellerCrud />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
