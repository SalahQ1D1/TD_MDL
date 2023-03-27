const fs = require('fs');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

let users = JSON.parse(fs.readFileSync('users.json')); // Converti la chaine de caractère "rawdata" en objet "user" et lecture des chaine en synchrone

//Affichage menu
function showMenu() {
    console.log(chalk.green('Menu\n'));
    console.log(chalk.green('1 : Afficher pays compteur'));
    console.log(chalk.green('2 : Afficher societes et compteur'));
    console.log(chalk.green('3 : Ajouter un nouvel utilisateur'));
}

//Affiche les résultats du tableau
function displayResults(res, label) {
    res.forEach(item => {
        console.log(chalk.blue(`${item[label]}: ${item.count}`));
    });
}

//Compteur occurrences
function countOccurrences(items) {
    const counts = {};
    for (const item of items) {
        counts[item] = counts[item] ? counts[item] + 1 : 1;
    }
    return counts;
}

//Trie les résultats d'un objet par ordre décroissant
function sortResults(obj, label) {
    const res = [];
    for (let key in obj) {
        res.push({ [label]: key, "count": obj[key] });
    }
    res.sort((a, b) => b.count - a.count);
    return res;
}

//Vérification format de saisie
function getUserInput(label, regex = null) {
    let value;
    do {
        value = readlineSync.question(label);
        if (regex && !regex.test(value)) {
            console.log(chalk.red('Entree invalide. Veuillez saisir une valeur valide.'));
            value = undefined;
        }
    } while (!value);
    return value;
}

//Saisie nouvel utilisateur
function ajouterUtilisateur() {
    const newUser = {
        id: getUserInput('ID: '),
        email: getUserInput('Email: ', /^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        first: getUserInput('Prenom: '),
        last: getUserInput('Nom: '),
        company: getUserInput('Societe: '),
        created_at: new Date().toISOString(),
        country: getUserInput('Pays: ')
    };

    users.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(users));
    console.log('Utilisateur ajoute avec succes !');
}

function main() {
    showMenu();
    const choix = readlineSync.question(chalk.gray('(Entre 1 pour pays , 2 pour societes, 3 pour ajouter utilisateur)\n'));

    if (choix === '1' || choix === '2') {
        const label = choix === '1' ? 'country' : 'company';
        const items = users.map(user => user[label]);
        const counts = countOccurrences(items);
        const res = sortResults(counts, label);
        displayResults(res, label);
    } else if (choix === '3') {
        ajouterUtilisateur();
    } else {
        console.log(chalk.red('Choix invalide'));
    }
}

main();
