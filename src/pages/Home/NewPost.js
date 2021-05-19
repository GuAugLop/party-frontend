import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import { Button, Crop, Input } from "../../components";
import useForm from "../../hooks/useForm";
import styles from "./NewPost.module.css";

const NewPost = () => {
  const [base64, setBase64] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [sended, setSended] = React.useState(false);
  const desc = useForm(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (sended === true) {
      navigate("/");
    }
  }, [sended, navigate]);

  const handleSubmit = async () => {
    if (!base64.name || !base64.base64) {
      setError("É obrigatório o envio de imagem");
    }
    try {
      setLoading(true);
      const result = await api.newPost({
        name: base64.name,
        base64: base64.base64,
        body: desc.value || undefined,
      });
      const json = await result.json();
      if (!result.ok) {
        setError(json.msg);
      } else {
        setSended(true);
      }
    } catch (err) {
      setError("Falha ao publicar. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Crop setBase64={setBase64} />
      {error && <p className={styles.error}>{error}</p>}
      <Input label="Digite uma descrição..." margin="1rem" {...desc} />
      <div className={styles.buttonContainer}>
        <Link to="/">Cancelar</Link>
        {loading ? (
          <Button width="100px" disabled>
            Enviando
          </Button>
        ) : (
          <Button width="100px" onClick={handleSubmit}>
            Enviar
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewPost;
