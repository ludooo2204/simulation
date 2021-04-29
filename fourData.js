let foursData = [
    {
        name:'Minidiamant',
        id:1,
        points:[760,900,1050,1210],
        sécurité:1280,
        pointSensibilité:900,
        
        voiesDeMesure:[
            {name : "K1" , typeTc : "K"},
            {name : "K2" , typeTc : "K"},
            {name : "K3" , typeTc : "K"},
            {name : "HONEYWELL" , typeTc : "K"}
        ]
    },

    {
        name:'Consarc1',
        id:2,
        points:[550,760,900,1050,1210],
        sécurité:1280,
        pointSensibilité:900,
        voiesDeMesure:[
            
            {name : "CHARGE 1" , typeTc : "N"},
            {name : "CHARGE 2" , typeTc : "N"},
            {name : "CHARGE 3" , typeTc : "N"},
            {name : "REGULATION" , typeTc : "S"},
            {name : "SECURITE" , typeTc : "S"}
        ]
    },
    {
        name:'Consarc2',
        id:3,
        points:[500,550,760,1000,1050,1210,1270],
        sécurité:1280,
        pointSensibilité:1000,
        voiesDeMesure:[
            {name : "CHARGE HONEYWELL" , typeTc : "S"},
            {name : "REGULATION" , typeTc : "S"},
            {name : "CHARGE 1" , typeTc : "S"},
            {name : "SECURITE" , typeTc : "S"}
        ]
    },
    {
        name:'B54',
        id:4,
        points:[760,1050,1100,1220],
        sécurité:1280,
        pointSensibilité:1050,
        voiesDeMesure:[
            {name : "CHARGE HONEYWELL" , typeTc : "S"},
            {name : "TC REGULATION" , typeTc : "S"},
            {name : "TC CHARGE" , typeTc : "S"},
            {name : "SECURITE" , typeTc : "S"}
        ]
    },
    {
        name:'APV1',
        id:5,
        points:[1050,1100,1150],
        sécurité:1280,
        pointSensibilité:1100,
        voiesDeMesure:[
            
            {name : "CHARGE 1" , typeTc : "N"},
            {name : "CHARGE 2" , typeTc : "N"},
            {name : "CHARGE 3" , typeTc : "N"},
            {name : "REGULATION" , typeTc : "S"},
            {name : "SECURITE" , typeTc : "S"}
        ]
    },
    {
        name:'APV2',
        id:6,
        points:[1050,1100,1150],
        sécurité:1280,
        pointSensibilité:1100,
        voiesDeMesure:[
            
            {name : "CHARGE 1" , typeTc : "N"},
            {name : "CHARGE 2" , typeTc : "N"},
            {name : "CHARGE 3" , typeTc : "N"},
            {name : "CHARGE 4" , typeTc : "N"},
            {name : "REGULATION" , typeTc : "S"},
            {name : "SECURITE" , typeTc : "S"}
        ]
    },
    {
        name:'APV3',
        id:7,
        points:[1050,1100,1150],
        sécurité:1280,
        pointSensibilité:1100,
        voiesDeMesure:[
            
            {name : "CHARGE 1" , typeTc : "N"},
            {name : "CHARGE 2" , typeTc : "N"},
            {name : "CHARGE 3" , typeTc : "N"},
            {name : "CHARGE 4" , typeTc : "N"},
            {name : "REGULATION" , typeTc : "S"},
            {name : "SECURITE" , typeTc : "S"}
        ]
    },
    {
        name:'B53',
        id:8,
        points:[760,1050,1100,1210],
        sécurité:1285,
        pointSensibilité:760,
        voiesDeMesure:[
            
            {name : "TC pieces Honeywell" , typeTc : "N"},
          
            {name : "REGULATION" , typeTc : "S"},
            {name : "SECURITE" , typeTc : "S"}
        ]
    },
    {
        name:'MECA',
        id:9,
        points:[80,190,300,340,425],
        sécurité:1285,
        pointSensibilité:300,
        voiesDeMesure:[
            
            {name : "TC pieces Honeywell" , typeTc : "K"},
          
            {name : "REGULATION" , typeTc : "K"},
            {name : "SECURITE" , typeTc : "S"}
        ]
    },
    {
        name:'TTH',
        id:10,
        points:[550,760,900,1050,1210],
        sécurité:1280,
        pointSensibilité:760,
        voiesDeMesure:[
            {name : "CHARGE 1" , typeTc : "N"},
            {name : "CHARGE 2" , typeTc : "N"},
            {name : "CHARGE 3" , typeTc : "N"},
            {name : "REGULATION-Avant" , typeTc : "S"},
            {name : "REGULATION-Milieu" , typeTc : "S"},
            {name : "REGULATION-Arriere" , typeTc : "S"},
            {name : "SECURITE-Avant" , typeTc : "S"},
            {name : "SECURITE-Milieu" , typeTc : "S"},
            {name : "SECURITE-Arriere" , typeTc : "S"},
        ]
    },
    {
        name:'TTL-1',
        id:11,
        points:[500,650,800],
        sécurité:850,
        pointSensibilité:650,
        voiesDeMesure:[
            
            {name : "REGULATION-1" , typeTc : "N"},
            {name : "REGULATION-2" , typeTc : "N"},
            {name : "CHARGE 1" , typeTc : "N"},
            {name : "CHARGE 2" , typeTc : "N"},
            {name : "CHARGE 3" , typeTc : "N"},
            {name : "CHARGE 4" , typeTc : "N"},
            {name : "CHARGE 5" , typeTc : "N"},
            {name : "CHARGE 6" , typeTc : "N"},
            {name : "CHARGE 7" , typeTc : "N"},
            {name : "CHARGE 8" , typeTc : "N"},
            {name : "CHARGE 9" , typeTc : "N"},
            {name : "CHARGE 10" , typeTc : "N"},
            {name : "SECURITE-1" , typeTc : "N"},
            {name : "SECURITE-2" , typeTc : "N"},
        ]
    },
    {
        name:'ECM3',
        id:12,
        points:[1050,1100,1150,1210],
        sécurité:1260,
        pointSensibilité:1100,
        voiesDeMesure:[
                        {name : "Honeywell" , typeTc : "S"},
            {name : "REGULATION-Avant" , typeTc : "S"},
            {name : "REGULATION-Milieu" , typeTc : "S"},
            {name : "REGULATION-Arriere" , typeTc : "S"},
            {name : "SECURITE" , typeTc : "S"}
        ]
    },
    {
        name:'FIC',
        id:13,
        points:[950,1060],
        sécurité:1285,
        pointSensibilité:1060,
        voiesDeMesure:[
            {name : "Régulation Four 1 - Bas" , typeTc : "S"},
            {name : "Régulation Four 1 - Milieu" , typeTc : "S"},
            {name : "Régulation Four 1 - Haut" , typeTc : "S"},
            {name : "Régulation Four 2 - Bas" , typeTc : "S"},
            {name : "Régulation Four 2 - Milieu" , typeTc : "S"},
            {name : "Régulation Four 2 - Haut" , typeTc : "S"},
            {name : "Charge IHM Four 1 - Bas" , typeTc : "K"},
            {name : "Charge IHM Four 1 - Milieu" , typeTc : "K"},
            {name : "Charge IHM Four 1 - Haut" , typeTc : "K"},
            {name : "Charge IHM Four 2 - Bas" , typeTc : "K"},
            {name : "Charge IHM Four 2 - Milieu" , typeTc : "K"},
            {name : "Charge IHM Four 2 - Haut" , typeTc : "K"},
            {name : "Securité Four 1 - Bas" , typeTc : "S"},
            {name : "Securité Four 1 - Milieu" , typeTc : "S"},
            {name : "Securité Four 1 - Haut" , typeTc : "S"},
            {name : "Securité Four 2 - Bas" , typeTc : "S"},
            {name : "Securité Four 2 - Milieu" , typeTc : "S"},
            {name : "Securité Four 2 - Haut" , typeTc : "S"},
        ]
    },
    {
        name:'HEXA2',
        id:14,
        points:[860,950,1060],
        sécurité:1285,
        pointSensibilité:950,
        voiesDeMesure:[
            {name : "Régulation - Bas" , typeTc : "K"},
            {name : "Régulation - Milieu" , typeTc : "K"},
            {name : "Régulation - Haut" , typeTc : "K"},
            {name : "Charge - Bas" , typeTc : "K"},
            {name : "Charge - Milieu" , typeTc : "K"},
            {name : "Charge - Haut" , typeTc : "K"},
        ]
    },
    {
        name:'CS21886 - honeywell FIC',
        id:15,
        points:[500,760,900,1050,1210],
        sécurité:1285,
        pointSensibilité:1050,
        voiesDeMesure:[
            
            {name : "Voie 1" , typeTc : "K"},
            {name : "Voie 2" , typeTc : "K"},
            {name : "Voie 3" , typeTc : "K"},
            {name : "Voie 4" , typeTc : "K"},
            {name : "Voie 5" , typeTc : "K"},
            {name : "Voie 6" , typeTc : "K"},
            {name : "Voie 7" , typeTc : "K"},
            {name : "Voie 8" , typeTc : "K"},
            {name : "Voie 9" , typeTc : "K"},
          
        ]
    },
]
export {foursData}