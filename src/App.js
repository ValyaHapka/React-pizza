import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <Content searchValue={searchValue} />
      </SearchContext.Provider>
    </div>
  );
}

export default App;
