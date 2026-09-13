import React from 'react';
import * as constants from '../utils/constantsfile';

const DeathPage = ({ handleChoice }) => {
    return (
        <div className="page-container border">
            <h1 className="title">You Have Died</h1>
            <p className="text-content">Your adventure ends here, slain in battle.</p>

            <div>
                <button onClick={() => handleChoice(constants.BACKTOMENU)}>Back to Menu</button>
            </div>
        </div>
    );
};

export default DeathPage;
