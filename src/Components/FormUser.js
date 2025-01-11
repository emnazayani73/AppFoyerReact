import React, { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import "./style.css";

const { Option } = Select;

const FormUser = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      // Appel API pour enregistrer un utilisateur
      const response = await axios.post(
        "http://localhost:8080/api/auth/register/utilisateur",
        {
          nom: values.nom,
          prenom: values.prenom,
          telephone: values.telephone,
          email: values.email,
          motDePasse: values.motDePasse,
          typeUser: values.typeUser,
        }
      );

      message.success("Utilisateur enregistré avec succès !");
      form.resetFields();
    } catch (err) {
      message.error(
        "Une erreur s'est produite lors de l'enregistrement de l'utilisateur !"
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Échec de soumission :", errorInfo);
  };

  return (
    <div className="register-user-form-container">
      <p
        style={{
          fontSize: "30px",
          color: "#3271e7",
          fontWeight: "bold",
        }}
      >
        Définir un nouveau rôle
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
          name="nom"
          label="Nom"
          rules={[
            {
              required: true,
              message: "Entrez le nom de l'utilisateur !",
            },
          ]}
        >
          <Input placeholder="Entrez le nom" />
        </Form.Item>
        <Form.Item
          name="prenom"
          label="Prénom"
          rules={[
            {
              required: true,
              message: "Entrez le prénom de l'utilisateur !",
            },
          ]}
        >
          <Input placeholder="Entrez le prénom" />
        </Form.Item>
        <Form.Item
          name="telephone"
          label="Téléphone"
          rules={[
            {
              required: true,
              message: "Entrez le numéro de téléphone !",
            },
          ]}
        >
          <Input placeholder="Entrez le numéro de téléphone" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Entrez un email valide !",
            },
          ]}
        >
          <Input placeholder="Entrez l'email" />
        </Form.Item>
        <Form.Item
          name="motDePasse"
          label="Mot de passe"
          rules={[
            {
              required: true,
              message: "Entrez le mot de passe !",
            },
          ]}
        >
          <Input.Password placeholder="Entrez le mot de passe" />
        </Form.Item>
        <Form.Item
          name="typeUser"
          label="Rôle"
          rules={[
            {
              required: true,
              message: "Sélectionnez le type d'utilisateur !",
            },
          ]}
        >
          <Select placeholder="Sélectionnez le type d'utilisateur">
            <Option value="Admin">Admin</Option>
            <Option value="ResponsableFinancier">Responsable Financier</Option>
            <Option value="AgentMaintenance">Agent Maintenance</Option>
          </Select>
        </Form.Item>
        <Form.Item
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              width: "300px",
              height: "50px",
              fontSize: "20px",
              fontWeight: "bold",
              marginLeft: "28px",
            }}
          >
            Enregistrer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormUser;
