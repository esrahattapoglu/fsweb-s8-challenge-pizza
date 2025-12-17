describe("Pizza Order Tests",()=>  { 

  beforeEach(()=>{
    cy.visit("http://localhost:5173/order")
  })


  it("User can type name",() =>{
    cy.get('[data-cy="name-input"]') 
 .type("Esra").should("have.value", "Esra");
  })


  it("User can select toppings",()=>{

   cy.get('[data-cy="topping-Pepperoni"]').should("be.checked")
   cy.get('[data-cy="topping-Mısır"]').should("be.checked")
   cy.get('[data-cy="topping-Sosis"]').should("be.checked")
   cy.get('[data-cy="topping-Ananas"]').should("be.checked")
   cy.get('[data-cy="topping-Jalepeno"]').should("be.checked")
   

  cy.get('[data-cy="topping-Sucuk"]').click()
  cy.get('[data-cy="topping-Sucuk"]').should("be.checked")
})


  it("User can submit form",()=>{
  cy.get('[data-cy="name-input"]').type("Esra")

  cy.get('[data-cy="size-medium"]').click()

  cy.get('[data-cy="dough-select"]').select("İnce Hamur")

  cy.get('[data-cy="topping-Domates"]').click()
  cy.get('[data-cy="topping-Biber"]').click()

  cy.get('[data-cy="submit-order"]').should("not.be.disabled").click()
})

})
