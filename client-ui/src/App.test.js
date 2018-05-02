import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import createBrowserHistory from 'history/createBrowserHistory'
import App from './App';
import ResultCard from './components/home/ResultCard'

describe('<ResultCard />', () => {
  const addFavorite = () => {}
  const removeFavorite = () => {}
  const setDetail = () => {}

  it('renders non-copyright-restricted background image', () => {
    const object = {
      id: 1,
      copyright_restricted: 0,
      primary_image: '11.511_PS1.jpg',
    }
    const currentUser = { favorites: [1]}
    const wrapper = shallow(
      <ResultCard
        object={object}
        currentUser={currentUser}
      />
    );
    
    expect(wrapper.find('div').prop('style'))
      .toHaveProperty('backgroundImage', 'url(http://cdn2.brooklynmuseum.org/images/opencollection/objects/size2/11.511_PS1.jpg)')
  })

  it('renders fairuse background image', () => {
    const object = {
      id: 1,
      copyright_restricted: 1,
      primary_image: '11.511_PS1.jpg',
    }
    const currentUser = { favorites: [1]}
    const wrapper = shallow(
      <ResultCard
        object={object}
        currentUser={currentUser}
      />
    );

    expect(wrapper.find('div').prop('style'))
      .toHaveProperty('backgroundImage', 'url(http://cdn2.brooklynmuseum.org/images/opencollection/objects/size_fairuse/11.511_PS1.jpg)')
  })

  it('redirects to /detail on click', () => {
    const object = {
      id: 1,
      copyright_restricted: 0,
      primary_image: '11.511_PS1.jpg',
    }
    const currentUser = { favorites: [1]}
    const wrapper = mount(
      <Router history={createBrowserHistory()} >
      <ResultCard
        object={object}
        currentUser={currentUser}
        setDetail={setDetail}
      />
      </Router>
    );

    wrapper.find('Link').simulate('click')
    console.log(wrapper.find('Router').prop('history'))
  })
})