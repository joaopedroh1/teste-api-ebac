/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    //TODO:
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
    //TODO: 
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    //TODO: 
  });


});
