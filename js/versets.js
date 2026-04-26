/**
 * Verset du Jour - Temple Eben-Ezer
 * Génère automatiquement un verset biblique différent chaque jour.
 */
const versetsDB = [
    { ref: "Josué 1:9", texte: "Fortifie-toi et prends courage ! Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras." },
    { ref: "Philippiens 4:13", texte: "Je puis tout par celui qui me fortifie." },
    { ref: "2 Timothée 1:7", texte: "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse." },
    { ref: "Romains 8:37", texte: "Mais dans toutes ces choses nous sommes plus que vainqueurs par celui qui nous a aimés." },
    { ref: "Proverbes 24:16", texte: "Car sept fois le juste tombe, et il se relève, mais les méchants sont précipités dans le malheur." },
    { ref: "Ésaïe 43:18-19", texte: "Ne pensez plus aux événements passés, et ne considérez plus ce qui est ancien. Voici, je vais faire une chose nouvelle !" },
    { ref: "Marc 9:23", texte: "Jésus lui dit : Si tu peux !... Tout est possible à celui qui croit." },
    { ref: "Proverbes 16:3", texte: "Recommande à l'Éternel tes œuvres, et tes projets réussiront." },
    { ref: "Jérémie 29:11", texte: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance." },
    { ref: "Habacuc 2:2-3", texte: "Écris la vision, grave-la sur des tables, afin qu'on la lise couramment... car c'est une prophétie dont le temps est déjà fixé, elle marche vers son terme, et elle ne mentira pas." },
    { ref: "Ésaïe 40:31", texte: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles ; ils courent, et ne se lassent point." },
    { ref: "1 Jean 5:4", texte: "Parce que tout ce qui est né de Dieu triomphe du monde ; et la victoire qui triomphe du monde, c'est notre foi." },
    { ref: "Proverbes 4:23", texte: "Garde ton cœur plus que toute autre chose, car de lui viennent les sources de la vie." },
    { ref: "Matthieu 19:26", texte: "Jésus les regarda, et leur dit : Aux hommes cela est impossible, mais à Dieu tout est possible." },
    { ref: "Romains 12:2", texte: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu." },
    { ref: "Hébreux 10:35-36", texte: "N'abandonnez donc pas votre assurance, à laquelle est attachée une grande rémunération. Car vous avez besoin de persévérance..." },
    { ref: "Jacques 1:2-3", texte: "Mes frères, regardez comme un sujet de joie complète les diverses épreuves auxquelles vous pouvez être exposés, sachant que l'épreuve de votre foi produit la patience." },
    { ref: "Proverbes 3:5-6", texte: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse. Reconnais-le dans toutes tes voies, et il aplanira tes sentiers." }
];

function getVersetDuJour() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % versetsDB.length;
    return versetsDB[index];
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('verset-du-jour');
    if (container) {
        const verset = getVersetDuJour();
        container.querySelector('.verset-texte').textContent = `« ${verset.texte} »`;
        container.querySelector('.verset-ref').textContent = `— ${verset.ref}`;
    }
});
