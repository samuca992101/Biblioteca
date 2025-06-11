import multer from "multer";
import path from "path";
import fs from "fs";

// Criar pasta se não existir
const pastaUploads = path.resolve(__dirname, "..", "..", "uploads");
if (!fs.existsSync(pastaUploads)) {
  fs.mkdirSync(pastaUploads);
}

// Configuração do multer
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, pastaUploads);
    },
    filename: (req, file, cb) => {
      const nomeArquivo = `${Date.now()}-${file.originalname}`;
      cb(null, nomeArquivo);
    },
  }),
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png/;
    const mimetype = tiposPermitidos.test(file.mimetype);
    const extname = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Apenas imagens JPEG, JPG e PNG são permitidas"));
  },
});
