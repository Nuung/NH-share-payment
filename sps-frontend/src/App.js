import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
    // rout path를 '/'로 하고 뒤에 계속 붙이는 형식으로 라우터가 인식을하고 새로운 페이지를 완전 렌더링 하는 것이 아니라
    // 지금 path기준으로 매칭되는 것들을 계속 이어 붙이는 형식으로 DOM을 만들어 준다! 그래서 라우터 쓸때 path잘 써야 함 ㅋ
    // 하지만 이럴때를 대비해서 exact={true} 를 사용하면 된다! 
  return ( // Link를 쓰기 위해 HashRouter 태그안에 그 놈들을 다 넣어줘야한다! 특히 navigation
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/movie/:id" component={Detail} />
    </HashRouter>
  );
}

export default App;