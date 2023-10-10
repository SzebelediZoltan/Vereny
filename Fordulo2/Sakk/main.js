const tablaHTML = document.querySelector("table")
let generaltTabla = []
let elozo = null
let elozoY, elozoX
let nyertes = ""
let jatekos1, jatekos2, korokSzama
const nev1HTML = document.querySelector(".nev1")
const nev2HTML = document.querySelector(".nev2")
const alapTabla = [
    ["2 1","3 1","4 1","6 1","5 1","4 1","3 1","2 1"],
    ["1 1","1 1","1 1","1 1","1 1","1 1","1 1","1 1"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
    ["0 0","0 0","6 2","0 0","0 0","0 0","0 0","0 0"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
    ["1 2","1 2","1 2","1 2","1 2","1 2","1 2","1 2"],
    ["2 2","3 2","4 2","5 2","6 2","4 2","3 2","2 2"]
];


// Az első indexe a mátrixnak az y tengelyen való elhelyezkedését jelzi
// Az első indexe a mátrixnak az x tengelyen való elhelyezkedését jelzi
// sakkTabla[y][x]

//Az első szám a bábú típusát jelzi a masodik pedig, hogy kinek a bábuja
// sakkTabla[0][0] == "1 1", ebben az esetben az első játékoshoz tartozó parasztbábu a bal felső sarokban helyezkedik el

const pontozasTabla = {
    "": 0,
    "pawn": 1,
    "bishop": 2,
    "knight": 2,
    "king": 2,
    "rook": 3,
    "queen": 5
}

const jatekos1PontokHTML = document.querySelector(".pont1")
const jatekos2PontokHTML = document.querySelector(".pont2")

let jatekos1Pontok = 0
let jatekos2Pontok = 0

let jatekos = 1 //Itt számolja melyik játékos jön ha osztható 2-vel akkor a fekete ha nem akkor pedig a fehér

const feketePowerUp1 = document.querySelector(".ketkorfekete")
const feketePowerUp2 = document.querySelector(".soklepesfekete")

const feherPowerUp1 = document.querySelector(".ketkorfeher")
const feherPowerUp2 = document.querySelector(".soklepesfeher")

feketePowerUp1.addEventListener("click", ketszerLepesFekete)
feketePowerUp2.addEventListener("click", barhogyLepesFekete)
feherPowerUp1.addEventListener("click", ketszerLepesFeher)
feherPowerUp2.addEventListener("click", barhogyLepesFeher)

function ketszerLepesFekete() {
    let jatekosSzin = jatekos % 2 == 1 ? "feher" : "fekete"
    if (jatekosSzin == "fekete") {
        ketszerLepesKapcsolo()
        feketePowerUp1.style.backgroundColor = "#5d716c"
        feketePowerUp1.removeEventListener("click", ketszerLepesFekete)
    }
}

function barhogyLepesFekete() {
    let jatekosSzin = jatekos % 2 == 1 ? "feher" : "fekete"
    if (jatekosSzin == "fekete") {
        barhogyLepesKapcsolo()
        feketePowerUp2.style.backgroundColor = "#5d716c"
        feketePowerUp2.removeEventListener("click", barhogyLepesFekete)
    }
}

function ketszerLepesFeher() {
    let jatekosSzin = jatekos % 2 == 1 ? "feher" : "fekete"
    if (jatekosSzin == "feher") {
        ketszerLepesKapcsolo()
        feherPowerUp1.style.backgroundColor = "#5d716c"
        feherPowerUp1.removeEventListener("click", ketszerLepesFeher)
    }
}

function barhogyLepesFeher() {
    let jatekosSzin = jatekos % 2 == 1 ? "feher" : "fekete"
    if (jatekosSzin == "feher") {
        barhogyLepesKapcsolo()
        feherPowerUp2.style.backgroundColor = "#5d716c"
        feherPowerUp2.removeEventListener("click", barhogyLepesFeher)
    }
}

let ketszerLepesValtozo = false
let barhogyLepesValtozo = false



function ketszerLepesKapcsolo() {
    if (ketszerLepesValtozo == false){
        ketszerLepesValtozo = true
    } else {
        ketszerLepesValtozo = false
    }
}

function barhogyLepesKapcsolo() {
    if (barhogyLepesValtozo == false){
        barhogyLepesValtozo = true
    } else {
        barhogyLepesValtozo = false
    }
}

function babu(tipus, szin) {
    this.tipus = tipus
    this.szin = szin
    this.jeloles = ""
    this.irany = ""
} // Babu objektum alap

function szinGeneralo(szinSzam) {
    switch (szinSzam) {
        case "1":
            return "fekete"
        
        case "2":
            return "feher"

        default:
            return ""
    }
} //Kapunk belőle egy színt a megadott nyers számból

function tipusGeneralo(babuSzam) {
    switch (babuSzam) {
        case "1":
            return "pawn"
            
        case "2":
            return "rook"

        case "3":
            return "knight"

        case "4":
            return "bishop"

        case "5":
            return "queen"

        case "6":
            return "king"

        default:
            return ""
    }
} //Kapunk belőle egy bábu típust a megadott nyers számból

function parasztIranyInit(sor) {
    sor.forEach(mezo => {
        if (mezo.tipus == "pawn" && mezo.szin == "fekete") {
            mezo.irany = "le"
        } else if (mezo.tipus == "pawn" && mezo.szin == "feher") {
            mezo.irany = "fel"
        }
    });
}

const kezdesGomb = document.querySelector("#kezdes")
kezdesGomb.addEventListener("click", init)

function init() {
    let generaltSor = []
    let szinSzam
    let tipusSzam

    alapTabla.forEach(sor => {
        sor.forEach(mezo => {
            tipusSzam = mezo.split(" ")[0]
            szinSzam = mezo.split(" ")[1]
            generaltSor.push(new babu(tipusGeneralo(tipusSzam), szinGeneralo(szinSzam)))
        })
        parasztIranyInit(generaltSor)
        generaltTabla.push(generaltSor)
        generaltSor = []
    })
    
    
    jatekos1 = document.querySelector("#jatekos1Inp").value
    jatekos2 = document.querySelector("#jatekos2Inp").value
    korokSzama = document.querySelector("#korokszama")

    document.querySelector("#kezdokepernyo").style.display = "none"

    nev1HTML.innerText = jatekos1
    nev2HTML.innerText = jatekos2

    rendereles(generaltTabla)
    tablaHTML.addEventListener("click", lepes)
} //Legenerál egy nekünk megfelelő táblát a nyers táblából

function rendereles(tabla) {
    tablaHTML.innerHTML = ""
    tabla.forEach(sor => {
        const tr = document.createElement("tr")
        sor.forEach(babu => {
            const td = document.createElement("td")
            if (babu.szin != "") {
                const i = document.createElement("i")
                i.classList.add("fa-solid")
                i.classList.add("fa-chess-" + babu.tipus)
                i.classList.add("babu")
                i.classList.add(babu.szin)
                td.appendChild(i)
            }
            if (babu.jeloles == "lehetseges") {
                td.style.backgroundColor = "yellow"
            } else if (babu.jeloles == "kiutheto") {
                td.style.backgroundColor = "red"
            }

            tr.appendChild(td)
        })
        tablaHTML.appendChild(tr)
    })
} //Lerendereli a táblát a DOM-ba

function lehetsegesLepes(y, x, jatekosSzin) {
    const nyomottMezo = generaltTabla[y][x]

    if (!elozo) {
        switch (nyomottMezo.szin) {
            case jatekosSzin:
                return true
            default:
                return false
        }
    } else {
        switch (nyomottMezo.jeloles) {
            case "":
                return false
        
            default:
                return true
        }
    }

} //Leellenőrzi hogy az éppeni játékos tud-e lépni

function parasztJeloles(y, x, jatekosSzin) {
    if (generaltTabla[y][x].irany == "fel") {
        let i = 1
        while (y-i >= 0 && i <= 3 && generaltTabla[y-i][x].szin == "") {
            if (!!generaltTabla[i]) {
                generaltTabla[y-i][x].jeloles = "lehetseges"
            }
            i++;
        }
    
        let offsets = [1, -1]
        offsets.forEach(offset => {
            if (y-1 >= 0 && x+offset >= 0 && x+offset <= 7) {
                let szin = generaltTabla[y-1][x+offset].szin
                if (szin != "" && szin != jatekosSzin)
                generaltTabla[y-1][x+offset].jeloles = "kiutheto"
            }
        })
    } else {
        let i = 1
        while (y+i <= 11 && i <= 3 && generaltTabla[y+i][x].szin == "") {
            if (!!generaltTabla[i]) {
                generaltTabla[y+i][x].jeloles = "lehetseges"
            }
            i++;
        }
    
        let offsets = [1, -1]
        offsets.forEach(offset => {
            if (y+1 <= 11 && x+offset >= 0 && x+offset <= 7) {
                let szin = generaltTabla[y+1][x+offset].szin
                if (szin != "" && szin != jatekosSzin)
                generaltTabla[y+1][x+offset].jeloles = "kiutheto"
            }
        })
    }
} //Ez kezeli hova léphet egy paraszt

function sorbanJeloles(y, x, jatekosSzin) {
    let i = x-1
    while(i >= 0 && generaltTabla[y][i].szin == "") {
        generaltTabla[y][i].jeloles = "lehetseges"
        i -= 1
    } 
    if (!!generaltTabla[y][i] && generaltTabla[y][i].szin != jatekosSzin) {
        generaltTabla[y][i].jeloles = "kiutheto"
    }
    
    i = x+1
    while(i <= 7 && generaltTabla[y][i].szin == "") {
        generaltTabla[y][i].jeloles = "lehetseges"
        i++;
    }
    if (!!generaltTabla[y][i] && generaltTabla[y][i].szin != jatekosSzin) {
        generaltTabla[y][i].jeloles = "kiutheto"
    }

    i = y+1
    while(i <= 11 && generaltTabla[i][x].szin == "") {
        generaltTabla[i][x].jeloles = "lehetseges"
        i++;
    }

    if (!!generaltTabla[i] && generaltTabla[i][x].szin != jatekosSzin) {
        generaltTabla[i][x].jeloles = "kiutheto"
    }
    
    i = y-1
    while(i >= 0 && generaltTabla[i][x].szin == "") {
        generaltTabla[i][x].jeloles = "lehetseges"
        i-=1;
    }
    if (!!generaltTabla[i] && generaltTabla[i][x].szin != jatekosSzin) {
        generaltTabla[i][x].jeloles = "kiutheto"
    }
} //Ez kezeli ha a bábú egy sorban fel/le tud lépni hogyan kell jelölni

function atlobanJeloles(y, x, jatekosSzin) {
    let mostY = y+1
    let mostX = x+1
    while (mostX <= 7 && mostY <= 11 && generaltTabla[mostY][mostX].szin == "") {
        generaltTabla[mostY][mostX].jeloles = "lehetseges"
        mostY++
        mostX++
    }
    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin != jatekosSzin) {
        generaltTabla[mostY][mostX].jeloles = "kiutheto"
    }

    mostY = y-1
    mostX = x+1
    while (mostX <= 7 && mostY >= 0 && generaltTabla[mostY][mostX].szin == "") {
        generaltTabla[mostY][mostX].jeloles = "lehetseges"
        mostY-= 1
        mostX++
    }
    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin != jatekosSzin) {
        generaltTabla[mostY][mostX].jeloles = "kiutheto"
    }

    mostY = y-1
    mostX = x-1
    while (mostX >= 0 && mostY >= 0 && generaltTabla[mostY][mostX].szin == "") {
        generaltTabla[mostY][mostX].jeloles = "lehetseges"
        mostY-= 1
        mostX-= 1
    }
    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin != jatekosSzin) {
        generaltTabla[mostY][mostX].jeloles = "kiutheto"
    }

    mostY = y+1
    mostX = x-1
    while (mostX >= 0 && mostY <= 11 && generaltTabla[mostY][mostX].szin == "") {
        generaltTabla[mostY][mostX].jeloles = "lehetseges"
        mostY++
        mostX-= 1
    }
    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin != jatekosSzin) {
        generaltTabla[mostY][mostX].jeloles = "kiutheto"
    }
} //Ez kezeli ha a bábú átlóban tud lépni hogyan kell jelölni

function bastyaJeloles(y, x, jatekosSzin) {
    sorbanJeloles(y, x, jatekosSzin)
} //Ez kezeli hova léphet egy bastya

function futoJeloles(y, x, jatekosSzin) {
    atlobanJeloles(y, x, jatekosSzin)
} //Ez kezeli hova léphet egy futo

function loJeloles(y, x, jatekosSzin) {
    let offsetek = [[2, -1], [2, 1], [1, -2], [1, 2], [-2, -1], [-2, 1], [-1, -2], [-1, 2]]
    offsetek.forEach(offset => {
        if (!!generaltTabla[y - offset[0]] && !!generaltTabla[y - offset[0]][x-offset[1]] && generaltTabla[y - offset[0]][x-offset[1]].szin != jatekosSzin && generaltTabla[y - offset[0]][x-offset[1]].szin != "") {
            generaltTabla[y - offset[0]][x-offset[1]].jeloles = "kiutheto"
        } else if (!!generaltTabla[y - offset[0]] && !!generaltTabla[y - offset[0]][x-offset[1]] && generaltTabla[y - offset[0]][x-offset[1]].szin != jatekosSzin) {
            generaltTabla[y - offset[0]][x-offset[1]].jeloles = "lehetseges"
        }
    });
} //Ez kezeli hova léphet egy lo

function kiralySorban(y, x, jatekosSzin) {
    let i = x-1
    while(i >= 0 && generaltTabla[y][i].szin == "" && i > x-2) {
        generaltTabla[y][i].jeloles = "lehetseges"
        i -= 1
    } 
    if (!!generaltTabla[y][i] && generaltTabla[y][i].szin != jatekosSzin && generaltTabla[y][i].szin != "") {
        generaltTabla[y][i].jeloles = "kiutheto"
    } else if (!!generaltTabla[y][i]) {
        generaltTabla[y][i].jeloles = "lehetseges" 
    }

    if (!!generaltTabla[y][i] && generaltTabla[y][i].szin == jatekosSzin) {
        generaltTabla[y][i].jeloles = "" 
    }
    
    i = x+1
    while(i <= 7 && generaltTabla[y][i].szin == "" && i < x+2) {
        generaltTabla[y][i].jeloles = "lehetseges"
        i++;
    }
    if (!!generaltTabla[y][i] && generaltTabla[y][i].szin != jatekosSzin && generaltTabla[y][i].szin != "") {
        generaltTabla[y][i].jeloles = "kiutheto"
    } else if (!!generaltTabla[y][i]) {
        generaltTabla[y][i].jeloles = "lehetseges" 
    }

    if (!!generaltTabla[y][i] && generaltTabla[y][i].szin == jatekosSzin) {
        generaltTabla[y][i].jeloles = "" 
    }

    i = y+1
    while(i <= 11 && generaltTabla[i][x].szin == "" && i < y+2) {
        generaltTabla[i][x].jeloles = "lehetseges"
        i++;
    }

    if (!!generaltTabla[i] && generaltTabla[i][x].szin != jatekosSzin && generaltTabla[i][x].szin != "") {
        generaltTabla[i][x].jeloles = "kiutheto"
    } else if (!!generaltTabla[i]) {
        generaltTabla[i][x].jeloles = "lehetseges" 
    }

    if (!!generaltTabla[i] && generaltTabla[i][x].szin == jatekosSzin) {
        generaltTabla[i][x].jeloles = "" 
    }
    
    i = y-1
    while(i >= 0 && generaltTabla[i][x].szin == "" && i > y-2) {
        generaltTabla[i][x].jeloles = "lehetseges"
        i-=1;
    }
    if (!!generaltTabla[i] && generaltTabla[i][x].szin != jatekosSzin && generaltTabla[i][x].szin != "") {
        generaltTabla[i][x].jeloles = "kiutheto"
    } else if (!!generaltTabla[i]) {
        generaltTabla[i][x].jeloles = "lehetseges" 
    }

    if (!!generaltTabla[i] && generaltTabla[i][x].szin == jatekosSzin) {
        generaltTabla[i][x].jeloles = "" 
    }
}

function kiralyAtloban(y, x, jatekosSzin) {
    let mostY = y+1
    let mostX = x+1
    while (mostX <= 7 && mostY <= 11 && generaltTabla[mostY][mostX].szin == "" && mostX < x+2 && mostY < y+2) {
        generaltTabla[mostY][mostX].jeloles = "lehetseges"
        mostY++
        mostX++
    }
    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin != jatekosSzin && generaltTabla[mostY][mostX].szin != "") {
        generaltTabla[mostY][mostX].jeloles = "kiutheto"
    } else if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX]) {
        generaltTabla[mostY][mostX].jeloles = "lehetseges" 
    }

    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin == jatekosSzin) {
        generaltTabla[mostY][mostX].jeloles = "" 
    }

    mostY = y-1
    mostX = x+1
    while (mostX <= 7 && mostY >= 0 && generaltTabla[mostY][mostX].szin == "" && mostX < x+2 && mostY > y-2) {
        generaltTabla[mostY][mostX].jeloles = "lehetseges"
        mostY-= 1
        mostX++
    }
    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin != jatekosSzin && generaltTabla[mostY][mostX].szin != "") {
        generaltTabla[mostY][mostX].jeloles = "kiutheto"
    } else if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX]) {
        generaltTabla[mostY][mostX].jeloles = "lehetseges" 
    }

    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin == jatekosSzin) {
        generaltTabla[mostY][mostX].jeloles = "" 
    }

    mostY = y-1
    mostX = x-1
    while (mostX >= 0 && mostY >= 0 && generaltTabla[mostY][mostX].szin == "" && mostX > x-2 && mostY > y-2) {
        generaltTabla[mostY][mostX].jeloles = "lehetseges"
        mostY-= 1
        mostX-= 1
    }
    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin != jatekosSzin && generaltTabla[mostY][mostX].szin != "") {
        generaltTabla[mostY][mostX].jeloles = "kiutheto"
    } else if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX]) {
        generaltTabla[mostY][mostX].jeloles = "lehetseges" 
    }

    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin == jatekosSzin) {
        generaltTabla[mostY][mostX].jeloles = "" 
    }

    mostY = y+1
    mostX = x-1
    while (mostX >= 0 && mostY <= 11 && generaltTabla[mostY][mostX].szin == "" && mostX > x-2 && mostY < y+2) {
        generaltTabla[mostY][mostX].jeloles = "lehetseges"
        mostY++
        mostX-= 1
    }
    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin != jatekosSzin && generaltTabla[mostY][mostX].szin != "") {
        generaltTabla[mostY][mostX].jeloles = "kiutheto"
    } else if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX]) {
        generaltTabla[mostY][mostX].jeloles = "lehetseges" 
    }

    if (!!generaltTabla[mostY] && !!generaltTabla[mostY][mostX] && generaltTabla[mostY][mostX].szin == jatekosSzin) {
        generaltTabla[mostY][mostX].jeloles = "" 
    }

}

function kiralyJeloles(y, x, jatekosSzin) {
    kiralySorban(y, x, jatekosSzin)
    kiralyAtloban(y, x, jatekosSzin)
} //Ez kezeli hova léphet egy kiraly

function kiralynoJeloles(y, x, jatekosSzin) {
    sorbanJeloles(y, x, jatekosSzin)
    atlobanJeloles(y, x, jatekosSzin)
} //Ez kezeli hova léphet egy kiralyno

function jeloles(y, x, jatekosSzin) {
    if (barhogyLepesValtozo == false){
        switch (generaltTabla[y][x].tipus) {
            case "pawn":
                parasztJeloles(y, x, jatekosSzin)
                break;
            case "rook":
                bastyaJeloles(y, x, jatekosSzin)
                break;
            case "bishop":
                futoJeloles(y, x, jatekosSzin)
                break;
            case "knight":
                loJeloles(y, x, jatekosSzin)
                break;
            case "king":
                kiralyJeloles(y, x, jatekosSzin)
                break;
            case "queen":
                kiralynoJeloles(y, x, jatekosSzin)
                break;
            default:
                break;
        }
    } else {
        sorbanJeloles(y, x, jatekosSzin)
        atlobanJeloles(y, x, jatekosSzin)
        loJeloles(y, x, jatekosSzin)
        barhogyLepesKapcsolo()
    }

    if (jelolesekszama() != 0) {
        elozo = generaltTabla[y][x]
        elozoY = y
        elozoX = x
    }
    rendereles(generaltTabla)
} //Megjelöli mely mezőkre lehet lépni

function jelolesekszama() {
    let dbJeloles = 0
    generaltTabla.forEach(sor => {
        sor.forEach(mezo => {
            if (mezo.jeloles == "lehetseges" || mezo.jeloles == "kiutheto") {
                dbJeloles++;
            }
        })
    });
    return dbJeloles
} //Visszatér a pontokkal 

function jelolesekTorlese() {
    generaltTabla.forEach(sor => {
        sor.forEach(mezo => {
            mezo.jeloles = ""
        })
    });
    elozo = null
    elozoY = null
    elozoX = null
    rendereles(generaltTabla)
} //Kitörli a jelenlegi jelöléseket

function nyertesVizsgalat(szin) {
    let db = 0
    generaltTabla.forEach(sor => {
        sor.forEach(mezo => {
            if (mezo.szin != szin && mezo.szin != "") {
                db++
            }
        })
    });
    if (db == 0) {
        return true
    } else {
        return false
    }
}

function mozgatas(y, x) {
    if (generaltTabla[y][x].jeloles != "") {
        kiutottBabu = generaltTabla[y][x]
        generaltTabla[y][x] = elozo
        generaltTabla[elozoY][elozoX] = new babu("", "")
        if (elozo.szin == "feher") {
            jatekos1Pontok += pontozasTabla[kiutottBabu.tipus]
        } else {
            jatekos2Pontok += pontozasTabla[kiutottBabu.tipus]
        }

    if (generaltTabla[y][x].tipus == "pawn" && y == 11 && generaltTabla[y][x].irany == "le") {
        generaltTabla[y][x].irany = "fel"
    } else if (generaltTabla[y][x].tipus == "pawn" && y == 0 && generaltTabla[y][x].irany == "fel")
        generaltTabla[y][x].irany = "le"
    }

    if (nyertesVizsgalat(elozo.szin)) {
        if (elozo.szin == "feher") {
            nyertes = jatekos2
        } else {
            nyertes = jatekos1
        }
    }
} //Ez felelős a bábuk mozgatásáért és kezeli a pontokat

function pontokFrissites() {
    jatekos1PontokHTML.innerHTML = jatekos1Pontok
    jatekos2PontokHTML.innerHTML = jatekos2Pontok
}

function lepes(event) {
    let celpont = event.target.closest("td")
    let jatekosSzin = jatekos % 2 == 1 ? "feher" : "fekete"

    const y = celpont.parentNode.rowIndex
    const x = celpont.cellIndex

    if (!!elozo && celpont.szin != elozo.szin && lehetsegesLepes(y, x, jatekosSzin)) {
        mozgatas(y, x)
        jelolesekTorlese()
        pontokFrissites()
        if (ketszerLepesValtozo == false) {
            jatekos++;
        } else {
            ketszerLepesKapcsolo()
        }
    } else if (lehetsegesLepes(y, x, jatekosSzin)){
        jeloles(y, x, jatekosSzin)
    }

} //Ez az egész felelős az összes lépésért a jétékban

// -- KEZDŐKÉPERNYŐ --//
