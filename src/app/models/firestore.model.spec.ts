import { Firestore } from './firestore.model';

describe('Firestore', () => {
  it('should create an instance', () => {
    expect(new Firestore()).toBeTruthy();
  });
});
