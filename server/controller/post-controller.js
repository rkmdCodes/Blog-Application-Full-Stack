import { response } from "express";
import Post from "../model/post.js";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export const createPost = async (request, response) => {
  try {
    const post = await new Post(request.body);
    post.save();
    return response.status(200).json({ msg: "post saved successfully!" });
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const getAllPosts = async (request, response) => {
  let category = request.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }

   // console.log(posts);
    return response.status(200).json(posts);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const getPost = async (request, response) => {
  try {
   // console.log(  request.params.id,' === id');
      const post = await Post.findById(request.params.id);
      
      response.status(200).json(post);
  } catch (error) {
    
      response.status(500).json({msg:error.message});
  }
}

export const updatePost = async (request,response)=>{

  try{
   
     const post = await Post.findById(request.params.id);

     if(!post)
     {
      return request.status(404).json({'msg':'post with given id didnt exist!'})
     }

     await Post.findByIdAndUpdate(request.params.id , {$set:request.body});
     return response.status(200).json({'msg':'post updated successfully!'});

  }catch(error)
  {
     return response.status(500).json({'msg':error.message});
  }
}
