
import React, { Component } from 'react';
import {Cards, Chart, CountryPicker} from './components'
import styles from './App.module.css'
import { fetchData } from './api'
import pic from './images/covid_main_page.svg'
import logo from './images/image.png'

class App extends Component{
  state = {
    data: {},
    country: '',
    tableData: []
  }

  async componentDidMount(){
    const fetchedData = await fetchData()
    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)

    this.setState({ data: fetchedData, country: country })
  }
  render(){
    const {data, country} = this.state
    return(
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h3>What are the latest statistics on the Coronavirus pandemic?</h3>
          <img src={pic} className={styles.pic} alt="COVID-19" />
        </div>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
      </div>
    )
  }
}

export default App;
