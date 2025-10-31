import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'

import Login from './components/Login'
import Home from './components/Home'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import AppContext from './context/AppContext'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    theme: localStorage.getItem('theme') || 'LIGHT_MODE',
    savedVideosList: [],
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleBannerShow)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBannerShow)
  }

  handleBannerShow = () => {
    localStorage.setItem('bannerVisible', JSON.stringify(true))
  }

  changeTheme = theme => {
    if (theme === 'LIGHT_MODE') {
      this.setState({theme: 'DARK_MODE'})
      localStorage.setItem('theme', 'DARK_MODE')
    } else if (theme === 'DARK_MODE') {
      this.setState({theme: 'LIGHT_MODE'})
      localStorage.setItem('theme', 'LIGHT_MODE')
    }
  }

  addItemToSavedVideosList = item => {
    const {savedVideosList} = this.state
    const itemPresent = savedVideosList.find(obj => obj.id === item.id)
    if (itemPresent === undefined) {
      this.setState(prev => ({
        savedVideosList: [...prev.savedVideosList, {...item, saved: true}],
      }))
    }
  }

  removeItemFromSavedVideosList = id => {
    this.setState(prev => ({
      savedVideosList: prev.savedVideosList.filter(item => item.id !== id),
    }))
  }

  render() {
    const {theme, savedVideosList} = this.state
    const bgClassName = theme === 'DARK_MODE' ? 'bg-black' : 'bg-white'
    return (
      <div className={bgClassName}>
        <AppContext.Provider
          value={{
            theme,
            changeTheme: this.changeTheme,
            savedVideosList,
            addItemToSavedVideosList: this.addItemToSavedVideosList,
            removeItemFromSavedVideosList: this.removeItemFromSavedVideosList,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={TrendingRoute} />
            <ProtectedRoute exact path="/gaming" component={GamingRoute} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideosRoute}
            />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <NotFound />
          </Switch>
        </AppContext.Provider>
      </div>
    )
  }
}

export default App
