import express from "express";
import routes from "./src/routes/postRoutes.js";

const posts = [
    { id:1, descricao: "foto teste", imagem: "https://placecats.com/millie/300/150" },
    { id:2, descricao: "Gato brincando com um novelo de lã", imagem: "https://placecats.com/garfield/200/200" },
    { id:3, descricao: "Um gatinho dormindo em uma caixa", imagem: "https://placecats.com/felix/350/250" },
    { id:4, descricao: "Gatos olhando pela janela", imagem: "https://placecats.com/tom/400/300" },
    { id:5, descricao: "Um gato preto misterioso", imagem: "https://placecats.com/black/300/150" },
    { id:6, descricao: "Gato tomando sol na varanda", imagem: "https://placecats.com/sunny/250/200" },
];
//cada coisa entre colchetes representa um objeto, um item nessa lista

const app = express();
app.use(express.static("/uploads")); //servir arquivos estáticos, essa pasta agr é publica
routes(app);
//na pte dos objetos, eles vao ser reconhecidos como json, n como só texto

app.listen(3000, () => {
    console.log("Servidor escutando...");
}); 





