import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postController.js";

const corsOptions = { // esse origin é oq o frontend passou pra gente 
    origin: "http://localhost:8000,",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({ //esse é codigo pronto, e o parametro storage ali de baixo vem junto, é pra funcionar direito no windows
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/posts", listarPosts); //rota p buscar tds os posts
    app.post("/posts", postarNovoPost);//esse post é o verbo http e nao post de post, rota p criar um post
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;