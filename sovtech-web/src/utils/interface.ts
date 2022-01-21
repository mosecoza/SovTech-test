export interface IPerson {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }

  export interface IResults {
    count: Number
    next: String
    previous: String
    results: [IPerson]
  }