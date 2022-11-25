import React from "react";

import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthValue();

  const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const {deleteDocument} = useDeleteDocument("posts")

  if(loading) {
    return <p>Caregando...</p>
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        
          <div className={styles.post_header}>
            <span>Titulo</span>
            <span>Ações</span>
          </div>
        
      )}
          {posts && posts.map((post) => (
            <div key={post.id} className={styles.post_row}>
              <p>{post.title}</p>
              <span className={styles.space}></span>
              <Link to={`/post/${post.id}`} className="btn btn-outline">Ver</Link>
              <Link to={`/post/edit/${post.id}`} className="btn btn-outline">Editar</Link>
              <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">Deletar</button>
            </div>
          ))}
    </div>
  );
};

export default Dashboard;
