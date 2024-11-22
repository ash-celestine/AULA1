import fs from "fs";
import {getTodosPosts, criarPost, atualizarPost} from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function postarNovoPost (req,res){ // é assim pq isso aqui vai ser usado na rota, e na rota tem q ter uma req e uma res
    const novoPost = req.body;
    try{ // tratamento de exceção
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
    //é p armazenar detalhes do erro nesse objeto
        console.error(erro.message);
        res.status(500).json({"erro:":"Falha na requisição"});
        //500 é erro de servidor
    }
}


export async function uploadImagem (req,res){ // é assim pq isso aqui vai ser usado na rota, e na rota tem q ter uma req e uma res
    const novoPost = req.body;
    try{ // tratamento de exceção
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);

    } catch(erro) {
    //é p armazenar detalhes do erro nesse objeto
        console.error(erro.message);
        res.status(500).json({"erro:":"Falha na requisição"});
        //500 é erro de servidor
    }
}

export async function atualizarNovoPost (req,res){ 
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    
    try{ 
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro) {
    //é p armazenar detalhes do erro nesse objeto
        console.error(erro.message);
        res.status(500).json({"erro:":"Falha na requisição"});
        //500 é erro de servidor
    }
}