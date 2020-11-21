import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Landing from './containers/Landing';
import Layout from './containers/Layout';
import Polygons from './containers/Polygons';
import Sensors from './containers/Sensors';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/polygons" render={(props) => <Layout childComponent={<Polygons {...props}/>} {...props} />}/>
          <Route exact path="/sensors" render={(props) => <Layout childComponent={<Sensors {...props}/>} {...props} />}/>
          <Route path="/" component={Landing} />
        </Switch>
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
