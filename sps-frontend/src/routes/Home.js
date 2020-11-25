import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;



    /* STUDY
    // 생성자 ~ js class에서,, 
    constructor(props){
        super(props); // extends 하는 부모의 생성자 무조건 호출해야함 
        console.log("This is constructor!");
    }
    // 우리가 바꿀 data를 state에 넣기 
    state = {
        count: 0
    };

    // 우리가 set state를 호출할때 마다 react는 새로운 state와 함께 
    // render() function을 호출한다! -> 즉 render에 포함되는 부분만 바뀌는 것이다
    add = () => {
        this.setState(current => ({count: current.count + 1}));
    };
    
    minus = () => {
        this.setState(current => ({count: current.count - 1}));
    }

    componentDidMount() { // component가 render되었다! 그러면 렌더 -> 이 함수 실행
        // log 찍히는 순서들을 함 보자! 
        console.log("component did mounted!!!");
    }

    componentDidUpdate() {
        console.log("component did updated@@");
        // 우리가 add, minus할때마다 render, 그 후에 update 만 활성화 되는 것을 볼 수 있다! 
        // 이런식으로 우린 모든 컴포넌트를 생명 주기에 따라 컨트롤이 가능해 진다!! 
    }

    componentWillUnmount() {
        console.log("goooood bye! this is will unmount!");
    }

    render() { // update될때 호출되는 다른 function은 있다! 하지만 핵심만 보자 
        console.log("this is render methods");
        return (
            <div>
                <h1>Im a class Component</h1>
                <h2>The Number is : {this.state.count}</h2>
                <button onClick={this.add}>Plus</button>
                <button onClick={this.minus}>Minus</button>
            </div>  
        );
    }
    */