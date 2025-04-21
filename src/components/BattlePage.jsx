import React, {useState} from 'react';
import Header from './Header';
import ChoiceReader from '../utils/ChoiceReader';


const BattlePage = ({ playerState, setPlayerState, dieOne, dieTwo, currentPage, handleChoice, testYourLuck, pageContentParagraphs }) => {

    console.log("A battle has started...")

    const [battleState, setbattleState] = useState({
      enemyNum: currentPage.enemies.length,
      enemies: currentPage.enemies,
      enemyName: currentPage.enemies[0].split("-")[0],
      enemySTA: parseInt(currentPage.enemies[0].split("-")[2]),
      currentSTA:parseInt(currentPage.enemies[0].split("-")[2]),
      enemySKL: currentPage.enemies[0].split("-")[1],
    });
    
    return (
        <div className='ui-container'>
          <Header playerState={playerState} setPlayerState={setPlayerState} className='left-col'/>
          <div className="page-container border">
            <h1 className='title'>{currentPage.title}</h1>
            {pageContentParagraphs.map((paragraph, index) => (
              <p className='text-content' key={index}>{paragraph}</p>
            ))}

            {(currentPage.image !== null && currentPage.image !== undefined) &&
                <div id="swordImgContainer">
                    <img 
                        id="image" 
                        src={`/src/images/decor/${currentPage.image}`} 
                        alt={currentPage.image} 
                    />
                </div>

            }

            <hr />

            <div>Enemy: {battleState.enemyName}</div>

            <div>Skill: {battleState.enemySKL}</div>
            
            
            <ChoiceReader currentPage={currentPage} handleChoice={handleChoice} testYourLuck={testYourLuck}/>            

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

export default BattlePage;