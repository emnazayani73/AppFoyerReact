import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Button,
  Space,
  message,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import axios from "axios";

const { Option } = Select;

const TableUser = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  // Fonction pour supprimer un utilisateur
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/auth/utilisateurs/${id}`);
      message.success("Utilisateur supprimé avec succès");
      setUtilisateurs((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      message.error("Erreur lors de la suppression de l'utilisateur");
    }
  };

  // Fonction pour ouvrir le modal de modification
  const handleEdit = (user) => {
    setCurrentUser(user);
    form.setFieldsValue(user); // Pré-remplir le formulaire avec les données actuelles
    setIsModalVisible(true);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `http://localhost:8080/api/auth/utilisateurs/${currentUser.id}`,
        values
      );
      message.success("Utilisateur mis à jour avec succès");

      // Mettre à jour la liste des utilisateurs localement
      setUtilisateurs((prev) =>
        prev.map((user) =>
          user.id === currentUser.id ? { ...user, ...values } : user
        )
      );

      setIsModalVisible(false); // Fermer le modal
    } catch (error) {
      message.error("Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  // Colonnes du tableau
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Type",
      dataIndex: "typeUser",
      key: "typeUser",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            variant="outlined"
            color="green"
            onClick={() => handleEdit(record)}
          >
            Modifier
          </Button>
          <Button
            type="danger"
            variant="outlined"
            color="danger"
            onClick={() => handleDelete(record.id)}
          >
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  // Charger les données depuis le backend
  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/utilisateurs-specifiques"
        );
        const data = response.data.map((user) => ({
          ...user,
          key: user.id, // Ajout d'une clé unique pour Ant Design
        }));
        setUtilisateurs(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
        setLoading(false);
      }
    };
    fetchUtilisateurs();
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={utilisateurs}
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
      />

      <Modal
        title="Modifier Utilisateur"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Mettre à jour"
        cancelText="Annuler"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            label="Nom"
            name="nom"
            rules={[{ required: true, message: "Veuillez entrer le nom" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Prénom"
            name="prenom"
            rules={[{ required: true, message: "Veuillez entrer le prénom" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Veuillez entrer l'email" },
              { type: "email", message: "L'email n'est pas valide" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="typeUser"
            rules={[
              {
                required: true,
                message: "Veuillez sélectionner un type d'utilisateur",
              },
            ]}
          >
            <Select placeholder="Sélectionner un type">
              <Option value="ResponsableFinancier">
                Responsable Financier
              </Option>
              <Option value="Admin">Admin</Option>
              <Option value="AgentMaintenance">Agent Maintenance</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableUser;
