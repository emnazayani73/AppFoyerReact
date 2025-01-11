import React, { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import axios from "axios";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values) => {
    try {
      // Appel API pour le login
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: values.email,
          motDePasse: values.password,
        }
      );

      // Gestion de la réponse
      const { token, role, id, email } = response.data;
      message.success("Connexion réussie !");

      // Sauvegarde dans le localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
      localStorage.setItem("userEmail", email);

      // Redirection selon le rôle
      switch (role) {
        case "Admin":
          navigate("/dashboardadmin");
          break;
        case "Etudiant":
          navigate("/dashboardetudiant");
          break;
        case "AgentMaintenance":
          navigate("/dashboardagm");
          break;
        case "ResponsableFinancier":
          navigate("/dashboardrf");
          break;
        default:
          message.error("Rôle utilisateur inconnu !");
          break;
      }
    } catch (err) {
      // Gestion des erreurs
      if (err.response && err.response.status === 401) {
        if (
          err.response.data ===
          "Échec de l'authentification : L'étudiant n'est pas encore validé."
        ) {
          setIsModalVisible(true); // Affiche le modal
        } else {
          message.error(err.response.data);
        }
      } else {
        message.error("Erreur réseau ou serveur indisponible !");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Échec de soumission :", errorInfo);
  };

  return (
    <div className="login-form-container">
      <p
        style={{
          fontSize: "40px",
          color: "#3271e7",
          fontWeight: "bold",
        }}
      >
        Login
      </p>
      <Form
        style={{ width: "80%" }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="email"
          className="label-bold"
          rules={[
            {
              required: true,
              message: "Entrez votre email !",
            },
            {
              type: "email",
              message: "Entrez un email valide !",
            },
          ]}
        >
          <Input placeholder="Entrez votre email" />
        </Form.Item>
        <Form.Item
          name="password"
          className="label-bold"
          rules={[
            {
              required: true,
              message: "Entrez votre mot de passe !",
            },
          ]}
        >
          <Input.Password placeholder="Entrez votre mot de passe" />
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Link
        to="/register"
        style={{
          color: "#3271e7",
          marginLeft: "10px",
          textDecoration: "none",
        }}
      >
        Créer un compte étudiant
      </Link>

      {/* Modal pour étudiant non validé */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828945.png"
              alt="Validation Icon"
              style={{ width: "24px" }}
            />
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              Validation requise
            </span>
          </div>
        }
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="ok"
            type="primary"
            style={{
              backgroundColor: "#3271e7",
              borderColor: "#3271e7",
              fontWeight: "bold",
            }}
            onClick={() => setIsModalVisible(false)}
          >
            Compris
          </Button>,
        ]}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828945.png"
            alt="Warning"
            style={{ width: "60px", marginBottom: "15px" }}
          />
          <p style={{ fontSize: "18px", color: "#555" }}>
            Votre compte étudiant n'a pas encore été validé par un
            administrateur.
          </p>
          <p style={{ fontSize: "18px", color: "#555" }}>
            Veuillez attendre la validation avant de réessayer de vous
            connecter.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;
