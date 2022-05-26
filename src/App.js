import logo from './logo.svg';
import './App.css';
import SearchCity from './components/SearchCity';
import WeatherData from './components/WeatherData';

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
