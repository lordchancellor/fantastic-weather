/* messages.js - Holding a array of weather feedback objects */

var weatherFeedback = [
    {
        "min-temp": -273.1,
        "max-temp": -50.0,
        "filter": "linear-gradient(rgba(0, 0, 255, 0.1), rgba(0, 0, 255, 0.1))",
        "background": "abs-zero.jpg",
        "warning": "Beware Ice Elementals traveller, for only they can survive in conditions such as these.",
        "creature": "ice-elemental.png",
        "comment": "Unless you are protected by great magics, you will be dead the moment you step outside."
    },

    {
        "min-temp": -50.0,
        "max-temp": -30.0,
        "filter": "linear-gradient(rgba(0, 0, 255, 0.1), rgba(0, 0, 255, 0.1))",
        "background": "ice-dragon.jpg",
        "warning": "Be wary traveller, for this is weather perfect for Frost Giants.",
        "creature": "frost-giant.png",
        "comment": "This truly is cold, but not impossibly so. Wrap up warmly, or at the very least, protect yourself with some warming spells."
    },

    {
        "min-temp": -30.0,
        "max-temp": -15.0,
        "filter": "linear-gradient(rgba(0, 0, 255, 0.1), rgba(0, 0, 255, 0.1))",
        "background": "snow-battle.jpg",
        "warning": "You would do well to watch your back this day adventurer, for surely these conditions are exactly those preferred by the Yeti as he stalks his prey.",
        "creature": "yeti.png",
        "comment": "I would advise against steel armour in this weather, unless you want it fusing to your flesh."
    },

    {
        "min-temp": -15.0,
        "max-temp": -5.0,
        "filter": "linear-gradient(rgba(0, 0, 255, 0.1), rgba(0, 0, 255, 0.1))",
        "background": "graveyard.jpg",
        "warning": "Traveller, be mindful of your surroundings. On days such as these, Ice Mephits lie in wait of unwary adventurers.",
        "creature": "ice-mephit.png",
        "comment": "It's cold outside traveller, though not impossibly so. Wrap up in furs and find a tavern, you will be fine."
    },

    {
        "min-temp": -5.0,
        "max-temp": 0.0,
        "filter": "linear-gradient(rgba(0, 0, 255, 0.1), rgba(0, 0, 255, 0.1))",
        "background": "cold.jpg",
        "warning": "I should advise against forest travel in such conditions, lest you want to find yourself tracked by Frost Wolves.",
        "creature": "frost-wolf.png",
        "comment": "I've traversed dungeons colder than this. Keep a few torches handy, their flame will be a friend this day."
    },

    {
        "min-temp": 0.0,
        "max-temp": 5.0,
        "filter": "linear-gradient(rgba(0, 0, 255, 0.1), rgba(0, 0, 255, 0.1))",
        "background": "titan.jpg",
        "warning": "The spirits of the nether abound on days such as these. Be wary, for whilst you pass through them, they can surely do damage to you.",
        "creature": "spirit.png",
        "comment": "These are almost perfect adventuring conditions. Your armour will keep you warm, just be sure that your sword arm doesn't get chilled."
    },

    {
        "min-temp": 5.0,
        "max-temp": 10.0,
        "filter": "linear-gradient(rgba(0, 0, 255, 0.1), rgba(0, 0, 255, 0.1))",
        "background": "stormy-skies.jpg",
        "warning": "Although some think it too cold, I have seen Chimeras on days such as this with mine own eyes. Be watchful of the skies.",
        "creature": "chimera.png",
        "comment": "You'll be grateful of your armour today adventurer, though I doubt you'll notice the cold whilst swinging your sword."
    },

    {
        "min-temp": 10.0,
        "max-temp": 15.0,
        "filter": "linear-gradient(rgba(0, 0, 255, 0.1), rgba(0, 0, 255, 0.1))",
        "background": "floating-rocks.jpg",
        "warning": "Traveller, be wary of Owlbears in the woods. They oft hunt on days such as these.",
        "creature": "owl-bear.png",
        "comment": "You could almost camp by the roadside in these temperatures adventurer. Handy, when separated from your favourite Inn."
    },

    {
        "min-temp": 15.0,
        "max-temp": 20.0,
        "filter": "linear-gradient(rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1))",
        "background": "mild.jpg",
        "warning": "Beware, for the fearsome Beholder abound in conditions such as these.",
        "creature": "beholder.png",
        "comment": "On a day such as today, you would be pressed to notice the difference in temperature when entering or exiting those dungeons you so favour."
    },

    {
        "min-temp": 20.0,
        "max-temp": 25.0,
        "filter": "linear-gradient(rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1))",
        "background": "forest.jpg",
        "warning": "Be mindful of the treants this day adventurer, for they are not as friendly as they would have you believe.",
        "creature": "treant.png",
        "comment": "You will want to keep your battles short on a day such as this traveller."
    },

    {
        "min-temp": 25.0,
        "max-temp": 30.0,
        "filter": "linear-gradient(rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1))",
        "background": "temperate.jpg",
        "warning": "In these climes, the Bogleech amass in numbers. Be wary.",
        "creature": "bogleech.png",
        "comment": "On a day such as this, a canny adventurer would actually seek out the dungeons rather than avoid them."
    },

    {
        "min-temp": 30.0,
        "max-temp": 35.0,
        "filter": "linear-gradient(rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1))",
        "background": "bog.jpg",
        "warning": "On these warm days, the slimes will come up from the bogs. Beware their suffocating grasp.",
        "creature": "slime.png",
        "comment": "If you were to listen to me, you would stay in the Inn this day adventurer. This is no day for armour."
    },

    {
        "min-temp": 35.0,
        "max-temp": 40.0,
        "filter": "linear-gradient(rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1))",
        "background": "jungle.jpg",
        "warning": "When the air outside begins to match that of the upper levels of the nine hells, minor devils will begin to venture out into the world.",
        "creature": "devil.png",
        "comment": "Be sure to bring plenty of water skins on your travels, adventurer. On a day such as this, you will need them."
    },

    {
        "min-temp": 40.0,
        "max-temp": 50.0,
        "filter": "linear-gradient(rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1))",
        "background": "dragon-hot.jpg",
        "warning": "This is a perfect day for meeting Fire Giants, traveller. Be mindful of the earth-shaking that signals their approach.",
        "creature": "fire-giant.png",
        "comment": "If travelling on this day adventurer, be sure to have a frost mage in your party."
    },

    {
        "min-temp": 50.0,
        "max-temp": 70.0,
        "filter": "linear-gradient(rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1))",
        "background": "desert-golem.jpg",
        "warning": "Surely this day will bring you desert travel, in climes such as these. Be mindful of Sand Golems.",
        "creature": "sand-golem.png",
        "comment": "When the temperatures climb this high adventurer, might I suggest some magical armour as an alternative to leather and steel?"
    },

    {
        "min-temp": 70.0,
        "max-temp": 100.0,
        "filter": "linear-gradient(rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1))",
        "background": "superhot.jpg",
        "warning": "In temperatures such as these, the Fire Succubi thrive. Listen not to their song, lest you want to meet a truly firey demise.",
        "creature": "succubus.png",
        "comment": "Be wary, adventurer, of you steel weapons. They will be difficult to handle in such temperatures."
    },

    {
        "min-temp": 100.0,
        "max-temp": 1000000.0,
        "filter": "linear-gradient(rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1))",
        "background": "plain-of-fire.jpg",
        "warning": "In a world such as this, beware the fury of the Balrog.",
        "creature": "balrog.png",
        "comment": "Only the most brave or foolhardy of warriors would visit the realms of fire. I hope you have a strong arsenal of spells to protect you from the heat."
    }
];
