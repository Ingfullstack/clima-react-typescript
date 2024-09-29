import styles from './App.module.css'
import ErrorMessage from './components/Alert/AlertMessage';
import Form from './components/Form/Form'
import Spinner from './components/Spinner/Spinner';
import WeatherDetail from './components/WeatherDetail/WeatherDetail';
import { useWeather } from './hooks/useWeather'

function App() {

  const { fetchWeather, weathear, noFound, hasWeatherData, loading } = useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscardor Climas</h1>

      <div className={styles.container}>
          <Form fetchWeather={ fetchWeather }/>
          { loading && <Spinner/>}
          { hasWeatherData && (
            <WeatherDetail weather={ weathear }/>
          )}
          { noFound && <ErrorMessage>{'Ciudad No Encontrada'}</ErrorMessage> }
      </div>
    </>
  )
}

export default App
