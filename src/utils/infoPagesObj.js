import { BACKTOMENU, ROLLSTAT, SKILLPOTION, STRPOTION, FORTPOTION } from './constantsfile';

// Pages are keyed by id: the book's section number for adventure pages, a slug for
// the rules/intro pages. Every link to another page (next, previous, lucky, unlucky,
// choice.to) is one of these ids.
//
// type: omitted = plain story page, "luck" = shows a Test your Luck button
//       (needs lucky/unlucky), "skill" = shows a Test your Skill button (roll two dice,
//       success if <= current SKILL; needs success/fail; optional failEffects: same format as choice effects,
//       applied when the test fails), "battle" = needs enemies ("Name-skill-stamina") and next
//       (optional escape: page id to flee to - adds an Escape button, the creature gets one wound on you;
//       optional playerAttackMod: number added to (or, if negative, taken from) your Attack Strength every round of this fight),
//       "stats" = initial stat roll (needs stat and base).
// escape: page id to flee to. On any page type it adds an Escape button (confirmation, one wound on you, optional
//       Luck test; see useEscape.jsx). On non-battle pages escapeFoe ("servant") names who wounds you as you go.
// image + caption: the page opens on the full-size illustration (as in the book) and
//       Next then reveals the text (or, on battle pages, the fight). Battle pages always
//       show the sword decoration themselves, so it isn't set per page.
// A page's title defaults to its id.
// choices: [{ label, to }] navigates; { label, action } runs an action;
//          effects: [{ addItem }] or [{ stat, change }] are applied before moving on.
// items: ["Item name"] shows a Take button per item on the page; taking is optional and once per visit.
// dropToTake: true makes taking the page's items ask which item to leave behind (SWAP_ITEM), since you can't carry more.
// onEnter: [{ stat: "Sta" | "Skill" | "Luck" | "Gold" | "Provisions", change }] is applied once when the player
//          arrives on the page, and shown on it as a +/- notice.
// rollEffect: { stat, sign } + then: page id. Adds a "Roll the die" button; one die is rolled (once per visit) and
//          the stat changes by that amount (sign -1 loses, 1 gains), applied when the die lands. Continue then goes to
//          `then`, so the page needs no choices.
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
        text: "The sleeping creature awakens startled. He jumps up and rushes at you, unarmed. With your sword you should be able to defeat him, but his sharp teeth look rather vicious.\n\nYou may _Escape_ through the door or stand and fight the Orc who is attacking you.",
        enemies: ["Orc-6-4"],
        escape: 320,
        next: 147,
    },
    363: {
        text: "Further up the passage, on the west wall, you see another similar door. You listen at the door and grimace to hear the worst singing you have ever heard in your life!\n\nDo you want to go into the room to investigate this hideous din or walk on up the passageway?",
        choices: [
            { label: "Investigate the hideous din", to: 370 },
            { label: "Continue up the passageway", to: 42 },
        ],
    },
    397: {
        text: "The door opens to reveal a small room with a stone floor and dirty walls. There is a stale smell in the air. In the centre of the room is a makeshift wooden table on which is standing a lit candle.\n\nUnder the table is a small box. In the far corner of the room is a small mattress.\n\nYou may either open the box or leave the room.",
        choices: [
            { label: "Open the box", to: 240 },
            { label: "Leave the room", to: 363 },
        ],
    },
    320: {
        text: "You run out of the room and slam the door shut behind you.\n\nYou turn northwards up the passageway passing a similar-looking door further up.",
        choices: [
            { label: "Turn northwards", to: 363 },
        ],
    },
    240: {
        type: "battle",
        text: "The box is light, but something rattles within. You open the lid and a small _SNAKE_ darts out to bite at your wrist.\n\nYou must fight the Snake.",
        image: "wofm240.png",
        caption: "You open the lid and a small Snake darts out to bite at your wrist!",
        enemies: ["Snake-5-2"],
        next: 145,
    },
    42: {
        text: "You eventually arrive at the end of the passage, at a three-way junction. You may turn either to the west or to the east.",
        choices: [
            { label: "Turn west", to: 257 },
            { label: "Turn east", to: 113 },
        ],
    },
    370: {
        text: "The door opens to reveal a small room. The room is dirty and unkempt. A straw mattress lies in one corner. In the centre of the room is a wooden table upon which a candle burns, lighting the room with its flickering flame.\n\nA small box rests under the table. Seated around the table are two small creatures with warty skin, dressed in leather armour. They are drinking some sort of grog and, by the way they stagger to their feet on your arrival, you assume they are very drunk.\n\nYou may either draw your sword and leap forward at them or slam the door quickly and run on up the passage.",
        image: "wofm370.png",
        caption: "Seated around the table, are two small creatures with warty skin, dressed in leather armour.",
        choices: [
            { label: "Draw your sword", to: 116 },
            { label: "Slam the door and run", to: 42 },
        ],
    },
    145: {
        text: "The box has fallen to the ground during your fight with the Snake and out of it has fallen a bronze-coloured key with the number _99_ carved into it.\n\nYou may take this key with you and leave the room. You gain 1 _LUCK_ point.",
        onEnter: [{ stat: "Luck", change: 1 }],
        items: ["Bronze Key 99"],
        choices: [
            { label: "Move on", to: 363 },
        ],
    },
    116: {
        type: "battle",
        text: "The two drunken _ORCS_ you now face are obviously startled at your entrance and, as quickly as they are able, they fumble around for the weapons.\n\nYou must attack each one in turn.\n\nTheir drunkenness allows you to add 1 point to your dice roll when rolling to work out your _Attack Strength_, during each _Attack Round_.",
        enemies: ["Orc-5-4", "Orc-5-5"],
        next: 378,
        escape: 42,
        playerAttackMod: 1,
    },
    113: {
        text: "You arrive at another junction in the passage.\n\nYou may either go northwards or continue eastwards.",
        choices: [
            { label: "Go northwards", to: 285 },
            { label: "Continue eastwards", to: 78 },
        ],
    },
    257: {
        text: "The passageway runs straight for several metres and then ends at a wooden door.\n\nYou listen at the door and hear angry shouting coming from within.\n\nWill you investigate, or turn back?",
        choices: [
            { label: "Investigate", to: 168 },
            { label: "Turn back", to: 293 },
        ],
    },
    293: {
        text: "You arrive back at the junction in the passage and walk straight on eastwards.",
        choices: [
            { label: "Walk eastwards", to: 113 },
        ],
    },
    378: {
        text: "You wipe your bloodied sword on the mattress. The green blood leaves a slimy stain on the straw.\n\nStepping over the bodies towards the table you flinch at the foul stench of the creatures. You pick up the box from under the table and examine it. It is a small wooden box with crude hinges. The name _'Farrigo Di Maggio'_ is inscribed on a brass nameplate on its lid.\n\nDo you open the box, or do you decide to leave it behind and leave the room?",
        choices: [
            { label: "Open the box", to: 296 },
            { label: "Leave the room", to: 42 },
        ],
    },
    78: {
        text: "The passage ends at a solid wooden door with metal hinges.\n\nListening at the door, you hear strange mutterings and the clatter of what could be pots and pans. Whatever is in there, there are several of them.\n\nDo you want to go through the door or turn back?",
        choices: [
            { label: "Go through door", to: 159 },
            { label: "Turn back", to: 237 },
        ],
    },
    168: {
        text: "You open the door to a large room. A large chair behind a solid-looking table suggests to you that someone, or _something_, of rank uses this room.\n\nA chest in the centre catches your eye. In a corner of the room stands a man-sized creature with a warty face, standing over a smaller creature of similar race. With the whip in his hand, the _ORC CHIEFTAIN_ has been beating his servant, who is whimpering, beneath him.\n\nWill you:\n• Attack them both?\n• Spring at the Chieftain in the hope that his servant will aid you?\n• Leave the room and head back for the junction?",
        image: "wofm168.png",
        caption: "With the whip in his hand, the Orc Chieftain has been beating his servant, who is whimpering beneath him.",
        choices: [
            { label: "Attack them both", to: 372 },
            { label: "Spring at the Chieftain", to: 65 },
            { label: "Leave the room", to: 293 },
        ],
    },
    285: {
        text: "You see a well-used door on the right-hand (east) side of the passageway. With your ear to the keyhole, you listen and hear a man screaming for help from inside.\n\nWill you open the door or walk on?",
        choices: [
            { label: "Open the door", to: 213 },
            { label: "Walk on", to: 314 },
        ],
    },
    237: {
        text: "You move swiftly down the passage and arrive back at the junction.\n\nTurn northwards this time.",
        choices: [
            { label: "Turn northwards", to: 285 },
        ],
    },
    296: {
        text: "The box contains a small leather-bound book entitled _The Making and Casting of Dragonfire_. You open the pages and begin to read. Fortunately it is written in your own language and so was probably not understood by the Orcs - otherwise this treasure would certainly not be as loosely guarded as it was.\n\nThe book is written in tiny handwriting by _Farrigo Di Maggio_. In it he tells the story of his life's work; the creation of the Dragonfire spell with which to fight evil Dragons.\n\nYou read how, in his last years, Farrigo finally perfected his spell but by then was too old to make use of it. So he completed his book, locked it in a chest and hid it in the depths of Firetop Mountain, afraid that it might fall into the wrong hands. The last page reads...",
        choices: [
            { label: "Read the last page", to: "dragon-fire-spell-note" },
        ],
    },
    "dragon-fire-spell-note": {
        title: "296",
        image: "wofm_spell_note.png",
        previous: 296,
        text: "You say these words slowly and softly. Suddenly the pages seem to glow and as this glow disappears, so do the words on the pages of the book. You repeat the spell to yourself to memorize it and leave the room.",
        choices: [
            { label: "Leave the room", effects: [{ addItem: "Dragonfire Spell" }], to: 42 },
        ],
    },
    65: {
        text: "As you spring at the Chieftain, his servant rises to his feet, picks up a hefty woodenstick and joins the melee. But to your disappointment he attacks you!\n\n_Ungrateful wretch!_\n\nSeeing this, you may _Escape_ through the door down the corridor or continue the fight.\n\nIf you choose to _Escape_, you suffer normal escaping penalties.",
        choices: [
            { label: "Continue the fight", to: 372 },
        ],
        escape: 293,
        escapeFoe: "Chieftain",
    },
    372: {
        type: "battle",
        text: "The battle commences! Fight them one at a time.",
        enemies: ["Orc Chieftain-7-6", "Servant-5-3"],
        next: 21,
    },
    159: {
        type: "luck",
        lucky: 237,
        unlucky: 365,
        text: "You open the door into a large room which can only be the dining room of the same warty-faced creatures you now recognize.\n\nSitting round a large table are five _ORCS_ busily drinking and dribbling their bowls of rat-gizzard soup. All are involved in a rowdy argument as to who will get to chew the rat bones left in the large soup cauldron, so they do not see you enter.\n\nYou may be bold and prepare to attack them, or you may not relish the prospect of taking on five of these creatures and try to escape.\n\nIf you wish to leave the room, _Test your Luck_. If you are _Lucky_, you get out without them noticing - there is no penalty for escaping. If you are _Unlucky_, they notice you.",
        choices: [
            { label: "Prepare to attack", to: 365 },
        ],
    },
    213: {
        type: "skill",
        success: 36,
        fail: 314,
        failEffects: [{ stat: "Sta", change: -1 }],
        text: "The door is locked. You may try to charge it down by rolling two dice.\n\nIf the number rolled is equal to or less than your _SKILL_ score, the door bursts open.\n\nIf the number is greater than your _SKILL_ score, the door remains locked, you lose 1 _STAMINA_ point for your bruised shoulder and you must progress up the passage.",
        choices: [
            { label: "Walk away", to: 314 },
        ],
    },
    314: {
        text: "Further up the passage you see a door in the east wall. You listen hard, but can hear no sound.\n\nDo you want to open the door to investigate, or do you want to walk further up the passage?",
        choices: [
            { label: "Open the door", to: 223 },
            { label: "Walk up the passage", to: 300 },
        ],
    },
    365: {
        type: "battle",
        text: "The Orcs attack you one at a time. You may try to _Escape_ this battle!",
        enemies: ["Orc-6-4", "Orc-5-3", "Orc-6-4", "Orc-5-2", "Orc-4-4"],
        next: 183,
        escape: 237,
    },
    21: {
        text: "The green blood of the dead Orcs smells foul as it seeps from their bodies. You step around the corpses and investigate the chest.\n\nIt is a sturdy affair, made of strong oak and iron, and it is firmly locked.\n\nYou may try to smash the lock with your sword or leave it alone and go through the open door.",
        choices: [
            { label: "Smash the lock", to: 339 },
            { label: "Go through the door", to: 293 },
        ],
    },
    36: {
        text: "The locked door bursts open and a nauseating stench hits your nostrils.\n\nInside the room the floor is covered with bones, rotting vegetation and slime. A wild-haired old man, clothed in rags, rushes at you screaming. His beard is long and grey, and he is waving an old wooden chair-leg.\n\nIs he simply insane as he appears, or has this been some kind of trap?\n\nYou may either shout at him to try to calm him down or draw your sword and attack him.",
        image: "wofm36.png",
        caption: "Inside the room the floor is covered with bones, rotting vegetation and slime.",
        choices: [
            { label: "Shout at him", to: 263 },
            { label: "Attack him", to: 353 },
        ],
    },
    223: {
        text: "The door is firmly locked.\n\nYou may try to force it open, or you may continue along the corridor.",
        choices: [
            { label: "Force it open", to: 53 },
            { label: "Continue along the corridor", to: 300 },
        ],
    },
    300: {
        text: "On the east wall of the passage you see another door, this time made of solid metal. Listening at the door you hear the sound of tortured screams coming from within.\n\nDo you wish to try opening the door, or do you decide to ignore this room and continue up the corridor?",
        choices: [
            { label: "Try opening the door", to: 102 },
            { label: "Continue up the corridor", to: 303 },
        ],
    },
    263: {
        text: "You shout: _'You are freed, old man!'_ at the top of your voice. Instantly, his rantings cease. He stops dead in his tracks and sinks to the floor, weeping loudly.\n\nAs he gradually composes himself, he thanks you many times. You talk with him in the hope of discovering some of the secrets of the mountain and he begins to tell his story.\n\nMany years ago he was an adventurer like you in search of the Warlock's treasure. He was captured by the Orcs and thrown into his solitary cell as a sort of pet for the creatures. You ask whether he would like to acompany you into the mountain, but he simply wants to leave and see the world again.\n\nYou ask him for advice, but he says he knows little. He advises you to pay your respects to the boatman. He tells you that you must pull the right-hand lever on the wall ahead to open the iron gate at the end of the passage.\n\nHe has also learned that the keys to the Boat House are guarded by a man and his dog.\n\nYou shake hands, leave the room and go your separate ways. You gain 1 _LUCK_ point.",
        onEnter: [{ stat: "Luck", change: 1 }],
        choices: [
            { label: "Leave the room", to: 314 },
        ],
    },
    353: {
        text: "You lunge at the old man as he leaps towards you with outstretched arms - and run him through the chest with your sword.\n\nYou curse as you realize that he was making no attempt to attack you; his wild excitement must merely have been relief after having been imprisoned for what had apparently been a very long time.\n\nYou will now get no information out of him on the perils of the adventure ahead. You leave the room and progress up the passageway.",
        choices: [
            { label: "Progress up the passageway", to: 314 },
        ],
    },
    53: {
        type: "skill",
        success: 155,
        fail: 300,
        failEffects: [{ stat: "Sta", change: -1 }],
        text: "You charge the door, hitting it squarely with your shoulder _Roll 2 dice_.\n\nIf the number rolled is equal to or less than your _SKILL_ score, the door opens.\n\nIf the number exceeds your _SKILL_ score, the door shudders but does not budge, and you wince in pain as you hit the door - lose 1 _STAMINA_ point and continue up the corridor.",
    },
    183: {
        text: "You search the bodies of the dead Orcs but find only a few teeth, nails, bones and knives in their pockets.\n\nYou search the cupboards around the room but find only crude bowls, plates and spoons. But under the serving hatch you find a thin leather case half a metre long. You may open the case or you may leave it behind and walk out of the door.\n\nYou are proud of your victory and may add 1 _SKILL_ and 5 _STAMINA_ points.",
        choices: [
            { label: "Open the case", to: 266 },
            { label: "Walk out", to: 237 },
        ],
        onEnter: [
            { stat: "Skill", change: 1 },
            { stat: "Sta", change: 5 }
        ],
    },
    339: {
        text: "The lock was obviously inadequate; it flies off and lands on the floor several metres away. You lift up the heavy lid and your eyes widen as you see the gold sheen coming from within.\n\nA fair number of Gold Pieces are inside. In one corner lies a small black bottle with a tight glass stopper, containing a liquid of some kind. Also in the chest is a silky black glove. But as you are admiring this treasure you hear a soft click and wince in pain as a small dart shoots forward into your stomach.\n\nRoll one die and subtract this number of points from your _STAMINA_ to determine the effect of the poison on the dart tip.\n\nIf you are alive, continue.",
        rollEffect: { stat: "Sta", sign: -1 },
        then: 201,
    },
    303: {
        text: "You arrive at the end of the passage, where it meets another going east-west. But an iron portcullis blocks your way and no amount of charging is going to budge it.\n\nOn the wall to your right are two levers and it seems likely that these levers have something to do with raising the portcullis.\n\nDo you wish to pull the right lever, or the left lever?",
        image: "wofm303.png",
        caption: "An iron portcullis blocks your way and no amount of charging is going to budge it.",
        choices: [
            { label: "Right", to: 128 },
            { label: "Left", to: 243 },
        ],
    },
    102: {
        text: "The door is not locked and opens. The room in front of you seems to be a small torture chamber, with various torture devices around the walls.\n\nIn the centre of the room, two small, hunchbacked creatures are having their fiendish way with a Dwarf, who is tied to a hook in the ceiling by his wrists. The two hunchbacks are poking and cutting him viciously with their swords.\n\nThe Dwarf lets out a final scream and falls silent, eyes closed. His captors make disappointed noises and look round angrily at you as if it were your fault that the Dwarf has collapsed.\n\nYou must act quickly. Will you:\n• Close the door quickly and continue up the corridor?\n• Draw your sword and try to fight the creatures?\n• Stride over to the Dwarf, give him a jab with your sword and put on an evil laugh for the torturers?",
        choices: [
            { label: "Close the door", to: 303 },
            { label: "Fight the creatures", to: 19 },
            { label: "Jab the Dwarf", to: 68 },
        ],
    },
    68: {
        text: "The two _GOBLIN_ torturers look at each other amazed, then look at you. They chatter to themselves and then indicate for you to wait while they go off and get another Dwarf to give them some more fun.\n\nThey disappear out of the room and you cut down the Dwarf who is, as you guessed, quite dead.\n\nYou decide it best to leave and press on northwards up the corridor.",
        choices: [
            { label: "Press on northwards", to: 303 },
        ],
    },
    155: {
        text: "The door splits along its length and you can wrench the timbers apart to let yourself in.\n\nA torch hangs from one wall lighting up a small armoury room stocked with swords, shields, helmets, daggers, breastplates and the like. You examine the weaponry and find nothing appearing superior to your own sword. However, a circular iron shield with a golden crescent at its centre catches your eye.\n\nYou pick it up and feel its weight on your arm.\n\nIf you wish to take this shield it will aid you in battles by helping to fend off wound damage inflicted by a creature on you. If, in future during a battle in which you are using this shield, a creature wounds you, you may throw one die. **If you throw a 6, the creature inflicts only 1 point of damage** instead of the normal 2.\n\nIf, for some reason, the creature would normally only inflict 1 point of damage, then a successful roll of 6 would mean that no damage is done.\n\nHowever, the shield is heavy and you will have to leave behind one item of equipment to be able to carry it.\n\nYou now leave the room and continue up the corridor.",
        items: ["Golden Crescent"],
        dropToTake: true,
        image: "wofm155.png",
        caption: "A torch hangs from one wall lighting up a small armoury room stocked with swords, shields, helmets, daggers and the like.",
        choices: [
            { label: "Continue up the corridor", to: 300 },
        ],
    },
    201: {
        text: "You sink to the floor. You pull the dart out and decide to bandage the wound.\n\nThis gives some relief, but you still feel weak. You decide to take it easy and examine the contents of the chest, but if you wish you may eat some Provisions here.\n\nThere are 25 _Gold Pieces_ and the label on the bottle shows it to be a _Potion of Invisibility_, good for one dose.\n\nThe glove is a mystery. You may put any or all of these into your haversack and leave the room.",
        onEnter: [{ stat: "Gold", change: 25 }],
        items: ["Potion of Invisibility", "Black Glove"],
        choices: [
            { label: "Leave the room", to: 293 },
        ],
    },
    266: {
        text: "The case opens easily and inside you find a magnificent bow and one silver arrow.\n\nAn inscription on the case says: _'The giver of sleep to those who never can'_.\n\nYou put the bow, arrow and case in your pack and leave the room, but you may eat Provisions first - and you gain 1 _LUCK_ point.",
        image: "wofm266.png",
        caption: "The case opens easily and inside you find a magnificient bow and one silver arrow.",
        onEnter: [{ stat: "Luck", change: 1 }, { addItem: "Bow & Silver Arrow" }],
        choices: [
            { label: "Leave the room", to: 237 },
        ],
    },
};
