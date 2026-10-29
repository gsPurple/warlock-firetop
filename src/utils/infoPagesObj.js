import { BACKTOMENU, ROLLSTAT, SKILLPOTION, STRPOTION, FORTPOTION } from './constantsfile';

// Pages are keyed by id: the book's section number for adventure pages, a slug for
// the rules/intro pages. Every link to another page (next, previous, lucky, unlucky,
// choice.to) is one of these ids.
//
// type: omitted = plain story page, "luck" = shows a Test your Luck button
//       (needs lucky/unlucky), "skill" = shows a Test your Skill button (roll two dice,
//       success if <= current SKILL; needs success/fail), "battle" = needs enemies ("Name-skill-stamina") and next,
//       "stats" = initial stat roll (needs stat and base).
// image + caption: the page opens on the full-size illustration (as in the book) and
//       Next then reveals the text. (On battle pages image is a small decoration.)
// A page's title defaults to its id.
// choices: [{ label, to }] navigates; { label, action } runs an action;
//          effects: [{ addItem }] are applied before moving on.
export const pages = {
    hints: {
        title: "HINTS ON PLAY",
        text: "There is one true way through the Warlock's dungeon and it will take you several attempts to find it. Make notes and draw a map as you explore - this map will be invaluable in future adventures and enable you to progress rapidly through to unexplored sections.\n\nNot all rooms contain treasure; many merely contain traps and creatures which you will no doubt fall foul of. There are many 'wild goose chase' passages and whilst you may indeed progress through the dungeon, you will not take the Warlock's treasure unless you have picked up certain specific items on the way.\n\nSeveral keys will be found in dungeon rooms. Only by arriving at the Warlock's treasure with the correct keys to open his chest will you get to his treasure. You can expect many frustrations in Firetop Mountain.\nThe one true way involves a minimum of risk and any player, no matter how weak on initial rolls, should be able to get through very easily.\n\nMay the luck of the gods go with you on the adventure ahead!",
        choices: [{ label: BACKTOMENU, action: BACKTOMENU }],
    },
    intro: {
        title: "INTRO",
        text: "The Warlock of the Firetop Mountain is a different kind of book. You will embark on a perilous quest to find the Warlock's hidden treasure. The treasure is hidden deep within a dungeon which you must explore, populated with a multitude of underworld monsters which you must fight and kill - or be killed in the attempt.\n\nPart novel, with its exciting story, and part game, with its elaborate combat system, this book holds many adventures in store for you. Each page presents different challenges, and the choices you make will send you on different paths and into different battles. You may get lost in the maze, have your strength sapped by a hideous Wight, die in a battle with Orcs, or fall to any one of the dozens of creatures guarding the Warlock's treasure-vaults. Or, with courage, determination and a fair amount of luck, you may survive through all traps and battles to the innermost chambers of the Warlock's domain where the treasure is hidden.\n\nMagic and monsters are as real as life in this sword and sorcery treasure hunt which will keep you spellbound for hours on end!",
        choices: [{ label: BACKTOMENU, action: BACKTOMENU }],
        next: "fight",
    },
    fight: {
        title: "HOW TO FIGHT CREATURES OF THE UNDERWORLD",
        text: "Before embarking on your adventure, you must first determine your own strengths and weaknesses. You have in your possession a sword and a shield together with a rucksack containing provisions (food and drink) for the trip. You have been preparing for your quest by training yourself in swordplay and exercising vigorously to build up your stamina.\n\nTo see how effective your preparations have been, we will use a random roll to determine your initial SKILL and STAMINA scores.",
        previous: "intro",
        next: "skill-stamina",
    },
    "skill-stamina": {
        title: "SKILL AND STAMINA",
        text: "Your SKILL score reflects your swordsmanship and general fighting expertise - the higher the better. Your STAMINA score reflects your general constitution, your will to survive, your determination and overall fitness - the higher your STAMINA score, the longer you will be able to survive. Your LUCK score indicates how naturally lucky you are. Luck - and magic - are facts of life in the fantasy kingdom you are about to explore.\n\nBATTLES:\nYou will often come across battles against a creature of some sort. An option to flee may be given, but if not - or if you choose to attack the creature anyway - you must resolve the battle until you or the creature die (STAMINA reaches 0).\n\nESCAPING:\nWhen you run away from a battle the creature automatically gets in one wound on you (you lose 2 STAMINA) as you flee. Such is the price of cowardice. Note that the option to escape isn't always given to you.",
        previous: "fight",
        next: "luck-rules",
    },
    "luck-rules": {
        title: "LUCK",
        text: "At various times during your adventure, either in battles or when you come across situations in which you could either be lucky or unlucky, you may call on your luck to make the outcome more favourable. But beware! Using luck is a risky business and if you are unlucky, the results could be disastrous.\n\nTo use luck we will roll two dice. If the number rolled is equal to or less than your current LUCK score, you have been lucky and the result will go in your favour. If not, you have been unlucky and you will be penalized.\nThis procedure is known as Testing your Luck. Each time you do it, one point will be subtracted from your current LUCK score. Thus you will soon realize that the more you rely on your luck, the more risky this will become.\n\nWhen in battle, if you have just wounded the creature, you may test your Luck and, if you are lucky, you will do an extra 2 points of damage. However, if you are unlucky, you will only take 1 point from the creature's STAMINA.\nYou can also use luck to minimize the damage a creature does to you when you get wounded, but if you're unlucky you will suffer 3 points of damage, instead of the normal 2.",
        previous: "skill-stamina",
        next: "restoring",
    },
    restoring: {
        title: "RESTORING SKILL, STAMINA AND LUCK",
        text: "Your stat scores can never exceed their initial value unless specifically instructed.\n\nSKILL - A Magic Weapon may increase your SKILL score, but remember that you can only use one weapon at a time!\n\nSTAMINA - This stat will change a lot during your adventure. As you near your goal, your STAMINA level may be dangerously low and battles may be particularly risky, so be careful!\nProvisions will restore 4 points of STAMINA, but you can only eat one at a time and only in certain occasions. Remember that you have a long way to go, so use your Provisions wisely!\n\nLUCK - When you are particularly lucky your LUCK score may increase.\n\nYou can also come across Potions that will restore your stat scores to their initial state. These can be used at any time.",
        choices: [{ label: BACKTOMENU, action: BACKTOMENU }],
        previous: "luck-rules",
    },
    "roll-stamina": {
        title: "YOUR STATS - STAMINA",
        type: "stats",
        stat: "Sta",
        base: 12,
        text: "Click the ROLL button to roll the dice and get your STAMINA value.\n\nYour initial STAMINA will be the sum of the numbers rolled on both dice plus the base STAMINA value (12).",
        choices: [{ label: "Roll Stamina", action: ROLLSTAT }],
        next: "roll-luck",
    },
    "roll-luck": {
        title: "YOUR STATS - LUCK",
        type: "stats",
        stat: "Luck",
        base: 6,
        text: "Click the ROLL button on the left panel to roll the dice and get your LUCK value.\n\nYour initial LUCK will be the number rolled on the die plus the base LUCK value (6).",
        choices: [{ label: "Roll Luck", action: ROLLSTAT }],
        next: "roll-skill",
    },
    "roll-skill": {
        title: "YOUR STATS - SKILL",
        type: "stats",
        stat: "Skill",
        base: 6,
        text: "Click the ROLL button on the left panel to roll the dice and get your SKILL value.\n\nYour initial SKILL will be the number rolled on the die plus the base SKILL value (6).",
        choices: [{ label: "Roll Skill", action: ROLLSTAT }],
        next: "equipment",
    },
    equipment: {
        title: "EQUIPMENT & POTIONS",
        text: "You will start your adventure with a bare minimum of equipment, but you may find other items during your travels. You are armed with a sword and are dressed in leather armour. You have a rucksack (haversack, backpack) on your back to hold your Provisions and any treasures you may come across. You also carry a lantern which lights your way.\n\nIn addition, you may take one bottle of a magical potion which will aid you on your quest. You may choose to take a bottle of any of the following:\n\nPotion of Skill - restores SKILL points\nPotion of Strength - restores STAMINA points\nPotion of Fortune - Restores LUCK points and adds 1 to initial LUCK\n\nThese potions may be taken at any time during your adventure. Each bottle of potion contains enough for two measures i.e. the characteristics may be restored twice during an adventure.\n\nRemember also that you may only choose one of the three potions to take on your trip, so choose wisely!",
        choices: [
            { label: SKILLPOTION, effects: [{ addItem: `${SKILLPOTION} x2` }], to: "rumours-1" },
            { label: STRPOTION, effects: [{ addItem: `${STRPOTION} x2` }], to: "rumours-1" },
            { label: FORTPOTION, effects: [{ addItem: `${FORTPOTION} x2` }], to: "rumours-1" },
        ],
    },
    "rumours-1": {
        title: "RUMOURS",
        text: "Only a foolhardy adventurer would embark upon such a perilous quest without first finding out as much as possible about the mountain and its treasures. Before your arrival at the foot of Firetop Mountain, you spent several days with the townsfolk of a local village some two days' journey from the base. Being a likeable sort of person, you found it easy to get on with the local peasants. Although they told many stories about the mysterious Warlock's sanctuary, you could not feel sure that all - or indeed any - of these were based on fact. The villagers had seen many adventurers pass through on their way to the mountain, but very few ever returned. The journey ahead was extremely dangerous, that you knew for certain. Of those who returned to the village, none contemplated going back to Firetop Mountain.\n\nThere seemed to be some truth in the rumour that the Warlock's treasure was stored in a magnificent chest with two locks, and the keys to these locks were guarded by various creatures within the dungeons. The Warlock himself was a sorcerer of great power. Some described him as old, others as young. Some said his power came from an enchanted deck of cards, others from the silky black gloves that he wore.",
        next: "rumours-2",
    },
    "rumours-2": {
        title: "RUMOURS",
        text: "The entrance to the mountain was guarded by a pack of warty-faced Goblins, stupid creatures, fond of their food and drink. Towards the inner chambers, the creatures became more fearsome. To reach the inner chambers you would have to cross a river. The ferry service was regular, but the ferryman enjoyed a good barter, so you should save a Gold Piece for the trip. The locals also encouraged you to keep a good map of your wanderings, for without a map you would end up hopelessly lost within the mountain.\n\nWhen it finally came to your day of leaving, the whole village turned out to wish you a safe journey. Tears came to the eyes of many of the women, young and old alike. You couldn't help wondering whether they were tears of sorrow shed by eyes which would never see you alive again . . .",
        previous: "rumours-1",
        next: 1,
    },
    1: {
        image: "wofm001.png",
        caption: "The steep face in front of you looks to have been savaged by the claws of some gargantuan beast...",
        text: "At last your two-day hike is over. You unsheathe your sword, lay it on the ground and sigh with relief as you lower yourself down on to the mossy rocks to sit for a moment's rest. You stretch, rub your eyes and finally look up at Firetop Mountain.\nThe very mountain itself looks menacing. The steep face in front of you looks to have been savaged by the claws of some gargantuan beast. Sharp rocky crags jut out at unnatural angles. At the top of the mountain you can see the eerie red colouring - probably some strange vegetation - which has given the mountain its name. Perhaps no one will ever know exactly what grows up there, as climbing the peak must surely be impossible.\n\nYour quest lies ahead of you. Across the clearing is a dark cave entrance. You pick up your sword, get to your feet and consider what dangers may lie ahead of you. But with determination, you thrust the sword home into its scabbard and approach the cave.\n\nYou peer into the gloom to see dark, slimy walls with pools of water on the stone floor in front of you. The air is cold and dank. You light your lantern and step warily into the blackness. Cobwebs brush your face and you hear the scurrying of tiny feet: rats, most likely. You set off into the cave. After a few yards you arrive at a junction.",
        choices: [
            { label: "Turn West", to: 71 },
            { label: "Turn East", to: 278 },
        ],
        previous: "rumours-2",
    },
    71: {
        type: "luck",
        image: "wofm071.png",
        caption: "As you look in, you can see a strange Goblin-like creature in leather armor asleep at his post.",
        text: "There is a right-hand turn to the north in the passage. Cautiously you approach a sentry post on the corner and, as you look in, you can see a strange Goblin-like creature in leather armour asleep at his post. You try to tiptoe past him.\nIf you're lucky, he will not wake up and remain snoring loudly - turn to 301.\nIf not turn to 248.",
        lucky: 301,
        unlucky: 248,
    },
    301: {
        text: "To your left, on the west face of the passage, there is a rough-cut wooden door. You listen at the door and can hear a rasping sound which may be some sort of creature snoring.",
        choices: [
            { label: "Open the door", to: 82 },
            { label: "Press on northwards", to: 208 },
        ],
    },
    248: {
        type: "battle",
        image: "wofmsword.png",
        text: "You step with a crunch on some loose ground and his eyes flick open.\n\nThe creature that has just awakened is an ORC! He scrambles to his feet and turns to grasp at a rope which is probably the alarm bell. You must attack him quickly!",
        enemies: ["Orc-6-5"],
        next: 301,
    },
    278: {
        text: "The passageway soon comes to an end at a locked wooden door. You listen at the door but hear nothing.\n\nWill you try to charge the door down or would you rather turn round and go back to the junction?",
        choices: [
            { label: "Charge door", to: 156 },
            { label: "Turn back", to: 92 },
        ],
    },
    82: {
        type: "luck",
        text: "The door opens to reveal a small, smelly room. In the centre of the room is a rickety wooden table on which stands a lit candle. Underneath the table is a **small wooden box**. Asleep on a straw mattress in the far corner of the room is a short, stocky creature with an ugly, warty face; the same sort of creature that you found asleep at the sentry post. He must be the guard for the night watch.\n\nYou may either return to the corridor and press on northwards or creep into the room and try to take the box without waking the creature. If you want to try to steal the box, **Test your Luck**. If you are [[green:Lucky]], he does not wake up - turn to 147. If you are [[red:Unlucky]], turn to 33.",
        choices: [{ label: "Return to corridor", to: 208 }],
        lucky: 147,
        unlucky: 33,
    },
    208: {
        text: "Further up the passage along the west wall you see another door. You listen at it but hear nothing.\n\nYou can try to open the door or continue northwards.",
        choices: [
            { label: "Open door", to: 397 },
            { label: "Continue northwards", to: 363 },
        ],
    },
    92: {
        text: "You arrive back at the junction in the passage. You look left to see the cave entrance in the dim distance but walk straight on.",
        choices: [
            { label: "Walk straight", to: 71 },
        ],
    },
    156: {
        type: "skill",
        text: "You charge the door with your shoulder.\n\nRoll two dice.\n\nIf the number rolled is less than or equal to your SKILL score, you succeed.\n\nIf the number rolled is greater than your SKILL, you rub your bruised shoulder and decide against trying again. You will have to return to the junction.",
        choices: [
            
        ],
        success: 343,
        fail: 92,
    },
};
