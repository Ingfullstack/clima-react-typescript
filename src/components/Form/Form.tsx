import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css'
import { SearchType } from "../../types";
import ErrorMessage from "../Alert/AlertMessage";

type Props = {
  fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({ fetchWeather }: Props) {

  
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })

  const [error, setError] = useState('');

  const handleChange = ( e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes('')) {
      setError('Todo los campos son obligatorios');
      return;
    }
    fetchWeather(search);
    setSearch({
      city: '',
      country: ''
    })
    setError('');
  }


  return (
    <form onSubmit={ handleSubmit} className={styles.form}>
      <ErrorMessage>{error}</ErrorMessage>
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input type="text" name="city" id="city" placeholder="Ciudad" value={ search.city } onChange={handleChange} />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Pais:</label>
        <select name="country" id="country" value={search.country} onChange={handleChange}>
          <option value="">Seleccione un Pais</option>
          {countries.map(item => (
            <option key={item.code} value={item.code}>{item.name}</option>
          ))}
        </select>
      </div>

      <input className={styles.submit} type="submit" value='Consultar Clima' />
    </form>
  )
}
