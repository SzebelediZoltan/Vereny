const tablaHTML = document.querySelector("table")
let generaltTabla = []
let elozo = null
let elozoY, elozoX
const alapTabla = [
    ["2 1","3 1","4 1","6 1","5 1","4 1","3 1","2 1"],
    ["1 1","1 1","1 1","1 1","1 1","1 1","1 1","1 1"],
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
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
        parasztIranyInit(generaltSor)
        generaltTabla.push(generaltSor)
        generaltSor = []
    })

    rendereles(generaltTabla)
    tablaHTML.addEventListener("click", lepes)
} //Legenerál egy nekünk megfelelő táblát a nyers táblából

function rendereles(tabla) {
    console.log("renderelés");
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
        while (i <= 3 && generaltTabla[y-i][x].szin == "") {
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
        while (i <= 3 && generaltTabla[y+i][x].szin == "") {
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

    if (jelolesekszama() != 0) {
        elozo = generaltTabla[y][x]
        elozoY = y
        elozoX = x
    }
    rendereles(generaltTabla)
} //Megjelöli mely mezőkre lehet lépni

function jelolesekszama() {
    dbJeloles = 0
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
} //Ez felelős a bábuk mozgatásáért és kezeli a pontokat

function lepes(event) {
    let celpont = event.target.closest("td")
    let jatekosSzin = jatekos % 2 == 1 ? "feher" : "fekete"

    const y = celpont.parentNode.rowIndex
    const x = celpont.cellIndex

    console.log(lehetsegesLepes(y, x, jatekosSzin));

    if (!!elozo && celpont.szin != elozo.szin && lehetsegesLepes(y, x, jatekosSzin)) {
        mozgatas(y, x)
        jelolesekTorlese()
        console.log(jatekos1Pontok, jatekos2Pontok);
        jatekos++;
    } else if (lehetsegesLepes(y, x, jatekosSzin)){
        console.log("Valami van");
        jeloles(y, x, jatekosSzin)
    }

} //Ez az egész felelős az összes lépésért a jétékban