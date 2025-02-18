/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response =>{
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) =>{
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
      
    })

  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let email = Math.random().toString(36).substring(2, 15) + '@ebac.com';
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "Pamela do Amaral",
        "email": email,
        "password": "teste",
        "administrador": "true"
      }
    }).should((response) =>{
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "Pamela do Amaral",
        "email": 'pamela',
        "password": "teste",
        "administrador": "true"
      },
      failOnStatusCode: false
    }).should((response) =>{
      expect(response.status).equal(400)
      expect(response.body.email).equal('email deve ser um email válido')
    })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let email = Math.random().toString(36).substring(2, 15) + '@ebac.com';
    cy.request({
        method: 'PUT',
        url: 'usuarios' + '/7FQveSFuV9Id5Urg',
        body: {
          "nome": "joao pedro editado 1",
          "email": email,
          "password": "teste1",
          "administrador": "true"
        }
    }).should( response => {
      expect(response.body.message).to.equal('Registro alterado com sucesso')
      expect(response.status).to.equal(200)
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let email = Math.random().toString(36).substring(2, 15) + '@ebac.com';
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "Pamela do Amaral",
        "email": email,
        "password": "teste",
        "administrador": "true"
      }
    }).then(response => {
      let id = response.body._id
      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`,
      }).should (response =>{
        expect(response.body.message).to.equal('Registro excluído com sucesso')
        expect(response.status).to.equal(200)
      })
    })
  });
});
