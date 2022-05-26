import React from 'react';

const SearchCity = React.lazy(() => import('./components/SearchCity'));
const WeatherData = React.lazy(() => import('./components/WeatherData'));

function App() {
    return (
        <div className="App">
            <div className="container">
                <SearchCity />
                <WeatherData />
            </div>
        </div>
    );
}

export default (App);
