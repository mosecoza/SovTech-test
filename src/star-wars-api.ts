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
    return data.results[0]
  }

  async getPeople(current_page=1,page_limit = 10) {
    const data = await this.get(`?page=${current_page}`, {
      // Query parameters
      per_page: page_limit,
    }).catch(e=>{console.log("getPeople catch e: ", e);
    });
    
    return data;
  }

  async getPeoplePage(limit = 10) {
    const data = await this.get('', {
      // Query parameters
      per_page: limit,
    });
    
    return data;
  }
}

export default PeopleAPI;