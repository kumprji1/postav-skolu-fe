import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

// Pages
import Homepage from "./pages/Homepage/Homepage";
import KupSiSvojiCastPozemkuPage from "./pages/KupSiSvojiCastPozemkuPage/KupSiSvojiCastPozemkuPage";
import SignupUserPage from "./pages/Auth/SignupUserPage";
import SigninPage from "./pages/Auth/SigninPage";
import ProjectDetailPage from "./pages/Projects/ProjectDetailPage/ProjectDetailPage";
import CartPage from "./pages/Cart/CartPage";
import OrderFillingInfoPage from "./pages/OrderFillingInfoPage/OrderFillingInfoPage";
import OrderDetailPage from "./pages/OrderDetailPage/OrderDetailPage";
import EditProjectPage from "./pages/Admin/EditProjectPage/EditProjectPage";
import CreateProjectPage from "./pages/Admin/CreateProjectPage/CreateProjectPage";
import CreateDonatablePage from "./pages/Admin/CreateDonatablePage/CreateDonatablePage";
import TestingFormPage from "./pages/testing/TestingFormPage";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";
import CreateNewsPage from "./pages/Admin/CreateNewsPage/CreateNewsPage";
import EditNewsPage from "./pages/Admin/EditNewsPage/EditNewsPage";
import EditDonatablePage from "./pages/Admin/EditDonatablePage/EditDonatablePage";
import ProjectsPage from "./pages/Projects/ProjectsPage/ProjectsPage";

import { AuthContext } from "./contexts/AuthContext";
import { CartContext } from "./contexts/CartContext";

import { useAuth } from "./hooks/auth-hook";
import { useCart } from "./hooks/cart-hook";

import { Roles } from "./utils/roles";

import "./App.scss";
import KupSiSvojiCastPozemkuStaraVerzePage from "./pages/KupSiSvojiCastPozemkuPage/KupSiSvojiCastPozemkuStaraVerzePage";

function App() {
  const auth = useAuth();

  // Loading Cart Data from LocalStorage
  const storedCart = JSON.parse(localStorage.getItem("cartItems"));
  const cart = useCart({
    donations: storedCart ? storedCart.donations : [],
    products: storedCart ? storedCart.products : [],
    pieces: storedCart ? storedCart.pieces : [],
  });
  return (
    <AuthContext.Provider value={auth}>
      <CartContext.Provider value={cart}>
        <div className="App">
          <div className="grid-container">
            {/* Tady bylo DiaLogoBackground */}
            <Router>
              <Header auth={auth} />
              <Main classes="main-content--wide(tedNe)">
                <Routes>
                  <Route path="/" element={<Homepage />} />

                  <Route path="/kup-si-svoji-cast-pozemku-stara-verze" element={<KupSiSvojiCastPozemkuStaraVerzePage />} />

                  // Projects
                  <Route path="/projekty" element={<ProjectsPage />} />
                  {auth.role == Roles.ADMIN && <Route path="/novy-projekt" element={<CreateProjectPage />} />}
                  {auth.role == Roles.ADMIN && <Route path="/upravit/projekt/:projectId" element={<EditProjectPage />} />}
                  <Route
                    path={`/projekt/:urlTitle`}
                    element={<ProjectDetailPage />}
                  />

                  // News
                  {auth.role == Roles.ADMIN && <Route path="/nova-aktualita/:urlTitle" element={<CreateNewsPage />} />}
                  {auth.role == Roles.ADMIN && <Route path="/upravit/aktualita/:newsId" element={<EditNewsPage />} />}

                  // Donatables
                  {auth.role == Roles.ADMIN && <Route path="/novy-darovatelny-box/:projectId" element={<CreateDonatablePage />} />}
                  {auth.role == Roles.ADMIN && <Route path="/upravit/sbirka/:donatableId" element={<EditDonatablePage />} />}

                  <Route path="/kosik" element={<CartPage />} />
                  <Route path="/nakup" element={<OrderFillingInfoPage />} />

                  // Orders
                  <Route path="/moje-objednavky" element={<MyOrdersPage /> } />
                  <Route
                    path="/objednavka/:orderId"
                    element={<OrderDetailPage />}
                  />

                  // Auth
                  <Route path="/registrace" element={<SignupUserPage />} />
                  <Route path="/prihlaseni" element={<SigninPage />} />

                  <Route path="/testovaci-formular" element={<TestingFormPage />} />
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
