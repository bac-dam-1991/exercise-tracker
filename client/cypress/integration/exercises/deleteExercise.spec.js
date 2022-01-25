/// <reference types="cypress" />

describe('Exercise', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/exercises', {fixture: 'exercises'}).as(
      'getExercises'
    );
    cy.visit('/');
    cy.findByRole('link', {name: /exercises/i}).click();
    cy.location('pathname').should('contain', '/exercises');
    cy.findByText(/exercise list/i).should('exist');
    cy.findByText(/push-ups/i).should('exist');
    cy.wait('@getExercises').then(function (interception) {
      const exerciseData = interception.response.body.data[0];
      cy.log(exerciseData);
      this.exerciseData = exerciseData;
    });
  });
  it('should delete exercise successfully', function () {
    cy.intercept('DELETE', `/api/v1/exercises/${this.exerciseData._id}`, {
      body: {data: {}},
    }).as('deleteExercise');
    cy.intercept('GET', '/api/v1/exercises', {body: {data: []}}).as(
      'getExercises'
    );
    cy.findByTestId('DeleteForeverRoundedIcon').click();
    cy.findByText(/delete exercise/i);
    cy.findByRole('button', {name: /Confirm/i}).click();
    cy.wait('@deleteExercise');
    cy.wait('@getExercises');
    cy.findByText(this.exerciseData.name).should('not.exist');
  });
  it('should cancel delete', function () {
    cy.findByTestId('DeleteForeverRoundedIcon').click();
    cy.findByText(/delete exercise/i);
    cy.findByRole('button', {name: /Cancel/i}).click();
    cy.findByText(/push-ups/i).should('exist');
  });
});
