import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, message } from "antd";
import axios from "axios";
import "./style.css";

const { Option } = Select;

const FormChambre = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      // Appel API pour créer une chambre
      const response = await axios.post(
        "http://localhost:8080/sapi/chambres/create",
        {
          prix: values.prix,
          type: values.type,
          capacite: values.capacite,
        }
      );

      message.success("Chambre ajoutée avec succès !");
      form.resetFields();
    } catch (err) {
      message.error(
        "Une erreur s'est produite lors de l'ajout de la chambre !"
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Échec de soumission :", errorInfo);
  };

  return (
    <div className="add-chambre-form-container">
      <p
        style={{
          fontSize: "30px",
          color: "#3271e7",
          fontWeight: "bold",
        }}
      >
        Ajouter une Chambre
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
          name="prix"
          label="Prix"
          rules={[
            {
              required: true,
              message: "Entrez le prix de la chambre !",
            },
          ]}
        >
          <InputNumber
            min={0}
            step={0.01}
            placeholder="Entrez le prix de la chambre"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[
            {
              required: true,
              message: "Sélectionnez le type de chambre !",
            },
          ]}
        >
          <Select placeholder="Sélectionnez le type de chambre">
            <Option value="petite">Petite</Option>
            <Option value="moyenne">Moyenne</Option>
            <Option value="grande">Grande</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="capacite"
          label="Capacité"
          rules={[
            {
              required: true,
              message: "Entrez la capacité de la chambre !",
            },
          ]}
        >
          <InputNumber
            min={1}
            placeholder="Entrez la capacité de la chambre"
            style={{ width: "100%" }}
          />
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
              border: "solid",
            }}
          >
            Ajouter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormChambre;
