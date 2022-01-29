/// <reference types="cypress" />
const {format, addDays, subDays} = require('date-fns');
const {createDateFormatter} = require('../../../src/hooks/useIntl');

const CALENDAR_ID = Cypress.env('calendar_id');
const startDate = new Date();
const dayCount = 7;
const dateFrom = format(startDate, 'yyyy-MM-dd');
const dateTo = format(addDays(startDate, dayCount), 'yyyy-MM-dd');
const dateFormatter = createDateFormatter();

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
    cy.intercept(
      'GET',
      `/api/v1/calendar/${CALENDAR_ID}/meals?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {body: {data: []}}
    ).as('loadMeals');
  });
  it('add meal successfully', () => {
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
  it('add meal fails because of missing fields', () => {
    cy.findByRole('link', {name: /Calendar/i}).click();
    cy.location('pathname').should('contain', '/calendar');
    cy.wait('@loadMeals');
    cy.findByText(/My Calendar/i).should('exist');
    cy.findByRole('button', {name: /Add meal/i}).click();
    cy.findByRole('button', {name: /Confirm/i}).click();
    cy.findByText(/Meal name is required./i).should('exist');
  });
  it('cancels adding a meal', () => {
    cy.findByRole('link', {name: /Calendar/i}).click();
    cy.location('pathname').should('contain', '/calendar');
    cy.wait('@loadMeals');
    cy.findByText(/My Calendar/i).should('exist');
    cy.findByRole('button', {name: /Add meal/i}).click();
    cy.findByRole('button', {name: /Cancel/i}).click();
    cy.findByRole('button', {name: /Cancel/i}).should('not.exist');
  });
  it('displays previous 7 days', () => {
    cy.findByRole('link', {name: /Calendar/i}).click();
    cy.location('pathname').should('contain', '/calendar');
    cy.wait('@loadMeals');
    cy.findByText(/My Calendar/i).should('exist');

    const prevStartDate = subDays(startDate, dayCount);
    cy.log(prevStartDate.toString());
    const prevDateFrom = format(prevStartDate, 'yyyy-MM-dd');
    cy.log(prevDateFrom);
    const prevDateTo = format(addDays(prevStartDate, dayCount), 'yyyy-MM-dd');
    cy.log(prevDateTo);
    cy.intercept(
      'GET',
      `/api/v1/calendar/${CALENDAR_ID}/meals?dateFrom=${prevDateFrom}&dateTo=${prevDateTo}`,
      {body: {data: []}}
    ).as('loadPrevious');
    cy.findByTestId('ChevronLeftRoundedIcon').should('exist').click();
    cy.findByText(dateFormatter.format(prevStartDate)).should('exist');
  });
  it('displays next 7 days', () => {
    cy.findByRole('link', {name: /Calendar/i}).click();
    cy.location('pathname').should('contain', '/calendar');
    cy.wait('@loadMeals');
    cy.findByText(/My Calendar/i).should('exist');
    const nextStartDate = addDays(startDate, dayCount);
    cy.log(nextStartDate.toString());
    const nextDateFrom = format(nextStartDate, 'yyyy-MM-dd');
    cy.log(nextDateFrom);
    const nextDateTo = format(addDays(nextStartDate, dayCount), 'yyyy-MM-dd');
    cy.log(nextDateTo);
    cy.intercept(
      'GET',
      `/api/v1/calendar/${CALENDAR_ID}/meals?dateFrom=${nextDateFrom}&dateTo=${nextDateTo}`,
      {body: {data: []}}
    ).as('loadPrevious');
    cy.findByTestId('ChevronRightRoundedIcon').should('exist').click();
    cy.findByText(dateFormatter.format(nextStartDate)).should('exist');
  });
});
