import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Articulos from "./pages/Articulos";
import Dealers from "./pages/Dealers";
import Publicar from "./pages/Publicar";
import Guardado from "./pages/Guardado";
import Perfil from "./pages/Perfil";

import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import DetalleArticulo from "./pages/Detalle";

import { addCircleOutline, heartOutline, homeOutline, peopleOutline, personOutline } from "ionicons/icons";

import { FavoritesProvider } from "./context/SavedContext";

/* Ionic CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";

/* Variables de tema */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <FavoritesProvider>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {/* Rutas dentro de Tabs */}
            <Route exact path="/tabs/articulos" component={Articulos} />
            <Route exact path="/tabs/dealers" component={Dealers} />
            <Route exact path="/tabs/publicar" component={Publicar} />
            <Route exact path="/tabs/guardado" component={Guardado} />
            <Route exact path="/tabs/perfil" component={Perfil} />

            {/* Rutas fuera de Tabs */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/articulo/:id" component={DetalleArticulo} />

            <Redirect exact from="/" to="/tabs/" />
            <Redirect exact from="/tabs" to="/tabs/articulos" />
          </IonRouterOutlet>

          {/* Barra de pestañas */}
          <IonTabBar slot="bottom" color="primary" style={{ minHeight: "76px" }}>
            <IonTabButton tab="articulos" href="/tabs/articulos">
              <IonIcon icon={homeOutline} />
              <IonLabel>Artículos</IonLabel>
            </IonTabButton>

            <IonTabButton tab="dealers" href="/tabs/dealers">
              <IonIcon icon={peopleOutline} />
              <IonLabel>Dealers</IonLabel>
            </IonTabButton>

            <IonTabButton tab="publicar" href="/tabs/publicar">
              <IonIcon icon={addCircleOutline} />
              <IonLabel>Publicar</IonLabel>
            </IonTabButton>

            <IonTabButton tab="guardado" href="/tabs/guardado">
              <IonIcon icon={heartOutline} />
              <IonLabel>Guardado</IonLabel>
            </IonTabButton>

            <IonTabButton tab="perfil" href="/tabs/perfil">
              <IonIcon icon={personOutline} />
              <IonLabel>Perfil</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </FavoritesProvider>
);

export default App;
