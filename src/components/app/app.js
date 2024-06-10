import { React, Component } from 'react';
import './app.css';
import CardFilm  from '../card' 
import Service from '../../services/service'
import { parse, format } from 'date-fns'

export default class App extends Component { 
    constructor(props) {
        super(props);
        this.state = {
          MovieData: [
            {
              id: 0,
              title: "Avatar",
              discription: "",
              poster_path:'',
            },
          ],
          loading: true,
        };
    }


    componentDidMount() {
        this.getTitle();
    }

    getTitle() {
        const listFilms = new Service();
        let filmsSlice = [];

        listFilms.movie('return').then((res) => {
            const films = res.results;
            
            films.forEach((element, index) =>{
                filmsSlice.push({
                    id: index,
                    title: element.title,
                    discription: element.overview,
                    release_date: element.release_date,
                    poster_path: element.poster_path,
                })
            })
            this.setState(() => {
                return {
                    MovieData: filmsSlice,
                    loading: false,
                };
            });
        })
    }

    getImage(id) {
        const baseURL = "https://image.tmdb.org/t/p/w500";
        const stateUrl = this.state.MovieData[id].poster_path;
        return baseURL + stateUrl;
    }

    getDate = (id) => {
       const newFormatOfDate = format(
         parse(this.state.MovieData[id].release_date, "yyyy-MM-dd", new Date()),
         "MMMM d, yyyy"
       );
       return newFormatOfDate;
    }
    
    config = () => {
        const j = [];
        for(let i = 0; i < 6; i++) {
            j.push(
              <CardFilm
                poster_path={
                  this.getImage(i)
                }
                date={this.getDate(i)}
                discription={this.state.MovieData[i].discription}
                title={this.state.MovieData[i].title}
                key={i}
              />
            );
        }
        return j;
    }
    render() {
        if (this.state.loading) {
            return <h1>Loading...</h1>
        }

        return (    
          <div className="content">
            {this.config()}
          </div>
        );
        
    }   
}