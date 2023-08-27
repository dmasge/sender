export const starRailRes = "https://raw.githubusercontent.com/Sinkira/sinkiresource/master/";
export const extension = ".webp"

export const charNamesMap = {
    1102: "seele",
    1006: "sw",
    1205: "blade",
    1201: "qingque",
    1107: "clara",
    1204: "jing_yuan",
    1005: "kafka",
    1203: "luocha"
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