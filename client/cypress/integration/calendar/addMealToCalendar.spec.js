const {format, addDays} = require('date-fns');
/// <reference types="cypress" />

const CALENDAR_ID = Cypress.env('calendar_id');
const startDate = new Date();
const dayCount = 7;
const dateFrom = format(startDate, 'yyyy-MM-dd');
const dateTo = format(addDays(startDate, dayCount), 'yyyy-MM-dd');

const meal = {
  _id: '61f46b2f851cfda03c3595fe',
  index: 0,
  name: 'Roasted chicken',
  date: startDate.toISOString(),
  description: 'Lemon and thyme marinated chicken roasted with veggies.',
  mealType: 'dinner',
};

describe('Calendar', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('add meal successfully', () => {
    cy.intercept(
      'GET',
      `/api/v1/calendar/${CALENDAR_ID}/meals?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {body: {data: []}}
    ).as('loadMeals');

    cy.intercept('POST', `/api/v1/calendar/${CALENDAR_ID}/meals`, {
      body: {success: true},
    }).as('addMeal');
    cy.findByRole('link', {name: /Calendar/i}).click();
    cy.location('pathname').should('contain', '/calendar');
    cy.wait('@loadMeals');
    cy.findByText(/My Calendar/i).should('exist');
    cy.findByRole('button', {name: /Add meal/i}).click();
    cy.findByLabelText(/name/i).clear().type(meal.name);
    cy.findByLabelText(/meal type/i).click();
    cy.findByText(/dinner/i).click();
    cy.findByLabelText(/description/i)
      .clear()
      .type(meal.description);
    cy.intercept(
      'GET',
      `/api/v1/calendar/${CALENDAR_ID}/meals?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        body: {
          data: [meal],
        },
      }
    ).as('reloadMeals');
    cy.findByRole('button', {name: /Confirm/i}).click();
    cy.wait('@addMeal');
    cy.wait('@reloadMeals');
    cy.findByText(`${meal.name} (${meal.mealType})`).should('exist');
    cy.findByText(meal.description).should('exist');
    cy.findByRole('button', {name: /Confirm/i}).should('not.exist');
  });
});
