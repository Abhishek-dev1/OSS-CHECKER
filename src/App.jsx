import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllCounts, contriSize } from './actions'
var check = 0;

function App() {

  const [link, setLink] = useState("")
  const [percentage, setPercentage] = useState(0)
  const [result, setResult] = useState(false)


  const onChangeHandlerOne = (e) => {
    setLink(e.target.value)
  }



  const onClickHandler = (e) => {
    e.preventDefault();
    const arr = link.split("/")
    console.log(arr)
    //setLink("");

    getAllCounts(arr[3], arr[4]).then((data) => {
      console.log(data)
      if (data) {

        if (data.description != '') {
          check++;
        }

        if (data.watchers_count >= 250) {
          check++;
        }

        if (data.forks_count >= 100) {
          check++;
        }

        if (data.subscribers_count > 11) {
          check++;
        }

        if (data.open_issues >= 50) {
          check++;
        }

        contriSize(data.contributors_url).then((value) => {
          if (value.length >= 10) {
            check++;
          }
        })

        if (check >= 3) {
          let percent = (check * 100) / 6;
          setPercentage(percent)
          setResult(true)
        }
        else if (check < 3) {
          let per = (check * 100) / 6;
          setPercentage(per)
        }
        console.log(percentage)

        check = 0;


      }
    })

  }

  const showResult = () => {
    if (percentage >= 50) {
      return <div className="text-white mt-5">TrustWorthy {percentage.toFixed(2)} %</div>
    }
    else if (percentage == 0) {
      return <div className="text-white mt-5">Click Again</div>
    }
    else {

      return <div className="text-white mt-5">Not TrustWorthy {percentage.toFixed(2)} %</div>
    }

  }


  return (
    <div className="App">

      <div className="container">
        <div className="header-container">
          <h1 className="header gradient-text">OSS-CHECKER</h1>


        </div>
        <form onSubmit={onClickHandler} className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" i>Github Repo Link</span>
          </div>
          <input value={link} type="text" className="form-control" placeholder="RepoLink (Example: https://github.com/Abhishek-dev1/CSES)" onChange={(e) => onChangeHandlerOne(e)} required></input>
          <div className="container mybutton"><button className="cta-button connect-wallet-button btn btn-primary" type="submit" >
            Check if Safe?
          </button>
            </div>
        </form>



        {percentage != 0 && showResult()}
      </div>
    </div>
  );
}

export default App;