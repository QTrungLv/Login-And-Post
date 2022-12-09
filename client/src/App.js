import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Landing from './components/layout/Landing';
import AuthContextProvider from './contexts/AuthContext';
import ProtectedRoute from './routing/ProtectedRoute';
import Auth from './views/Auth';
import DashBoard from './views/DashBoard';



export default function App() {
  return (

    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route
            exact
            path='/login'
            render={props => <Auth {...props} authRoute='login' />}
          />
          <Route
            exact
            path='/register'
            render={props => <Auth {...props} authRoute='register' />}
          />
          <ProtectedRoute exact path='/dashboard' component={DashBoard} />
        </Switch>
      </Router>
    </AuthContextProvider>

  )
}