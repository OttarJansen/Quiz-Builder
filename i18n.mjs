import fs from "node:fs"

const i18n = {

    dateFormaters: {
        us: (date) => {/* format as US date */ },
        no: (date) => {/* format as Norwegian  date */ },
    }
}


const path = `localization`
let files = fs.readdirSync(`./${path}`);
for (let file of files) {
    let id = file.replace(".json", "");
    let content = JSON.parse(fs.readFileSync(`./${path}/${file}`, "utf8"));
    i18n[id] = content;
}


export default i18n;