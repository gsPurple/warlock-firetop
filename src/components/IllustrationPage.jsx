import React from 'react';

// Full-size book illustration with its caption, shown before a page's text (see image/caption in infoPagesObj.js)
const IllustrationPage = ({ header, currentPage, handleChoice, onNext }) => (
    <div className='ui-container'>
      {header}
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

            <button id='button-next' onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
);

export default IllustrationPage;
