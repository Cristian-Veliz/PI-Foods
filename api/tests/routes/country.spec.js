/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipes, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanesa a la napolitana',
  image: 'https://st3.depositphotos.com/34476834/37519/i/450/depositphotos_375199306-stock-photo-top-view-food-frame-of.jpg',
  summary: 'A delicious Argentine dish',
  healthScore: 90,
  steps: '1. Prepare the meat\n2. Coat with breadcrumbs\n3. Fry until golden brown'
};

describe('Recipes routes', () => {
  before(async () => {
    try {
      await conn.authenticate();
    } catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  });

  beforeEach(async () => {
    await Recipes.sync({ force: true });
    await Recipes.create(recipe);
  });

  describe('GET /recipes', () => {
    it('should respond with status 200', async () => {
      const response = await agent.get('/recipes');
      expect(response.status).to.equal(200);
    });
  });
});
