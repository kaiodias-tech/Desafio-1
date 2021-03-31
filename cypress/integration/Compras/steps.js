/// <reference types="cypress"/>

let Chance = require('chance');
let chance = new Chance();


Given(/^que acesso o site$/, () => {
	cy.visit('/');
});

And(/^escolho um determinado produto$/, () => {
    let nomeProduto = 'Faded Short Sleeve';

        cy.contains('Faded Short Sleeve').trigger('mouseover')

        cy.contains(nomeProduto)
        .parent()
        .siblings('div.button-container')
        .first()
        .click()
        
});

And(/^verifico se o produto está no carrinho de compras$/, () => {
	//Validando que o produto foi adicionado com sucesso no carrinho
    cy.get('.layer_cart_product')
    .parent() //H2
    .should('contain.text', 'Product successfully added to your shopping cart')


    //Validando o produto no carrinho
    cy.get('.layer_cart_product_info #layer_cart_product_title').should('contain.text', 'Faded Short Sleeve T-shirts');

    //Validando a quantidade do produto no carrinho
    cy.get('#layer_cart_product_quantity').should('contain.text', '1');

    //Validando o Valor unitário do produto no carrinho
    cy.get('#layer_cart_product_price').should('contain.text', '$16.51');

    // Botão para ir para o checkout
    cy.get(".button-container a[href$='controller=order']").click();
    

    cy.get(".cart_navigation a[href$='order&step=1']").click();

});

When(/^sou direcionado para a tela de login$/, () => {
	//Registo de usuário
    cy.get('#login_form').should('contain.text', 'Already registered?');

    //Dados de e-mail e senha
    cy.get('#email').type('testes@mail.com');
    cy.get('#passwd').type('123456');
        
});

And(/^sou autenticado$/, () => {
	//Button login
    cy.get('button#SubmitLogin').click();
});

Then(/^informo meus dados$/, () => {
	//Validando a parte do endereço
    cy.get('.page-heading').should('contain.text', 'Addresses');

    //Validando se está marcado que o endereço de entrega é o mesmo de cobrança
    cy.get('[type=checkbox]#addressesAreEquals').should('have.attr', 'checked', 'checked');


    //Button Endereço
    cy.get('button[name=processAddress]').click();

    //Validando opção de envio
    cy.get('#carrier_area').should('contain.text', 'Shipping');
    cy.get('[type=checkbox]#cgv').check();

    //Button Envio
    cy.get('button[name=processCarrier]').click();

    //OPção da forma de pagamento
    cy.get('.bankwire').click();

    //Botão para confirmar o serviço
    cy.get('.cart_navigation button[type=submit]')
    .find('span')
    .contains('I confirm my order')
    .click()
});

And(/^finalizo a compra com sucesso$/, () => {
	//Validando a confirmação da compra
    cy.get('.cheque-indent').should('contain.text', 'Your order on My Store is complete.');

    //Validando o valor da Compra
    cy.get('#center_column').should('contain.text', '$18.51');


    //Validando o ID do pedido de compra
    cy.get('div.box').invoke('text').then((text) => {
        console.log(text)

        console.log(text.match(/[A-Z][A-Z]+/g)[1])

        cy.writeFile('cypress/fixtures/pedido.json', { id: `${ text.match(/[A-Z][A-Z]+/g)[1]}` })
    })

    cy.get(".cart_navigation a[href$='history']").click();

    //Comando para leitura de arquivo
    cy.readFile('cypress/fixtures/pedido.json').then((pedido) => {
        cy.get('tr.first_item .history_link a').should('contain.text', pedido.id)
    })
});
