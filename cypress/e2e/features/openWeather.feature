Feature: OpenWeather app

    Scenario: select the intended city and check the user can click the toggle button
    Given I open home page
    When I type any city name 
    And select the intended city
    Then I should be able to click the toggle button

    Scenario: toggle button turns green when clicked
    Given I open home page
    When I type any city name
    And select the intended city
    Then I click the toggle button
    And I should see the toggle button is green

    Scenario: check whether the close icon displays and clear the search-bar
    Given I open home page
    When I type any city name
    And select the intended city
    Then I edit the city name in search bar
    And I should see search bar is empty after I click the close icon

    Scenario: reload the page
    Given I open home page
    When I type any city name
    And select the intended city
    Then I click the reload button
    And I should land on the home page

    ## mobile
    Scenario: check whether the Send to mobile form opens when clicked
    Given I open home page
    When I type any city name
    And select the intended city
    Then I should be able to click the msg icon and form should display
    And I should see the mobile window form

    Scenario: close the form by clicking on the close icon
    Given I open home page
    When I type any city name
    And select the intended city 
    Then I should be able to click the msg icon and form should display
    And I should be able to close the form after clicking the close icon

    Scenario: returns an error if the input starts with an area code
    Given I open home page
    When I type any city name
    And select the intended city 
    Then I should be able to click the msg icon and form should display
    And I type + in the send to mobile form
    Then I should be able to see an error response in the mobile form

    Scenario: submit button is locked if there is an error
    Given I open home page
    When I type any city name
    And select the intended city 
    Then I should be able to click the msg icon and form should display
    And I type 0 in the input field
    Then I should see the error message in mobile form and not able to click the submit button

    Scenario: submit button is locked if the input field is empty in mobile form
    Given I open home page
    When I type any city name
    And select the intended city 
    Then I should be able to click the msg icon and form should display
    And I should not be able to click the submit button in mobile form

    Scenario: empty the input field for new input if there is an error in mobile form
    Given I open home page
    When I type any city name
    And select the intended city 
    Then I should be able to click the msg icon and form should display
    And I type 0 in the input field
    Then I should be able to click the close icon after it pops up
    And I should be able to see the input field is empty in mobile form

    Scenario: check whether the submit button works or not in the mobile form
    Given I open home page
    When I type any city name
    And select the intended city 
    Then I should be able to click the msg icon and form should display
    And I type valid UK number
    Then I should be able to click the submit button in the mobile form

    # Scenario: get the failed response back after submitting the valid UK number
    # Given I open home page 
    # When I type any city name
    # And select the intended city
    # Then I should be able to click the msg icon and form should display
    # And I type valid UK number
    # Then I should be able to click the submit button in the mobile form
    # And I should be able to see the success mobile response

    # Scenario: mobile response form closes when ok button is clicked
    # Given I open home page 
    # When I type any city name
    # And select the intended city
    # Then I should be able to click the msg icon and form should display
    # And I type valid UK number
    # Then I should be able to click the submit button in the mobile form
    # And I should be able to see the success mobile response
    # Then I should be able to close the mobile response form when I click the ok button

    ## email
    Scenario: check whether the Email form opens when clicked
    Given I open home page
    When I type any city name
    And select the intended city
    Then I should be able to click the email icon and form should display
    And I should see the email window form

    Scenario: returns an error if the email address in invalid
    Given I open home page
    When I type any city name
    And select the intended city 
    Then I should be able to click the email icon and form should display
    And I type junk@junk in the input field
    Then I should be able to see an error response in the email form

    # Scenario: get the success response back after submitting the valid email address
    # Given I open home page 
    # When I type any city name
    # And select the intended city
    # Then I should be able to click the email icon and form should display
    # And I type valid email address
    # Then I should be able to click the submit button in email form
    # And I should be able to see the success email response

    # Scenario: email response form closes when ok button is clicked
    # Given I open home page 
    # When I type any city name
    # And select the intended city
    # Then I should be able to click the email icon and form should display
    # And I type valid email address
    # Then I should be able to click the submit button in email form
    # And I should be able to see the success email response
    # Then I should be able to close the email response form when I click the ok button