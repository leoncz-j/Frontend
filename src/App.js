import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './i18n';
import About from './pages/About/About';
import Rules from './pages/Rules/Rules';
import { Layout } from './components/Layout';
import Check from './pages/Check/Check';
import Result from './pages/Result/Result';
import Landing from './pages/Landing/Landing';
import Report from './pages/Report/Report';
import Imprint from "./pages/Imprint/Imprint";
import DSGVO from "./pages/DSGVO/DSGVO";
import authentication from './utils/react-azure-adb2c';

function App() {
  return (
    <Suspense fallback={null}>
      <Layout>
        <Router>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/rules">
              <Rules />
            </Route>
            <Route exact path="/report" component={authentication.required(Report)} />

            <Route path="/result">
              <Result />
            </Route>     

            <Route path="/check">
              <Check />
            </Route>
            <Route path="/imprint">
              <Imprint />
            </Route>
            <Route path="/dsgvo">
              <DSGVO />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Router>
      </Layout>
    </Suspense>
  );
}

export default App;
