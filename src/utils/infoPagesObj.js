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
//          effects: [{ addItem }] or [{ stat, change }] are applied before moving on.
// onEnter: [{ stat: "Sta" | "Skill" | "Luck" | "Gold" | "Provisions", change }] is applied once when the player
//          arrives on the page, and shown on it as a +/- notice.
export const pages = {
    hints: {
        title: "HINTS ON PLAY",
        text: "There is one true way through the Warlock's dungeon and it will take you several attempts to find it. Make notes and draw a map as you explore - this map will be invaluable in future adventures and enable you to progress rapidly through to unexplored sections.\n\nNot all rooms contain treasure; many merely contain traps and creatures which you will no doubt fall foul of. There are many 'wild goose chase' passages and whilst you may indeed progress through the dungeon, you will not take the Warlock's treasure unless you have picked up certain specific items on the way.\n\nSeveral keys will be found in dungeon rooms. Only by arriving at the Warlock's treasure with the correct keys to open his chest will you get to his treasure. You can expect many frustrations in Firetop Mountain.\nThe 'one true way' involves a minimum of risk and any player, no matter how weak on initial rolls, should be able to get through fairly easily.\n\n**May the luck of the gods go with you on the adventure ahead!**",
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
        text: "Before embarking on your adventure, you must first determine your own strengths and weaknesses. You have in your possession a sword and a shield together with a rucksack containing provisions (food and drink) for the trip. You have been preparing for your quest by training yourself in swordplay and exercising vigorously to build up your stamina.\n\nTo see how effective your preparations have been, we will use a random roll to determine your initial _SKILL_, _STAMINA_ and _LUCK_ scores.",
        previous: "intro",
        next: "skill-stamina-luck",
    },
    "skill-stamina-luck": {
        title: "SKILL, STAMINA AND LUCK",
        text: "Your _SKILL_ score reflects your swordsmanship and general fighting expertise - the higher the better. Your _STAMINA_ score reflects your general constitution, your will to survive, your determination and overall fitness - the higher your _STAMINA_ score, the longer you will be able to survive. Your _LUCK_ score indicates how naturally lucky you are. Luck - and magic - are facts of life in the fantasy kingdom you are about to explore.\n\n_SKILL, STAMINA and LUCK_ scores change constantly during an adventure. Although you may receive additional _SKILL, STAMINA, and LUCK_ points, these totals may never exceed your _Initial_ scores except on very rare occasions, when instructed on a particular page.",
        previous: "fight",
        next: "battles",
    },
    "battles": {
        title: "BATTLES",
        text: "You will often come across battles against a creature of some sort. An option to flee may be given, but if not - or if you choose to attack the creature anyway - you must resolve the battle until you or the creature die.\n\n**The sequence of combat is then:**\n\n**1.** Roll the two dice for the creature. Add its _SKILL_ score. This total is **its** _Attack Strength_\n\n**2.** Roll the two dice for yourself. Add your current _SKILL_. This total is **your** _Attack Strength_.\n\n**3.** Whose _Attack Strength_ is higher? If your _Attack Strength_ is higher, you have wounded the creature. If the creature's _Attack Strength_  is higher, it has wounded you. (If both are the same, you have both missed - the next _Attack Round_ starts from step 1 above.)\n\n**4.** If you wounded the creature, subtract 2 points from **its** _STAMINA_ score. You may use _LUCK_ here to do additional damage (see 'Using Luck in Battles' in the next pages).\n\n**5.** If the creature wounded you, subtract 2 points from **your** _STAMINA_ score. You may use _LUCK_ to minimize the damage.\n\n**6.** Make the appropriate changes to either the creature's or your own _STAMINA_ scores (and your _LUCK_ score if you used _LUCK_) and begin the next _Attack Round_ (repeat steps 1-6).\n\n**7.** This continues until the _STAMINA_ score of either you or the creature you are fighting has been reduced to zero (death).",
        previous: "skill-stamina-luck",
        next: "escaping-battles",
    },
    "escaping-battles": {
        title: "ESCAPING FROM BATTLES",
        text: "On some pages you will be given the option of _Escaping from the battle_. _You may only Escape_ if it is offered to you on the page.\n\nIf you do run away, the creature automatically scores one wound on you (subtract 2 _STAMINA_ points) as you flee. Such is the price of cowardice. You can use _LUCK_ on this wound in the normal way (see 'Using Luck in Battles' on the next pages).",
        previous: "battles",
        next: "luck-rules"
    },
    "luck-rules": {
        title: "LUCK",
        text: "Sometimes you will be told to _Test your Luck_. As you will discover, using Luck is a risky business. The way you _Test your Luck_ is as follows:\n\n**Two dice will be rolled**. If the number rolled is _equal to_ or _less than_ your current _LUCK_ score, you have been _lucky_. If the number rolled is _higher_ than your current _LUCK_ score, you have been _unlucky_.\n\nThe consequences of being _lucky_ or _unlucky_ will be found on the page. Each time you _Test your Luck_, you must subtract one point from your current _LUCK_ score. So the more you rely on luck, the more risky this becomes.",
        previous: "escaping-battles",
        next: "luck-in-battle",
    },
    "luck-in-battle": {
        title: "USING LUCK IN BATTLES",
        text: "In battles, you always have the option of using your luck either to score a more serious wound on a creature, or to minimize the effects of a wound the creature has just scored on you.\n\n**IF YOU HAVE JUST WOUNDED THE CREATURE:** you may _Test your Luck_ as described above. If you are _lucky_, subtract an _extra 2_ points from the creature's _STAMINA_ score (i.e. 4 instead of 2 normally). But if you are _unlucky_, you must restore 1 point to the creature's _STAMINA_ (so instead of scoring the normal 2 points of damage, you have now scored only 1).\n\n**IF THE CREATURE HAS JUST WOUNDED YOU:** you can _Test your Luck_ to try to minimize the wound. If you are _lucky_ restore 1 point of your _STAMINA_ (i.e. instead of doing 2 points of damage, it has done only 1). If you are _unlucky_ subtract _1 extra STAMINA_ point.\n\nDon't forget to subtract 1 point from your _LUCK_ score each time you _Test your Luck_.",
        previous: "luck-rules",
        next: "restoring"
    },
    "restoring": {
        title: "RESTORING SKILL, STAMINA AND LUCK",
        text: "Occasionally, a page may give instructions to alter your _SKILL_ score. A Magic Weapon may increase your _SKILL_, but remember that only one weapon can be used at a time! You cannot claim 2 _SKILL_ bonuses for carrying two Magic Swords. Your _SKILL_ score can never exceed its _Initial_ value unless specifically instructed.\n\nDrinking the Potion of Skill will restore your _SKILL_ to its _Initial_ level at any time.",
        previous: "luck-in-battle",
        next: "stamina-and-provisions"
    },
    "stamina-and-provisions":{
        title: "STAMINA AND PROVISIONS",
        text: "Your _STAMINA_ score will change a lot during the adventure. As you near your goal, your _STAMINA_ level may be dangerously low and battles may be particularly risky, so be careful!\n\nYou start the game with enough Provisions for ten meals. You may eat **only one** meal at a time. When you eat a meal, add 4 points to your _STAMINA_ score and deduct 1 point from your _Provisions_. Remember that you have a long way to go, so use your Provisions wisely!\n\nDon't forget that your _STAMINA_ score may never exceed its _Initial_ value unless specifically instructed on a page.\n\nDrinking a Potion of Strength will restore your _STAMINA_ to its _Initial_ level at any time.",
        previous: "restoring",
        next: "restore-luck"
    },
    "restore-luck":{
        title: "RESTORING LUCK",
        text: "You will find additions to your _LUCK_ score awarded when you have been particularly lucky. Remember that, as with _SKILL_ and _STAMINA_, your _LUCK_ score may never exceed its _Initial_ value unless specifically instructed on a page.\n\nDrinking a Potion of Fortune will restore your _LUCK_ to its _Initial_ level at any time, and increase your _Initial LUCK_ by 1 point.",
        choices: [{ label: BACKTOMENU, action: BACKTOMENU }],
        previous: "stamina-and-provisions",
    },
    "roll-stamina": {
        title: "YOUR STATS - STAMINA",
        type: "stats",
        stat: "Sta",
        base: 12,
        text: "Click the ROLL button to roll the dice and get your _STAMINA_ value.\n\nYour initial _STAMINA_ will be the sum of the numbers rolled on both dice plus the base _STAMINA_ value (12).",
        choices: [{ label: "Roll Stamina", action: ROLLSTAT }],
        next: "roll-luck",
    },
    "roll-luck": {
        title: "YOUR STATS - LUCK",
        type: "stats",
        stat: "Luck",
        base: 6,
        text: "Click the ROLL button on the left panel to roll the dice and get your _LUCK_ value.\n\nYour initial _LUCK_ will be the number rolled on the die plus the base _LUCK_ value (6).",
        choices: [{ label: "Roll Luck", action: ROLLSTAT }],
        next: "roll-skill",
    },
    "roll-skill": {
        title: "YOUR STATS - SKILL",
        type: "stats",
        stat: "Skill",
        base: 6,
        text: "Click the ROLL button on the left panel to roll the dice and get your _SKILL_ value.\n\nYour initial _SKILL_ will be the number rolled on the die plus the base _SKILL_ value (6).",
        choices: [{ label: "Roll Skill", action: ROLLSTAT }],
        next: "equipment",
    },
    equipment: {
        title: "EQUIPMENT & POTIONS",
        text: "You will start your adventure with a bare minimum of equipment, but you may find other items during your travels. You are armed with a sword and are dressed in leather armour. You have a rucksack (haversack, backpack) on your back to hold your Provisions and any treasures you may come across. You also carry a lantern which lights your way.\n\nIn addition, you may take one bottle of a magical potion which will aid you on your quest. You may choose to take a bottle of any of the following:\n\nPotion of Skill - restores _SKILL_ points\nPotion of Strength - restores _STAMINA_ points\nPotion of Fortune - Restores _LUCK_ points and adds 1 to initial _LUCK_\n\nThese potions may be taken at any time during your adventure. Each bottle of potion contains enough for two measures i.e. the characteristics may be restored twice during an adventure.\n\nRemember also that you may only choose one of the three potions to take on your trip, so choose wisely!",
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
        text: "The door opens to reveal a small, smelly room. In the centre of the room is a rickety wooden table on which stands a lit candle. Underneath the table is a **small wooden box**. Asleep on a straw mattress in the far corner of the room is a short, stocky creature with an ugly, warty face; the same sort of creature that you found asleep at the sentry post. He must be the guard for the night watch.\n\nYou may either return to the corridor and press on northwards or creep into the room and try to take the box without waking the creature.\n\nIf you want to try to steal the box, **Test your Luck**. If you are [[green:Lucky]], he does not wake up - turn to 147. If you are [[red:Unlucky]], turn to 33.",
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
        text: "You charge the door with your shoulder.\n\nRoll two dice.\n\nIf the number rolled is less than or equal to your _SKILL_ score, you succeed.\n\nIf the number rolled is greater than your _SKILL_, you rub your bruised shoulder and decide against trying again. You will have to return to the junction.",
        choices: [
            
        ],
        success: 343,
        fail: 92,
    },
    343: {
        text: "The door bursts open and you fall headlong into a room. But your heart jumps as you realize you are not landing on the floor, but plunging down a pit of some kind!\n\nLuckily the pit is not particularly deep and you land in a heap less than two metres down.\n\nLose 1 _STAMINA_ point for your bruises, climb out of the pit into the room and leave through the door, heading westwards.",
        onEnter: [{ stat: "Sta", change: -1 }],
        choices: [
            { label: "Head westwards", to: 92 },
        ],
    },
    147: {
        text: "You leave the room and open the box in the passage.\n\nInside you find a single Piece of Gold and a small mouse, which must have been the creature's pet. You keep the coin and release the mouse, which scurries off down the passageway. Gain 2 _LUCK_ points.",
        onEnter: [
            { stat: "Gold", change: 1 },
            { stat: "Luck", change: 2 },
        ],
        choices: [
            { label: "Press on northwards", to: 208 },
        ],
    },
    33: {
        type: "battle",
        image: "wofmsword.png",
        text: "The sleeping creature awakens startled. He jumps up and rushes at you, unarmed. With your sword you should be able to defeat him, but his sharp teeth look rather vicious.\n\nYou may _Escape_ through the door or stand and fight the Orc who is attacking you.",
        enemies: ["Orc-6-4"],
        next: 147,
    },
};
