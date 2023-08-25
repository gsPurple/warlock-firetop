import ToolTips from '../tooltipsText.js';

function tooltipText(item) {

    let result;

    switch(item) {
        case "Lantern":
            result = ToolTips.Lantern;
            break;

        case "Potion of Strength x2":
            result = ToolTips.PotionofStrength;
            break;

        case "Potion of Strength x1":
            result = ToolTips.PotionofStrength;
            break;

        case "Escape":
            result = ToolTips.Escape;
            break;

        case "Sword":
            result = ToolTips.Sword;
            break;

        case "Shield":
            result = ToolTips.Shield;
            break;

        case "Key 99":
            result = ToolTips.Key99;
            break;

        case "Provisions":
            result = ToolTips.Provisions;
            break;

        case "Silky Black Glove":
            result = ToolTips.SilkyBlackGlove;
            break;

        case "Golden Crescent":
            result = ToolTips.GoldenCrescent;
            break;

        case "Bow & Arrow":
            result = ToolTips.BowArrow;
            break;

        case "Cheese":
            result = ToolTips.Cheese;
            break;

        case "Iron Helmet":
            result = ToolTips.IronHelmet;
            break;

        case "Light Sword":
            result = ToolTips.LightSword;
            break;
        
        case "Boat House Key":
            result = ToolTips.BoatHouseKey;
            break;

        case "Potion of Invisibility":
            result = ToolTips.PotionofInvisibility;
            break;
        default:
    }

    return result;

}

export default tooltipText;