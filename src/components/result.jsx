import React from 'react';
import superagent from 'superagent';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiData: [],
      locationID: 0
    };
  }

  componentDidUpdate(){
    if(this.props.location.id !== this.state.locationID){
      this.fetchData();
    }
  }

  fetchData = async () => {
    if(Object.entries(this.props.location).length !== 0 && this.props.location.constructor === Object){
      let data = await superagent.get(this.props.backendURL+this.props.queryType).query({data: this.props.location});
      this.setState((state, props) =>{
        return {weatherData: data.body, locationID: this.props.location.id};
      })
    }
  }

  render() {
    let renderedContent = this.state.apiData.map((data, idx) => (
      //SOME FUNCTION CALL TO API
      <li key={idx}>The forecast for { weather.time } is: { weather.forecast }</li>
    ));
    return(
      <section>
        <h3>Results from the {this.props.apiName}</h3>
        {/* THIS WOULD BE PART OF FUNCTION AS WELL */}
        <ul className="weather-results">
          {renderedContent}
        </ul>
      </section>
    );
  }
}

export default Result;