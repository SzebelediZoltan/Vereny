let sakkTabla = [
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"],
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
    ["0 0","0 0","0 0","0 0","0 0","0 0","0 0","0 0"]
];

// Az első indexe a mátrixnak az y tengelyen való elhelyezkedését jelzi
// Az első indexe a mátrixnak az x tengelyen való elhelyezkedését jelzi
// sakkTabla[y][x]

//Az első szám a bábú típusát jelzi a masodik pedig, hogy kinek a bábuja
// sakkTabla[0][0] == "1 1", ebben az esetben az első játékoshoz tartozó parasztbábu a bal felső sarokban helyezkedik el

function szinGeneralo(szinSzam) {
    switch (szinSzam) {
        case "1":
            return "fekete"
        
        case "2":
            return "feher"

        default:
            return "ures"
    }
} //Kapunk belole egy színt a megadott nyers számból

function babuGeneralo(babuSzam) {
    switch (babuSzam) {
        case "1":
            return "paraszt"
    
        default:
            return ""
    }
} //Kapunk belole egy babu típust a megadott nyers számból

function tablaFrissites(sakkTabla) {
    let generaltTabla = []
    let generaltSor = []
    let szinSzam;

    sakkTabla.forEach(sor => {
        sor.forEach(mezo => {
            babuSzam = mezo.split(" ")[0]
            szinSzam = mezo.split(" ")[1]
            generaltSor.push(babuGeneralo(babuSzam))
            generaltSor.push(szinGeneralo(szinSzam))
        })
        generaltTabla.push(generaltSor)
        generaltSor = []
    })

    return generaltTabla
} //Legeneral egy nehezebben kezelhető viszont egy sokkal könnyebben le rendelelhető táblát

console.log(tablaFrissites(sakkTabla));



