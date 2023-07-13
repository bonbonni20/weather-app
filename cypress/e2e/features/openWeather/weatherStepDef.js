import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

// scenario: select the intended city and check the user can click the toggle button
Given('I open home page', () =>{
    cy.visit('/')
})

When('I type any city name', () => {
    cy.get('[data-testid="input_field"]').type('City of London')
})

When('select the intended city', () => {
    cy.get(':nth-child(2) > [data-testid="select_items"]').click()
})

Then('I should be able to click the toggle button', () => {
    cy.get('[data-testid="toggle_unit"]').click()
})

// scenarrio: toggle button turns green
Then('I click the toggle button', () => {
    cy.get('[data-testid="toggle_unit"]').click()
})

Then('I should see the toggle button is green', () => {
    cy.get('[data-testid="toggle_unit"]').should('have.class', 'bg-green-600')
})

// scenario: check whether the close icon displays
Then('I edit the city name in search bar', () => {
    cy.get('[data-testid="input_field"]').type('l')
})

Then('I should see search bar is empty after I click the close icon', () => {
    cy.get('[data-testid="close"]').click()
    cy.get('[data-testid="input_field"]').clear()
})

// scenario: reload the page
Then('I click the reload button', () => {
    cy.get('[data-testid="reset"]').click()
})

Then('I should land on the home page', () => {
    cy.visit('/')
})

// scenario: check whether the Send to mobile form opens when clicked
Then('I should be able to click the msg icon and form should display', () => {
    cy.get(':nth-child(1) > [data-testid="table_formIcon"] > :nth-child(1) > [data-testid="msg_icon"]').click()
})

Then('I should see the mobile window form', () => {
    cy.get(':nth-child(3) > :nth-child(1) > .absolute')
})

// scenario: close the form by clicking on the close icon
Then('I should be able to close the form after clicking the close icon', () => {
    cy.get('[data-testid="close_icon"]').click()
    cy.get('[data-testid="send_to_mobile_form"]').should('not.exist')
})

// scenario: returns an error if the input starts with an area code
Then('I type + in the send to mobile form', () => {
    cy.get('[data-testid="input_box"]').type('+')
})

Then('I should be able to see an error response in the mobile form', () => {
    cy.get('[data-testid="error_message"]').should('have.text', 'International code already applied!')
})

// scenario: submit button is locked if there is an error
Then('I type 0 in the input field', () => {
    cy.get('[data-testid="input_box"]').type('0')
})

Then('I should see the error message in mobile form and not able to click the submit button', () => {
    cy.get('[data-testid="input_box"]').should('have.value', '0')
    cy.get('.flex-none').should('be.disabled')
})

// scenario: submit button is locked if the input field is empty in movile form
Then('I should not be able to click the submit button in mobile form', () => {
    cy.get('[data-testid="input_box"]').should('have.value', '')
    cy.get('.flex-none').should('be.disabled')
})

// scenario: empty the input field for new input if there is an error in mobile form
Then('I should be able to click the close icon after it pops up', () => {
    cy.get('[data-testid="clear_input_box"]').click()
})

Then('I should be able to see the input field is empty in mobile form', () => {
    cy.get('[data-testid="input_box"]').should('have.value', '')   
})

// scenario: check whether the submit button works or not in the mobile form
Then('I type valid UK number', () => {
    cy.get('[data-testid="input_box"]').type('7542709399')
})

Then('I should be able to click the submit button in the mobile form', () => {
    cy.get('[data-testid="submit_icon"]').click()
})

// scenario: get the success response back after submitting the valid UK number
Then('I should be able to see the success mobile response', () => {
    cy.get('[data-testid="mobile_response"]').should('have.text', 'The selected weather information to the +447542709399 has been successfully sent!')
})

// scenario: mobile response form closes when ok button is clicked
Then('I should be able to close the mobile response form when I click the ok button', () => {
    cy.get('[data-testid="ok_button"]').click()
    cy.get('[data-testid="send_to_mobile_form"]').should('not.exist')
})

// email feature
// scenario: check whether the Email form opens when clicked
Then('I should be able to click the email icon and form should display', () => {
    cy.get(':nth-child(1) > [data-testid="table_formIcon"] > :nth-child(2) > [data-testid="email_icon"]').click()
})

Then('I should see the email window form', () => {
    cy.get(':nth-child(3) > :nth-child(1) > .absolute')
})

// senario: returns an error if the email address is invalid
Then('I type junk@junk in the input field', () => {
    cy.get('[data-testid="input_box"]').type('junk@junk')
})

Then('I should be able to see an error response in the email form', () => {
    cy.get('[data-testid="submit_icon"]').click()   
    cy.get('[data-testid="email_error_message"]').should('have.text', 'Invalid email address!')
})

// scenario: get the success response back after submitting the valid email address
Then('I type valid email address', () => {
    cy.get('[data-testid="input_box"]').type('shirley.ale@cyberfortgroup.com')
})

Then('I should be able to click the submit button in email form', () => {
    cy.get('[data-testid="submit_icon"]').click() 
})

Then('I should be able to see the success email response', () => {
    cy.get('[data-testid="email_response"]').should('have.text', 'The selected weather information to the shirley.ale@cyberfortgroup.com has been successfully sent!')
})

// scenario: email response form closes when ok button is clicked
Then('I should be able to close the email response form when I click the ok button', () => {
    cy.get('[data-testid="email_response_ok_button"]').click()
    cy.get('[data-testid="email_form"]').should('not.exist')
}) 