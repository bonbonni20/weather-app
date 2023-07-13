/// <reference types="Cypress"
describe('search bar', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('input- city name', () => { 
    cy.get('[data-testid="input_field"]').type('London')
    cy.get('[data-testid="input_field"]').should('have.value', 'London')
  })

  it('should display the dropdown', () => {
    cy.get('[data-testid="input_field"]').type('London')
    cy.wait(2000)
    cy.get('[data-testid="dropdown"]').find('[data-testid="select_items"]').should('have.length', 5)
    cy.get(':nth-child(2) > [data-testid="select_items"]').should('have.text','City of London, England, GB')
  })

  it('select the city from list of options', () => {
    cy.get('[data-testid="input_field"]').type('London')
    cy.get(':nth-child(2) > [data-testid="select_items"]')
    
    cy.get(':nth-child(2) > [data-testid="select_items"]').click()
  })
})

describe('openweather app', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="input_field"]').type('London')
    cy.get(':nth-child(2) > [data-testid="select_items"]').click()
  })

   it.only('clear the search box when close icon is clicked', () => {  
    cy.get('[data-testid="input_field"]').type('l')
    cy.get('[data-testid="close"]').click()
    cy.get('[data-testid="input_field"]').clear()

    cy.get('[data-testid="input_field"]').should('have.text', '')
  })

  it('toggle should be False by default', () => {
    cy.get('[data-testid="toggle_unit"]').click()
    cy.get('[data-testid="toggle_unit"]').should('not.enabled', false)
    cy.get('[data-testid="toggle_unit"]').should('have.class', 'bg-gray-600')
  })

  it('toggle should be True when clicked', () => {
    cy.get('[data-testid="toggle_unit"]').click()
    cy.get('[data-testid="toggle_unit"]').should('have.enabled', true)
    cy.get('[data-testid="toggle_unit"]').should('have.class', 'bg-green-600')
  })

  it('reset button should reload the page',  () => {
    cy.wait(2000)
    cy.get('[data-testid="reset"]').click().reload()
    cy.get('[data-testid="input_field"]').should('have.value', '')
  })
})
