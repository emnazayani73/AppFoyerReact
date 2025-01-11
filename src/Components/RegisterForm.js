import React, { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import axios from "axios";
import "./registerForm.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values) => {
    try {
      // Ajout du champ matricule dans la requête
      const response = await axios.post(
        "http://localhost:8080/api/auth/register/etudiant",
        values
      );
      if (response.status === 200) {
        form.resetFields(); // Réinitialiser le formulaire
        setIsModalVisible(true); // Afficher le modal
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription de l'étudiant :", error);
      message.error("Erreur lors de l'inscription de l'étudiant.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="register-form-container">
      <p
        style={{
          fontSize: "40px",
          textAlign: "center",
          marginBottom: "30px",
          color: "#3271e7",
          fontWeight: "bold",
        }}
      >
        S'inscrire
      </p>
      <Form
        className="form"
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* Form Items */}
        <Form.Item
          label="Nom"
          name="nom"
          className="label-bold"
          style={{ marginBottom: "30px" }}
          rules={[{ required: true, message: "Entrez votre nom SVP!" }]}
        >
          <Input className="input-field" />
        </Form.Item>
        <Form.Item
          label="Prénom"
          name="prenom"
          className="label-bold"
          style={{ marginBottom: "30px" }}
          rules={[{ required: true, message: "Entrez votre prénom SVP!" }]}
        >
          <Input className="input-field" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          className="label-bold"
          style={{ marginBottom: "30px" }}
          rules={[
            { required: true, message: "Entrez votre adresse email SVP!" },
            { type: "email", message: "Adresse email invalide!" },
          ]}
        >
          <Input className="input-field" type="email" />
        </Form.Item>
        <Form.Item
          label="Mot de passe"
          name="motDePasse"
          className="label-bold"
          style={{ marginBottom: "30px" }}
          rules={[
            { required: true, message: "Entrez un mot de passe SVP!" },
            {
              min: 6,
              message: "Le mot de passe doit contenir au moins 6 caractères!",
            },
          ]}
        >
          <Input.Password className="input-field" />
        </Form.Item>
        <Form.Item
          label="Téléphone"
          name="telephone"
          className="label-bold"
          style={{ marginBottom: "30px" }}
          rules={[
            { required: true, message: "Entrez votre numéro de téléphone!" },
            {
              pattern: /^[0-9]{8}$/,
              message: "Le numéro de téléphone doit contenir 8 chiffres!",
            },
          ]}
        >
          <Input className="input-field" />
        </Form.Item>
        {/* Nouveau champ Matricule */}
        <Form.Item
          label="Matricule"
          name="matricule"
          className="label-bold"
          style={{ marginBottom: "30px" }}
          rules={[{ required: true, message: "Entrez votre matricule!" }]}
        >
          <Input className="input-field" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="registerBtn" type="primary" htmlType="submit">
            Enregistrer
          </Button>
        </Form.Item>
      </Form>
      <Link
        to="/"
        style={{
          color: "#3271e7",
          marginLeft: "160px",
          textDecoration: "none",
        }}
      >
        J'ai déjà un compte
      </Link>

      {/* Modal de confirmation */}
      <Modal
        title={
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "24px",
              color: "#3271e7",
            }}
          >
            Félicitations!
          </div>
        }
        visible={isModalVisible}
        centered
        closable={false}
        footer={[
          <Button
            key="close"
            type="primary"
            style={{
              backgroundColor: "#3271e7",
              borderColor: "#3271e7",
              borderRadius: "8px",
            }}
            onClick={() => setIsModalVisible(false)}
          >
            Fermer
          </Button>,
        ]}
      >
        <div style={{ textAlign: "center", fontSize: "18px", color: "#333" }}>
          <p>Votre inscription a été enregistrée avec succès.</p>
          <p>Merci de nous rejoindre!</p>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterForm;
