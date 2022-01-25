/// <reference types="cypress" />

describe('Exercise', () => {
  beforeEach(() => {
    cy.fixture('exercises').then((exerciseData) => {
      cy.exerciseData = exerciseData.data[0];
      cy.log(exerciseData);
    });
    cy.visit('/');
    cy.intercept(
      {
        method: 'GET',
        url: '/api/v1/exercises/',
      },
      {statusCode: 200, body: {data: []}}
    );
    cy.findByRole('link', {name: /Exercises/i}).click();
    cy.location('pathname').should('include', '/exercises');
    cy.findByText(/Exercise list/i);
    cy.findByTestId('AddCircleOutlineRoundedIcon').click();
    cy.location('pathname').should('include', '/exercises/add');
  });
  it('should add exercise successfully', () => {
    cy.findByLabelText('Name').clear().type(cy.exerciseData.name);
    cy.findByRole('button', {name: /Save/i}).click();
    cy.intercept(
      {method: 'POST', url: '/api/v1/exercises'},
      {statusCode: 201, body: {data: {}}}
    );
    cy.intercept(
      {
        method: 'GET',
        url: '/api/v1/exercises/',
      },
      {statusCode: 200, fixture: 'exercises'}
    );
    cy.location('pathname').should('include', '/exercises');
    cy.findByText(/Push-ups/i);
  });
  it('should fail to add exercise', () => {
    cy.findByRole('button', {name: /Save/i}).click();
    cy.findByText(/Exercise name is required./i);
  });
  it('should fail to add exercise because exercise name is too short.', () => {
    cy.findByLabelText('Name').clear().type('Ab');
    cy.findByRole('button', {name: /Save/i}).click();
    cy.findByText(/Exercise name needs at least 3 characters./i);
  });
  it('should fail to add exercise because exercise name is too long.', () => {
    cy.findByLabelText('Name').clear().type('abcdefghijklmnopqrstuvwxyz');
    cy.findByRole('button', {name: /Save/i}).click();
    cy.findByText(/Exercise name cannot be more than 20 characters./i);
  });
});
