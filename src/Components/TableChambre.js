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
  InputNumber,
  Select,
} from "antd";
import axios from "axios";

const { Option } = Select;

const TableChambre = () => {
  const [chambres, setChambres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentChambre, setCurrentChambre] = useState(null);
  const [form] = Form.useForm();

  // Fonction pour supprimer une chambre
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/chambres/delete/${id}`);
      message.success("Chambre supprimée avec succès");
      setChambres((prev) => prev.filter((chambre) => chambre.id !== id));
    } catch (error) {
      message.error("Erreur lors de la suppression de la chambre");
    }
  };

  // Fonction pour ouvrir le modal de modification
  const handleEdit = (chambre) => {
    setCurrentChambre(chambre);
    form.setFieldsValue(chambre); // Pré-remplir le formulaire avec les données actuelles
    setIsModalVisible(true);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `http://localhost:8080/api/chambres/update/${currentChambre.id}`,
        values
      );
      message.success("Chambre mise à jour avec succès");

      // Mettre à jour la liste des chambres localement
      setChambres((prev) =>
        prev.map((chambre) =>
          chambre.id === currentChambre.id ? { ...chambre, ...values } : chambre
        )
      );

      setIsModalVisible(false); // Fermer le modal
    } catch (error) {
      message.error("Erreur lors de la mise à jour de la chambre");
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
      title: "Prix",
      dataIndex: "prix",
      key: "prix",
      render: (prix) => `${prix} TND`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Capacité",
      dataIndex: "capacite",
      key: "capacite",
    },
    {
      title: "Places Occupées",
      dataIndex: "placeDejaOccupe",
      key: "placeDejaOccupe",
      render: (placeDejaOccupe) => placeDejaOccupe ?? 0,
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (statut) => (
        <Tag color={statut === "Libre" ? "green" : "red"}>{statut}</Tag>
      ),
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
    const fetchChambres = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/chambres/all"
        );
        const data = response.data.map((chambre) => ({
          ...chambre,
          key: chambre.id, // Ajout d'une clé unique pour Ant Design
        }));
        setChambres(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des chambres :", error);
        setLoading(false);
      }
    };
    fetchChambres();
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={chambres}
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
      />

      <Modal
        title="Modifier Chambre"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Mettre à jour"
        cancelText="Annuler"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            label="Prix (TND)"
            name="prix"
            rules={[{ required: true, message: "Veuillez entrer le prix" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              { required: true, message: "Veuillez sélectionner un type" },
            ]}
          >
            <Select placeholder="Sélectionner un type">
              <Option value="Petite">Petie</Option>
              <Option value="Moyenne">Moyenne</Option>
              <Option value="Grande">Grande</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Capacité"
            name="capacite"
            rules={[{ required: true, message: "Veuillez entrer la capacité" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Statut"
            name="statut"
            rules={[
              { required: true, message: "Veuillez sélectionner le statut" },
            ]}
          >
            <Select placeholder="Sélectionner le statut">
              <Option value="Libre">Libre</Option>
              <Option value="Occupée">Occupée</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableChambre;
