import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './services/baseApiService';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Movies from './pages/movie/Movies';
import TrendingMovies from './pages/movie/TrendingMovies';
import HomePage from './pages/HomePage';
import TvSeries from './pages/tv/TvSeries';
import AboutUs from './pages/about-us/AboutUs';
import WatchList from './pages/watch-list/WatchList';
import MovieUpComing from './components/MovieUpComing';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/movies/*" element={<Movies />} />
          <Route path="/trending-movies" element={<TrendingMovies />} />
          <Route path="/tv-series" element={<TvSeries />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/movies/upcoming" element={<MovieUpComing />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
