import React, { useState } from 'react';
import Header from './Header';
import ChoiceReader from '../utils/ChoiceReader';
import parseFormattedText from '../utils/parseFormattedText';


const AdventurePage = ({ playerState, setPlayerState, dieOne, dieTwo, currentPage, handleChoice, testYourLuck, testYourSkill, pageContentParagraphs }) => {

    console.log(playerState)

    // Pages with an image open on the full-size illustration, like the book; Next reveals the text
    const [showText, setShowText] = useState(currentPage.image === undefined);

    if (!showText) {
      return (
        <div className='ui-container'>
          <Header playerState={playerState} setPlayerState={setPlayerState} className='left-col'/>
          <div className="page-container border">
            <h1 className='title'>{currentPage.title}</h1>
            <img
                className="illustration"
                src={`/src/images/ilustrations/${currentPage.image}`}
                alt={currentPage.image}
            />
            {currentPage.caption && <p className='text-content caption'>{currentPage.caption}</p>}

            <div>
                {currentPage.previous !== undefined && <button id='button-back' onClick={() => handleChoice({ to: currentPage.previous })}>
                  Back
                </button>}

                <button id='button-next' onClick={() => setShowText(true)}>Next</button>
            </div>
          </div>
        </div>
      );
    }

    return (
        <div className='ui-container'>
          <Header playerState={playerState} setPlayerState={setPlayerState} className='left-col'/>
          <div className="page-container border">
            <h1 className='title'>{currentPage.title}</h1>
            {pageContentParagraphs.map((paragraph, index) => (
              <p className='text-content' key={index}>{parseFormattedText(paragraph)}</p>
            ))}

            {currentPage.type === 'stats' &&
            <div>
              {<div>Die One: {dieOne !== null ? <span className="red bold"> {dieOne} </span> : 'Not rolled yet'}</div>}
              {<div>Die Two: {dieTwo !== null ? <span className="green bold"> {dieTwo} </span> : 'Not rolled yet'}</div>}
              <p></p>
              {
                <div>TOTAL:&nbsp;<span className="red bold">{dieOne !== null ? dieOne : '0'}</span> + 
                           &nbsp;<span className="green bold">{dieTwo !== null ? dieTwo : '0'}</span> +
                           &nbsp;<span className="blue bold">{currentPage.base}</span> =
                           &nbsp;{dieOne + dieTwo + currentPage.base}</div>}
                </div>
            }

            <ChoiceReader currentPage={currentPage} handleChoice={handleChoice} testYourLuck={testYourLuck} testYourSkill={testYourSkill} rolled={dieOne !== null}/>

            <div>
                {(currentPage.image !== undefined || currentPage.previous !== undefined) && <button id='button-back' onClick={() => currentPage.image !== undefined ? setShowText(false) : handleChoice({ to: currentPage.previous })}>
                  Back
                </button>}

                {currentPage.next !== undefined && (currentPage.type !== 'stats' || dieOne !== null) &&
                  <button id='button-next' onClick={() => handleChoice({ to: currentPage.next })}>Next</button>}
            </div>
          </div>
        </div>
    );
};

export default AdventurePage;