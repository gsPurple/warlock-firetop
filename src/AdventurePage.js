import React from 'react';
import Header from './Header';
import ChoiceReader from './utils/ChoiceReader';


const AdventurePage = ({ playerState, dieOne, dieTwo, currentPage, handleChoice, pageContentParagraphs }) => {

    console.log(playerState)
    
    return (
        <div className='ui-container'>
          <Header playerState={playerState} className='left-col'/>
          <div className="page-container border">
            <h1 className='title'>{currentPage.title}</h1>
            {pageContentParagraphs.map((paragraph, index) => (
              <p className='text-content' key={index}>{paragraph}</p>
            ))}

            {currentPage.stats &&
            <div>
              {<div>Die One: {dieOne !== null ? <span className="red bold"> {dieOne} </span> : 'Not rolled yet'}</div>}
              {<div>Die Two: {dieTwo !== null ? <span className="green bold"> {dieTwo} </span> : 'Not rolled yet'}</div>}
              <p></p>
              {
                <div>TOTAL:&nbsp;<span className="red bold">{dieOne !== null ? dieOne : '0'}</span> + 
                           &nbsp;<span className="green bold">{dieTwo !== null ? dieTwo : '0'}</span> +
                           &nbsp;<span className="blue bold">{currentPage.pageContent.match(/\d+/g)}</span> = 
                           &nbsp;{dieOne + dieTwo + parseInt(currentPage.pageContent.match(/\d+/g))}</div>}
                </div>
            }

            {(currentPage.image !== undefined) &&
              <div id="imageContainer">
                  <img id='image' src={ require('./images/ilustrations/' + currentPage.image)} alt={currentPage.image} />
              </div>

            }

          
            <div className='navigation-button-container'>
              <ChoiceReader currentPage={currentPage} handleChoice={handleChoice} />
            </div>

            <div>
                {currentPage.previous !== undefined && <button id='button-back' onClick={() => handleChoice(currentPage.previous)}>
                  Back
                </button>}
    
                {currentPage.next !== undefined && <button id='button-next' onClick={() => handleChoice(currentPage.next)}>Next</button>}
            </div>
          </div>
        </div>
    );
};

export default AdventurePage;