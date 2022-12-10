import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Landing from './components/layout/Landing';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import ProtectedRoute from './routing/ProtectedRoute';
import About from './views/About';
import Auth from './views/Auth';
import DashBoard from './views/DashBoard';



export default function App() {
  return (

    <AuthContextProvider>
      <PostContextProvider>
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
            <ProtectedRoute exact path='/about' component={About} />
          </Switch>
        </Router>
      </PostContextProvider>

    </AuthContextProvider>

  )
}