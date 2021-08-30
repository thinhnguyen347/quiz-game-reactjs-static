import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './component/textnote.gif';
import {Howl} from 'howler';
import bgsound from './component/audio/bgsound.ogg';
import correct from './component/audio/correct.ogg';
import wrong from './component/audio/wrong.ogg'





const quiz = [
  {
    question: "Môn gì càng thắng lại càng thua?",
    choices: ["Cờ vua", "Cờ tướng", "Đạp xe", "Đu dây"],
    ans: "Đạp xe",
  },

  {
    question: "What is the sweet food made by bees?",
    choices: ["Chocolate", "Pollen", "Honey", "Flower"],
    ans: "Honey",
  },

  {
    question: "Có ba quả táo trên bàn và bạn lấy đi hai quả. Hỏi bạn còn bao nhiêu quả táo?",
    choices: ["2", "0", "1", "3"],
    ans: "2",
  },

  {
    question: "On a common ladybug, what color are its spots?",
    choices: ["Red", "Black", "Yellow", "White"],
    ans: "Black",
  },

  {
    question: "Bạn đang ở trong một cuộc đua và bạn vừa vượt qua người thứ nhì. Vậy bây giờ bạn đang ở vị trí nào trong đoàn đua ấy?",
    choices: ["Ba", "Nhất", "Tư", "Nhì"],
    ans: "Nhì",
  },

  {
    question: "Cầu gì biết chạy?",
    choices: ["Cầu lông", "Cầu vồng", "Cầu thủ", "Cầu mong"],
    ans: "Cầu thủ",
  },

  {
    question: "Do you know an animal that cannot jump?",
    choices: ["Grasshopper", "Frog", "Kangaroo", "Elephant"],
    ans: "Elephant",
  },

  {
    question: "Con mèo nào cực kỳ sợ chuột?",
    choices: ["Mèo Doraemon", "Mèo Tom", "Mèo Kitty", "Mèo mướp"],
    ans: "Mèo Doraemon",
  },

  {
    question: "How many dots on a dice?",
    choices: [19, 20, 21, 22],
    ans: 21,
  },

  {
    question: "Which month of the year has the least number of days?",
    choices: ['December', 'August', 'February', 'May'],
    ans: 'February',
  }
]

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [startPage, setStartPage] = useState('d-none');
  const [questionPage, setQuestionPage] = useState('d-block');
  // const [resultPage, setResultPage] = useState('d-none');
  // const [point, setPoint] = useState('d-none');


function RenderQuestion({question, choices}){
  return(<>
  <p className='h3'>{question}</p>
  <div className='container-fluid'>
    <div className='row row-cols-1 row-cols-md-2 g-2'>
      <div className='col'>
        <button type='button' className='btn bg-success'>{choices[0]}</button>
        </div>
      <div className='col'>{choices[1]}</div>
      <div className='col'>{choices[2]}</div>
      <div className='col'>{choices[3]}</div>
    </div>

  </div>

  
  </>)
}

  function pressStart(){
    const sound = new Howl({
      src: bgsound,
      loop: true,
    });
    sound.play();

    setStartPage('d-none');
    setQuestionPage('d-block')
  }

  function correctSound(){
    const sound= new Howl({src: correct});
    sound.play()
  }

  function wrongSound(){
    const sound= new Howl({src: wrong});
    sound.play()
  }


  return (
    <div className="App container p-md-2 p-lg-5 w-100 d-flex align-items-center">
      <div className={`container-fluid p-0 ${startPage}`}>
        <img src={logo} className="img-fluid d-block mx-auto pb-5" alt="logo" width="360px" />
        <button type="button" className="App-start-btn btn btn-warning btn-lg d-block mx-auto py-3 px-5 fs-3" onClick={pressStart}>Start</button>
      </div>
      <div className={`container-fluid p-0 ${questionPage}`}>
        <img src={logo} className="img-fluid d-block mx-auto pb-5" alt="logo" width="360px" />
        <button type="button" className="App-start-btn btn btn-warning btn-lg d-block mx-auto py-3 px-5 fs-3" onClick={pressStart}>Start</button>
      </div>
    </div>
  );
}

export default App;
