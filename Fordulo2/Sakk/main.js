const tablaHTML = document.querySelector("table")
let generaltTabla = []
let elozo = null
let elozoY, elozoX
const alapTabla = [
    ["2 1","3 1","4 1","6 1","5 1","4 1","3 1","2 1"],
    ["1 1","1 1","1 1","1 1","1 1","1 1","1 1","1 1"],
    ["1 2","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
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

init(alapTabla)

const pontozasTabla = {
    "": 0,
    "pawn": 1,
    "bishop": 2,
    "knight": 2,
    "king": 2,
    "rook": 3,
    "queen": 5
}

let jatekos1Pontok = 0
let jatekos2Pontok = 0

let jatekos = 1 //Itt számolja melyik játékos jön ha osztható 2-vel akkor a fekete ha nem akkor pedig a fehér

function babu(tipus, szin) {
    this.tipus = tipus
    this.szin = szin
    this.jeloles = ""
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

function init(sakkTabla) {
    let generaltSor = []
    let szinSzam
    let tipusSzam

    sakkTabla.forEach(sor => {
        sor.forEach(mezo => {
            tipusSzam = mezo.split(" ")[0]
            szinSzam = mezo.split(" ")[1]
            generaltSor.push(new babu(tipusGeneralo(tipusSzam), szinGeneralo(szinSzam)))
        })
        generaltTabla.push(generaltSor)
        generaltSor = []
    })

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
    for(let i = y-1; i > y-4; i-=1) {
        if (generaltTabla[i][x] && generaltTabla[i][x].szin == "") {
            generaltTabla[i][x].jeloles = "lehetseges"
        }
    
    if (generaltTabla[y-1][x+1] && generaltTabla[y-1][x+1].szin != jatekosSzin && generaltTabla[y-1][x+1].szin != "") {
        generaltTabla[y-1][x+1].jeloles = "kiutheto"
    }

    if (generaltTabla[y-1][x-1] && generaltTabla[y-1][x-1].szin != jatekosSzin && generaltTabla[y-1][x-1].szin != "") {
        generaltTabla[y-1][x-1].jeloles = "kiutheto"
    }
    }
    rendereles(generaltTabla)
}

function bastyaJeloles(y, x, jatekosSzin) {
    
}

function futoJeloles(y, x, jatekosSzin) {
    
}

function loJeloles(y, x, jatekosSzin) {
    
}

function kiralyJeloles(y, x, jatekosSzin) {
    
}

function kiralynoJeloles(y, x, jatekosSzin) {
    
}

function jeloles(y, x, jatekosSzin) {
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

    elozo = generaltTabla[y][x]
    elozoY = y
    elozoX = x
    rendereles(generaltTabla)
} //Megjelöli mely mezőkre lehet lépni

function jelolesekTorlese() {
    generaltTabla.forEach(sor => {
        sor.forEach(mezo => {
            mezo.jeloles = ""
        })
    });
    elozo = null
    rendereles(generaltTabla)
} //Kitörli a jelenlegi jelöléseket

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
    }
}

function lepes(event) {
    let celpont = event.target.closest("td")
    let jatekosSzin = jatekos % 2 == 1 ? "feher" : "fekete"

    const y = celpont.parentNode.rowIndex
    const x = celpont.cellIndex


    if (!!elozo && lehetsegesLepes(y, x, jatekosSzin)) {
        console.log("Atlépés bekövetkezett!!")
        mozgatas(y, x)
        jelolesekTorlese()
        jatekos++;
    } else if (lehetsegesLepes(y, x, jatekosSzin)){
        console.log("Tud jelölni! Jelölt!!!");
        jeloles(y, x, jatekosSzin)
    } else {
        console.log("Nem lehetséges lépés!!");
    }

} //Ez az egész felelős az összes lépésért a jétékban