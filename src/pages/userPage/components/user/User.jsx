import React, { useState } from 'react';
import CustomInput from '../../../../components/inputs/Inputs';
import EmailModal from './components/modals/EmailModal';
import PasswordModal from './components/modals/PasswordModal';
import EnderecoModal from './components/modals/EnderecoModal';

import AddFuncionarioModal from './components/modals/admin/AddFuncModal';
import AddFornecedorModal from './components/modals/admin/AddFornModal';
import AddProdutoModal from './components/modals/admin/AddProductModal'; 

import HistoricoCompras from './components/history/History';
import UserImg from '../../../../assets/imgLemnos/imgUser.svg';
import { MdLogout } from "react-icons/md";
import './user.scss';

export default function User({ onLogout }) {
  const [admin, setAdmin] = useState(false);
  const [form, setForm] = useState({
    name: "Lucas Adriano Tavares Gonçalves",
    cpf: "123.456.789-00",
    email: '',
    password: '',
  });
  const [username, setUsername] = useState(form.name.split(" ")[0]);
  
  const [errors, setErrors] = useState({
    cpf: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEnderecoModal, setShowEnderecoModal] = useState(false);

  const [showAddProdutoModal, setShowAddProdutoModal] = useState(false);
  const [showAddFuncionarioModal, setShowAddFuncionarioModal] = useState(false);
  const [showAddFornecedorModal, setShowAddFornecedorModal] = useState(false);

  const toggleModal = () => {
    const htmlTag = document.querySelector('html');
    const modalOpen = isActive;
    if (modalOpen) {
        htmlTag.classList.remove('modalOpen');
    } else {
        htmlTag.classList.add('modalOpen');
    }
  }

  const historicoExemplo = [
    { id: 1, produto: 'Laptop', preco: 25.99 },
    { id: 2, produto: 'Monitor', produto2: 'Laptop', preco: 39.99 },
    { id: 3, produto: 'Gabinete', preco: 49.99 },
    { id: 4, produto: 'Celular', preco: 12.99 },
    { id: 5, produto: 'Teclado', preco: 12.99 },
    { id: 6, produto: 'SSD Kingstom', preco: 12.99 },
    { id: 7, produto: 'Laptop', produto2: 'Mouse', preco: 12.99 },    
    { id: 8, produto: 'Monitor', produto2: 'Teclado', preco: 12.99 },
    { id: 9, produto: 'Laptop', produto2: 'Gabinete', preco: 12.99 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "name") {
      const firstName = value.split(" ")[0];
      setUsername(firstName);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(prevIsEditing => !prevIsEditing);
  };

  const handleSaveChanges = () => {
    console.log('Dados atualizados:', form);
  };

  const handleEmailSave = (newEmail) => {
    setForm(prevForm => ({
      ...prevForm,
      email: newEmail
    }));
    console.log("Novo email:", newEmail);
  };

  const handleShowModal = (modalName) => {
    switch (modalName) {
      case 'email':
        setShowEmailModal(true);
        break;
      case 'password':
        setShowPasswordModal(true);
        break;
      case 'endereco':
        setShowEnderecoModal(true);
        break;
      case 'addProduto':
        setShowAddProdutoModal(true);
        break;
      case 'addFuncionario':
        setShowAddFuncionarioModal(true);
        break;
      case 'addFornecedor':
        setShowAddFornecedorModal(true);
        break;
      default:
        break;
    }
  };

  const handleCloseModal = (modalName) => {
    switch (modalName) {
      case 'email':
        setShowEmailModal(false);
        break;
      case 'password':
        setShowPasswordModal(false);
        break;
      case 'endereco':
        setShowEnderecoModal(false);
        break;
      case 'addProduto':
        setShowAddProdutoModal(false);
        break;
      case 'addFuncionario':
        setShowAddFuncionarioModal(false);
        break;
      case 'addFornecedor':
        setShowAddFornecedorModal(false);
        break;
      default:
        break;
    }
  };

  const handlePasswordSave = (newPassword) => {
    console.log("Nova senha:", newPassword);
  };

  const handleEnderecoSave = (enderecoData) => {
    console.log("Endereço salvo:", enderecoData);
  };

  const handleAddProdutoSave = (produtoData) => {
    console.log("Produto adicionado:", produtoData);
  };

  const handleAddFuncionarioSave = (funcionarioData) => {
    console.log("Funcionário adicionado:", funcionarioData);
  };

  const handleAddFornecedorSave = (fornecedorData) => {
    console.log("Fornecedor adicionado:", fornecedorData);
  };

  return (
    <section className="userContainer">
        <div className="userData">
            <div className="user">
            <img src={UserImg} alt="user" />
            <h3>{username}</h3>
            </div>
            <h3 className='editUser' onClick={handleEditProfile}>Editar Perfil</h3>
        </div>

        <hr className='lineUser' />

        <div className="updateInfos">
          <div className="updateInputs">
            <p>
              <CustomInput
                type="text"
                label="Nome Completo:"
                id="name"
                name="name"
                maxLength={40}
                minLength={5}
                value={form.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
              {errors.name && <span className='invalid'>{errors.name}</span>}
            </p>

            <p>
              <CustomInput
                type="text"
                label="CPF:"
                id="cpf"
                name="cpf"
                maxLength={14}
                minLength={14}
                value={form.cpf}
                mask="CPF"
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                onChange={handleChange}
                disabled={!isEditing}
              />
              {errors.cpf && <span className='invalid'>{errors.cpf}</span>}
            </p>
          </div>
          <div className="containerButtons">
            <div className='saveButton'>
              <button type="button" onClick={handleSaveChanges} disabled={!isEditing}>Salvar Alterações</button>
            </div>
            <div className='updateButtons'>
              <button type="button" onClick={() => handleShowModal('email')} disabled={!isEditing}>Alterar Email</button>
              <button type="button" onClick={() => handleShowModal('password')} disabled={!isEditing}>Alterar Senha</button>
              <button type="button" onClick={() => handleShowModal('endereco')} disabled={!isEditing}>Adicionar Endereço</button>
            </div>
          </div>
        </div>

        <hr />
        {admin ? (
          <HistoricoCompras compras={historicoExemplo}/>
        ) : (
          <div className='adminPage'>
            <button type="button" onClick={() => handleShowModal('addProduto')}>Adicionar Produto</button>
            <button type="button" onClick={() => handleShowModal('addFuncionario')}>Adicionar Funcionário</button>
            <button type="button" onClick={() => handleShowModal('addFornecedor')}>Adicionar Fornecedor</button>
          </div>
        )}

        <div className="typeUser">
          <div className="logout">
            <button type='button' onClick={onLogout}>Logout<MdLogout className='icon'/></button>
          </div>
        </div>

        {showEmailModal && (
          <EmailModal onSave={handleEmailSave} onClose={() => handleCloseModal('email')} />
        )}

        {showPasswordModal && (
          <PasswordModal onSave={handlePasswordSave} onClose={() => handleCloseModal('password')} />
        )}

        {showEnderecoModal && (
          <EnderecoModal onSave={handleEnderecoSave} onClose={() => handleCloseModal('endereco')} />
        )}

        {showAddProdutoModal && (
          <AddProdutoModal onSave={handleAddProdutoSave} onClose={() => handleCloseModal('addProduto')} />
        )}

        {showAddFuncionarioModal && (
          <AddFuncionarioModal onSave={handleAddFuncionarioSave} onClose={() => handleCloseModal('addFuncionario')} />
        )}

        {showAddFornecedorModal && (
          <AddFornecedorModal onSave={handleAddFornecedorSave} onClose={() => handleCloseModal('addFornecedor')} />
        )}
    </section>
  );
}