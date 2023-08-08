export const starRailRes = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

export const charNamesMap = {
    1102: "Seele",
    1204: "Jing",
    1006: "sw",
    1205: "blade",
    1201: "qingque",
    1107: "clara"
};

export function getIdFromName(name) {
    name = name.toLowerCase();
    for (const [id, charName] of Object.entries(charNamesMap)) {
        if (charName === name) {
            return id;
        }
    }
    return null;
}