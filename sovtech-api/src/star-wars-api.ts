import { RESTDataSource } from 'apollo-datasource-rest';

class PeopleAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://swapi.dev/api/people/';
  }

  async getPerson(name:string) {
    // Send a GET request to the specified endpoint
    const data = await this.get(`?search=${encodeURIComponent(name)}`);
    console.log(data.results[0]);
    return data.results[0]
  }

  async getPeople(limit = 10) {
    const data = await this.get('', {
      // Query parameters
      per_page: limit,
    });
    // console.log(data);
    
    return data;
  }

  async getPeoplePage(limit = 10) {
    const data = await this.get('', {
      // Query parameters
      per_page: limit,
    });
    console.log(data);
    
    return data;
  }
}

export default PeopleAPI;