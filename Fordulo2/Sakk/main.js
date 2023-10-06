const tablaHTML = document.querySelector("table")

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

let generaltTabla = []
init(alapTabla)

// Az első indexe a mátrixnak az y tengelyen való elhelyezkedését jelzi
// Az első indexe a mátrixnak az x tengelyen való elhelyezkedését jelzi
// sakkTabla[y][x]

//Az első szám a bábú típusát jelzi a masodik pedig, hogy kinek a bábuja
// sakkTabla[0][0] == "1 1", ebben az esetben az első játékoshoz tartozó parasztbábu a bal felső sarokban helyezkedik el

function babu(tipus, szin) {
    this.tipus = tipus
    this.szin = szin
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
} //Kapunk belole egy színt a megadott nyers számból

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
} //Kapunk belole egy bábu típust a megadott nyers számból

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

    console.log(alapTabla);
    console.log(generaltTabla);
    rendereles(generaltTabla)
} //Legenerál egy nekünk megfelelő táblát a nyers táblából

function rendereles(tabla) {
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
            tr.appendChild(td)
        })
        tablaHTML.appendChild(tr)
    })
} //Lerendereli a táblát a DOM-ba






