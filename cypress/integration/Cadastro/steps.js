/// <reference types="cypress"/>

let Chance = require('chance');
let chance = new Chance();


Given(/^que acesso o site$/, () => {
    cy.visit('index.php?controller=authentication&back=my-account');
    cy.get('h1[class="page-heading"]').should('contain.text', 'Authentication');
});

When(/^informar meus dados$/, () => {
    cy.get('input[name="email_create"]').type(chance.email());
    cy.get('button[class$="button-medium exclusive"]').click();
    cy.get('h1[class="page-heading"]').should('contain.text', 'Create an account');

    cy.get('input#id_gender1').check('1');
    cy.get('input#customer_firstname').type(chance.first());
    cy.get('input#customer_lastname').type(chance.last());
    cy.get('input#passwd').type(chance.string());
    cy.get('select#days').select('9');
    cy.get('select#months').select('July');
    cy.get('select#years').select('1985');

    //Endereço

    cy.get('input#firstname').type(chance.first());
    cy.get('input#lastname').type(chance.last());
    cy.get('input#company').type(chance.company());
    cy.get('input#address1').type(chance.address());
    cy.get('input#address2').type(chance.address());
    cy.get('input#city').type(chance.city());
    cy.get('select#id_country').select('United States');
    cy.get('select[name=id_state]').select('New York');
    cy.get('input#postcode').type(chance.zip());
    cy.get('textarea#other').type('Testes Automatizados com Cypress');
    cy.get('input#phone').type(chance.phone());
    cy.get('input#phone_mobile').type(chance.phone());
    cy.get('input#alias').type('My store');
});

And(/^salvar$/, () => {
	//Botão cadastrar
    cy.get('button#submitAccount').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
	// Validando o cadastro
    cy.get('p[class="info-account"]').should('contain.text', 'Welcome to your account. Here you can manage all of your personal information and orders.');
});
