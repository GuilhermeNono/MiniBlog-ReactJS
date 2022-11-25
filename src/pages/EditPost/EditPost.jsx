import React, { useEffect, useState } from "react";
import styles from "./EditPost.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: posts } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (posts) {
      setTitle(posts.title);
      setImage(posts.image), setBody(posts.body);

      const tagsFormatted = posts.tags.join(", ");

      setTags(tagsFormatted);
    }
  }, [posts]);

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image
    try {
      new URL(image);
    } catch (error) {
      return setFormError("A imagem precisa ser uma URL.");
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !image || !tags || !body) {
      return setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
    }

    updateDocument(id,data);

    // redirect to home page
    navigate("/dashboard");
  };
  return (
    <div className={styles.edit_post}>
      {posts && (
        <>
          <h2>Editar Post</h2>
          <p>Edite seu post como bem desejar.</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Titulo:</span>
              <input
                type="text"
                name="title"
                placeholder="Insira um titulo para o post"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                placeholder="Insira a url da imagem"
                required
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual</p>
            <img className={styles.image_preview} src={posts.image} alt={posts.title} />
            <label>
              <span>Conteúdo:</span>
              <textarea
                name="body"
                placeholder="Insira o conteudo do post"
                required
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                placeholder="Insira as tags separadas por virgula"
                required
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading ? (
              <button className="btn">Editar Post</button>
            ) : (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
