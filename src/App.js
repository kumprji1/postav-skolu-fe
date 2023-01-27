import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

// Pages
import Homepage from "./pages/Homepage/Homepage";
import KupSiSvojiCastPozemkuPage from "./pages/KupSiSvojiCastPozemkuPage/KupSiSvojiCastPozemkuPage";
import ProjectDetailDonatePage from "./pages/ProjectDetailPage/ProjectDetailDonatePage";
import SignupUserPage from "./pages/Auth/SignupUserPage";
import SigninPage from "./pages/Auth/SigninPage";
import ProjectDetailPage from "./pages/ProjectDetailPage/ProjectDetailPage";
import CartPage from "./pages/Cart/CartPage";
import OrderFillingInfoPage from "./pages/OrderFillingInfoPage/OrderFillingInfoPage";

import { AuthContext } from "./contexts/AuthContext";
import { CartContext } from './contexts/CartContext'

import { useAuth } from "./hooks/auth-hook";
import { useCart } from "./hooks/cart-hook";

import "./App.scss";

function App() {
  const auth = useAuth()

  // Loading Cart Data from LocalStorage
  const storedCart = JSON.parse(localStorage.getItem("cartItems"));
  const cart = useCart({
    donations: storedCart ? storedCart.donations : [],
    products: storedCart ? storedCart.products : []
  }) 

  return (
    <AuthContext.Provider
    value = {auth}
    >
      <CartContext.Provider value={cart}>
    <div className="App">
      <div class="grid-container">
        {/* Tady bylo DiaLogoBackground */}
        <Router>
        <Header auth={auth} />
        <Main classes="main-content--wide(tedNe)">
          
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/projekt/kup-si-svoji-cast-pozemku"
                element={<KupSiSvojiCastPozemkuPage />}
              />
              <Route path={`/projekt/:urlPath`}
              element={<ProjectDetailPage />}
              />
              <Route path="/kosik" element={<CartPage />}/>
              <Route path="/nakup" element={<OrderFillingInfoPage />} />
              <Route 
              path="/registrace"
              element={<SignupUserPage />}
              />
              <Route 
              path="/prihlaseni"
              element={<SigninPage />}
              />
            </Routes>          
        </Main>
       </Router>
      </div>
      <Footer />
    </div>
    </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
