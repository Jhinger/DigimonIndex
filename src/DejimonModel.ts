
enum DejimonAbilities {
    'water' = 1,
    'ice',
    'fire',
    'charm',
    'electric'
}

enum DejimonType {
    'Yorshire' = 1,
    'Lean',
    'Potbelly'
}

interface Dejimon {
    dejimonID: number,
    name: string,
    height: number,
    weight: number,
    type: DejimonType,
    ability: DejimonAbilities,
    abilityPower: number
}

