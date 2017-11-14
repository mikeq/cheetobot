const moment = require('moment');
const random = require('./random');

describe('Test lunch functions', () => {
  it('Before lunch', () => {
    expect(
      random.getLunch(moment().set({ hour: 10, minute: 0, second: 0 }))
    ).toBe('Lunch in 2 hours');
  });

  it('During lunch', () => {
    expect(
      random.getLunch(moment().set({ hour: 12, minute: 15, second: 0 }))
    ).toBe('It is lunchtime fellar, omnomnomnomnom');
  });

  it('After lunch', () => {
    expect(
      random.getLunch(moment().set({ hour: 14, minute: 0, second: 0 }))
    ).toBe("You've had it, back to work fellar.");
  });
});

describe('Test hometime functions', () => {
  it('Before hometime', () => {
    expect(
      random.getHomeTime(moment().set({ hour: 10, minute: 0, second: 0 }))
    ).toBe('Hometime in 6 hours');
  });

  it('After hometime', () => {
    expect(
      random.getHomeTime(moment().set({ hour: 16, minute: 0, second: 0 }))
    ).toBe('You should have left 30 minutes ago');
  });
});
