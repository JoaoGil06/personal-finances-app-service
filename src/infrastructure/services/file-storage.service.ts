import fs from "fs";
import multer from "multer";
import { v4 as uuid } from "uuid";
import { PERSONAS_DIR } from "../constants/path";

if (!fs.existsSync(PERSONAS_DIR)) {
  fs.mkdirSync(PERSONAS_DIR, { recursive: true });
}

export const personaImageUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, PERSONAS_DIR),
    filename: (_req, _file, callback) => {
      // remove espaços e caracteres estranhos
      const original = _file.originalname
        .trim()
        .replace(/\s+/g, "_") // espaço → underscore
        .replace(/[^\w.-]/g, ""); // remove símbolos fora de [a-zA-Z0-9_.-]

      callback(null, `${uuid()}-${original.trim()}`);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (_req, _file, callback) => {
    if (/^image\/(png|jpe?g|gif|webp)$/i.test(_file.mimetype))
      callback(null, true);
    else callback(new Error("Only image files are allowed"));
  },
});

/** devolve URL pública (ou caminho relativo) */
export function localImageUrl(filename: string): string {
  return `/static/assets/personas/${filename}`; // servido pelo Express.static
}
