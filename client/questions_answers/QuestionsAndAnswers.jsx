import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SearchForm from './SearchForm';
import QuestionsAndAnswersList from './QuestionsAndAnswersList';
import { Box, Grid, Container, Input, TextField } from '@material-ui/core';

const QuestionsAndAnswers = ({ props }) => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [productName, setProductName] = useState([]);
  const productId = 1;


  useEffect(() => {
    axiosQuestionRequest(productId)
    axiosProductInfoRequest(productId)
  }, []);

  const axiosQuestionRequest = (prodId) => {
    Axios.get(`http://18.224.200.47/qa/${prodId}?count=100`)
    .then((res) => setQuestions(res.data.results))
    .catch((err) => console.log(err));
  }

  const axiosProductInfoRequest = (prodId) => {
      Axios.get(`http://18.224.200.47/products/${prodId}`)
      .then(res => setProductName(res.data.name))
      .catch(err => console.log(err))
  }

  return (
    <Box>
        <Container>
      <h3>QUESTIONS AND ANSWERS</h3>
        <SearchForm
         searchTerm={searchTerm} 
         setSearchTerm={setSearchTerm} 
        />
       
        <Grid>
        <QuestionsAndAnswersList 
        productName={productName} 
        productId={productId} 
        axiosQuestionRequest={axiosQuestionRequest} 
        searchTerm={searchTerm} 
        questions={questions}
        />
        </Grid>
      
        </Container>
    </Box>
  );
};


export default QuestionsAndAnswers;
