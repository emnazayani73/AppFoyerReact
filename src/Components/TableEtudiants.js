import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Modal, Form, message } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";

const TableEtudiants = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const searchInput = useRef(null);

  const fetchEtudiants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/auth/etudiants/valides"
      );
      setData(
        response.data.map((etudiant) => ({
          key: etudiant.id,
          nom: etudiant.nom,
          prenom: etudiant.prenom,
          email: etudiant.email,
          isValid: etudiant.isValid,
          matricule: etudiant.matricule,
        }))
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEtudiants();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Rechercher ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Rechercher
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Réinitialiser
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrer
          </Button>
          <Button type="link" size="small" onClick={close}>
            Fermer
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleEditClick = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(
        `http://localhost:8080/api/auth/utilisateurs/${currentRecord.key}`,
        values
      );
      message.success("Utilisateur modifié avec succès !");
      setIsModalOpen(false);
      fetchEtudiants();
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur :", error);
      message.error("Erreur lors de la modification.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk: async () => {
        try {
          await axios.delete(
            `http://localhost:8080/api/auth/utilisateurs/${id}`
          );
          message.success("Utilisateur supprimé avec succès !");
          fetchEtudiants();
        } catch (error) {
          console.error(
            "Erreur lors de la suppression de l'utilisateur :",
            error
          );
          message.error("Erreur lors de la suppression.");
        }
      },
    });
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
      width: "20%",
      ...getColumnSearchProps("nom"),
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
      width: "20%",
      ...getColumnSearchProps("prenom"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Matricule",
      dataIndex: "matricule",
      key: "matricule",
      width: "15%",
      ...getColumnSearchProps("matricule"),
    },
    {
      title: "Validité",
      dataIndex: "isValid",
      key: "isValid",
      render: (isValid) =>
        isValid ? (
          <Tag color="green">Validé</Tag>
        ) : (
          <Tag color="red">Non Validé</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEditClick(record)}>
            Modifier
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />
      <Modal
        title="Modifier l'utilisateur"
        open={isModalOpen}
        onOk={handleEditSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nom"
            label="Nom"
            rules={[{ required: true, message: "Veuillez entrer le nom" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="prenom"
            label="Prénom"
            rules={[{ required: true, message: "Veuillez entrer le prénom" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, type: "email", message: "Email invalide" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="matricule"
            label="Matricule"
            rules={[
              { required: true, message: "Veuillez entrer le matricule" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableEtudiants;
