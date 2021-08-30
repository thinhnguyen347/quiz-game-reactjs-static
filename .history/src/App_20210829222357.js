import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './component/textnote.gif';
import { Howl } from 'howler';
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
    question: "Có ba quả táo trên bàn và bạn lấy đi hai quả. Hỏi bạn còn bao nhiêu quả táo?",
    choices: ["2", "0", "1", "3"],
    ans: "2",
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
    question: "Con mèo nào cực kỳ sợ chuột?",
    choices: ["Mèo Doraemon", "Mèo Tom", "Mèo Kitty", "Mèo mướp"],
    ans: "Mèo Doraemon",
  }
]

function App() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [startPage, setStartPage] = useState('d-block');
  const [questionPage, setQuestionPage] = useState('d-none');
  const [resultPage, setResultPage] = useState('d-none');
  const [nextBtnDisable, setNextBtnDisable] = useState(true);
  const [hideNextBtn, setHideNextBtn] = useState("d-block");
  const [hideFinishBtn, setHideFinishBtn] = useState("d-none");
  const [choiceBtnDisable, setChoiceBtnDisable] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const current_question = quiz[currentQuestionNumber];
  

  function RenderQuestion({ question, choices }) {


    return (<>
      <div className='App-question-area d-flex align-items-center justify-content-center mb-3 px-lg-5'>
        <p className='h3'>{question}</p>
      </div>
      <div className='container-fluid'>
        <div className='row row-cols-1 row-cols-md-2 g-3 g-lg-4'>
          <div className='col d-flex justify-content-center'>
            <button type='button' className='btn btn-outline-light btn-warning py-3 w-100 fs-3 mx-md-5 rounded-pill text-dark' onClick={checkAnswer} disabled={choiceBtnDisable}>{choices[0]}</button>
          </div>
          <div className='col d-flex justify-content-center'>
            <button type='button' className='btn btn-outline-light btn-warning py-3 w-100 fs-3 mx-md-5 rounded-pill text-dark' onClick={checkAnswer} disabled={choiceBtnDisable}>{choices[1]}</button>
          </div>
          <div className='col d-flex justify-content-center'>
            <button type='button' className='btn btn-outline-light btn-warning py-3 w-100 fs-3 mx-md-5 rounded-pill text-dark' onClick={checkAnswer} disabled={choiceBtnDisable}>{choices[2]}</button>
          </div>
          <div className='col d-flex justify-content-center'>
            <button type='button' className='btn btn-outline-light btn-warning py-3 w-100 fs-3 mx-md-5 rounded-pill text-dark' onClick={checkAnswer} disabled={choiceBtnDisable}>{choices[3]}</button>
          </div>
        </div>
      </div>
    </>)
  }

  
  function pressStart() {
    const sound = new Howl({
      src: bgsound,
      loop: true,
    });

    sound.play();

    setStartPage('d-none');
    setQuestionPage('d-block')
  }

  function checkAnswer(e) {
    const correctSound = new Howl({ src: correct });
    const wrongSound = new Howl({ src: wrong });

    let current_answer = quiz[currentQuestionNumber].ans;
    let choice = e.target.textContent;

    if (choice === current_answer) {
      correctSound.play();
      setScore(score + 10);
    } else {
      wrongSound.play();
    }

    setChoiceBtnDisable(true);

    if (currentQuestionNumber === quiz.length-1) {
      setHideNextBtn('d-none');
      setHideFinishBtn('d-block');      
    };

    setNextBtnDisable(false);
  }

  function nextQuestion() {

    if (currentQuestionNumber < quiz.length-1) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
      setChoiceBtnDisable(false);
    };

    setNextBtnDisable(true);

  }

  function showResultPage() {
    setQuestionPage('d-none');
    setResultPage('d-block');
    (score > 0)
  }

  function replay() {
    setStartPage('d-block');
    setResultPage('d-none')
  }

  return (

    <div className="App container px-md-2 px-lg-5 w-100 d-flex align-items-center">
      <div className={`container-fluid p-0 ${startPage}`}>
        <img src={logo} className="img-fluid d-block mx-auto pb-5" alt="logo" width="360px" />
        <button type="button" className="App-start-btn btn btn-warning btn-lg d-block mx-auto py-3 px-5 fs-3" onClick={pressStart}>Start</button>
      </div>
      <div className={`container-fluid p-0 ${questionPage}`}>
        <div className={'container-fluid p-0'}>
          <div className="container-fluid pt-5 pb-2 px-0 d-flex justify-content-between fs-5">
            <div className="container-fluid ps-0">
              <div>Question</div>
              <div>{currentQuestionNumber + 1}/{quiz.length}</div>
            </div>
            <div className="container-fluid pe-0 text-end">
              <div>Score</div>
              <div className='my-2'>
                <span className='rounded-pill px-3 py-2 bg-light'>{score}</span>

              </div>
            </div>
          </div>
          <RenderQuestion question={current_question.question} choices={current_question.choices} />
        </div>
        <div className='container-fluid d-flex justify-content-around my-5 px-lg-5'>
          <button type='button' className={`${hideNextBtn} btn btn-primary px-3 px-sm-5 fs-5`} onClick={nextQuestion} disabled={nextBtnDisable}>&nbsp;Next&nbsp;</button>
          <button type='button' className={`${hideFinishBtn} btn btn-danger px-3 px-sm-5 fs-5`} onClick={showResultPage}>Finish</button>
        </div>
      </div>
      <div className={`container-fluid p-0 ${resultPage}`}>
        <img src={logo} className="img-fluid d-block mx-auto pb-5" alt="logo" width="360px" />
        <p className='h2 text-center'>{message}</p>
        <p className='h3 text-center'>You have got <span className="text-success">{score}</span>  points</p>
        <button type="button" className="App-start-btn btn btn-danger btn-lg d-block mx-auto py-2 px-4 fs-3 mt-5" onClick={replay}>Replay</button>

      </div>
    </div>

  );
}



export default App;
