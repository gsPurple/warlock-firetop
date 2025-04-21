import React from 'react';


const tooltips = {
    Sword: <div className='tooltiptext'>A simple sword</div>,
    Shield: <div className='tooltiptext'>A simple shield</div>,
    Lantern: <div className='tooltiptext'>A lantern that shines brightly</div>,
    PotionofStrength: <div className='tooltiptext'>A potion that restores your Stamina points</div>,
    PotionofSkill: <div className='tooltiptext'>A potion that restores your Skill points</div>,
    PotionofFortune: <div className='tooltiptext'>A potion that restores your Luck points and adds 1 to Initial Luck</div>,
    Escape: <div className='tooltiptext'>You will LOSE 2 STAMINA points!<br/>(1 if you're lucky)</div>,
    Key99: <div className='tooltiptext'>A bronze coloured key with the number 99 carved into it</div>,
    Provisions: <div className='tooltiptext'>Each provision restores 4 STAMINA points</div>,
    SilkyBlackGlove: <div className='tooltiptext'>A mysterious glove</div>,
    GoldenCrescent: <div className='tooltiptext'>An iron shield with a golden crescent that may give you +1 DMG resistance</div>,
    BowArrow: <div className='tooltiptext'>A magnificent bow and a silver arrow</div>,
    Cheese: <div className='tooltiptext'>A large piece of sweet-smelling Cheese</div>,
    IronHelmet: <div className='tooltiptext'>An enchanted helmet. Gives you +1 Attack Strength</div>,
    LightSword: <div className='tooltiptext'>A light sword. Gives you +1 SKILL</div>,
    BoatHouseKey: <div className='tooltiptext'>A key that appears to belong to a boat house</div>,
    PotionofInvisibility: <div className='tooltiptext'>A potion that can turn you invisible in some situations</div>,
};


function tooltipText(item) {
    let result;

    switch(item) {
        case "Lantern":
            result = tooltips.Lantern;
            break;
        case "Potion of Strength x2":
        case "Potion of Strength x1":
            result = tooltips.PotionofStrength;
            break;
        case "Potion of Skill x2":
        case "Potion of Skill x1":
            result = tooltips.PotionofSkill;
            break;
        case "Potion of Fortune":
            result = tooltips.PotionofFortune;
            break;
        case "Escape":
            result = tooltips.Escape;
            break;
        case "Sword":
            result = tooltips.Sword;
            break;
        case "Shield":
            result = tooltips.Shield;
            break;
        case "Key 99":
            result = tooltips.Key99;
            break;
        case "Provisions":
            result = tooltips.Provisions;
            break;
        case "Silky Black Glove":
            result = tooltips.SilkyBlackGlove;
            break;
        case "Golden Crescent":
            result = tooltips.GoldenCrescent;
            break;
        case "Bow & Arrow":
            result = tooltips.BowArrow;
            break;
        case "Cheese":
            result = tooltips.Cheese;
            break;
        case "Iron Helmet":
            result = tooltips.IronHelmet;
            break;
        case "Light Sword":
            result = tooltips.LightSword;
            break;
        case "Boat House Key":
            result = tooltips.BoatHouseKey;
            break;
        case "Potion of Invisibility":
            result = tooltips.PotionofInvisibility;
            break;
        default:
            result = null;
    }

    return result;
}

export default tooltipText;
