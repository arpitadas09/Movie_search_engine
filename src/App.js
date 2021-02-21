
import { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props) 
    console.log("This is the initializer");
    this.state = {}

this.performSearch("avengers")
  }

  performSearch(searchTerm) {
    console.log("Perform search using moviedb");
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=fd4e14e012898363d2ea5b753cbc24d5&query=" + searchTerm;
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully");
      console.log(searchResults);
      const results = searchResults.results;
      console.log(results[0]);

      var movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
      
        const movieRow = <MovieRow key={movie.id} movie={movie} />
        movieRows.push(movieRow)
      })

      this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }
  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
  
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img width="50" src="harry_potter.jpg" alt="harry potter icon" />
              </td>
              <td width="8"></td>
              <td>
                <h1>React Movie Search Engine</h1>
              </td>
            </tr>
          </tbody>
        </table>
  
        <input style={{
          fontSize: 24,
          diaplay: 'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term">
        </input>
  
       {this.state.rows}
      </div>
    );
  }

}




//function App() {

  
// }

export default App;
