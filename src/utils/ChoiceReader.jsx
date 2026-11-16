
// inventory: the player's items, for choices with `requires` / `unless` (shown only when the item is / isn't held)
// children: extra buttons shown after the page's own (e.g. Escape)
function ChoiceReader({ currentPage, handleChoice, testYourLuck, testYourSkill, rollPageEffect, rolled, inventory = [], children }) {
  // A stat page's roll button disappears once the dice have been rolled
  const showChoices = !(currentPage.type === 'stats' && rolled);
  // Stacked items carry a count ("Potion of Skill x3"), so compare base names
  const holds = (item) => inventory.some((held) => held.replace(/s+xd+$/, '') === item);
  const available = (choice) => (!choice.requires || holds(choice.requires)) && (!choice.unless || !holds(choice.unless));

  return (
    <div className='navigation-button-container'>
      {showChoices && currentPage.choices &&
        currentPage.choices.filter(available).map((choice, index) => (
          <button key={index} onClick={() => handleChoice(choice)}>
            {typeof choice.to === 'number' ? `${choice.label} - ${choice.to}` : choice.label}
          </button>
        ))}

      {currentPage.type === 'skill' &&
        <button onClick={() => testYourSkill()}>
          Test your Skill
        </button>
      }

      {currentPage.type === 'luck' &&
        <button onClick={() => testYourLuck()}>
          Test your Luck
        </button>
      }

      {currentPage.rollEffect &&
        <button onClick={() => rollPageEffect()}>
          Roll the die
        </button>
      }

      {children}
    </div>
  );
}

export default ChoiceReader;
